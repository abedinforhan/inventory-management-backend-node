import { Model, Types } from 'mongoose';
import { IPurchaseHistory } from '../purchaseHistory/purchaseHistory.interface';
export type ICustomer = {
  name: string;
  address?: string;
  email?: string;
  date: Date;
  phoneNumber: string;
  purchaseHistory?: Types.ObjectId[] | IPurchaseHistory; // Array of PurchaseHistory references or actual PurchaseHistory documents
};
export type ICustomerFilters = {
  searchTerm?: string; // General search term for textual search across multiple fields
  name?: string; // Filter by customer name
  address?: string; // Filter by address (if you want this field to be filterable)
  email?: string; // Filter by email (if you want this field to be filterable)
  phoneNumber?: string; // Filter by phone number (if you want this field to be filterable)
};

export type CustomerModel = Model<ICustomer, Record<string, unknown>>;
