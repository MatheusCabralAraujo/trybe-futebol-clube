import { Router } from 'express';
import LoginController from '../controller/login.controller';

const LoginRouter = Router();

const loginController = new LoginController();

LoginRouter.post('/', loginController.checkUser);
LoginRouter.get('/validate', loginController.roleUser);

export default LoginRouter;
