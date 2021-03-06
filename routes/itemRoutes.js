const { Router } = require("express");
const { check } = require('express-validator');

const { crearItem, getItems, getItemsXProyecto } = require("../controllers/itemController");
const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.get('/',[
    validarJwt
], getItems);

router.get('/:id',[
    validarJwt,
    check("id","El id es obligatorio").not().isEmpty(),
    check("id","El id debe ser un numero").isNumeric(),
    validarCampos
], getItemsXProyecto);

router.post('/', [
    validarJwt,
    check("items","Los items deben ser arrays").isArray(),
    check("items","El largo del array debe ser mayor a 0").isLength({min: 1}),
    validarCampos
], crearItem);

module.exports = router;