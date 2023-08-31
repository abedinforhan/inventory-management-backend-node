import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { customerFilterableFields } from './customer.constant';
import { ICustomer } from './customer.interface';
import { CustomerServices } from './customer.service';

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const customerData = req.body;

  const result = await CustomerServices.createCustomer(customerData);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const getCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CustomerServices.getCustomers(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers fetched successfully',
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerServices.getSingleCustomer(id);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.params.id;
  const updatedData = req.body;

  const result = await CustomerServices.updateCustomer(customerId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.params.id;
  const result = await CustomerServices.deleteCustomer(customerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer deleted successfully',
    data: result,
  });
});

export const CustomerControllers = {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
