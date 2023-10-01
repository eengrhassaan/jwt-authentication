const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Books extends Model {
    };

    Books.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        author: {
            allowNull: false,
            type: DataTypes.STRING
        },
        content: {
            allowNull: true,
            type: DataTypes.STRING
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
    },{
        sequelize,
        //define table name
        tableName: 'books',
        modelName: 'Books',
    });
    return Books;
};