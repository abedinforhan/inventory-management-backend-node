import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-user',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);

export const UserRoutes = router;
