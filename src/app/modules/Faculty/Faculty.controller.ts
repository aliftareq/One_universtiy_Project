import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../academicSemester/academicSemester.constant';
import { FacultyFilterableFields } from './Faculty.constant';
import { IFaculty } from './Faculty.interface';
import { FacultyService } from './Faculty.service';

const getFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FacultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOption
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrived succssfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrive succssfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated succssfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted succssfully',
    data: result,
  });
});

export const FacultyController = {
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
