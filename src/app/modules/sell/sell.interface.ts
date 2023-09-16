import { Model, Types } from 'mongoose';

export type ICustomer = {
  id: Types.ObjectId;
  name: string;
};

export type ISoldProduct = {
  id: Types.ObjectId;
  name: string;
  brand: string;
  category: string;
  unit: string;
  perUnitSellingPrice: number;
  sellingQuantity: number;
  totalSellingPrice: number;
};

export type ISell = {
  vatTax: number;
  shippingCost: number;
  otherCost: number;
  grandTotal: number;
  customer: ICustomer;
  products: [ISoldProduct];
};

export type SellModel = Model<ISell, Record<string, unknown>>;

export type ISellFilters = {
  searchTerm?: string;
  _id?: string;
};

export type ISummary = {
  totalPurchased: number;
  totalSales: number;
  profitLoss: number;
  totalPurchasedProducts: number;
  totalSaleProducts: number;
};
