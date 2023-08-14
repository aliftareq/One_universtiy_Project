import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../academicSemester/academicSemester.constant';
import { AdminFilterableFields } from './Admin.constant';
import { IAdmin } from './Admin.interface';
import { AdminService } from './Admin.service';

const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOption);

  sendResponse<IAdmin[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrived succssfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrive succssfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminService.updateAdmin(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated succssfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted succssfully',
    data: result,
  });
});

export const AdminController = {
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
