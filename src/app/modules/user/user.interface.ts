/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  id: string;
  password: string;
  name: string;
  gender: string;
  email: string;
  address: string;
  contactNo: string;
  emergencyContactNo?: string;
  role: 'admin' | 'manager';
  designation: string;
  profileImage?: string;
  status: 'blocked' | 'unblocked';
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<IUser, 'id' | 'password' | 'role' | 'profileImage' | 'status'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
};
