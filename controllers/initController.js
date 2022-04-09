const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const {Rol, Usuario, Proyecto, Item} = require("../models/modelsIndex");

const initConfig = async(req = request, res = response)=>{

    await Rol.sync();
    await Usuario.sync();
    await Proyecto.sync();
    await Item.sync();


    const roles = await Rol.findAll();
    const usuarios = await Usuario.findAll();

    if(roles.length === 0){
        const admin = await Rol.create({ nombre: 'SYS_ADMIN'});
        const project = await Rol.create({ nombre: 'PROJECT_ADMIN'});
        const user = await Rol.create({ nombre: 'USER'});

        if(usuarios.length===0){
            const salt = bcryptjs.genSaltSync();
            const contrasena = bcryptjs.hashSync('12345678', salt);
    
            const sysAdmin = await Usuario.create({
                nombre: 'ADRIAN',
                apPaterno: 'ESPINOZA',
                apMaterno: 'AREVALO',
                correo: 'ADRIAN@ADMIN.CL',
                contrasena,
                idRol: 1
            });
    
            const projectAdmin = await Usuario.create({
                nombre: 'ADRIAN2',
                apPaterno: 'ESPINOZA2',
                apMaterno: 'AREVALO2',
                correo: 'ADRIAN@PROJECT.CL',
                contrasena,
                idRol: 2
            });

            res.status(200).json({
                admin,
                project,
                user,
                sysAdmin,
                projectAdmin
            });
        }else{
            res.status(200).json({
                admin,
                project,
                user
            });
        }
    }else{
        res.status(200).json({
            msg: `La configuración inicial ya esta cargada, ${JSON.stringify(roles)}`
        });
    }
}

module.exports = {
    initConfig
}