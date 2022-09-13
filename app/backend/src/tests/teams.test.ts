import * as sinon from 'sinon';
import * as chai from 'chai';
import { teams, teamById } from '../utils/teams.utils';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import TeamModel from '../database/models/team.model';
import { INVALID_ID, TEAM_NOTFOUND } from '../utils/constants.utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Teams response', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Route /teams - GET test', () => {

    it('If find all returns all teams', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[])

      chaiHttpResponse = await chai.request(app).get('/teams');
      expect(chaiHttpResponse).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teams)
    })
  })

  describe('Route /teams/:id - GET test', () => {

    it('If returns a single team while searching by Id', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(teamById as TeamModel)

      chaiHttpResponse = await chai.request(app).get('/teams/5');
      expect(chaiHttpResponse).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamById)
    })

    it('If returns status 400 and message for invalid Id', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/random');
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_ID);
    })

    it('If returns status 404 and message for team not found', async () => {
      sinon.stub(TeamModel, "findOne").resolves(null);

      chaiHttpResponse = await chai.request(app)
        .get('/teams/654789');
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(TEAM_NOTFOUND);
    })
  })
  
});