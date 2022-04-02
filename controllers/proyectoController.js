const { request, response } = require("express");

const {Proyecto} = require("../models/modelsIndex");

const listarProyectos = async(req = request, res = response)=>{
    await Proyecto.sync();

    const proyectos = await Proyecto.findAll({
        where: {
            estado: true
        }
    });

    res.status(200).json(proyectos);
}

const buscarProyectoXId = async(req = request, res = response)=>{
    await Proyecto.sync();

    const {id} = req.params;

    const proyecto = await Proyecto.findByPk(id);

    if(!proyecto){
        return res.status(200).json({});
    }

    if(proyecto.estado){
        res.status(200).json(proyecto);
    }else{
        res.status(200).json({});
    }
}

const crearProyecto = async(req = request, res = response)=>{
    await Proyecto.sync();   

    const {nombreProyecto} = req.body;

    const idUsuario = req.usuario.idUsuario;

    const proyecto = await Proyecto.create({
        nombreProyecto: nombreProyecto.toUpperCase(),
        idUsuario
    });

    await proyecto.save();

    res.status(200).json(proyecto);

}

const editarProyecto = async(req = request, res = response)=>{
    await Proyecto.sync();

    const {id} = req.params;
    const {nombreProyecto} = req.body;

    const proyecto = await Proyecto.findByPk(id);

    if(!proyecto){
        return res.status(200).json({
            msg: `Proyecto con el id: ${id} no encontrado`
        });
    }

    if(proyecto.estado){
        proyecto.set({
            nombreProyecto: nombreProyecto.toUpperCase()
        });

        await proyecto.save();

        res.status(200).json(proyecto);
    }else{
        res.status(200).json({
            msg: `Proyecto con el id: ${id} no encontrado`
        });
    }
}

const desactivarProyecto = async(req = request, res = response)=>{
    await Proyecto.sync();

    const {id} = req.params;

    const proyecto = await Proyecto.findByPk(id);

    if(!proyecto){
        return res.status(200).json({
            msg: `Proyecto con el id: ${id} no encontrado`
        });
    }

    if(proyecto.estado){
        proyecto.set({
            estado: false
        });

        await proyecto.save();

        res.status(200).json(proyecto);
    }else{
        res.status(200).json({
            msg: `Proyecto con el id: ${id} no encontrado`
        });
    }
}

module.exports = {
    listarProyectos,
    buscarProyectoXId,
    crearProyecto,
    editarProyecto,
    desactivarProyecto
}