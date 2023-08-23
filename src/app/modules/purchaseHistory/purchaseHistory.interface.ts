import { Model, Types } from 'mongoose';

export type IPurchaseHistory = {
  purchaseId: Types.ObjectId;
  supplierId: Types.ObjectId;
  productId: Types.ObjectId;
  vatTax: number;
  shippingCost: number;
  otherCost: number;
  grandTotal: number;
  quantity: number;
  unitPrice: number;
};

export type PurchaseHistoryModel = Model<
  IPurchaseHistory,
  Record<string, unknown>
>;

export type IPurchaseHistoryFilters = {
  searchTerm?: string;
};
