'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todogroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.grouptodocard, { onDelete: 'cascade' });
      models.user.hasMany(models.users_groups, { onDelete: 'cascade' });
    }
  }
  todogroup.init(
    {
      groupname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'todogroup',
    },
  );
  return todogroup;
};
