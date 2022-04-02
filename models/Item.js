const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConfig");

const Item = sequelize.define('Item', {
    idItem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    bmp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wbs: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPieza: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = {
    Item
};