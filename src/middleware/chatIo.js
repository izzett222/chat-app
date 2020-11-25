import { v4 as uuidv4 } from 'uuid';
import db from '../database/models';

const chatIo = (socket, next) => {
  let chatId;
  socket.on('room', (data) => {
    chatId = data.chatId;
    if (!chatId) chatId = uuidv4();
    socket.join(chatId);
    process.stdout.write('user joined a chat room');
  });
  socket.on('newMessage', async (data) => {
    const { message, receiver, sender } = data;
    try {
      const userMessage = await db.Message.create({
        message, receiver, sender, chatId,
      });
      socket.to(chatId).emit('messages', userMessage);
      socket.emit('messages', userMessage);
    } catch (err) {
      next(err);
    }
  });
  socket.on('disconnect', () => {
    process.stdout.write('user disconnected');
  });
  next();
};
export default chatIo;
