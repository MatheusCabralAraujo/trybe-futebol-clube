import { LeaderboardTeam } from '../interface/LeaderBoardTeamInterface';

export default class TimeDaCasa implements LeaderboardTeam {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  addTotalGames(): number {
    this.totalGames += 1;
    return this.totalGames;
  }

  addGoalsFavor(awayTeamGoals: number): number {
    this.goalsFavor += awayTeamGoals;
    return this.goalsFavor;
  }

  addGoalsOwn(homeTeamGoals: number): number {
    this.goalsOwn += homeTeamGoals;
    return this.goalsOwn;
  }

  verifyGameResult(homeTeamGoals: number, awayTeamGoals: number): void {
    if (homeTeamGoals < awayTeamGoals) this.addVictory();
    if (homeTeamGoals === awayTeamGoals) this.addDraws();
    else this.addLosses();
  }

  addVictory(): number {
    this.totalVictories += 1;
    return this.totalVictories;
  }

  addDraws(): number {
    this.totalDraws += 1;
    return this.totalDraws;
  }

  addLosses(): number {
    this.totalLosses += 1;
    return this.totalLosses;
  }

  addTotalPoints(totalVictories: number, totalDraws: number): number {
    const points = (totalVictories * 3) + totalDraws;
    this.totalPoints = points;
    return this.totalPoints;
  }

  addGoalsBalance(goalsFavor: number, goalsOwn: number): number {
    this.goalsBalance = goalsFavor - goalsOwn;
    return this.totalPoints;
  }

  addEfficiency(totalPoints: number, totalGames: number): number {
    const calculus = (totalPoints / (totalGames * 3)) * 100;
    calculus.toFixed(2);
    this.efficiency = calculus;
    return this.efficiency;
  }
}
