import { Model } from 'mongoose';

export type IBrand = {
  name: string;
  description?: string;
};

export type BrandModel = Model<IBrand, Record<string, unknown>>;

export type IBandFilters = {
  searchTerm?: string;
  name?: string;
  country?: string;
};
