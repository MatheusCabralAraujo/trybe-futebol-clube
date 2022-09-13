import { TEAM_NOTFOUND } from '../utils/constants.utils';
import ValidationsError from '../middleware/error';
import TeamModel from '../database/models/team.model';
import Teams from '../interface/Teams.interface';

class TeamsServices {
  getAll = async (): Promise<Teams[]> => {
    const teams = await TeamModel.findAll();
    return teams;
  };

  getById = async (id: number): Promise<Teams> => {
    const teamById = await TeamModel.findOne({ where: { id } });

    if (teamById) return teamById;

    throw new ValidationsError(400, TEAM_NOTFOUND);
  };
}

export default TeamsServices;
