import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { brandFilterableFields } from './brand.constant';
import { IBrand } from './brand.interface';
import { BrandServices } from './brand.service';

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const { ...brandData } = req.body;
  const result = await BrandServices.createBrand(brandData);

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

const getBrands = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, brandFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BrandServices.getBrands(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands fetched successfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const brandId = req.params.id;
  const updatedData = req.body;
  console.log(brandId, updatedData);
  const result = await BrandServices.updateBrand(brandId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand updated successfully',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const brandId = req.params.id;
  const result = await BrandServices.deleteBrand(brandId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand deleted successfully',
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
