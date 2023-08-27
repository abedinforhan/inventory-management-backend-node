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
    images: {
      type: [String],
      required: true,
      default: '',
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
