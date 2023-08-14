import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student created succssfully',
      data: result,
    });
    next();
  }
);

const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty created succssfully',
      data: result,
    });
    next();
  }
);

const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin created succssfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
