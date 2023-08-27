import mongoose, { SortOrder, Types } from 'mongoose';
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
  payload: {
    vatTax: number,
    shippingCost: number,
    otherCost: number,
    grandTotal: number,
    supplierId: Types.ObjectId,
    purchasedProducts: Array<any>  // Define a more specific type for products if you have one
  }
): Promise<Array<IPurchaseHistory> | null> => {
  const { vatTax, shippingCost, otherCost, grandTotal, supplierId, purchasedProducts } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  const createdHistories: Array<IPurchaseHistory> = [];

  try {
    for (const product of purchasedProducts) {
        const purchaseHistoryPayload = {
            productId: product.productId,
            supplierId,
            vatTax,
            shippingCost,
            otherCost,
            grandTotal,
            // purchaseId needs to be set if you need it
        };

        // Create purchase history for each product
        const purchaseHistory = new PurchaseHistory(purchaseHistoryPayload);
        await purchaseHistory.save({ session });
        
        // Validate if purchaseHistory is correctly populated
        if (!purchaseHistory || !purchaseHistory.productId) {
            throw new Error('PurchaseHistory creation failed.');
        }

        // Find and update the associated product
        const productDoc = await Product.findById(purchaseHistory.productId).session(session);
        
        if (!productDoc) {
            throw new Error('Product not found');
        }

        // You can place calculations related to the product here

        // Update product fields, if necessary
        productDoc.perUnitSellingPrice = product.perUnitSellingPrice;  // Or any calculated value
        productDoc.perUnitMaxPrice = product.perUnitMaxPrice;
        productDoc.buyingQuantity = product.buyingQuantity;

        await productDoc.save();

        createdHistories.push(purchaseHistory);
    }

    await session.commitTransaction();
    session.endSession();

    return createdHistories;
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
