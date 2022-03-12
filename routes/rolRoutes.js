const { Router } = require("express");
const { check } = require("express-validator");
const { crearRol, listarRoles, buscarRolXId, editarRol, desactivarRol } = require("../controllers/rolController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = new Router();

//Listar Roles
router.get('/',[
    validarJwt
], listarRoles);

//Buscar rol x id
router.get('/:id',[
    validarJwt,
    check('id','El id es obligatorio').not().isEmpty(),
    validarCampos
], buscarRolXId);

//Crear Rol
router.post('/',[
    validarJwt,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre debe ser un string').isString(),
    check('nombre','El nombre debe contener minimo 2 caracteres').isLength({min:2}),
    validarCampos
], crearRol);

router.put('/:id',[
    validarJwt,
    check('id','El id es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre debe ser un string').isString(),
    check('nombre','El nombre debe contener minimo 2 caracteres').isLength({min:2}),
    validarCampos
], editarRol);

router.delete('/:id',[
    validarJwt,
    check('id','El id es obligatorio').not().isEmpty(),
    validarCampos
], desactivarRol);

module.exports = router;