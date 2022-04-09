const { Router } = require("express");
const { check } = require('express-validator');

const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const { uploadModel, mostrarModelo } = require("../controllers/uploadController");

const router = new Router();

router.get('/:id',[
    validarJwt,
    check("id","El id es obligatorio").not().isEmpty(),
    validarCampos
], mostrarModelo);

router.put('/:id',[
    validarJwt,
    check("id","El id es obligatorio").not().isEmpty(),
    validarArchivoSubir,
    validarCampos
], uploadModel);

module.exports = router;