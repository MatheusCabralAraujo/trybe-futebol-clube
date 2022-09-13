import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/matches.model';
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
}

export default MatchServices;
