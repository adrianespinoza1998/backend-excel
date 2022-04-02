const jwt = require('jsonwebtoken');

const {request, response} = require('express');
const {Usuario} = require('../models/modelsIndex');

const validarJwt = async(req = request,res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try{

        let finalToken;

        if(token.length>139){
            finalToken = token.slice(1, token.length - 1);
        }else{
            finalToken = token;
        }
        
        const {uid} = jwt.verify(finalToken, process.env.SECRET_KEY);
        
        const usuario = await Usuario.findByPk(uid);

        if(!usuario){
            return res.status(201).json({
                msg: 'Token no válido'
            });
        }

        if(!usuario.estado){
            return res.status(201).json({
               msg: 'Token no válido'
            });
        }

        req.usuario = usuario;

        next();
    }catch (error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJwt
}