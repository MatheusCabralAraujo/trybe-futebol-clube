import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.services';

class LeaderboardController {
  private leaderboardServices: LeaderboardServices;

  constructor() {
    this.leaderboardServices = new LeaderboardServices();
  }

  public getAll = async (_req: Request, resp: Response) => {
    const leaderboard = await this.leaderboardServices.getAll();
    return resp.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
