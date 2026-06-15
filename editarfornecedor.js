/* =============================================================
   editarfornecedor.js
   Chás da Laura — Editar Fornecedor
   ============================================================= */

/* ─────────────────────────────────────────────
   ID DO FORNECEDOR ATUAL (variável de módulo)
   Evita dependência de dataset no DOM
───────────────────────────────────────────── */
let _fornecedorAtualId = null;

/* ─────────────────────────────────────────────
   1. INICIALIZAÇÃO
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  iniciarSidebar();
  iniciarMascaras();
  iniciarCidades();       /* deve vir ANTES de carregarFornecedor */
  carregarFornecedor();   /* lê a URL, preenche o form e o painel */
  iniciarPainelAoVivo();
  iniciarModal();
  iniciarBotoes();
});


/* ─────────────────────────────────────────────
   2. ID DA URL
───────────────────────────────────────────── */
function obterIdDaUrl() {
  const raw = new URLSearchParams(window.location.search).get('id');
  if (!raw) return null;
  /* Tenta número; se falhar devolve a string (IDs antigos podem ser strings) */
  const num = Number(raw);
  return isNaN(num) ? raw : num;
}


/* ─────────────────────────────────────────────
   3. CARREGA E PREENCHE O FORNECEDOR
───────────────────────────────────────────── */
function carregarFornecedor() {
  const id = obterIdDaUrl();
  if (!id && id !== 0) {
    showToast('⚠️  Nenhum fornecedor selecionado.', 'error');
    return;
  }

  const lista = carregarDoStorage();
  /* == tolera diferença entre string e number */
  const fornecedor = lista.find(function (f) { return f.id == id; });

  if (!fornecedor) {
    showToast('⚠️  Fornecedor não encontrado.', 'error');
    return;
  }

  /* Guarda o ID na variável de módulo */
  _fornecedorAtualId = fornecedor.id;

  /* ── Preenche os campos do formulário ── */
  setVal('nomeCompleto', fornecedor.nome        || '');
  setVal('cnpj',         fornecedor.cnpj        || '');
  setVal('telefone',     fornecedor.telefone    || '');
  setVal('email',        fornecedor.email       || '');
  setVal('razaoSocial',  fornecedor.razaoSocial || '');
  setVal('lida',         fornecedor.lida        || '');
  setVal('endereco',     fornecedor.endereco    || '');
  setVal('numero',       fornecedor.numero      || '');
  setVal('pagamento',    fornecedor.pagamento   || '');
  setVal('observacao',   fornecedor.observacao  || '');

  /* Categoria */
  const catSel = document.getElementById('categoria');
  if (catSel && fornecedor.categoria) catSel.value = fornecedor.categoria;

  /* Estado → carrega cidades → seleciona cidade */
  const estadoSel = document.getElementById('estado');
  if (estadoSel && fornecedor.estado) {
    estadoSel.value = fornecedor.estado;
    carregarCidades(function () {
      setVal('cidade', fornecedor.cidade || '');
    });
  }

  /* Painel lateral e modal */
  atualizarPainelLateral(fornecedor);
  preencherModal(fornecedor);
}


/* ─────────────────────────────────────────────
   4. PAINEL LATERAL — atualização inicial
───────────────────────────────────────────── */
function atualizarPainelLateral(f) {
  const nome = f.nome || '';

  const avatar = document.querySelector('.sic-avatar');
  if (avatar) avatar.textContent = gerarIniciais(nome);

  const sideNome = document.getElementById('sideNome');
  if (sideNome) sideNome.textContent = nome || '—';

  const sideTel = document.getElementById('sideTel');
  if (sideTel) sideTel.textContent = f.telefone || '—';

  const sideEmail = document.getElementById('sideEmail');
  if (sideEmail) {
    sideEmail.textContent = f.email || '—';
    sideEmail.href = f.email ? 'mailto:' + f.email : '#';
  }

  atualizarEnderecoLateral(
    f.endereco || '',
    f.numero   || '',
    f.cidade   || '',
    f.estado   || ''
  );

  /* Data de cadastro */
  const dataCadEl = document.querySelector('.sic-body .sic-row:last-of-type small');
  if (dataCadEl) {
    dataCadEl.textContent =
      f.cadastrado ||
      (f.cadastradoEm ? new Date(f.cadastradoEm).toLocaleDateString('pt-BR') : '—');
  }
}

