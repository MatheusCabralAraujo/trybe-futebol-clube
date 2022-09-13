import { Request, Response } from 'express';
import TeamsServices from '../services/teams.services';

class TeamsController {
  constructor(private teamsServices = new TeamsServices()) { }

  public getAll = async (_req: Request, resp: Response) => {
    const teams = await this.teamsServices.getAll();
    return resp.status(200).json(teams);
  };
}

export default TeamsController;