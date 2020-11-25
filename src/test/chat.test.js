import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import ioClient from 'socket.io-client';
import app, { server } from '../server';
import { createToken } from '../utils/handleJWT';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);
describe('SOCKET UNIT TESTS', () => {
  let clientSocket;
  let clientSocket2;
  let client3;
  let client4;
  let client5;
  const BASE_URL = `http://localhost:${server.address().port}`;
  let token;
  let token2;
  const token3 = createToken(10000);
  beforeEach(async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        userName: 'newuser44',
        password: 'passcode123',
      });
    token = res.body.data.token;
    const res2 = await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        userName: 'newuser45',
        password: 'passcode123',
      });
    token2 = res2.body.data.token;
    clientSocket = ioClient(BASE_URL, { query: { token } });
    clientSocket2 = ioClient(BASE_URL, { query: { token: token2 } });
    client3 = ioClient(BASE_URL);
    client4 = ioClient(BASE_URL, { query: { token: 'efergrtgtrgr' } });
    client5 = ioClient(BASE_URL, { query: { token: token3 } });
  });
  afterEach((done) => {
    clientSocket.disconnect();
    clientSocket2.disconnect();
    client3.disconnect();
    client4.disconnect();
    client5.disconnect();
    clientSocket = null;
    clientSocket2 = null;
    client3 = null;
    client4 = null;
    client5 = null;

    done();
  });
  it('user should be able to receiver chat message', (done) => {
    const chatId = 'test';
    const message = { message: 'hey', sender: 'newuser44', receiver: 'newuser45' };
    clientSocket.emit('room', { chatId });
    clientSocket2.emit('room', { chatId });
    clientSocket.emit('newMessage', message);
    clientSocket2.on('messages', (data) => {
      expect(data).to.be.an('object');
      expect(data.message).to.equal(message.message);
      expect(data.receiver).to.equal(message.receiver);
      expect(data.chatId).to.equal(chatId);
      expect(data.sender).to.equal(message.sender);
      done();
    });
  });

  it('user should receive an error message if they don\'t provide a token', (done) => {
    client3.on('connect_error', (data) => {
      expect(data.data.err).to.equal('token is required, please login or sign up and try again');
      done();
    });
  });
  it('user should receive an error message if they input a malformed token', (done) => {
    client4.on('connect_error', (data) => {
      expect(data.data.err).to.equal('please provide a valid token');
      done();
    });
  });
  it('users should get an error message if they provided a valid token but aren\'t sign up yet', (done) => {
    client5.on('connect_error', (data) => {
      expect(data.data.err).to.equal('user not found, please sign up or login and try again');
      done();
    });
  });
});
