import { Response } from 'express';
import { string } from 'zod';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data?: T | null | string;
};

const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined || string,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
