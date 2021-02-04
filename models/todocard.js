'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todocard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.todocard.belongsTo(models.user, { foreignKey: 'id' });
    }
  }
  todocard.init(
    {
      userid: DataTypes.NUMBER,
      text: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'todocard',
    },
  );
  return todocard;
};
