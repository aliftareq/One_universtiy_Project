import { Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import {
  academicSemesterFilterableFields,
  paginationFields,
} from './academicSemester.constant';

const createSemster = catchAsync(async (req: Request, res: Response) => {
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
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
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
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester retrive succssfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await academicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester updated succssfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester deleted succssfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemster,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
