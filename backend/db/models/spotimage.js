'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpotImage.init({
    spotId: {
      // allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Spots" },
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    preview: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });

  SpotImage.associate = models => {
    const Spot = models.Spot;
    SpotImage.belongsTo(Spot, { foreignKey: 'spotId' });
  }

  return SpotImage;
};
