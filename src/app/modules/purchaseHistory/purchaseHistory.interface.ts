import { Model, Types } from 'mongoose';
import { IProduct } from '../product/product.interface';

export type IPurchaseHistory = {
  purchasePrice: number;
  purchaseId: Types.ObjectId;
  supplierId: Types.ObjectId;
  vatTax: number;
  shippingCost: number;
  otherCost: number;
  grandTotal: number;
  productId: Types.ObjectId | IProduct;
};

export type PurchaseHistoryModel = Model<
  IPurchaseHistory,
  Record<string, unknown>
>;

export type IPurchaseHistoryFilters = {
  searchTerm?: string;
};
