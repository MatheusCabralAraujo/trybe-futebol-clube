import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const LeaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

LeaderboardRouter.get('/', leaderboardController.getAll);
LeaderboardRouter.get('/home', leaderboardController.filterByHomeTeam);

export default LeaderboardRouter;
