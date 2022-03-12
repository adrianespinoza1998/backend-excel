const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, listarUsuarios, buscarUsuarioXId, editarUsuario, desactivarUsuario } = require('../controllers/usuarioController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

//Listar usuarios
router.get('/',[],listarUsuarios);

//Buscar usuario x id
router.get('/:id',[
    check('id','El id es obligatorio').not().isEmpty(),
    validarCampos
], buscarUsuarioXId);

//Crear usuarios
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre debe ser string').isString(),
    check('nombre','El nombre debe contener minimo 2 caracteres').isLength({min:2}),
    check('apPaterno','El apPaterno es obligatorio').not().isEmpty(),
    check('apPaterno','El apPaterno debe ser string').isString(),
    check('apPaterno','El apPaterno debe contener minimo 2 caracteres').isLength({min:2}),
    check('apMaterno','El apMaterno es obligatorio').not().isEmpty(),
    check('apMaterno','El apMaterno debe ser string').isString(),
    check('apMaterno','El apMaterno debe contener minimo 2 caracteres').isLength({min:2}),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo debe ser string').isString(),
    check('correo','El correo debe ser valido').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    check('contrasena','La contraseña debe ser string').isString(),
    check('contrasena','La contraseña debe contener minimo 8 caracteres').isLength({min:8}),
    check('idRol','El rol es obligatorio').not().isEmpty(),
    check('idRol','El rol debe ser un entero').isInt(),
    validarCampos
], crearUsuario);

//Crear usuarios
router.put('/:id',[
    check('id','El id es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre debe ser string').isString(),
    check('nombre','El nombre debe contener minimo 2 caracteres').isLength({min:2}),
    check('apPaterno','El apPaterno es obligatorio').not().isEmpty(),
    check('apPaterno','El apPaterno debe ser string').isString(),
    check('apPaterno','El apPaterno debe contener minimo 2 caracteres').isLength({min:2}),
    check('apMaterno','El apMaterno es obligatorio').not().isEmpty(),
    check('apMaterno','El apMaterno debe ser string').isString(),
    check('apMaterno','El apMaterno debe contener minimo 2 caracteres').isLength({min:2}),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo debe ser string').isString(),
    check('correo','El correo debe ser valido').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    check('contrasena','La contraseña debe ser string').isString(),
    check('contrasena','La contraseña debe contener minimo 8 caracteres').isLength({min:8}),
    check('idRol','El rol es obligatorio').not().isEmpty(),
    check('idRol','El rol debe ser un entero').isInt(),
    validarCampos
], editarUsuario);

router.delete('/:id',[
    check('id','El id es obligatorio').not().isEmpty(),
    validarCampos
], desactivarUsuario);

module.exports = router;