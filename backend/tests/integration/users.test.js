require('dotenv').config();

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const {db} = require('../../db/db');

const path = require('path');
const usersModel = require('../../src/api/models/users.model');
const refreshTokensModel = require('../../src/api/models/refreshTokens.model');

chai.use(chaiHttp);
describe('Users controllers', () => {
  const config = {
    directory: path.join(__dirname, '..', '..', 'db', 'migrations'),
  };

  // Migrate database to contain latest, empty tables
  beforeEach(async function() {
    await db.migrate.latest(config);
  });

  // Rollback all migrations to database to reset it
  afterEach(async function() {
    await db.migrate.rollback(config);
  });

  describe('User signup', () => {
    it('should return status 400 if any fields are missing', async () => {
      // This section registers an invalid user and checks the response body
      const user = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: '',
        password: 'ryan4ever',
      };

      const response = await (chai.request(app).post('/users/signup').send(user));

      expect(response).to.have.status(400);
      expect(response.text).to.equal(JSON.stringify({error: 'Please specify all fields'}));
    });

    it('should return status 400 if email already exists', async () => {
      // This section registers a duplicate user and checks the response body
      const user = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: 'jake',
        password: 'ryan4ever',
      };

      await chai.request(app).post('/users/signup').send(user);

      const response = await chai.request(app).post('/users/signup').send(user);

      expect(response).to.have.status(400);
      expect(response.text).to.equal(JSON.stringify({error: 'Email already exists'}));
    });

    it('should return status 201 with newly created user and refresh token', async () => {
      // This section registers a user and checks the response body
      const user = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: 'jake',
        password: 'ryan4ever',
      };

      const response = await (chai.request(app).post('/users/signup').send(user));

      expect(response).to.have.status(201);
      expect(response._body).to.have.property('uid').to.be.a('number');
      expect(response._body).to.have.property('email').to.equal(user.email);
      expect(response._body).to.have.property('first_name').to.equal(user.firstName);
      expect(response._body).to.have.property('last_name').to.equal(user.lastName);
      expect(response._body).to.have.property('created_at').to.be.a('string');
      expect(response._body).to.have.property('updated_at').to.be.a('string');
      expect(response._body).to.have.property('password').to.be.a('string');
      expect(response._body).to.have.property('token').to.be.a('string');
      expect(response._body).to.have.property('refreshToken').to.be.a('string');

      // This section queries the user table to ensure correctness
      const userData = await usersModel.getUserByEmail(user.email);

      expect(userData).to.have.property('uid').to.be.equal(response._body.uid);
      expect(userData).to.have.property('email').to.equal(response._body.email);
      expect(userData).to.have.property('first_name').to.equal(response._body.first_name);
      expect(userData).to.have.property('last_name').to.equal(response._body.last_name);
      expect(userData).to.have.property('created_at'); // Difficult to infer type
      expect(userData).to.have.property('updated_at'); // Difficult to infer type
      expect(userData).to.have.property('password').to.be.equal(response._body.password);

      // This section queries the refresh table to ensure correctness
      const refreshTokenData = await refreshTokensModel.getRefreshTokenByUid(response._body.uid);

      expect(refreshTokenData).to.have.property('uid').to.be.equal(response._body.uid);
      expect(refreshTokenData).to.have.property('rtid').to.be.a('number');
      expect(refreshTokenData).to.have.property('created_at'); // Difficult to infer type
      expect(refreshTokenData).to.have.property('updated_at'); // Difficult to infer type
      expect(refreshTokenData).to.have.property('refresh_token').to.be.equal(response._body.refreshToken);
    });
  });

  describe('User login', () => {
    it('should return status 400 if any fields are missing', async () => {
      const user = {
        email: 'ryan.jake@gmail.net',
        password: '',
      };

      const response = await (chai.request(app).post('/users/login').send(user));
      expect(response).to.have.status(400);
      expect(response.text).to.equal(JSON.stringify({error: 'Please specify all fields'}));
    });

    it('should return status 400 if email is incorrect', async () => {
      const user = {
        email: 'ryan.jake@gmail.met',
        password: 'ryan4ever',
      };

      const originalUser = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: 'jake',
        password: 'ryan4ever',
      };

      await chai.request(app).post('/users/signup').send(originalUser);
      const response = await (chai.request(app).post('/users/login').send(user));
      expect(response).to.have.status(400);
      expect(response.text).to.equal(JSON.stringify({error: 'Invalid credentials'}));
    });

    it('should return status 400 if password is incorrect', async () => {
      const user = {
        email: 'ryan.jake@gmail.net',
        password: 'Ryan4ever',
      };

      const originalUser = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: 'jake',
        password: 'ryan4ever',
      };

      await chai.request(app).post('/users/signup').send(originalUser);
      const response = await (chai.request(app).post('/users/login').send(user));
      expect(response).to.have.status(400);
      expect(response.text).to.equal(JSON.stringify({error: 'Invalid credentials'}));
    });

    it('should return status 200 with newly created tokens', async () => {
      const user = {
        email: 'ryan.jake@gmail.net',
        password: 'ryan4ever',
      };

      const originalUser = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: 'jake',
        password: 'ryan4ever',
      };

      await chai.request(app).post('/users/signup').send(originalUser);
      const response = await (chai.request(app).post('/users/login').send(user));
      expect(response).to.have.status(200);
      expect(response._body).to.have.property('token').to.be.a('string');
      expect(response._body).to.have.property('refreshToken').to.be.a('string');
    });
  });

  describe('Token refresh', () => {
    it('should return status 400 if any fields are missing', async () => {
      const user = {
        email: 'ryan.jake@gmail.net',
        firstName: 'ryan',
        lastName: '',
        password: 'ryan4ever',
      };

      const response = await (chai.request(app).post('/users/signup').send(user));

      expect(response).to.have.status(400);
      expect(response.text).to.equal(JSON.stringify({error: 'Please specify all fields'}));
    });
  });
});