function atualizarEnderecoLateral(end, num, cidade, estado) {
  const sideAddr = document.getElementById('sideAddr');
  if (!sideAddr) return;
  const rua = [end, num].filter(Boolean).join(', ');
  const loc = [cidade, estado].filter(Boolean).join(' - ');
  sideAddr.innerHTML =
    (rua || '—') + (loc ? '<br><small>' + escapar(loc) + '</small>' : '');
}


/* ─────────────────────────────────────────────
   5. PAINEL LATERAL — atualização ao vivo
───────────────────────────────────────────── */
function iniciarPainelAoVivo() {
  vincularAoVivo('nomeCompleto', function (val) {
    const sideNome = document.getElementById('sideNome');
    if (sideNome) sideNome.textContent = val || '—';
    const avatar = document.querySelector('.sic-avatar');
    if (avatar) avatar.textContent = gerarIniciais(val);
  });

  vincularAoVivo('telefone', function (val) {
    const sideTel = document.getElementById('sideTel');
    if (sideTel) sideTel.textContent = val || '—';
  });

  vincularAoVivo('email', function (val) {
    const sideEmail = document.getElementById('sideEmail');
    if (sideEmail) {
      sideEmail.textContent = val || '—';
      sideEmail.href = val ? 'mailto:' + val : '#';
    }
  });

  ['endereco', 'numero'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        atualizarEnderecoLateral(
          obterValor('endereco'),
          obterValor('numero'),
          obterValor('cidade') || '',
          obterValor('estado') || ''
        );
      });
    }
  });
}

function vincularAoVivo(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', function () { callback(this.value.trim()); });
  }
}


/* ─────────────────────────────────────────────
   6. CIDADES VIA IBGE
───────────────────────────────────────────── */
const cidadesCache = {};

function iniciarCidades() {
  const estadoSel = document.getElementById('estado');
  if (estadoSel) {
    estadoSel.addEventListener('change', function () { carregarCidades(); });
  }
}

function carregarCidades(callback) {
  const estado    = obterValor('estado');
  const cidadeSel = document.getElementById('cidade');
  if (!cidadeSel) return;

  if (!estado) {
    cidadeSel.innerHTML = '<option value="">Selecione...</option>';
    return;
  }

  cidadeSel.innerHTML = '<option value="">Carregando...</option>';

  if (cidadesCache[estado]) {
    preencherCidades(cidadesCache[estado]);
    if (callback) callback();
    return;
  }

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estado + '/municipios')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      const nomes = data.map(function (c) { return c.nome; }).sort();
      cidadesCache[estado] = nomes;
      preencherCidades(nomes);
      if (callback) callback();
    })
    .catch(function () {
      cidadeSel.innerHTML = '<option value="">Erro ao carregar</option>';
    });
}

