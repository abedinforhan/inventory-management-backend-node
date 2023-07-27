import { Schema, model } from 'mongoose';
import { BrandModel, IBrand } from './brand.interface';

const BrandSchema = new Schema<IBrand, BrandModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Brand = model<IBrand, BrandModel>('Brand', BrandSchema);
