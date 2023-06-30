import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

//all-routers
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemster
);

export const AcademicSemesterRoutes = router;
