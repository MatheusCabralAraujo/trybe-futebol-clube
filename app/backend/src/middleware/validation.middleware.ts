import { Request, Response, NextFunction } from 'express';
import ValidationsError from './error';
import Jwt from '../utils/Jwt';

export default class ValidateToken {
  public tokenValidation = async (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ValidationsError(401, 'Token not Found');
    }

    Jwt.validateToken(authorization);

    next();
  };
}
