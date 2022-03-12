const { Router } = require("express");
const { login } = require("../controllers/authController");

const router = new Router();

router.post('/',[], login);

module.exports = router;