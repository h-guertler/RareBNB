'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  Booking.associate = models => {
    const User = models.User;
    Booking.belongsTo(User, { foreignKey: 'userId' });

    const Spot = models.Spot;
    Booking.belongsTo(Spot, { foreignKey: 'spotId' });
  }

  return Booking;
};
