'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersTherapists = sequelize.define('usersTherapists', {
    userId: DataTypes.INTEGER,
    therapistId: DataTypes.INTEGER
  }, {});
  usersTherapists.associate = function(models) {
    // associations can be defined here
  };
  return usersTherapists;
};