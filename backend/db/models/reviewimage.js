'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReviewImage.init({
    reviewId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Reviews' },
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });

  ReviewImage.associate = models => {
    const Review = models.Review;
    ReviewImage.belongsTo(Review, { foreignKey: 'reviewId' });
  };

  return ReviewImage;
};
