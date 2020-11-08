import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../database/models';
import { createToken } from '../utils/handleJWT';

config();

export const signupController = async (req, res) => {
  const { User } = db;
  const {
    userName, password,
  } = req.body;
  try {
    const data = {
      userName: userName.toLowerCase(), password: await bcrypt.hash(password, 10),
    };
    const newUser = await User.create(data);
    const { password: userPassword, ...userData } = newUser.dataValues;
    const token = createToken(newUser.id);
    return res.status(201).json({ data: { message: 'signed up successfully', user: userData, token } });
  } catch (err) {
    if (err.errors[0].message === 'userName must be unique') {
      return res.status(409).json({ data: { message: 'userName already taken' } });
    }
    return res.status(500).json({ error: 'server error' });
  }
};
export const loginController = async (req, res) => {
  const { password, userName } = req.body;
  const { User } = db;
  try {
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    if (!user) {
      return res.status(400).json({ data: { error: 'Login failed, wrong username or password' } });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ data: { error: 'Login failed, wrong username or password' } });
    }
    return res.status(200).json({ data: { message: 'Login successful', token: createToken(user.id) } });
  } catch (err) {
    return res.status(500).json({ error: 'server error' });
  }
};
