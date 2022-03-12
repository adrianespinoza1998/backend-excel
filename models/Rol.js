const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConfig");

const Rol = sequelize.define("Rol", {
    idRol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = {
    Rol
}