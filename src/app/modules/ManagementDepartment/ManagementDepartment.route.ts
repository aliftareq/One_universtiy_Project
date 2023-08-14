import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './ManagementDepartment.validation';
import { ManagementDepartmentController } from './ManagementDepartment.controller';

const router = express.Router();

//creating data
router.post(
  '/create-depertment',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

//get routes
router.get('/', ManagementDepartmentController.getManagementDepartments);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

//update routes
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

//delete routes
router.delete(
  '/:id',
  ManagementDepartmentController.updateManagementDepartment
);

export const ManagementDepartmentRoutes = router;
