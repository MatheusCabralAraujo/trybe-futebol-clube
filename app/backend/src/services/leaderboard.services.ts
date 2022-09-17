import { HomeTeamCalculation,
  AwayTeamCalculation, FinalCalculation } from '../utils/LeaderBoardCalculation';
import MatchServices from './match.services';
import TeamsServices from './teams.services';
import { LeaderboardTeam } from '../interface/LeaderBoardTeamInterface';
import HomeTeam from '../utils/HomeTeam.utils';
import AwayTeam from '../utils/AwayTeam.utils';
// import FinalLeaderBoard from '../utils/FinalLeaderboard';
// import { FinalLeaderBoardInterface } from '../interface/FinalLeaderBoardInterface';

export default class LeaderboardServices {
  private teamsServices : TeamsServices;
  private matchServices : MatchServices;

  constructor() {
    this.teamsServices = new TeamsServices();
    this.matchServices = new MatchServices();
  }

  public getAll = async () => {
    // \/ \/ \/ \/ \/ Todos os times \/ \/ \/ \/ \/
    const allTeams = await this.teamsServices.getAll();

    // \/ \/ \/ \/ \/ Todos as partidas finalizadas \/ \/ \/ \/ \/
    const allFinishedMatches = await this.matchServices.findByFilter(false);

    const homeLeader: LeaderboardTeam[] = [];
    const awayLeader: LeaderboardTeam[] = [];

    allTeams.forEach((team) => {
      homeLeader.push(new HomeTeam(team.teamName));
    });
    allTeams.forEach((team) => {
      awayLeader.push(new AwayTeam(team.teamName));
    });

    HomeTeamCalculation(allFinishedMatches, homeLeader);
    AwayTeamCalculation(allFinishedMatches, awayLeader);
    FinalCalculation(homeLeader, awayLeader);
    return homeLeader;
  };
}
