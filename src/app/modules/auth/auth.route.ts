import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

//create login system
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

//creating a refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

//get studentInfo
// router.get('/:id', AdminController.getSingleAdmin);
// router.delete('/:id', AdminController.deleteAdmin);
// router.get('/', AdminController.getAdmins);

//update-studentInfo route
// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdminZodSchema),
//   AdminController.updateAdmin
// );

export const AuthRoutes = router;
