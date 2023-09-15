import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { SummaryService } from './summary.services';

const getSummary = async (req: Request, res: Response) => {
  try {
    const summary = await SummaryService.getSummary();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Summary fetched successfully',
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
  getSummary,
};
