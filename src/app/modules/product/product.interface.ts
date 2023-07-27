import { Model, Types } from 'mongoose';
import { IBrand } from '../brand/brand.interface';
import { ICategory } from '../category/category.interface';

export type IProduct = {
  name: string;
  description?: string;
  category: Types.ObjectId | ICategory;
  brand: Types.ObjectId | IBrand;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  searchTerm?: string;
  name?: string;
};
