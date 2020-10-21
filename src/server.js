import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to chat-app api' });
});
app.listen(port, process.stdout.write(`Server is running on http://localhost:${port}`));
