import Teams from './Teams.interface';

interface Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Teams;
  teamAway: Teams;
}

export default Match;