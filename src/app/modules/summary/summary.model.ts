import { Schema, model } from 'mongoose';

export type ISummary = {
  totalPurchaseAmount: number;
  totalSaleAmount: number;
  totalPurchasedProduct: number;
  totalSalesProduct: number;
  profitLoss: number;
  totalPurchaseInvoices: number;
  totalSaleInvoices: number;
  totalCustomer: number;
  totalSupplier: number;
};

const summarySchema = new Schema<ISummary>(
  {
    totalPurchaseAmount: {
      type: Number,
      default: 0,
    },
    totalSaleAmount: {
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
    totalPurchaseInvoices: {
      type: Number,
      default: 0,
    },
    totalSaleInvoices: {
      type: Number,
      default: 0,
    },
    totalCustomer: {
      type: Number,
      default: 0,
    },
    totalSupplier: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Summary = model<ISummary>('Summary', summarySchema);
