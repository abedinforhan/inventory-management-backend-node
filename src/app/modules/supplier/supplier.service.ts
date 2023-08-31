import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { supplierSearchableFields } from './supplier.constant';
import { ISupplier, ISupplierFilters } from './supplier.interface';
import { Supplier } from './supplier.model';

const createSupplier = async (
  payload: ISupplier
): Promise<ISupplier | null> => {
  const result = await Supplier.create(payload);
  return result;
};

const getAllSuppliers = async (
  filters: ISupplierFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISupplier[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: supplierSearchableFields.map(field => ({
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

  const result = await Supplier.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('brand');

  // total count
  const total = await Supplier.countDocuments(whereConditions);

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

const getSingleSupplier = async (id: string): Promise<ISupplier | null> => {
  const result = await Supplier.findById(id).populate('brand');
  return result;
};

const updateSupplier = async (
  id: string,
  payload: Partial<ISupplier>
): Promise<ISupplier | null> => {
  const isExist = await Supplier.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier not found !');
  }

  const result = await Supplier.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSupplier = async (id: string): Promise<ISupplier | null> => {
  // check if the student is exist
  const isExist = await Supplier.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier  not found !');
  }
  const result = await Supplier.findByIdAndDelete(id);
  return result;
};

export const SupplierService = {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};
