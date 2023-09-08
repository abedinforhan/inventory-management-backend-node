/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
