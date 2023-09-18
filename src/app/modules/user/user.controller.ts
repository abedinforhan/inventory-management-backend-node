import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    console.log(userData);
    const result = await UserService.createUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  }
);

const getLastUserID: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { role } = req.query;
    const result = await UserService.getLastUserId(role as string);

    sendResponse<string>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Last user ID is fetched successfully!',
      data: result,
    });
  }
);

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is fetched successfully!',
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await UserService.updateSingleUser(id, updateData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated successfully!',
    data: result,
  });
});

export const UserController = {
  createUser,
  getLastUserID,
  getSingleUser,
  updateSingleUser,
};
