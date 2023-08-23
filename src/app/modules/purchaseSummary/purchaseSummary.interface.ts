import { Model } from 'mongoose';

export type IPurchaseSummary = {
  vatTax: number;
  shippingCost: number;
  otherCost: number;
  grandTotal: number;
};

export type PurchaseSummaryModel = Model<
  IPurchaseSummary,
  Record<string, unknown>
>;

export type IPurchaseSummaryFilters = {
  searchTerm?: string;
};
