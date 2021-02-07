'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.groupinfo.hasMany(models.grouptodocard, { onDelete: 'cascade' });
    }
  }
  groupinfo.init(
    {
      groupname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'groupinfo',
    },
  );
  return groupinfo;
};
