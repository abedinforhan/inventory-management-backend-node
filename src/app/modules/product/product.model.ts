import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

const productModel = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Brand',
    },
    unit: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Unit',
    },
    description: {
      type: String,
    },
    perUnitSellingPrice: {
      type: Number,
      default: 0,
    },
    perUnitMaxPrice: {
      type: Number,
      default: 0,
    },
    buyingQuantity: {
      type: Number,
      default: 0,
    },
    productImage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'out-stock',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct, ProductModel>('Product', productModel);
