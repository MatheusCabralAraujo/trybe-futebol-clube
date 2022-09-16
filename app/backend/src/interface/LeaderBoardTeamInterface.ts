export interface LeaderboardTeam {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  addTotalPoints(totalVictories: number, totalDraws: number): number
  addTotalGames() : number;
  addVictory() : number;
  addDraws() : number;
  addLosses() : number;
  verifyGameResult(homeTeamGoals: number, awayTeamGoals: number): void;
  addGoalsFavor(homeTeamGoals: number) : number;
  addGoalsOwn(awayTeamGoals: number) : number;
  addGoalsBalance(goalsFavor:number, goalsOwn: number): number;
  addEfficiency(totalPoints: number, totalGames: number) : number;
}
