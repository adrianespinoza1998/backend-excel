const { request, response } = require("express");
const { Rol } = require("../models/modelsIndex");

const crearRol = async (req = request, res = response) => {

    //Sincronizar los modelos con las tablas de la bd
    await Rol.sync();

    //Desestructurar los parametros del body
    const { nombre } = req.body;

    try {

        //Crear la instancia del modelo
        const rol = await Rol.create({ nombre: nombre.toUpperCase() });

        //Guardar los datos en bd
        await rol.save();

        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(200).json({
            msg: `Error al crear rol`
        });
    }
}

const listarRoles = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Rol.sync();

    //Buscar roles activos
    const roles = await Rol.findAll({
        where: { estado: true }
    });

    res.status(200).json(roles);
}

const buscarRolXId = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Rol.sync();

    //Guardar el id
    const { id } = req.params;

    //Buscar por por primary key
    const rol = await Rol.findByPk(id);

    //Verificar que el rol exista
    if(!rol){
        return res.status(200).json({});
    }

    //Validar el estado del rol
    if (rol.estado) {
        res.status(200).json(rol);
    } else {
        res.status(200).json({});
    }

}

const editarRol = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Rol.sync();

    //Guardar el id
    const { id } = req.params;

    //Desestructurar los parametros del body
    const { nombre } = req.body;

    try {
        //Buscar rol x primary key
        const rol = await Rol.findByPk(id);

        //Rol no existe
        if(!rol){
            return res.status(200).json({
                msg: `Rol con el id ${id} no encontrado`
            });
        }

        //Verificar el estado del rol
        if (rol.estado) {
            //Editar rol
            rol.set({
                nombre: nombre.toUpperCase()
            });

            //Guardar Rol
            await rol.save();

            res.status(200).json(rol);
        } else {
            res.status(200).json({
                msg: `Rol con el id ${id} no encontrado`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({
            msg: `Error al editar rol`
        });
    }
}

const desactivarRol = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Rol.sync();

    //Guardar el id
    const { id } = req.params;

    //Buscar rol x primary key
    const rol = await Rol.findByPk(id);

    if(!rol){
        return res.status(200).json({
            msg: `Rol con el id ${id} no encontrado`
        });
    }

    //Verificar estado del rol
    if (rol.estado) {
        //Editar rol
        rol.set({
            estado: false
        });

        //Guardar Rol
        await rol.save();

        res.status(200).json(rol);
    } else {
        res.status(200).json({
            msg: `Rol con el id ${id} no encontrado`
        });
    }
}

module.exports = {
    crearRol,
    listarRoles,
    buscarRolXId,
    editarRol,
    desactivarRol
}