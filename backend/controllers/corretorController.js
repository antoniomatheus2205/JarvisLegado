const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const corretoresPath = path.join(__dirname, '../database/corretores.json');

// Função para enviar e-mail
function enviarEmail(destinatario, assunto, mensagem) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seuemail@gmail.com', // substitua pelo seu email
      pass: 'sua-senha-de-app'     // use senha de app do Gmail
    }
  });

  const mailOptions = {
    from: 'Grupo Legado <seuemail@gmail.com>',
    to: destinatario,
    subject: assunto,
    text: mensagem
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
}

// Cadastro
exports.cadastrarCorretor = (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ erro: 'Preencha todos os campos' });

  let corretores = fs.existsSync(corretoresPath) ? JSON.parse(fs.readFileSync(corretoresPath)) : [];
  if (corretores.find(c => c.email === email)) return res.status(400).json({ erro: 'Email já cadastrado' });

  const novoCorretor = { id: Date.now(), nome, email, senha };
  corretores.push(novoCorretor);
  fs.writeFileSync(corretoresPath, JSON.stringify(corretores, null, 2));

  enviarEmail(email, 'Cadastro realizado com sucesso', `Olá ${nome}, seu cadastro na plataforma Legado foi realizado com sucesso!`);
  res.json({ mensagem: 'Corretor cadastrado com sucesso' });
};

// Recuperar senha
exports.recuperarSenha = (req, res) => {
  const { email } = req.body;
  let corretores = fs.existsSync(corretoresPath) ? JSON.parse(fs.readFileSync(corretoresPath)) : [];
  const corretor = corretores.find(c => c.email === email);
  if (!corretor) return res.status(404).json({ erro: 'Email não encontrado' });

  const novaSenha = Math.random().toString(36).slice(-8);
  corretor.senha = novaSenha;
  fs.writeFileSync(corretoresPath, JSON.stringify(corretores, null, 2));

  enviarEmail(email, 'Nova senha de acesso', `Olá ${corretor.nome}, sua nova senha de acesso à plataforma Legado é: ${novaSenha}`);
  res.json({ mensagem: 'Nova senha enviada para seu email' });
};

// Login
exports.loginCorretor = (req, res) => {
  const { email, senha } = req.body;
  let corretores = fs.existsSync(corretoresPath) ? JSON.parse(fs.readFileSync(corretoresPath)) : [];
  const corretor = corretores.find(c => c.email === email && c.senha === senha);
  if (!corretor) return res.status(401).json({ erro: 'Email ou senha inválidos' });

  res.json({ mensagem: 'Login realizado com sucesso', corretorId: corretor.id });
};
