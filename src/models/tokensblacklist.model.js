const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TokensBlackList extends Model {
    };

    TokensBlackList.init({
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
        author: {
            allowNull: false,
            type: DataTypes.STRING
        },
    },{
        sequelize,
        //define table name
        tableName: 'tokens_blacklist',
        modelName: 'TokensBlackList',
    });
    return TokensBlackList;
};