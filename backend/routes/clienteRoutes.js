const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/cadastrar', clienteController.cadastrarCliente);
router.get('/listar', clienteController.listarClientes);

module.exports = router;
