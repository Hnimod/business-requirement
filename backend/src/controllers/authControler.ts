import {} from 'express';
import catchAsync from '../utils/catchAsync';
import User, { IUser } from '../models/userModel';

export const signup = catchAsync(async (req, res, next) => {
  const newUser: IUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
  });

  res.status(200).json({
    status: 'success',
    data: { newUser },
  });
});
