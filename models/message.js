'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    subject: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    therapistId: DataTypes.INTEGER
  }, {});
  message.associate = function(models) {
    // associations can be defined here
    models.message.belongsTo(models.therapist);
    models.message.belongsTo(models.user);
  };
  return message;
};