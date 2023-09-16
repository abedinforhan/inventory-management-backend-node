import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { brandSearchableFields } from './brand.constant';
import { Brand } from './brand.model';
import { IBandFilters, IBrand } from './profile.interface';

const createBrand = async (payload: IBrand): Promise<IBrand | null> => {
  const result = await Brand.create(payload);
  return result;
};

const getBrands = async (
  filters: IBandFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBrand[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: brandSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Brand.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Brand.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBrand = async (
  id: string,
  payload: Partial<IBrand>
): Promise<IBrand | null> => {
  const result = await Brand.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBrand = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findByIdAndDelete(id);
  return result;
};

export const BrandServices = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
