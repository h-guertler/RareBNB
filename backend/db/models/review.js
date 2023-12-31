'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Spots' },
    },
    review: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    stars: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Review',
  });

  Review.associate = models => {
    const User = models.User;
    Review.belongsTo(User, { foreignKey: 'userId' });

    const ReviewImage = models.ReviewImage;
    Review.hasMany(ReviewImage, { foreignKey: 'reviewId' });

    const Spot = models.Spot;
    Review.belongsTo(Spot, { foreignKey: 'spotId' });
  };

  return Review;
};
