import { Request, Response } from 'express';

import MatchServices from '../services/match.services';

class MatchController {
  private matchServices: MatchServices;

  
  constructor() {
    this.matchServices = new MatchServices();
}

public getAll = async (req: Request, resp: Response) => {
  const { inProgress } = req.query;
  if (typeof inProgress === 'string') {
    const verifyType = inProgress.toLowerCase() === 'true';
    const requestedMatch = await this.matchServices.findByFilter(verifyType);
    return resp.status(200).json(requestedMatch);
  }
  const matches = await this.matchServices.getAll();
  return resp.status(200).json(matches);
};
}

export default MatchController;