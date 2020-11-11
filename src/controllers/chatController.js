import { config } from 'dotenv';

import db from '../database/models';

config();

const joinChatController = async (req, res) => {
  const { user } = req;
  const { userName } = req.params;
  try {
    const friend = await db.User.findOne({
      where: {
        userName: userName.toLowerCase(),
      },
      attributes: { exclude: ['password'] },
    });

    if (!friend) {
      return res.status(404).json({
        data: {
          message: 'User not found',
        },
      });
    }
    if (friend.id === user.id) {
      return res.status(400).json({
        data: {
          message: 'The username should be different than yours',
        },
      });
    }
    return res.status(200).json({
      data: {
        message: 'chat room joined successfully',
        friend: {
          id: friend.id,
          userName: friend.userName,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'server error' });
  }
};

export default joinChatController;
