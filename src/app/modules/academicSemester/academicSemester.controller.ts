import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createSemster = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester created succssfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemster,
};
