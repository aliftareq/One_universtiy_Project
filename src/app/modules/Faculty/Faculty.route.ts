import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './Faculty.controller';
import { facultyValidation } from './Faculty.validation';

const router = express.Router();

//get studentInfo
router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getFaculties);

//update-studentInfo route
router.patch(
  '/:id',
  validateRequest(facultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

export const FacultyRoutes = router;
