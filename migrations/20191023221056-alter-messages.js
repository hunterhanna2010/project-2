'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'messages',
      'therapistId',
      {type: Sequelize.STRING}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'messages',
      'therapistId',
      {type: Sequelize.INTEGER}
    );
  }
};
