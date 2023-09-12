import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post('/login', AuthController.loginUser);

router.post('/refresh-token', AuthController.refreshToken);

router.post('/verify-token', AuthController.verifyToken);

router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.Manager
  ),
  AuthController.changePassword
);

export const AuthRoutes = router;
