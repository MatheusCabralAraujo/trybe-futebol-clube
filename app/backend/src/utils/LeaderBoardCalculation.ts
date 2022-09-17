import { LeaderboardTeam } from '../interface/LeaderBoardTeamInterface';
import Match from '../interface/Match.interface';

export const HomeTeamCalculation = (
  allFinishedMatches: Match[],
  homeLeader: LeaderboardTeam[],
)
: LeaderboardTeam[] => {
  allFinishedMatches.forEach((match) => {
    const { teamName } = match.teamHome;
    const indexQuery = (elemento: { name: string; }) => elemento.name === teamName;
    const id = homeLeader.findIndex(indexQuery);
    homeLeader[id].addTotalGames();
    homeLeader[id].addGoalsFavor(match.homeTeamGoals);
    homeLeader[id].addGoalsOwn(match.awayTeamGoals);
    homeLeader[id].verifyGameResult(match.homeTeamGoals, match.awayTeamGoals);
    homeLeader[id].addTotalPoints(homeLeader[id].totalVictories, homeLeader[id].totalDraws);
    homeLeader[id].addGoalsBalance(homeLeader[id].goalsFavor, homeLeader[id].goalsOwn);
  });
  return homeLeader as LeaderboardTeam[];
};

export const AwayTeamCalculation = (
  allFinishedMatches: Match[],
  awayLeader: LeaderboardTeam[],
)
: LeaderboardTeam[] => {
  allFinishedMatches.forEach((match) => {
    const { teamName } = match.teamAway;
    const indexQuery = (elemento: { name: string; }) => elemento.name === teamName;
    const id = awayLeader.findIndex(indexQuery);
    awayLeader[id].addTotalGames();
    awayLeader[id].addGoalsFavor(match.awayTeamGoals);
    awayLeader[id].addGoalsOwn(match.homeTeamGoals);
    awayLeader[id].verifyGameResult(match.homeTeamGoals, match.awayTeamGoals);
    awayLeader[id].addTotalPoints(awayLeader[id].totalVictories, awayLeader[id].totalDraws);
    awayLeader[id].addGoalsBalance(awayLeader[id].goalsFavor, awayLeader[id].goalsOwn);
  });
  return awayLeader as LeaderboardTeam[];
};

type Properties = {
  teamLeaderboard: LeaderboardTeam;
  awayLeader: LeaderboardTeam[];
  id: number
};

const addProperties = (properties : Properties) => {
  const { teamLeaderboard, awayLeader, id } = properties;

  teamLeaderboard.totalPoints += awayLeader[id].totalPoints;
  teamLeaderboard.totalGames += awayLeader[id].totalGames;
  teamLeaderboard.totalVictories += awayLeader[id].totalVictories;
  teamLeaderboard.totalDraws += awayLeader[id].totalDraws;
  teamLeaderboard.totalLosses += awayLeader[id].totalLosses;
  teamLeaderboard.goalsFavor += awayLeader[id].goalsFavor;
  teamLeaderboard.goalsOwn += awayLeader[id].goalsOwn;
  teamLeaderboard.goalsBalance += awayLeader[id].goalsBalance;
  teamLeaderboard.addEfficiency(teamLeaderboard.totalPoints, teamLeaderboard.totalGames);
};

const sortLeader = (homeLeader: LeaderboardTeam[]) => {
  homeLeader.sort((b, a) => b.goalsOwn - a.goalsOwn)
    .sort((b, a) => a.goalsFavor - b.goalsFavor)
    .sort((b, a) => a.goalsBalance - b.goalsBalance)
    .sort((b, a) => a.totalVictories - b.totalVictories)
    .sort((b, a) => a.totalPoints - b.totalPoints);
};

export const FinalCalculation = (
  homeLeader: LeaderboardTeam[],
  awayLeader: LeaderboardTeam[],
)
: LeaderboardTeam[] => {
  homeLeader.forEach((teamHomeLeader) => {
    const teamLeaderboard = teamHomeLeader;
    const { name } = teamLeaderboard;
    const indexQuery = (awayTeam: { name: string; }) => awayTeam.name === name;
    const id = awayLeader.findIndex(indexQuery);
    addProperties({ teamLeaderboard, awayLeader, id });
  });
  sortLeader(homeLeader);
  return homeLeader as LeaderboardTeam[];
};
