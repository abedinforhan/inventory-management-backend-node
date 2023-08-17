import { Schema, model } from 'mongoose';
import { gender } from './supplier.constant';
import { ISupplier, SupplierModel } from './supplier.interface';

export const SupplierSchema = new Schema<ISupplier, SupplierModel>(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Supplier = model<ISupplier, SupplierModel>(
  'Supplier',
  SupplierSchema
);
