import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

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

//creating a refresh token
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthController.changePassword
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
