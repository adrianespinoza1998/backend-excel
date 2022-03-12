const {Router} = require('express');
const { initConfig } = require('../controllers/initController');

const router = new Router();

router.get('/', [], initConfig);

module.exports = router;