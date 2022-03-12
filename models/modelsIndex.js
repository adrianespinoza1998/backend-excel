const { Rol } = require("./Rol");
const { Usuario } = require("./Usuario");

Usuario.belongsTo(Rol,{
    onDelete: 'CASCADE',
    hooks: true,
    foreignKey: {
        name: 'idRol',
        allowNull: false
    }
});

module.exports = {
    Usuario,
    Rol
}