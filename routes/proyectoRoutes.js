const { Router } = require("express");
const { crearProyecto, listarProyectos, buscarProyectoXId, editarProyecto, desactivarProyecto } = require("../controllers/proyectoController");
const { validarJwt } = require("../middlewares/validar-jwt");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.get('/',[
    validarJwt,
    validarCampos
], listarProyectos);

router.get('/:id',[
    validarJwt,
    check("id","El id es obligatorio").not().isEmpty(),
    check("id","El id debe ser un numero").isNumeric(),
    validarCampos
], buscarProyectoXId);

router.post('/',[
    validarJwt,
    check("nombreProyecto", "El nombre del proyecto es obligatorio").not().isEmpty(),
    check("nombreProyecto","El largo debe ser minimo de 2 caracteres").isLength({min: 2}),
    validarCampos
], crearProyecto);

router.put('/:id',[
    validarJwt,
    check("nombreProyecto", "El nombre del proyecto es obligatorio").not().isEmpty(),
    check("nombreProyecto","El largo debe ser minimo de 2 caracteres").isLength({min: 2}),
    validarCampos
], editarProyecto);

router.delete('/:id',[
    validarJwt,
    validarCampos
], desactivarProyecto);

module.exports = router;