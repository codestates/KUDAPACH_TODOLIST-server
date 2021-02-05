'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grouptodocard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.grouptodocard.belongsTo(models.users_groups, {
        foreignKey: 'groupid',
      });
    }
  }
  grouptodocard.init(
    {
      userid: DataTypes.NUMBER,
      groupid: DataTypes.NUMBER,
      text: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'grouptodocard',
    },
  );
  return grouptodocard;
};
