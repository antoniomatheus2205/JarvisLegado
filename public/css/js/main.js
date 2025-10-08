// LOGIN
document.getElementById('formLogin')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const senha = e.target.senha.value;

  const res = await fetch('http://localhost:3001/corretor/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const json = await res.json();
  if (json.corretorId) {
    alert('Login realizado com sucesso!');
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginErro').textContent = json.erro || 'Erro ao fazer login';
  }
});

// CADASTRO
document.getElementById('formCadastroCorretor')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const dados = {
    nome: form.nome.value,
    email: form.email.value,
    senha: form.senha.value
  };

  const res = await fetch('http://localhost:3001/corretor/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  const json = await res.json();
  if (json.mensagem) {
    alert(json.mensagem);
    mostrar('formLogin');
  } else {
    document.getElementById('cadastroErro').textContent = json.erro || 'Erro ao cadastrar';
  }
});

// RECUPERAÇÃO DE SENHA
document.getElementById('formRecuperarSenha')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = e.target.email.value;

  const res = await fetch('http://localhost:3001/corretor/recuperar-senha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const json = await res.json();
  if (json.mensagem) {
    alert(json.mensagem);
    mostrar('formLogin');
  } else {
    document.getElementById('recuperarErro').textContent = json.erro || 'Erro ao recuperar senha';
  }
});

// Função para alternar formulários
function mostrar(id) {
  document.getElementById('formLogin')?.classList.add('hidden');
  document.getElementById('formCadastroCorretor')?.classList.add('hidden');
  document.getElementById('formRecuperarSenha')?.classList.add('hidden');
  document.getElementById(id)?.classList.remove('hidden');
}
