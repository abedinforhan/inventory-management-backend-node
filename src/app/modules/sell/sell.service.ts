import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Summary } from '../summary/summary.model';
import { saleSearchableFields } from './sell.constant';
import { ISell, ISellFilters } from './sell.interface';
import { Sell } from './sell.model';

// const createSell = async (payload: ISell): Promise<ISell | null> => {
//   const result = await Sell.create(payload);

//   // Calculate the total sale amount and the total number of sold products
//   const totalSaleAmount = payload.products.reduce(
//     (total, product) => total + product.totalSellingPrice,
//     0
//   );

//   const totalSalesProduct = payload.products.length;

//   // Update the Summary model
//   await Summary.findOneAndUpdate(
//     {},
//     {
//       $inc: {
//         totalSale: totalSaleAmount,
//         totalSalesProduct: totalSalesProduct,
//       },
//     },
//     { upsert: true }
//   );

//   return result;
// };
const createSell = async (payload: ISell): Promise<ISell | null> => {
  const result = await Sell.create(payload);

  // Calculate the total sale amount and the total number of sold products
  const totalSaleAmount = payload.products.reduce(
    (total, product) => total + product.totalSellingPrice,
    0
  );

  const totalSalesProduct = payload.products.length;

  // Update the Summary model
  await Summary.findOneAndUpdate(
    {},
    {
      $inc: {
        totalSale: totalSaleAmount,
        totalSalesProduct: totalSalesProduct,
      },
    },
    { upsert: true }
  );

  return result;
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
