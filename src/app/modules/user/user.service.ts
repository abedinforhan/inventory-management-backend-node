import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const allowedRoles = [ENUM_USER_ROLE.Manager, ENUM_USER_ROLE.ADMIN];
  console.log(user);
  if (!allowedRoles.includes(user.role as ENUM_USER_ROLE)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }

  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user ');
  }

  return newUser;
};

const getLastUserId = async (role: string): Promise<string | null> => {
  const lastUser = await User.findOne(
    {
      role: role,
    },
    { id: 1, role: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  console.log(lastUser);

  return lastUser?.id ? lastUser?.id.substring(1) : '00000';
};

const getSingleUser = async (id: string) => {
  const result = await User.findOne({ id }, { password: 0 });

  return result;
};

const updateSingleUser = async (id: string, payload: IUser) => {
  console.log({ payload });
  const result = await User.findOneAndUpdate({ id }, payload, { new: true });
  console.log({ result });
  return result;
};

export const UserService = {
  createUser,
  getLastUserId,
  getSingleUser,
  updateSingleUser,
};
