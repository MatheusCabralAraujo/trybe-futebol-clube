import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ValidationsError from './error';

const HandleErr: ErrorRequestHandler = (
  error: ValidationsError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { message, status } = error;
  return res.status(status).json({ message });
};

export default HandleErr;
