import db from '../database/models';
import { verifyToken } from '../utils/handleJWT';

const protectIo = async (socket, next) => {
  const err = new Error('not authorized');
  if (!socket.handshake.query.token) {
    err.data = { err: 'token is required, please login or sign up and try again' };
    return next(err);
  }
  try {
    const decoded = verifyToken(socket.handshake.query.token);
    const user = await db.User.findOne({ where: { id: decoded.id } });
    if (!user) {
      err.data = { err: 'user not found, please sign up or login and try again' };
      return next(err);
    }
    return next();
  } catch (error) {
    err.data = { err: 'please provide a valid token' };
    return next(err);
  }
};
export default protectIo;
