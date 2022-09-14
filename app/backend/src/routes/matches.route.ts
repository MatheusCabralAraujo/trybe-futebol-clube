import { Router } from 'express';
import MatchController from '../controller/match.controller';
import ValidateToken from '../middleware/validation.middleware';

const MatchRouter = Router();

const matchController = new MatchController();
const validateToken = new ValidateToken();

MatchRouter.get('/', matchController.getAll);
MatchRouter.post('/', validateToken.tokenValidation, matchController.create);
MatchRouter.patch('/:id/finish', matchController.patch);
MatchRouter.patch('/:id/', matchController.patchGoals);

export default MatchRouter;