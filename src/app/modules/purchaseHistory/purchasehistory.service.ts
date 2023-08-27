import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Product } from '../product/product.model';
import { purchaseHistorySearchableFields } from './purchaseHistory.constant';
import {
  IPurchaseHistory,
  IPurchaseHistoryFilters,
} from './purchaseHistory.interface';
import { PurchaseHistory } from './purchaseHistory.model';

const createPurchaseHistory = async (
  payload: IPurchaseHistory
): Promise<IPurchaseHistory | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create purchase history
    const [purchaseHistory] = await PurchaseHistory.create(payload, {
      session,
    });
    // Find and update the associated product
    const product = await Product.findById(
      (purchaseHistory as IPurchaseHistory).productId
    ).session(session);

    if (!product) {
      throw new Error('Product not found');
    }

    // Perform calculations based on purchase history
    const newSellingPrice = 0;
    const newMaxPrice = 0;
    const newBuyingQuantity = 0;

    // Update product fields
    product.perUnitSellingPrice = newSellingPrice;
    product.perUnitMaxPrice = newMaxPrice;
    product.buyingQuantity = newBuyingQuantity;

    await product.save();

    await session.commitTransaction();
    session.endSession();

    return purchaseHistory;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getPurchaseHistories = async (
  filters: IPurchaseHistoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPurchaseHistory[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: purchaseHistorySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fulfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic Sort needs a field to do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await PurchaseHistory.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await PurchaseHistory.countDocuments(whereConditions);
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

export const PurchaseHistoryServices = {
  createPurchaseHistory,
  getPurchaseHistories,
};
