import catchAsync from '../utils/catchAsync';
import User, { IUser } from '../models/userModel';

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
