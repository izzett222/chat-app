import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../server';

config();
chai.use(chaiHttp);
const { expect } = chai;

describe('TEXT LOGIN', () => {
  const user = {
    userName: 'user1234',
    password: 'passcode1234',
  };
  const wrongUser = {
    userName: 'user1234',
    password: 'passcode',
  };
  before(async () => {
    await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(user);
  });
  it('should allow a user who has signed up to login when the user has given all the user info needed', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('Login successful');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
  });
  it('shouldn\'t allow a user to login if he hasn\'t signed up', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(wrongUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data.error).to.equal('Login failed, wrong username or password');
        done();
      });
  });
  it('shouldn\'t allow a user to login with invalid data', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send({ userName: '', password: '' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data.error).to.be.an('array');
        done();
      });
  });
});
