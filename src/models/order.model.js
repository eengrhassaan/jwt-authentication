const { sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    });
    
    return Order;
};