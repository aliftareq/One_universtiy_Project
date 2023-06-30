import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

//request validation
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.number({ required_error: 'Year is Required' }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is Required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'startmonth is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Endmonth is required',
    }),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
