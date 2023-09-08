import httpStatus from 'http-status';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateManagerId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const allowedRoles = [ENUM_USER_ROLE.Manager, ENUM_USER_ROLE.ADMIN];
  console.log(user);
  if (!allowedRoles.includes(user.role as ENUM_USER_ROLE)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }

  let id = null;
  let password;

  switch (user.role) {
    case ENUM_USER_ROLE.Manager:
      id = await generateManagerId();
      password = config.default_manager_pass;
      break;
    case ENUM_USER_ROLE.ADMIN:
      id = await generateAdminId();
      password = config.default_admin_pass;
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }

  user.id = id;
  user.password = password as string;

  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user ');
  }

  return newUser;
};

export const UserService = {
  createUser,
};
