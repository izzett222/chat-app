const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
  };
  Message.init({
    message: DataTypes.STRING,
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    chatId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
