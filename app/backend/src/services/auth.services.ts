import Login from '../interface/Login.interface';
import UsersModel from '../database/models/userModel';
import Jwt from '../utils/Jwt';
import { verifyDb } from '../utils/Cryptography';

class AuthService {
  verifyUser = async (login: Login): Promise<string> => {
    const user = await UsersModel.findOne({ where: { email: login.email } });

    if (!user) return 'Incorrect email or password';

    const matchPassword = await verifyDb(login.password, user.password);

    if (!matchPassword) return 'Incorrect email or password';

    const token = await Jwt.generateToken(user) as string;

    return token;
  };
}

export default AuthService;
