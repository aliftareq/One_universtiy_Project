import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyService } from './academicFaculty.service';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { paginationFields } from '../academicSemester/academicSemester.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await academicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'AcademicFaculty created succssfully',
    data: result,
  });
});

const getFaculties = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  console.log(req.user);
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  const result = await academicFacultyService.getFaculties(
    filters,
    paginationOption
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty retrive succssfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await academicFacultyService.updateFaculty(id, updatedData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty updated succssfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty deleted succssfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
