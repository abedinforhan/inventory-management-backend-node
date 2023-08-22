// name,address?,email?,date,phone number, purchase history[],
import { Schema, model } from 'mongoose';
import { CustomerModel, ICustomer } from './customer.interface';
const customerSchema = new Schema<ICustomer, CustomerModel>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  purchaseHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PurchaseHistory',
      required: false,
    },
  ],
});

export const Customer = model<ICustomer, CustomerModel>(
  'Customer',
  customerSchema
);
