'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define('Cars', {
    seats: DataTypes.INTEGER
  }, {
    timestamp: true,
    updatedAt: false
  });

  Cars.associate = function(models) {
    Cars.hasOne(models.Journeys, {
      foreignKey: 'carId',
      as: 'journey',
      onDelete: 'CASCADE'
    });
  };

  return Cars;
};
