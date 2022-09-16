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
