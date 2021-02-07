'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.todocard, { onDelete: 'cascade' });
      models.user.hasMany(models.users_grouptodo, { onDelete: 'cascade' });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      mobile: DataTypes.STRING,
      group: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
