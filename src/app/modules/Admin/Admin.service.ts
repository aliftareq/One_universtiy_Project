/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { IAdmin, IAdminFilters } from './Admin.interface';
import { AdminSearchableFields } from './Admin.constant';
import { Admin } from './Admin.model';

//get service logic
const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  //kepp some distance here

  //filters and searching logic and operation workflow
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: AdminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  //pagination's workflow.
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCoditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCoditions[sortBy] = sortOrder;
  }

  //Actual database logic
  const result = await Admin.find(whereConditions)
    .populate('managementdepartments')
    .sort(sortCoditions)
    .skip(skip)
    .limit(limit);

  //counting total document number
  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById({ id }).populate('managementdepartments');
  return result;
};

// update service logic
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Admin Regarding this id not found.'
    );
  }

  const { name, ...AdminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...AdminData };

  //dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // 'name.firstName'
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};

//delete service logic
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id).populate(
    'managementdepartments'
  );
  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
