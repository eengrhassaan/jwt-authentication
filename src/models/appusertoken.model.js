const { Model } = require('sequelize');
const {Sequelize} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class AppUserToken extends Model {
    };

    AppUserToken.init({

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,  
            autoIncrement: true
        },
        appuserid:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        token:{
            type: Sequelize.STRING(1000),
            allowNull:false
        },
        tokentype:{
            type: Sequelize.STRING(20),
            allowNull:false
        },
        expiredon:{
            type: Sequelize.DATE,
            allowNull:false
        },
        utilized:{
            type: Sequelize.BOOLEAN
        },


        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER
        // },
        // token: {
        //     allowNull: false,
        //     type: DataTypes.STRING
        // },
        // expiry_date: {
        //     allowNull: false,
        //     type: DataTypes.DATE
        // },
        // token_type: {
        //     allowNull: false,
        //     type: DataTypes.STRING
        // },
        // is_utilized: {
        //     allowNull: false,
        //     type: DataTypes.INTEGER
        // },
    },{
        sequelize,
        //define table name
        tableName: 'appuser_token',
        modelName: 'appuser_token',
    });
    return AppUserToken;
};