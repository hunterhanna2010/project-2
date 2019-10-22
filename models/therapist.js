'use strict';
module.exports = (sequelize, DataTypes) => {
  const therapist = sequelize.define('therapist', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    specialties: DataTypes.STRING,
    conditions: DataTypes.STRING
  }, {});
  therapist.associate = function(models) {
    // associations can be defined here
  };
  return therapist;
};