import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { saleFilterableFields } from './sell.constant';
import { ISell } from './sell.interface';
import { SellServices } from './sell.service';

const createSell = catchAsync(async (req: Request, res: Response) => {
  const { ...sellData } = req.body;
  const result = await SellServices.createSell(sellData);

  sendResponse<ISell>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale is created successfully',
    data: result,
  });

  res.send(result);
});

const getSales = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, saleFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await SellServices.getSales(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales fetched successfully',
    data: result,
  });
});

const getSingleSale = catchAsync(async (req: Request, res: Response) => {
  const { sellId } = req.params;
  const result = await SellServices.getSingleSell(sellId);

  sendResponse<ISell>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales fetched successfully',
    data: result,
  });
});

export const SaleControllers = {
  createSell,
  getSales,
  getSingleSale,
};
