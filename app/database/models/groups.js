'use strict';

module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    people: DataTypes.INTEGER
  }, {
    timestamp: true,
    updatedAt: false
  });

  Groups.associate = function(models) {
    Groups.hasOne(models.Journeys, {
      foreignKey: 'groupId',
      as: 'journey',
      onDelete: 'CASCADE'
    });
  };

  return Groups;
};
