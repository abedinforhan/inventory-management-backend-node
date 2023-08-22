import { Model } from 'mongoose';

export type IUnit = {
  name: string;
};

export type UnitModel = Model<IUnit, Record<string, unknown>>;

export type IUnitFilters = {
  searchTerm?: string;
  name?: string;
};