function preencherCidades(lista) {
  const sel = document.getElementById('cidade');
  if (!sel) return;
  sel.innerHTML = '<option value="">Selecione...</option>';
  lista.forEach(function (c) {
    const opt = document.createElement('option');
    opt.value       = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

window.carregarCidades = carregarCidades;


/* ─────────────────────────────────────────────
   7. MÁSCARAS
───────────────────────────────────────────── */
function iniciarMascaras() {
  const cnpjEl = document.getElementById('cnpj');
  if (cnpjEl) cnpjEl.addEventListener('input', function () { maskCNPJ(this); });

  const telEl = document.getElementById('telefone');
  if (telEl) telEl.addEventListener('input', function () { maskTel(this); });

  document.querySelectorAll('.form-control').forEach(function (el) {
    el.addEventListener('input', function () { this.classList.remove('input-error'); });
  });
}

function maskCNPJ(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 14);
  v = v.replace(/^(\d{2})(\d)/,          '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/,         '.$1/$2');
  v = v.replace(/(\d{4})(\d)/,           '$1-$2');
  el.value = v;
}

function maskTel(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  else                v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  el.value = v;
}

window.maskCNPJ = maskCNPJ;
window.maskTel  = maskTel;


/* ─────────────────────────────────────────────
   8. SALVAR ALTERAÇÕES
───────────────────────────────────────────── */
function salvarAlteracoes() {
  /* Usa a variável de módulo — não depende do DOM */
  const id = _fornecedorAtualId;

  if (!id && id !== 0) {
    showToast('⚠️  Fornecedor não identificado.', 'error');
    return;
  }

  /* Validação do nome */
  const nomeEl = document.getElementById('nomeCompleto');
  if (!nomeEl || !nomeEl.value.trim()) {
    if (nomeEl) { nomeEl.classList.add('input-error'); nomeEl.focus(); }
    showToast('⚠️  Informe o nome do fornecedor.', 'error');
    return;
  }

  /* Validação de e-mail (se preenchido) */
  const emailEl = document.getElementById('email');
  if (emailEl && emailEl.value.trim() && !validarEmail(emailEl.value.trim())) {
    emailEl.classList.add('input-error');
    showToast('⚠️  Informe um e-mail válido.', 'error');
    return;
  }

  /* Coleta todos os campos */
  const dadosAtualizados = {
    nome:        obterValor('nomeCompleto'),
    cnpj:        obterValor('cnpj'),
    telefone:    obterValor('telefone'),
    email:       obterValor('email'),
    razaoSocial: obterValor('razaoSocial'),
    lida:        obterValor('lida'),
    estado:      obterValor('estado'),
    cidade:      obterValor('cidade'),
    endereco:    obterValor('endereco'),
    numero:      obterValor('numero'),
    categoria:   obterValor('categoria'),
    pagamento:   obterValor('pagamento'),
    observacao:  obterValor('observacao'),
  };

  const ok = atualizarFornecedorNoStorage(id, dadosAtualizados);

  if (ok) {
    showToast('✓  Alterações salvas com sucesso!', 'success');
    setTimeout(function () {
      window.location.href = 'FornecedoresCadastrados.html';
    }, 1600);
  } else {
    showToast('⚠️  Erro ao salvar. Tente novamente.', 'error');
  }
}

window.salvarAlteracoes = salvarAlteracoes;


/* ─────────────────────────────────────────────
   9. MODAL DE EXCLUSÃO
───────────────────────────────────────────── */
function iniciarModal() {
  const overlay = document.getElementById('deleteModal');
  if (!overlay) return;
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeDeleteModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDeleteModal();
  });
}

function preencherModal(f) {
  const initEl = document.querySelector('.modal-initials');
  const nameEl = document.querySelector('.modal-name');
  if (initEl) initEl.textContent = gerarIniciais(f.nome || '');
  if (nameEl) nameEl.textContent = f.nome || '—';

  const detailEls = document.querySelectorAll('.modal-detail');
  if (detailEls[0]) {
    const span = detailEls[0].querySelector('span') || detailEls[0];
    span.textContent = f.telefone || '—';
  }
  if (detailEls[1]) {
    const span = detailEls[1].querySelector('span') || detailEls[1];
    const end = [f.endereco, f.numero].filter(Boolean).join(', ');
    const loc = [f.cidade, f.estado].filter(Boolean).join(' - ');
    span.textContent = [end, loc].filter(Boolean).join(' — ') || '—';
  }
}

function openDeleteModal() {
  /* Atualiza modal com valores atuais do formulário */
  const nome     = obterValor('nomeCompleto');
  const telefone = obterValor('telefone');
  const end      = obterValor('endereco');
  const num      = obterValor('numero');
  const cidade   = obterValor('cidade');
  const estado   = obterValor('estado');

  const initEl = document.querySelector('.modal-initials');
  const nameEl = document.querySelector('.modal-name');
  if (initEl) initEl.textContent = gerarIniciais(nome);
  if (nameEl) nameEl.textContent = nome || '—';

  const detailEls = document.querySelectorAll('.modal-detail');
  if (detailEls[0]) {
    const span = detailEls[0].querySelector('span') || detailEls[0];
    span.textContent = telefone || '—';
  }
  if (detailEls[1]) {
    const span = detailEls[1].querySelector('span') || detailEls[1];
    const endStr = [end, num].filter(Boolean).join(', ');
    const locStr = [cidade, estado].filter(Boolean).join(' - ');
    span.textContent = [endStr, locStr].filter(Boolean).join(' — ') || '—';
  }

  const overlay = document.getElementById('deleteModal');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeDeleteModal() {
  const overlay = document.getElementById('deleteModal');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function excluirFornecedor() {
  const id = _fornecedorAtualId;

  if (id || id === 0) {
    let lista = carregarDoStorage();
    lista = lista.filter(function (f) { return f.id != id; });
    localStorage.setItem('fornecedores', JSON.stringify(lista));
  }

  closeDeleteModal();
  showToast('Fornecedor excluído com sucesso.', 'success');
  setTimeout(function () {
    window.location.href = 'FornecedoresCadastrados.html';
  }, 1400);
}

window.openDeleteModal   = openDeleteModal;
window.closeDeleteModal  = closeDeleteModal;
window.excluirFornecedor = excluirFornecedor;


/* ─────────────────────────────────────────────
   10. BOTÕES
───────────────────────────────────────────── */
function iniciarBotoes() {
  /* Cancelar / Voltar */
  document.querySelectorAll('.btn-voltar, .btn-cancelar').forEach(function (btn) {
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener('click', function () {
        window.location.href = 'FornecedoresCadastrados.html';
      });
    }
  });

  /* Salvar */
  const btnSalvar = document.querySelector('.btn-salvar');
  if (btnSalvar && !btnSalvar.getAttribute('onclick')) {
    btnSalvar.addEventListener('click', salvarAlteracoes);
  }

  /* Excluir */
  const btnExcluir = document.querySelector('.btn-excluir-forn');
  if (btnExcluir && !btnExcluir.getAttribute('onclick')) {
    btnExcluir.addEventListener('click', openDeleteModal);
  }
}


/* ─────────────────────────────────────────────
   11. SIDEBAR
───────────────────────────────────────────── */
function toggleSidebar() {
  const sb = document.querySelector('.sidebar');
  if (sb) sb.classList.toggle('open');
}

function toggleGroup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function iniciarSidebar() {
  /* Garante que o submenu de Cadastros começa aberto */
  const subCad = document.getElementById('navCadastros') ||
                 document.getElementById('sub-cadastros');
  if (subCad) {
    subCad.classList.add('open');
    subCad.style.display = 'block';
  }
}

window.toggleSidebar = toggleSidebar;
window.toggleGroup   = toggleGroup;


/* ─────────────────────────────────────────────
   12. TOAST
───────────────────────────────────────────── */
function showToast(msg, type) {
  type = type || 'success';

  const staticToast = document.getElementById('toast');
  if (staticToast) {
    staticToast.textContent = msg;
    staticToast.className   = 'toast show ' + type;
    clearTimeout(staticToast._timer);
    staticToast._timer = setTimeout(function () {
      staticToast.classList.remove('show');
    }, 3000);
    return;
  }

  /* Fallback dinâmico */
  const existing = document.querySelector('.toast-dyn');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast toast-dyn';
  if (type === 'error') toast.style.background = 'var(--red-500, #ef4444)';

  toast.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
    (type === 'error'
      ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
      : '<polyline points="20 6 9 17 4 12"/>') +
    '</svg>' + msg;

  document.body.appendChild(toast);
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}

window.showToast = showToast;


/* ─────────────────────────────────────────────
   13. PERSISTÊNCIA
───────────────────────────────────────────── */
function carregarDoStorage() {
  try {
    const raw = localStorage.getItem('fornecedores');
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return [];
}

function atualizarFornecedorNoStorage(id, dados) {
  try {
    const lista = carregarDoStorage();
    /* == tolera string vs number */
    const idx = lista.findIndex(function (f) { return f.id == id; });
    if (idx === -1) return false;
    /* Preserva id, cadastrado, cadastradoEm originais */
    lista[idx] = Object.assign({}, lista[idx], dados);
    localStorage.setItem('fornecedores', JSON.stringify(lista));
    return true;
  } catch (e) { return false; }
}


/* ─────────────────────────────────────────────
   14. UTILITÁRIOS
───────────────────────────────────────────── */
function obterValor(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setVal(id, valor) {
  const el = document.getElementById(id);
  if (el) el.value = valor;
}

function gerarIniciais(nome) {
  if (!nome) return '??';
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

function escapar(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}