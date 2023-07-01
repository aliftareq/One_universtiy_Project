import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import {
  academicSemesterFilterableFields,
  paginationFields,
} from './academicSemester.constant';

const createSemster = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Semester created succssfully',
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOption = pick(req.query, paginationFields);

    const result = await academicSemesterService.getAllSemester(
      filters,
      paginationOption
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Semester retrived succssfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await academicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Semester retrive succssfully',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemster,
  getAllSemester,
  getSingleSemester,
};
