'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_grouptodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users_grouptodo.belongsTo(models.user, { foreignKey: 'id' });
      models.users_grouptodo.belongsTo(models.grouptodocard, {
        foreignKey: 'id',
      });
    }
  }
  users_grouptodo.init(
    {
      userid: DataTypes.NUMBER,
      groupid: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'users_grouptodo',
    },
  );
  return users_grouptodo;
};
