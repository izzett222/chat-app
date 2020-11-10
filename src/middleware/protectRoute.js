import { verifyToken } from '../utils/handleJWT';
import db from '../database/models';

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const payload = verifyToken(token);
    const user = await db.User.findOne({
      where: {
        id: payload.id,
      },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(401).json({ error: 'you are not authorised for this operation' });
    }
    req.payload = payload;
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ error: 'token must be provided and valid' });
    }
    return res.status(500).json({ error: 'server error' });
  }
};

export default verifyUser;
