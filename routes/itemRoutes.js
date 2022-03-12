const { Router } = require("express");
const { crearItem, getItems } = require("../controllers/itemController");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = new Router();

router.get('/',[
    validarJwt
], getItems);

router.post('/', [
    validarJwt
], crearItem);

module.exports = router;