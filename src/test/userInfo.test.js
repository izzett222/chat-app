import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import { createToken } from '../utils/handleJWT';
import app from '../server';

config();
chai.use(chaiHttp);
const { expect } = chai;

describe('TEST SIGNUP', () => {
  let token;
  const wrongToken = createToken(20000);
  before(async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        userName: 'newuser123',
        password: 'passcode123',
      });
    token = res.body.data.token;
  });
  it('should not allow a user who hasn\'t given a token to view profile info', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/profile')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('No token provided');
        done();
      });
  });
  it('should not allow a user who has given an invalid token to view profile info', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/profile')
      .set('token', 'this is a token')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('token must be provided and valid');
        done();
      });
  });
  it('should not allow a user who has given an valid token but hasn\'t signup view profile info', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/profile')
      .set('token', wrongToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
  it('should return user info object', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/profile')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('Profile info retrieved successfully');
        expect(res.body.data.user).to.be.an('object');
        expect(res.body.data.user.userName).to.equal('newuser123');
        done();
      });
  });
});
