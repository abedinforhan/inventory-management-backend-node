import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Product } from '../product/product.model';
import { Summary } from '../summary/summary.model';
import { saleSearchableFields } from './sell.constant';
import { ISell, ISellFilters } from './sell.interface';
import { Sell } from './sell.model';

const createSell = async (payload: ISell): Promise<ISell | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { products, grandTotal } = payload;
  //calculate total purchased products quantity
  let totalSalesProduct = 0;

  try {
    const newPurchase = await Sell.create([payload], {
      session,
    });

    for (const pd of products) {
      const { id, sellingQuantity } = pd;

      const existingProduct = await Product.findById(id).session(session);

      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      // decrement  to calculate purchased products quantity
      existingProduct.buyingQuantity -= sellingQuantity;
      totalSalesProduct += sellingQuantity;

      await existingProduct.save();
    }

    // Update the Summary model
    const existingSummary = await Summary.findOne({}).session(session);

    if (existingSummary) {
      existingSummary.totalSaleAmount += grandTotal;
      existingSummary.totalSaleInvoices += 1;
      existingSummary.totalSalesProduct += totalSalesProduct;

      await existingSummary.save();
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

const getSales = async (
  filters: ISellFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISell[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: saleSearchableFields.map(field => ({
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

  const result = await Sell.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Sell.countDocuments(whereConditions);
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

const getSingleSell = async (id: string): Promise<ISell | null> => {
  const result = await Sell.findById(id);
  return result;
};

export const SellServices = {
  createSell,
  getSales,
  getSingleSell,
};
