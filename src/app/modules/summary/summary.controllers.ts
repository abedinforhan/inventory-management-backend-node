import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { SummaryService } from './summary.services';

const calculateSummary = async (req: Request, res: Response) => {
  try {
    const summary = await SummaryService.calculateSummary();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Summary calculated successfully',
      data: summary,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Error calculating summary',
      //   error: error.message,
    });
  }
};

export const SummaryController = {
  calculateSummary,
};
