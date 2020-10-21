import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import userRoute from './routes/user';
import swaggerRoute from './routes/swagger/swagger';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/', swaggerRoute);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to chat-app api' });
});
app.use('/api/v1/user', userRoute);
app.listen(port, process.stdout.write(`Server is running on http://localhost:${port}`));
export default app;
