import { Schema, model } from 'mongoose';
import {
  IPurchaseSummary,
  PurchaseSummaryModel,
} from './purchaseSummary.interface';

const PurchaseSummarySchema = new Schema<
  IPurchaseSummary,
  PurchaseSummaryModel
>({
  vatTax: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  otherCost: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
});

export const PurchaseHistory = model<IPurchaseSummary, PurchaseSummaryModel>(
  'PurchaseSummary',
  PurchaseSummarySchema
);
