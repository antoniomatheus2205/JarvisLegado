const express = require('express');
const router = express.Router();
const corretorController = require('../controllers/corretorController');

router.post('/cadastrar', corretorController.cadastrarCorretor);
router.post('/recuperar-senha', corretorController.recuperarSenha);
router.post('/login', corretorController.loginCorretor);

module.exports = router;
