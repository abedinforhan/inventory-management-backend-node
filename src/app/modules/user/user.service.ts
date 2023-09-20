import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
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

  return lastUser?.id ? lastUser?.id.substring(1) : '00000';
};

const getSingleUser = async (id: string) => {
  const result = await User.findOne({ id }, { password: 0 });

  return result;
};
const getUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  // calculate the page
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const updateSingleUser = async (id: string, payload: IUser) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

// this bulk update is created for testing purposes
const updateAllUsers = async (update: Partial<IUser>) => {
  const result = await User.updateMany({}, update);
  return result;
};

export const UserService = {
  createUser,
  getLastUserId,
  getSingleUser,
  updateSingleUser,
  getUsers,
  updateAllUsers,
};
