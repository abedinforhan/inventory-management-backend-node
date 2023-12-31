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
    contactNo1: {
      type: String,
      required: true,
    },
    contactNo2: {
      type: String,
      required: false,
    },
    shippingAddress: {
      type: String,
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
