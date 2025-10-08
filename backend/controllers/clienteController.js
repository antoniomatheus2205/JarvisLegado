const fs = require('fs');
const path = require('path');
const clientesPath = path.join(__dirname, '../database/clientes.json');

exports.cadastrarCliente = (req, res) => {
  const { nome, email, cpf, corretorId } = req.body;

  if (!nome || !email || !cpf || !corretorId) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  const novoCliente = {
    id: Date.now(),
    nome,
    email,
    cpf,
    corretorId
  };

  let clientes = [];
  if (fs.existsSync(clientesPath)) {
    clientes = JSON.parse(fs.readFileSync(clientesPath));
  }

  clientes.push(novoCliente);
  fs.writeFileSync(clientesPath, JSON.stringify(clientes, null, 2));

  res.json({ mensagem: 'Cliente cadastrado com sucesso' });
};

exports.listarClientes = (req, res) => {
  const { corretorId } = req.query;

  if (!corretorId) {
    return res.status(400).json({ erro: 'Informe o corretorId' });
  }

  let clientes = [];
  if (fs.existsSync(clientesPath)) {
    clientes = JSON.parse(fs.readFileSync(clientesPath));
  }

  const filtrados = clientes.filter(c => String(c.corretorId) === String(corretorId));
  res.json(filtrados);
};
