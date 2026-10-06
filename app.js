let usuarioAtual = null;

async function carregarUsuarioAutenticado() {
  const { data: { session }, error: sessionError } =
    await supabaseClient.auth.getSession();

  if (sessionError) throw sessionError;

  if (!session) {
    usuarioAtual = null;
    window.usuarioAtual = null;
    return false;
  }

  const authUser = session.user;

  const { data: profile, error: profileError } = await supabaseClient
    .from('profiles')
    .select('id, display_name, initials')
    .eq('id', authUser.id)
    .single();

  if (profileError) throw profileError;

  const { data: membership, error: membershipError } = await supabaseClient
    .from('organization_members')
    .select('organization_id, user_id, role, status')
    .eq('user_id', authUser.id)
    .eq('status', 'active')
    .single();

  if (membershipError) throw membershipError;

  const { data: organization, error: organizationError } = await supabaseClient
    .from('organizations')
    .select('id, name')
    .eq('id', membership.organization_id)
    .single();

  if (organizationError) throw organizationError;

  usuarioAtual = {
    id: authUser.id,
    nome: profile.display_name,
    iniciais: profile.initials,
    email: authUser.email,
    role: membership.role,
    status: membership.status,
    organizationId: organization.id,
    organizationName: organization.name
  };

  window.usuarioAtual = usuarioAtual;
  atualizarIndicadorUsuarioAtivo();

  return true;
}

function atualizarIndicadorUsuarioAtivo() {
  if (!usuarioAtual) return;

  const iniciaisEl = document.getElementById('usuario-iniciais');
  const nomeEl = document.getElementById('perfil-nome');
  const emailEl = document.getElementById('perfil-email');
  const roleEl = document.getElementById('perfil-role');
  const organizacaoEl = document.getElementById('perfil-organizacao');

  if (iniciaisEl) iniciaisEl.textContent = usuarioAtual.iniciais || '';
  if (nomeEl) nomeEl.textContent = usuarioAtual.nome || '';
  if (emailEl) emailEl.textContent = usuarioAtual.email || '';
  if (roleEl) roleEl.textContent = usuarioAtual.role || '';
  if (organizacaoEl) {
    organizacaoEl.textContent = usuarioAtual.organizationName || '';
  }
}

async function sair() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    console.error('Falha ao encerrar a sessão:', error);
    alert('Não foi possível sair. Tente novamente.');
    return;
  }

  usuarioAtual = null;
  window.usuarioAtual = null;
  window.location.reload();
}
