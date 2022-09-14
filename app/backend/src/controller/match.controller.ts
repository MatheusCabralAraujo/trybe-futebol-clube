import { Request, Response } from 'express';
import GeneralValidations from '../utils/validations.utils';
import MatchServices from '../services/match.services';

class MatchController {
  private matchServices: MatchServices;
  private generalValidations: GeneralValidations;
  
  constructor() {
    this.matchServices = new MatchServices();
    this.generalValidations = new GeneralValidations();
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
public create = async (req: Request, resp: Response) => {
  const { body } = req;
  body.inProgress = true;

  const equalTeams = await this.generalValidations.equalTeams(body);
  if (equalTeams) {
    const { status, message } = equalTeams;
    return resp.status(status).json({ message });
  }

  const teamsExists = await this.generalValidations.validateTeams(body);
  if (teamsExists) {
    const { status, message } = teamsExists;
    return resp.status(status).json({ message });
  }

  const create = await this.matchServices.create(body);

  return resp.status(201).json(create);
};

  public patch = async (req: Request, resp: Response) => {
    const { id } = req.params;
    const updatedMatch = await this.matchServices.patch(+id);
    if (updatedMatch) {
      resp.status(200).json({ message: 'Finished' });
    }
  };

  public patchGoals = async (req: Request, resp: Response) => {
    const { params, body } = req;
    const { id } = params;
    const matchGoal = await this.matchServices.patchGoals(+id, body);
    if (matchGoal) {
      resp.status(200).json({ message: 'Gol do Bragantino!' });
    }
  };
}

export default MatchController;