const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController.js');
const loginController = require('../controller/loginController');

router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);
router.get('/atualizar_dados', loginController.verificarLogin, usuarioController.configUserView);
router.post('/atualizar_dados', loginController.verificarLogin, usuarioController.atualizarDados);

module.exports = router;