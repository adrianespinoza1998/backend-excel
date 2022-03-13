const { request, response } = require("express");
const {Rol, Usuario} = require("../models/modelsIndex");
const bcryptjs = require('bcryptjs');
const { Item } = require("../models/Item");

const initConfig = async(req = request, res = response)=>{

    await Rol.sync();
    await Usuario.sync();
    await Item.sync();

    const roles = await Rol.findAll();
    const usuarios = await Usuario.findAll();

    if(roles.length === 0){
        const admin = await Rol.create({ nombre: 'SYS_ADMIN'});
        const project = await Rol.create({ nombre: 'PROJECT_ADMIN'});
        const user = await Rol.create({ nombre: 'USER'});
    }else{
        res.status(200).json({
            msg: `La configuración inicial ya esta cargada, ${JSON.stringify(roles)}`
        });
    }

    if(usuarios.length===0){
        const salt = bcryptjs.genSaltSync();
        const contrasena = bcryptjs.hashSync('1234678', salt);

        const sysAdmin = await Usuario.create({
            nombre: 'ADRIAN',
            apPaterno: 'ESPINOZA',
            apMaterno: 'AREVALO',
            correo: 'ADRIAN@ADMIN.CL',
            contrasena
        });

        const projectAdmin = await Usuario.create({
            nombre: 'ADRIAN2',
            apPaterno: 'ESPINOZA2',
            apMaterno: 'AREVALO2',
            correo: 'ADRIAN@PROJECT.CL',
            contrasena
        });

        res.status(200).json({
            admin,
            project,
            user,
            sysAdmin,
            projectAdmin
        });
    }
}

module.exports = {
    initConfig
}