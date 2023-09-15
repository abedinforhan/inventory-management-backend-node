import { Schema, model } from 'mongoose';
import { ICustomer, ISell, ISoldProduct, SellModel } from './sell.interface';

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
  },
});

const soldProductSchema = new Schema<ISoldProduct>({
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
  perUnitSellingPrice: {
    type: Number,
    required: true,
  },
  sellingQuantity: {
    type: Number,
    required: true,
  },
  totalSellingPrice: {
    type: Number,
    required: true,
  },
});

const sellSchema = new Schema<ISell, SellModel>(
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
    customer: CustomerSchema,
    products: [soldProductSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Sell = model<ISell, SellModel>('Sell', sellSchema);
