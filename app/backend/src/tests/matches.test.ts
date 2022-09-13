import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Match from '../database/models/matches.model';
import { mockMatch, mockMatches, matchesFinalizedDatabase, matchesInProgressDatabase } from '../utils/matches.utils';
import { validUser, validLogin } from '../utils/user.utils';
import { teams } from '../utils/teams.utils';
import User from '../database/models/userModel';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route Matches', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Tests Route GET', () => {
    it('Returns status 200 and verifies return', async () => {
      sinon.stub(Match, "findAll").resolves(mockMatches as []);

      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockMatches);
    })

    it('Returns status 200 and verifies if returned matches list by "inProgress"', async () => {
      sinon.stub(Match, "findAll").resolves(matchesInProgressDatabase as []);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesInProgressDatabase);
    })

    it('Returns status 200 and verifies if filtered matches list by "Finalized"', async () => {
      sinon.stub(Match, "findAll").resolves(matchesFinalizedDatabase as []);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFinalizedDatabase);
    })
  })

  describe('Tests Route POST', () => {
    it('Creates a match and returns status 201 and match created', async () => {
      sinon.stub(Match, "create").resolves(mockMatch as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);
      sinon.stub(Team, "findOne")
        .withArgs({ where: { id: mockMatch.homeTeam } })
        .resolves(teams[0] as Team)
        .withArgs({ where: { id: mockMatch.awayTeam } })
        .resolves(teams[1] as Team);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": mockMatch.homeTeam,
          "awayTeam": mockMatch.awayTeam,
          "homeTeamGoals": mockMatch.homeTeamGoals,
          "awayTeamGoals": mockMatch.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(mockMatch);
    })

    it('Tests if when "authorization token" is invalid, returns 401 and message "Token must be a valid token"', async () => {
      sinon.stub(Match, "create").resolves(mockMatch as Match);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token_invalido')
        .send({
          "homeTeam": mockMatch.homeTeam,
          "awayTeam": mockMatch.awayTeam,
          "homeTeamGoals": mockMatch.homeTeamGoals,
          "awayTeamGoals": mockMatch.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    })

    it('Tests if invalid body returns 400 and message "All fields must be filled"', async () => {
      sinon.stub(Match, "create").resolves(mockMatch as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({});

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })

    it('Tests if "homeTeam" and "awayTeam" have the same returns', async () => {
      sinon.stub(Match, "create").resolves(mockMatch as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": 1,
          "awayTeam": 1,
          "homeTeamGoals": mockMatch.homeTeamGoals,
          "awayTeamGoals": mockMatch.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    })

    it('Tests if teams id not found returns status 401 and message "There is no team with such id!"', async () => {
      sinon.stub(Match, "create").resolves(mockMatch as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);
      sinon.stub(Team, "findOne").resolves(null);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": 999,
          "awayTeam": 9999,
          "homeTeamGoals": mockMatch.homeTeamGoals,
          "awayTeamGoals": mockMatch.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    })
  })

  describe('Test Route PATCH', () => {
    it('Tests is match was altered to finalized and returns status 201 and message "Finished"', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    })

    it('Tests invalid id and returns status 400 and message "Id must be filled"', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/invalid_id/finish')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Id must be filled');
    })

    it('Tests if when "authorization token" is invalid, returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'token_invalido')

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    })
  })

  describe('Tests Route PATCH /matches/:id', () => {
    it('Tests if match goals are updated and returns status 200', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(Match, "findOne").resolves(mockMatch as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })

      expect(chaiHttpResponse.status).to.equal(200);
    })

    it('Tests if invalid id returns status 400 and message "Id must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/invalid_id')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Id must be filled');
    })

    it('Tests if invalid body returns 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })

    it('Tests if when "Match Id" is not found, returns 404 and message "Match dont found."', async () => {
      sinon.stub(Match, "findOne").resolves(null);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Match dont found.');
    })

    it('Tests if when "authorization token" is invalid returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1')

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    })
  })
})