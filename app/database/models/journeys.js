'use strict';

module.exports = (sequelize, DataTypes) => {
  const Journeys = sequelize.define('Journeys', {
    carId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    timestamp: true,
    updatedAt: false
  });

  Journeys.associate = function(models) {
    Journeys.belongsTo(models.Cars, {
      foreignKey: 'carId',
      as: 'car',
      onDelete: 'CASCADE'
    });

    Journeys.belongsTo(models.Groups, {
      foreignKey: 'groupId',
      as: 'group',
      onDelete: 'CASCADE'
    });
  };

  return Journeys;
};
