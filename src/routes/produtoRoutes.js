const express = require('express');
const router = express.Router();

const produtoController = require('../controller/produtoController');
const loginController = require('../controller/loginController');

router.get('/', produtoController.indexView);
router.get('/home', loginController.verificarLogin, produtoController.homeView);

router.post('/editar_produto', loginController.verificarLogin, produtoController.configProductView);
router.post('/cadastrar_produto', loginController.verificarLogin, produtoController.cadastrarProduto);
router.post('/excluir_produto', loginController.verificarLogin, produtoController.excluirProduto);
router.post('/atualizar_produto', loginController.verificarLogin, produtoController.atualizarProduto);

router.post('/adicionar_transacao', loginController.verificarLogin, produtoController.cadastrarTransacao);
router.post('/excluir_transacao', loginController.verificarLogin, produtoController.excluirTransacao);
router.post('/editar_transacao', loginController.verificarLogin, produtoController.configTransactionView);
router.post('/atualizar_transacao', loginController.verificarLogin, produtoController.atualizarTransacao);

module.exports = router;