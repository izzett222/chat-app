import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../server';

config();
chai.use(chaiHttp);
const { expect } = chai;

describe('TEST SIGNUP', () => {
  it('should allow a user to signup when the user has given all the user info needed', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        userName: 'ser123',
        password: 'thisitbhv',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.message).to.equal('signed up successfully');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
  });
  describe('test login with an already taken email', () => {
    before(async () => {
      await chai
        .request(app)
        .post('/api/v1/user/signup')
        .send({
          userName: 'user123',
          password: 'passcode123',
        });
    });
    it('should return an error message if user already in the database', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/signup')
        .send({
          userName: 'user123',
          password: 'Aime12&f*',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.data.message).to.equal('userName already taken');
          done();
        });
    });
  });
  it('should return error message if user doesn\'t give complete info ', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        password: 'Aime12&f*',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).be.an('array');
        done();
      });
  });
});
