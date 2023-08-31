import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IPurchase } from './purchase.interface';
import { PurchaseServices } from './purchase.service';
import { purchasFilterableFields } from './purchaseconstant';

const createPurchase = catchAsync(async (req: Request, res: Response) => {
  const { ...purchaseData } = req.body;
  const result = await PurchaseServices.createPurchase(purchaseData);

  sendResponse<IPurchase>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchase is created successfully',
    data: result,
  });

  res.send(result);
});

const getPurchases = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, purchasFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await PurchaseServices.getPurchases(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchases fetched successfully',
    data: result,
  });
});

const getSinglePurchase = catchAsync(async (req: Request, res: Response) => {
  const { purchaseId } = req.params;
  const result = await PurchaseServices.getSinglePurchase(purchaseId);

  sendResponse<IPurchase>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchase fetched successfully',
    data: result,
  });
});

export const PurchaseControllers = {
  createPurchase,
  getPurchases,
  getSinglePurchase,
};
