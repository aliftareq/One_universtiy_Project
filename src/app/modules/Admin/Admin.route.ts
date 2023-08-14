import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './Admin.validation';
import { AdminController } from './Admin.controller';

const router = express.Router();

//get studentInfo
router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAdmins);

//update-studentInfo route
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
