import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../server';

config();
chai.use(chaiHttp);
const { expect } = chai;

describe('test the welcome api', () => {
  it('should return welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).to.equal('welcome to chat-app api');
        done();
      });
  });
  it('should return route not found if the user hit an unknown route', (done) => {
    chai
      .request(app)
      .get('/feregregfreg')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('route not found');
        done();
      });
  });
});
