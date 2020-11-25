import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import socketIo from 'socket.io';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import userRoute from './routes/user';
import chatRoute from './routes/chat';
import swaggerRoute from './routes/swagger/swagger';
import chatIo from './middleware/chatIo';
import protectIo from './middleware/protectIo';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/', swaggerRoute);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to chat-app api' });
});
app.use('/api/v1/user', userRoute);
app.use('/api/v1/chat', chatRoute);
app.get('/socket', (req, res) => {
  res.sendfile('./public/index.html');
});
app.use('*', (req, res) => {
  res.status(404).json({ message: 'route not found' });
});
export const server = app.listen(port, process.stdout.write(`Server is running on http://localhost:${port}`));
const io = socketIo(server);
io.use(protectIo);
io.use(chatIo);
export default app;
