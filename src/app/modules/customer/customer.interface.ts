import { Model } from 'mongoose';

export type ICustomer = {
  name: string;
  email: string;
  gender: string;
  contactNo1: string;
  contactNo2?: string;
  shippingAddress?: string;
  city: string;
  zipCode: number;
  profileImage?: string;
};

export type ICustomerFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

export type CustomerModel = Model<ICustomer, Record<string, unknown>>;
