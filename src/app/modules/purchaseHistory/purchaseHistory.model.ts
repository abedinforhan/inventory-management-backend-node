import { Schema, model } from 'mongoose';
import {
  IPurchaseHistory,
  PurchaseHistoryModel,
} from './purchaseHistory.interface';

const PurchaseHistorySchema = new Schema<
  IPurchaseHistory,
  PurchaseHistoryModel
>(
  {
    purchaseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Purchase',
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Supplier',
    },
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
  },
  {
    timestamps: true,
  }
);

export const PurchaseHistory = model<IPurchaseHistory, PurchaseHistoryModel>(
  'PurchaseHistory',
  PurchaseHistorySchema
);
