const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models/modelsIndex');

const buscarUsuarioXId = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Usuario.sync();

    //Guardar el id del usuario
    const { id } = req.params;

    //Bsucar el usuario por su primary key
    const usuario = await Usuario.findByPk(id);

    //Verificar que el usuario exista
    if (!usuario) {
        return res.status(200).json({});
    }

    //Verificar que el usuario este activo
    if (usuario.estado) {
        res.status(200).json(usuario);
    } else {
        res.status(200).json([]);
    }
}

const listarUsuarios = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Usuario.sync();

    //Buscar todos los usuarios activos
    const buscarUsuarios = await Usuario.findAll({
        where: { estado: true }
    });

    //Quitar el admin de los usuarios
    const usuarios = buscarUsuarios.map((usuario) => {
        return usuario
    }).filter(usuario => usuario.idRol != 1);

    res.status(200).json(usuarios);
}

const crearUsuario = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Usuario.sync();

    //Guardar los parametros del body
    const { nombre, apPaterno, apMaterno, correo, contrasena, idRol } = req.body;

    try {
        const buscarUsuario = await Usuario.findOne({
            where: { correo: correo.toUpperCase() }
        });

        if (buscarUsuario) {
            return res.status(400).json({
                msg: `Usuario con el correo: ${correo} ya esta registrado`
            });
        }

        const salt = bcryptjs.genSaltSync();

        const password = bcryptjs.hashSync(contrasena, salt);

        const usuario = await Usuario.create({
            nombre: nombre.toUpperCase(),
            apPaterno: apPaterno.toUpperCase(),
            apMaterno: apMaterno.toUpperCase(),
            correo: correo.toUpperCase(),
            contrasena: password,
            idRol
        });

        res.status(201).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: `Error al crear usuario`
        });
    }
}

const editarUsuario = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Usuario.sync();

    //Guardar el id del usuario
    const { id } = req.params;

    //Guardar los parametros del body
    const { nombre, apPaterno, apMaterno, correo, contrasena, idRol } = req.body;

    try {
        const buscarUsuario = await Usuario.findByPk(id);

        if (!buscarUsuario) {
            return res.status(400).json({
                msg: `Usuario con el id: ${id} no existe`
            });
        }

        if (!buscarUsuario.estado) {
            return res.status(400).json({
                msg: `Usuario con el id: ${id} no existe`
            });
        }

        const salt = bcryptjs.genSaltSync();

        const password = bcryptjs.hashSync(contrasena, salt);

        buscarUsuario.set({
            nombre: nombre.toUpperCase(),
            apPaterno: apPaterno.toUpperCase(),
            apMaterno: apMaterno.toUpperCase(),
            correo: correo.toUpperCase(),
            contrasena: password,
            idRol
        });

        await buscarUsuario.save();

        res.status(201).json(buscarUsuario);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: `Error al editar usuario`
        });
    }
}

const desactivarUsuario = async (req = request, res = response) => {
    //Sincronizar los modelos con las tablas de la bd
    await Usuario.sync();

    //Guardar el id del usuario
    const {id} = req.params;

    //Buscar usuario x id
    const usuario = await Usuario.findByPk(id);

    if(!usuario) {
        return res.status(404).json({
            msg: `Usuario con el id: ${id} no existe`
        });
    }

    if(!usuario.estado){
        return res.status(400).json({
            msg: `Usuario con el id: ${id} ya esta desactivado`
        });
    }

    usuario.set({
        estado: false
    });

    await usuario.save();

    res.status(200).json(usuario);
}

module.exports = {
    buscarUsuarioXId,
    listarUsuarios,
    crearUsuario,
    editarUsuario,
    desactivarUsuario
}