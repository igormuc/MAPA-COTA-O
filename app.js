// Array para armazenar todos os usuários ativos no seu sistema
let usuariosDoSistema = [
  { id: 'usr-1', nome: 'Magnum Tires Admin', email: 'admin@magnumtires.com.br', iniciais: 'MT', cargo: 'Administrador' },
  { id: 'usr-2', nome: 'Isabela Oliveira', email: 'isabela@magnumtires.com.br', iniciais: 'I', cargo: 'Comprador' }
];

let usuarioLogadoId = 'usr-1';

// Função para Selecionar/Alternar Usuário de Trabalho
function selecionarUsuario(id) {
  const usuario = usuariosDoSistema.find(u => u.id === id);
  if (!usuario) return;

  usuarioLogadoId = id;

  // Atualiza as variáveis globais da sua plataforma se houver
  window.usuarioAtual = usuario;

  // Notifica no console e atualiza a interface
  console.log(`Sessão alterada para: ${usuario.nome} (${usuario.cargo})`);
  
  // Dispara a atualização dos seus dados/tabelas para o novo usuário
  if (typeof recarregarDadosPlataforma === 'function') {
    recarregarDadosPlataforma(usuario);
  }
  
  atualizarIndicadorUsuarioAtivo();
}

// Função para Adicionar um Novo Usuário de Trabalho via JS
function adicionarNovoUsuario(nome, email, iniciais, cargo) {
  const novoUsuario = {
    id: 'usr-' + Date.now(),
    nome: nome,
    email: email,
    iniciais: iniciais.toUpperCase(),
    cargo: cargo || 'Operador'
  };

  usuariosDoSistema.push(novoUsuario);
  renderizarOpcoesDeUsuarios();
  return novoUsuario;
}

// Atualiza o elemento visual do topo para mostrar qual usuário está trabalhando agora
function atualizarIndicadorUsuarioAtivo() {
  const ativo = usuariosDoSistema.find(u => u.id === usuarioLogadoId);
  const badgeEl = document.getElementById('badge-usuario-ativo');
  
  if (badgeEl && ativo) {
    badgeEl.innerText = ativo.iniciais;
    badgeEl.title = `Trabalhando como: ${ativo.nome} (${ativo.cargo})`;
  }
}