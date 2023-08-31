import { Schema, model } from 'mongoose';
import { CustomerModel, ICustomer } from './customer.interface';
const customerSchema = new Schema<ICustomer, CustomerModel>(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: false,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      enum: [
        'Dhaka',
        'Chattogram',
        'Khulna',
        'Rajshahi',
        'Barisal',
        'Sylhet',
        'Rangpur',
        'Comilla',
        'Mymensingh',
      ],
    },
    zipCode: {
      type: Number,
      required: true,
    },
    profileImage: {
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

export const Customer = model<ICustomer, CustomerModel>(
  'Customer',
  customerSchema
);
