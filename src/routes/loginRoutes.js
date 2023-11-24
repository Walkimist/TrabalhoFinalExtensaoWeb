const express = require('express');
const router = express.Router();

const loginController = require('../controller/loginController.js');

router.post('/logar', loginController.logar);
router.get('/sair', loginController.sair);

module.exports = router;