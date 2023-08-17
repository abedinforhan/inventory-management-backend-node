import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { purchaseHistoryFilterableFields } from './purchaseHistory.constant';
import { IPurchaseHistory } from './purchaseHistory.interface';
import { PurchaseHistoryServices } from './purchasehistory.service';

const createPurchaseHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { ...purchaseHistoryData } = req.body;
    const result = await PurchaseHistoryServices.createPurchaseHistory(
      purchaseHistoryData
    );

    sendResponse<IPurchaseHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Purchase History is created successfully',
      data: result,
    });
  }
);

const getPurchaseHistories = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, purchaseHistoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PurchaseHistoryServices.getPurchaseHistories(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchase histories fetched successfully',
    data: result,
  });
});

export const PurchaseHistoryControllers = {
  createPurchaseHistory,
  getPurchaseHistories,
};
