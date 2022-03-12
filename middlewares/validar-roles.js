const {Rol} = require('../models/modelsIndex');

const rolExiste = async(req, res, next) => {
    //Sincronizar tabla
    await Rol.sync();

    const token = req.headers['x-token']; 

    const roles = await Rol.findAll({
        where: {estado: true}
    });

    if(roles.includes()){

    }
}

module.exports = {
    rolExiste
}