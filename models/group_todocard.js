'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_todocard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.group_todocard.belongsTo(models.group_info, {
        foreignKey: 'groupid',
      });
      models.group_todocard.hasMany(models.users_grouptodo, {
        onDelete: 'cascade',
      });
    }
  }
  group_todocard.init(
    {
      groupid: DataTypes.NUMBER,
      text: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'group_todocard',
    },
  );
  return group_todocard;
};
