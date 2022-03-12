const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const {Usuario} = require("../models/modelsIndex");
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req = request, res = response) => {
    //Sincronizar tabla
    await Usuario.sync();

    const {correo, contrasena} = req.body;

    //Buscar usuario por
    const usuario = await Usuario.findOne({
        where:{correo: correo.toUpperCase()}
    });

    //Verificar que el usuario este registrado
    if(!usuario) {
        return res.status(200).json({
            msg: `Correo y/o contraseña incorrectos`
        });
    }

    //Verificar que el usuario este activo
    if(!usuario.estado) {
        return res.status(200).json({
            msg: `Correo y/o contraseña incorrectos`
        });
    }

    //Verificar contraseña
    const validarPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);

    if(!validarPassword) {
        return res.status(200).json({
            msg: `Correo y/o contraseña incorrectos`
        });
    }

    //Generar token de autentificación
    const token = await generarJWT(usuario.idUsuario);

    res.status(200).json({
        usuario:{
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            apPaterno: usuario.apPaterno,
            apMaterno: usuario.apMaterno,
            correo: usuario.correo,
            idRol: usuario.idRol
        },
        token
    });
}

module.exports = {
    login
}