import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../server';

config();
chai.use(chaiHttp);
const { expect } = chai;

describe('TEST SIGNUP', () => {
  let token;
  before(async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        userName: 'newuser12',
        password: 'passcode123',
      });
    await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        userName: 'newuser122',
        password: 'passcode123',
      });
    token = res.body.data.token;
  });
  it('should return a error message if user is not found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/friends/add/nonexistantuser')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.data.message).to.equal('User not found');
        done();
      });
  });
  it('should return a error message if the user search themselves', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/friends/add/newuser12')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data.message).to.equal('The username should be different than yours');
        done();
      });
  });
  it('should return a successful message when the user is found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/friends/add/newuser122')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('User added successfully');
        done();
      });
  });
});
