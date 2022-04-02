const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConfig");

const Proyecto = sequelize.define("Proyecto", {
    idProyecto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombreProyecto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = {
    Proyecto
}