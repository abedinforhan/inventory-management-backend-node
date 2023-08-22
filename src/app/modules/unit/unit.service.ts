import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { unitSearchableFields } from './unit.constant';
import { IUnit, IUnitFilters } from './unit.interface';
import { Unit } from './unit.model';

const createUnit = async (payload: IUnit): Promise<IUnit | null> => {
  const result = await Unit.create(payload);
  return result;
};

const getUnits = async (
  filters: IUnitFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUnit[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: unitSearchableFields.map(field => ({
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

  const result = await Unit.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Unit.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUnit = async (
  id: string,
  payload: Partial<IUnit>
): Promise<IUnit | null> => {
  const result = await Unit.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUnit = async (id: string): Promise<IUnit | null> => {
  const result = await Unit.findByIdAndDelete(id);
  return result;
};

export const UnitServices = {
  createUnit,
  getUnits,
  updateUnit,
  deleteUnit,
};
