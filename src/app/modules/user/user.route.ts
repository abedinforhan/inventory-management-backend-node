import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-user',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);

router.get(
  '/last-user-id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getLastUserID
);
router.get('/', UserController.getUsers);
router.patch('/', UserController.updateAllUsers);
router.get('/:id', UserController.getSingleUser);
router.patch('/:id', UserController.updateSingleUser);

export const UserRoutes = router;
