const { Rol } = require("./Rol");
const { Usuario } = require("./Usuario");
const { Proyecto } = require("./Proyecto");
const { Item } = require("./Item");

Usuario.belongsTo(Rol,{
    onDelete: 'CASCADE',
    hooks: true,
    foreignKey: {
        name: 'idRol',
        allowNull: false
    }
});

Proyecto.belongsTo(Usuario,{
    onDelete: 'CASCADE',
    hooks: true,
    foreignKey: {
        name: 'idUsuario',
        allowNull: false
    }
});

Item.belongsTo(Proyecto,{
    onDelete: 'CASCADE',
    hooks: true,
    foreignKey: {
        name: 'idProyecto',
        allowNull: false
    }
});

module.exports = {
    Usuario,
    Rol,
    Proyecto,
    Item
}