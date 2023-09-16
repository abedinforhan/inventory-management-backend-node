import { Schema, model } from 'mongoose';

export type ISummary = {
  totalPurchaseAmount: number;
  totalSale: number;
  totalPurchasedProduct: number;
  totalSalesProduct: number;
  profitLoss: number;
};

const summarySchema = new Schema<ISummary>(
  {
    totalPurchaseAmount: {
      type: Number,
      default: 0,
    },
    totalSale: {
      type: Number,
      default: 0,
    },
    totalPurchasedProduct: {
      type: Number,
      default: 0,
    },
    totalSalesProduct: {
      type: Number,
      default: 0,
    },
    profitLoss: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Summary = model<ISummary>('Summary', summarySchema);
