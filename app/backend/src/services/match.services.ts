import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/matches.model';
import MatchCreation from '../interface/MatchCreation.interface';
import Match from '../interface/Match.interface';

class MatchServices {
  getAll = async (): Promise<Match[]> => {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  findByFilter = async (params: boolean): Promise<Match[]> => {
    const filteredMatches = await MatchesModel.findAll({
      where: { inProgress: params },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return filteredMatches;
  };

  create = async (body: MatchCreation): Promise<Match> => {
    const matchCreated = await MatchesModel.create(body);
    return matchCreated;
  };

}

export default MatchServices;
