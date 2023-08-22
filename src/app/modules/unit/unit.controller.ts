import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { unitFilterableFields } from './unit.constant';
import { IUnit } from './unit.interface';
import { UnitServices } from './unit.service';

const createUnit = catchAsync(async (req: Request, res: Response) => {
  const { ...unitData } = req.body;
  const result = await UnitServices.createUnit(unitData);

  sendResponse<IUnit>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit created successfully',
    data: result,
  });
});

const getUnits = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, unitFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UnitServices.getUnits(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Units fetched successfully',
    data: result,
  });
});

const updateUnit = catchAsync(async (req: Request, res: Response) => {
  const unitId = req.params.id;
  const updatedData = req.body;

  const result = await UnitServices.updateUnit(unitId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit updated successfully',
    data: result,
  });
});

const deleteUnit = catchAsync(async (req: Request, res: Response) => {
  const brandId = req.params.id;
  const result = await UnitServices.deleteUnit(brandId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit deleted successfully',
    data: result,
  });
});

export const UnitControllers = {
  createUnit,
  getUnits,
  updateUnit,
  deleteUnit,
};
