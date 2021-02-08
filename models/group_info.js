'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.group_info.hasMany(models.users_groups, { onDelete: 'cascade' });
      models.group_info.hasMany(models.group_todocard, { onDelete: 'cascade' });
    }
  }
  group_info.init(
    {
      groupname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'group_info',
    },
  );
  return group_info;
};
