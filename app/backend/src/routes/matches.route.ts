import { Router } from 'express';
import MatchController from '../controller/match.controller';

const MatchRouter = Router();

const matchController = new MatchController();

MatchRouter.get('/', matchController.getAll);

export default MatchRouter;