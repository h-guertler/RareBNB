'use strict';
const {
  Model,
  Validator
} = require('sequelize');

const Spot = require("./spot");
const Review = require("./review");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Username cannot be an email.");
          }
        },
      },
      unique: {
        args: true,
        msg: "User with that username already exists"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 256],
          msg: "Invalid email"
        },
        isEmail: {
          args: true,
          msg: "Invalid email"
        },
        notNull: {
          args: true,
          msg: "Invalid email"
        },
      },
      unique: {
        args: true,
        msg: "User with that email already exists"
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });

  User.associate = models => {
    const Booking = models.Booking;
    User.hasMany(Booking, { foreignKey: 'userId' });

    const Review = models.Review;
    User.hasMany(Review, { foreignKey: 'userId' });

    const Spot = models.Spot;
    User.hasMany(Spot, { foreignKey: 'ownerId' });
  }
  return User;
};
