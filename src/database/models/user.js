const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    friends: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
