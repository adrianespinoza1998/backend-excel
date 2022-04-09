const { subirArchivo } = require("../helpers/subir-archivo");
const { Proyecto } = require("../models/modelsIndex");

const path = require('path');
const { request } = require("express");
const { response } = require("express");

const mostrarModelo = async(req = request, res = response)=>{
    const {id} = req.params;

    const proyecto = await Proyecto.findByPk(id);

    if(proyecto){
        const finalPath = path.join(__dirname, '../uploads/models/'+proyecto.urlModelo);
    
        res.status(200).sendFile(finalPath);
    }else{
        res.status(200).json({
            msg: `No existe proyecto con el id: ${id}`
        });
    }
}

const uploadModel = async (req = request, res = response) => {
    await Proyecto.sync();

    const { id } = req.params;

    const proyecto = await Proyecto.findByPk(id);

    try {
        const nombre = await subirArchivo(req.files, ['ifc'], 'models');

        proyecto.set({
            urlModelo: nombre
        });

        await proyecto.save();

        res.status(200).json(proyecto);
    } catch (error) {
        console.log(error);

        res.status(200).json({
            msg: `No se pudo cargar el modelo del proyecto con el id: ${id}`
        });
    }

}

module.exports = {
    mostrarModelo,
    uploadModel
}