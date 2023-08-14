import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../academicSemester/academicSemester.constant';
import { IManagementDepartment } from './ManagementDepartment.interface';
import { ManagementDepartmentFilterableFields } from './ManagementDepartment.constants';
import { ManagementDepartmentService } from './ManagementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'ManagementDepartment created succssfully',
      data: result,
    });
  }
);

const getManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ManagementDepartmentFilterableFields);
    const paginationOption = pick(req.query, paginationFields);

    const result = await ManagementDepartmentService.getManagementDepartments(
      filters,
      paginationOption
    );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: 200,
      success: true,
      message: 'ManagementDepartments retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'ManagementDepartment retrive succssfully',
      data: result,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'ManagementDepartment updated succssfully',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'ManagementDepartment deleted succssfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
