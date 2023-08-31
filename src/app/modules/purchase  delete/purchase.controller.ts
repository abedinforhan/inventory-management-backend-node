import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { purchasProductFilterableFields } from './purchase.constant';
import { IPurchaseProduct } from './purchase.interface';
import { PurchaseProductService } from './purchase.service';

const getPurchasedProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, purchasProductFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await PurchaseProductService.getPurchasedProducts(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchased products fetched successfully',
    data: result,
  });
});

const getSinglePurchasedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { purchaseId } = req.params;
    const result = await PurchaseProductService.getSinglePurchasedProducts(
      purchaseId
    );

    sendResponse<IPurchaseProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  }
);

export const PurchaseProductControllers = {
  getPurchasedProducts,
  getSinglePurchasedProducts,
};
