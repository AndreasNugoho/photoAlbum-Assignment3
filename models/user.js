'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Photo)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg:"user already use"
      },
      validate: {
        notEmpty: {
          args: true,
          msg:"username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg:"email already use"
      },
      validate: {
        notEmpty: {
          args: true,
          msg:"email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:"password is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPass = hashPassword(user.password)
        user.password = hashedPass
      }
    }
  });
  return User;
};