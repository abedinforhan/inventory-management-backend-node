import { Schema, model } from 'mongoose';
import {
  IPurchase,
  IPurchasedProduct,
  ISupplier,
  PurchaseModel,
} from './purchase.interface';

const supplierSchema = new Schema<ISupplier>({
  name: {
    type: String,
    required: true,
  },
});

const purchasedProductSchema = new Schema<IPurchasedProduct>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  perUnitBuyingPrice: {
    type: Number,
    required: true,
  },
  perUnitSellingPrice: {
    type: Number,
    required: true,
  },
  perUnitMaxPrice: {
    type: Number,
    required: true,
  },
  buyingQuantity: {
    type: Number,
    required: true,
  },
  totalBuyingPrice: {
    type: Number,
    required: true,
  },
});

const purchaseSchema = new Schema<IPurchase, PurchaseModel>(
  {
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
    supplier: supplierSchema,
    products: [purchasedProductSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Purchase = model<IPurchase, PurchaseModel>(
  'Purchase',
  purchaseSchema
);
