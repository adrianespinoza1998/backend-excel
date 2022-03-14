const {request, response} = require('express');
const {Item} = require('../models/Item');

const getItems = async(req = request, res = response)=>{
    Item.sync();

    const items = await Item.findAll();

    res.status(200).json(items);
}

const crearItem = async(req = request, res = response)=>{

    Item.sync();

    const {items} = req.body;

    try{
        for(let i= 1; i<items.length; i++){
            const item = await Item.create({
                bmp: items[i][0],
                wbs: items[i][1],
                descripcion: items[i][2],
                unidad: items[i][3],
                cantidad: items[i][4]
            });
    
            await item.save();
        }
    
        res.status(200).json({
            msg: 'Items insertados'
        });
    }catch(error){
        console.log(error);

        res.status(200).json({
            msg: `Error al insertar item`
        });
    }
}

module.exports = {
    getItems,
    crearItem
}