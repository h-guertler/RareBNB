'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init({
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    lng: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });

  Spot.associate = models => {
    const User = models.User;
    Spot.belongsTo(User, { foreignKey: 'ownerId' });

    const Booking = models.Booking;
    Spot.hasMany(Booking, { foreignKey: 'spotId' });

    const Review = models.Review;
    Spot.hasMany(Review, { foreignKey: 'spotId' });

    const ReviewImage = models.ReviewImage;
    Spot.hasMany(ReviewImage, { foreignKey: 'spotId' });
  };

  return Spot;
};
