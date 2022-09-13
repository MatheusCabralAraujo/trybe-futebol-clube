import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const TeamsRouter = Router();

const teamsController = new TeamsController();

TeamsRouter.get('/', teamsController.getAll);

export default TeamsRouter;