import { Secret, sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';
import User from '../interface/User.interface';
import ValidationsError from '../middleware/error';

const generateToken = (user: User): string => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  } as SignOptions;
  const privateKey = 'jwt_secret' as Secret;
  const { username, role, email, password } = user as User;
  const token = sign({ username, role, email, password }, privateKey, jwtConfig);
  return token;
};

const secret: Secret = 'jwt_secret';

const validateToken = (token: string): JwtPayload => {
  try {
    const response = verify(token, secret);
    return response as JwtPayload;
  } catch (_err) {
    throw new ValidationsError(401, 'Token must be a valid token');
  }
};

export default { generateToken, validateToken };
