const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    };

    User.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      first_name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
          notNull: {msg: "First Name is required"},
          notEmpty: {msg: "First Name cannot be empty"},
        }
      },
      last_name:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: {msg: "It must be a valid Email  address"},
        }
      },
      phone: {
        type:DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      //define table name
      tableName: 'users',
      modelName: 'User',
    });
    return User;
};