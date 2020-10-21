import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
export const createToken = (id) => {
  const string = jwt.sign({ id }, process.env.JWT_SECRET);
  return string;
};
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
