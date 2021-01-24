import catchAsync from '../utils/catchAsync';
import User, { IUser } from '../models/userModel';
import AppError from '../utils/appError';

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return next(new AppError('Email already exist', 409));

  console.log(req.file);

  const newUser: IUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    species: req.body.species,
    race: req.body.race,
    born: req.body.born,
    homeworld: req.body.homeworld,
    timeline: req.body.timeline,
    gender: req.body.gender,
    height: req.body.height,
    mass: req.body.mass,
    avatar: (req as any).file.location,
  });

  res.status(200).json({
    status: 'success',
    newUser,
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    nbResults: users.length,
    users,
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
    user,
  });
});
