'use strict';
/*eslint-disable*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_grouptodos', {
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      groupid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'group_todocards',
          key: 'groupid',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users_grouptodos');
  },
};
