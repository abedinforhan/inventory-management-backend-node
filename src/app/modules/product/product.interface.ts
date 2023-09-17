import { Model, Types } from 'mongoose';
import { IBrand } from '../brand/brand.interface';
import { ICategory } from '../category/category.interface';
import { IUnit } from '../unit/unit.interface';

export type IProduct = {
  name: string;
  sku: string;
  description?: string;
  category: Types.ObjectId | ICategory;
  brand: Types.ObjectId | IBrand;
  unit: Types.ObjectId | IUnit;
  perUnitSellingPrice: number;
  perUnitMaxPrice: number;
  buyingQuantity: number;
  productImage?: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  searchTerm?: string;
  name?: string;
};
