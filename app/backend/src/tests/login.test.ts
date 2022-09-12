import * as sinon from 'sinon';
import * as chai from 'chai';
import { INVALID_TOKEN, EMPTY_FIELD, INCORRECT_FIELD } from '../utils/constants.utils';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { validLogin, validUser, invalidLogin, invalidUser } from '../utils/user.utils';
import { Response } from 'superagent';
import UsersModel from '../database/models/userModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Login response', () => { 
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());
  describe('Route /login - POST test', () => {
    beforeEach(async () => {
      sinon.stub(UsersModel, "findOne")
      .withArgs({ where: {email: validLogin.email}})
      .resolves(validUser as UsersModel)
      .withArgs({where: {email: invalidLogin.email}})
      .resolves(null);
    });
  })

  it('If req is correct returns status 200 and token property', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(validLogin);
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('If req contains only email, returns status 400 and empty password message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ password: validLogin.password });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(EMPTY_FIELD);
  });

  it('If req contains only password, returns status 400 and empty password message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: validLogin.email });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(EMPTY_FIELD);
  });
  
  it('If req contains invalid email, returns status 401 and Incorrect field message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: invalidLogin.email, password: validLogin.password });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(INCORRECT_FIELD);
  });

  it('If req contains invalid password, returns status 401 and Incorrect field message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: validLogin.email, password: invalidLogin.password });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(INCORRECT_FIELD);
  });

  describe('Route /login/validate, GET test', () => {
    it('If token is valid, return status 200 and user role', async () => {
      sinon.stub(UsersModel, "findOne").resolves(validUser as UsersModel);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', token);
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('role');
      expect(chaiHttpResponse.body.role).to.be.equal('admin');
    })

    it('If token is invalid, returns status 401 and invalid token message', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'asoijdipo1jpjmas');
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_TOKEN);
    })
  })
});
