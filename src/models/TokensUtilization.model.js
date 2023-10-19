const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TokensUtilization extends Model {
    };

    TokensUtilization.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        token: {
            allowNull: false,
            type: DataTypes.STRING
        },
        expiry: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isUtilized: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    },{
        sequelize,
        //define table name
        tableName: 'TokensUtilization',
        modelName: 'TokensUtilization',
    });
    return TokensUtilization;
};