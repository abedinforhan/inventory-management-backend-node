import { Model, Types } from 'mongoose';

export type ISupplier = {
  id: Types.ObjectId;
  name: string;
};

export type IPurchasedProduct = {
  id: Types.ObjectId;
  name: string;
  brand: string;
  category: string;
  unit: string;
  perUnitBuyingPrice: number;
  perUnitSellingPrice: number;
  perUnitMaxPrice: number;
  buyingQuantity: number;
  totalBuyingPrice: number;
};

export type IPurchase = {
  vatTax: number;
  shippingCost: number;
  otherCost: number;
  grandTotal: number;
  supplier: ISupplier;
  products: [IPurchasedProduct];
};

export type PurchaseModel = Model<IPurchase, Record<string, unknown>>;

export type IPurchaseFilters = {
  searchTerm?: string;
  _id?: string;
};
