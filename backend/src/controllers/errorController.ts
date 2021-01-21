import express from 'express';
import AppError from '../utils/appError';

const errorController = (
  err: AppError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    // error: err,
    // stack: err.stack,
    message: err.message,
  });
};

export default errorController;
