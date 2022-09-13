import { Request, Response } from 'express';
import ValidationsError from '../middleware/error';
import Jwt from '../utils/Jwt';
import AuthService from '../services/auth.services';
import Login from '../interface/Login.interface';
import { EMPTY_FIELD, INCORRECT_FIELD } from '../utils/constants.utils';

class LoginController {
  constructor(private authService = new AuthService()) {}

  public checkUser = async (req: Request, resp: Response) => {
    const login = req.body;
    const { email, password } = login;

    if (!email || !password) return resp.status(400).json({ message: EMPTY_FIELD });

    const token = await this.authService.verifyUser(login as Login);

    if (token === INCORRECT_FIELD) {
      return resp.status(401).json({ message: INCORRECT_FIELD });
    }

    return resp.status(200).json({ token });
  };

  public roleUser = async (req: Request, resp: Response) => {
    try {
      const { authorization } = req.headers;

      if (authorization) {
        const result = await Jwt.validateToken(authorization);
        const { role } = result;
        return resp.status(200).json({ message: role });
      }
    } catch (_error) {
      throw new ValidationsError(400, 'Invalid Authorization');
    }
  };
}

export default LoginController;
