import { Model, Types } from 'mongoose';

export type ISupplier = {
  name: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  brand: Types.ObjectId;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
};

export type SupplierModel = Model<ISupplier, Record<string, unknown>>;

export type ISupplierFilters = {
  searchTerm?: string;
  _id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
