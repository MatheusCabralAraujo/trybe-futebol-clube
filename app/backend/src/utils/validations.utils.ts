import Joi = require('joi');
import ValidationsError from '../middleware/error';
import TeamModel from '../database/models/team.model';
import MatchCreation from '../interface/MatchCreation.interface';
import { INVALID_ID } from './constants.utils';

export default class GeneralValidations {
  public equalTeams = async (body: MatchCreation) => {
    const { homeTeam, awayTeam } = body;
    const message = 'It is not possible to create a match with two equal teams';
    const status = 401;

    if (homeTeam === awayTeam) {
      return { status, message };
    }
  };

  public validateTeams = async (body: MatchCreation) => {
    const { homeTeam, awayTeam } = body;
    const message = 'There is no team with such id!';
    const status = 404;

    const homeTeamById = await TeamModel.findOne({ where: { id: homeTeam } });

    if (homeTeamById === null) {
      return { status, message };
    }

    const awayTeamById = await TeamModel.findOne({ where: { id: awayTeam } });

    if (awayTeamById === null) {
      return { status, message };
    }
  };

  public idValidation = async (id: number) => {
    const schema = Joi.number().required();
    const { error } = schema.validate(id);

    if (error) throw new ValidationsError(400, INVALID_ID);

    return id;
  };
}