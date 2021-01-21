/* eslint-disable */
import { Request, Response, NextFunction } from 'express';

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
