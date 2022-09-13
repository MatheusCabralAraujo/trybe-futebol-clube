import { BOOLEAN, Model, INTEGER } from 'sequelize';
import Teams from '../../interface/Teams.interface';
import db from '.';
import TeamModel from './team.model';

class MatchesModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
  public teamHome!: Teams;
  public teamAway!: Teams;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(
  TeamModel,
  { foreignKey: 'homeTeam', as: 'teamHome' },
);
MatchesModel.belongsTo(
  TeamModel,
  { foreignKey: 'awayTeam', as: 'teamAway' },
);

TeamModel.hasMany(
  MatchesModel,
  { foreignKey: 'homeTeam', as: 'matchHomeTeam' },
);
TeamModel.hasMany(
  MatchesModel,
  { foreignKey: 'awayTeam', as: 'matchAwayTeam' },
);

export default MatchesModel;