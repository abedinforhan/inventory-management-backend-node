import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { supplierFilterableFields } from './supplier.constant';
import { ISupplier } from './supplier.interface';
import { SupplierService } from './supplier.service';

const createSupplier = catchAsync(async (req: Request, res: Response) => {
  const { ...supplierData } = req.body;
  const result = await SupplierService.createSupplier(supplierData);

  sendResponse<ISupplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier created successfully !',
    data: result,
  });
});

const getSingleSupplier = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SupplierService.getSingleSupplier(id);

  sendResponse<ISupplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier fetched successfully !',
    data: result,
  });
});

const getAllSuppliers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, supplierFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SupplierService.getAllSuppliers(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Suppliers fetched successfully !',
    data: result,
  });
});

const updateSupplier = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await SupplierService.updateSupplier(id, updatedData);

  sendResponse<ISupplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier updated successfully !',
    data: result,
  });
});

const deleteSupplier = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SupplierService.deleteSupplier(id);

  sendResponse<ISupplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier is deleted successfully !',
    data: result,
  });
});

export const supplierController = {
  createSupplier,
  getSingleSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
};
