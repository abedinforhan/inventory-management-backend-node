import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Product } from '../product/product.model';
import { Summary } from '../summary/summary.model';
import { IPurchase, IPurchaseFilters } from './purchase.interface';
import { Purchase } from './purchase.model';
import { purchaseSearchableFields } from './purchaseconstant';

const createPurchase = async (
  payload: IPurchase
): Promise<IPurchase | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { products, grandTotal } = payload;

  try {
    const newPurchase = await Purchase.create([payload], {
      session,
    });

    for (const pd of products) {
      const { id, buyingQuantity, perUnitSellingPrice, perUnitMaxPrice } = pd;

      const existingProduct = await Product.findById(id).session(session);

      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      existingProduct.buyingQuantity += buyingQuantity;

      existingProduct.perUnitMaxPrice = perUnitMaxPrice;
      existingProduct.perUnitSellingPrice = perUnitSellingPrice;

      await existingProduct.save();
    }

    const totalPurchase = grandTotal;
    // Calculate totalPurchasedProduct (sum of all product quantities)
    const totalPurchasedProduct = products.reduce(
      (total, pd) => total + pd.buyingQuantity,
      0
    );

    // Update or create the summary document
    let summary = await Summary.findOne().session(session);

    if (summary) {
      // Update the existing summary
      summary.totalPurchase += totalPurchase;
      summary.totalPurchasedProduct += totalPurchasedProduct;
    } else {
      // Create a new summary if it doesn't exist
      summary = new Summary({
        totalPurchase,
        totalPurchasedProduct,
      });
      await summary.save();
    }

    await session.commitTransaction();
    return newPurchase[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getPurchases = async (
  filters: IPurchaseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPurchase[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: purchaseSearchableFields.map(field => ({
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

  const result = await Purchase.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Purchase.countDocuments(whereConditions);
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

const getSinglePurchase = async (id: string): Promise<IPurchase | null> => {
  const result = await Purchase.findById(id);
  return result;
};

export const PurchaseServices = {
  createPurchase,
  getPurchases,
  getSinglePurchase,
};
