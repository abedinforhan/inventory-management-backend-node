import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { Summary } from '../summary/summary.model';
import { customerSearchableFields } from './customer.constant';
import { ICustomer, ICustomerFilters } from './customer.interface';
import { Customer } from './customer.model';

const createCustomer = async (
  payload: ICustomer
): Promise<ICustomer | null> => {
  // Create the customer
  const result = await Customer.create(payload);

  // Update the totalCustomer field in the Summary model
  try {
    const summary = await Summary.findOne();

    if (summary) {
      summary.totalCustomer += 1; // Increment the totalCustomer field
      await summary.save(); // Save the updated summary document
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error('Error updating totalCustomer in Summary:', error);
    throw error;
  }

  return result;
};
const getCustomers = async (
  filters: ICustomerFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICustomer[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: customerSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Customer.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Customer.countDocuments(whereConditions);

  // calculate the page
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleCustomer = async (id: string): Promise<ICustomer | null> => {
  return await Customer.findById(id);
};

const updateCustomer = async (
  id: string,
  payload: Partial<ICustomer>
): Promise<ICustomer | null> => {
  return await Customer.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
  return await Customer.findByIdAndDelete(id);
};

export const CustomerServices = {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
