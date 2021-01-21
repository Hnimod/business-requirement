import catchAsync from '../utils/catchAsync';
import User, { IUser } from '../models/userModel';
import AppError from '../utils/appError';

export const signup = catchAsync(async (req, res, next) => {
  const newUser: IUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    species: req.body.species,
    race: req.body.race,
    born: req.body.born,
    homeworld: req.body.homeworld,
    gender: req.body.gender,
    height: req.body.height,
    mass: req.body.mass,
    avatar: req.body.avatar,
  });

  res.status(200).json({
    status: 'success',
    data: { newUser },
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: { nbResults: users.length, users },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('Could not find the document with that ID', 404));
  }
  res.status(204).json({});
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('Could not find the document with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
