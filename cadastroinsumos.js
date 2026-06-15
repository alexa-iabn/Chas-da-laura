/* =============================================================
   cadastroinsumos.js
   Chás da Laura — Cadastro de Insumos
   ============================================================= */

/* ─────────────────────────────────────────────
   1. LISTA DE SUGESTÕES
───────────────────────────────────────────── */
const INSUMOS_SUGERIDOS = [
  'Camomila','Erva-doce','Hortelã','Capim-limão','Chá-preto','Chá-verde',
  'Canela em casca','Gengibre desidratado','Hibisco','Lavanda','Melissa',
  'Cúrcuma','Cravo-da-índia','Anis-estrelado','Infusor inox redondo',
  'Álcool de cereal','Corrente para infusor','Tela de aço inox','Argola metálica',
  'Lata para blend',
];

/* ─────────────────────────────────────────────
   2. INICIALIZAÇÃO
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  iniciarSidebar();
  iniciarFormulario();
  carregarFornecedoresDoStorage();
  renderMiniTabela(carregarInsumosDoStorage());
  iniciarAutocompletarNome();
});

/* ─────────────────────────────────────────────
   3. SIDEBAR
───────────────────────────────────────────── */
function iniciarSidebar() {
  const sub = document.getElementById('cadastrosSub');
  if (sub) sub.style.display = 'block';
}

function toggleNav(el) {
  const mapa = {
    cadastrosToggle: 'cadastrosSub',
    estoqueToggle:   'estoqueSub',
  };
  const subId = mapa[el.id];
  if (!subId) return;
  const sub = document.getElementById(subId);
  if (!sub) return;
  const aberto = sub.style.display !== 'none';
  sub.style.display = aberto ? 'none' : 'block';
  el.classList.toggle('open', !aberto);
}

window.toggleNav = toggleNav;

/* ─────────────────────────────────────────────
   4. FORMULÁRIO
───────────────────────────────────────────── */
function iniciarFormulario() {
  const form = document.getElementById('formInsumo');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmit(e);
  });

  form.querySelectorAll('.form-control').forEach(function (input) {
    input.addEventListener('input', function () {
      this.classList.remove('input-error');
    });
  });
}

function handleSubmit(e) {
  if (e) e.preventDefault();

  const nomeEl = document.getElementById('nomeInsumo');
  const nome   = nomeEl ? nomeEl.value.trim() : '';

  if (!nome) {
    if (nomeEl) { nomeEl.classList.add('input-error'); nomeEl.focus(); }
    showToast('⚠️  Informe o nome do insumo.', true);
    return;
  }

  const qtd        = obterValor('qtdInsumo');
  const unidade    = obterValor('unidadeInsumo') || 'KG';
  const fornecedor = obterValor('fornecedorInsumo');
  const validade   = obterValor('validadeInsumo');
  const estoqueMin = obterValor('estoqueMin');
  const valor      = obterValor('valorInsumo');
  const desc       = obterValor('descInsumo');

  /* ── Estrutura compatível com InsumosCadastrados ── */
  const novoInsumo = {
    id:          Date.now(),
    nome:        nome,
    categoria:   inferirCategoria(nome),
    /* quantidade formatada igual aos dados iniciais */
    quantidade:  qtd ? (qtd + ' ' + unidade) : '—',
    qtdBruta:    qtd  || '0',
    unidade:     unidade,
    fornecedor:  fornecedor || '—',
    /* validade como string YYYY-MM-DD (mesmo formato dos INSUMOS_INICIAIS) */
    validade:    validade   || null,
    estoqueMin:  estoqueMin || '0',
    /* estoque inicial = qtdBruta para aparecer no resumo */
    estoque:     Number(qtd) || 0,
    valor:       valor || '0',
    descricao:   desc,
    data:        new Date().toLocaleDateString('pt-BR'),
  };

  salvarInsumo(novoInsumo);

  renderMiniTabela(carregarInsumosDoStorage());
  document.getElementById('formInsumo').reset();
  showToast('✓  Insumo salvo com sucesso!');
}

window.handleSubmit = handleSubmit;

/* ─────────────────────────────────────────────
   5. MINI TABELA
───────────────────────────────────────────── */
function renderMiniTabela(lista) {
  atualizarMiniTabela(lista);
}

function atualizarMiniTabela(lista) {
  const tbody = document.getElementById('miniTableBody');
  if (!tbody) return;

  if (!lista.length) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align:center;color:var(--gray-text,#888);padding:20px">' +
      'Nenhum insumo encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(function (r) {
    return (
      '<tr>' +
        '<td>' + escapar(r.nome)       + '</td>' +
        '<td>' + escapar(r.categoria)  + '</td>' +
        '<td>' + escapar(r.quantidade) + '</td>' +
        '<td>' + escapar(r.fornecedor) + '</td>' +
        '<td>' +
          '<div class="td-actions">' +
            '<button class="action-btn edit" title="Editar" onclick="editarMini(' + r.id + ')">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7c74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
            '</button>' +
            '<button class="action-btn del" title="Excluir" onclick="excluirMini(' + r.id + ')">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c0392b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>' +
            '</button>' +
          '</div>' +
        '</td>' +
      '</tr>'
    );
  }).join('');
}

function filterMini() {
  const q     = (document.getElementById('miniSearch') || {}).value || '';
  const termo = q.toLowerCase();
  const todos = carregarInsumosDoStorage();
  const res   = todos.filter(function (r) {
    return (
      r.nome.toLowerCase().includes(termo) ||
      (r.categoria  || '').toLowerCase().includes(termo) ||
      (r.fornecedor || '').toLowerCase().includes(termo)
    );
  });
  atualizarMiniTabela(res);
}

function excluirMini(id) {
  let lista = carregarInsumosDoStorage();
  lista = lista.filter(function (i) { return i.id !== id; });
  localStorage.setItem('insumos', JSON.stringify(lista));
  renderMiniTabela(lista);
  showToast('Insumo removido.');
}

function editarMini(id) {
  window.location.href = 'EditarInsumo.html?id=' + id;
}

function scrollToForm() {
  const form = document.getElementById('formInsumo');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
    const nomeInput = document.getElementById('nomeInsumo');
    if (nomeInput) setTimeout(function () { nomeInput.focus(); }, 400);
  }
}

window.filterMini   = filterMini;
window.excluirMini  = excluirMini;
window.editarMini   = editarMini;
window.scrollToForm = scrollToForm;

/* ─────────────────────────────────────────────
   6. AUTOCOMPLETE
───────────────────────────────────────────── */
function iniciarAutocompletarNome() {
  const input = document.getElementById('nomeInsumo');
  if (!input) return;
  const datalist = document.createElement('datalist');
  datalist.id = 'sugestoesNome';
  INSUMOS_SUGERIDOS.forEach(function (s) {
    const opt = document.createElement('option');
    opt.value = s;
    datalist.appendChild(opt);
  });
  document.body.appendChild(datalist);
  input.setAttribute('list', 'sugestoesNome');
}

/* ─────────────────────────────────────────────
   7. PERSISTÊNCIA
───────────────────────────────────────────── */
function carregarInsumosDoStorage() {
  try {
    const raw = localStorage.getItem('insumos');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.length) return parsed;
    }
  } catch (e) { /* ignore */ }

  const iniciais = [
    { id:1, nome:'Folha de camomila', categoria:'Ervas',       quantidade:'4 KG',  qtdBruta:'4',   unidade:'KG', estoque:4,  estoqueMin:'5', fornecedor:'Nutribom alimentos LTDA', data:'10/05/2025', validade:null },
    { id:2, nome:'Hibisco flor',      categoria:'Flores',      quantidade:'20 UN', qtdBruta:'20',  unidade:'UN', estoque:20, estoqueMin:'5', fornecedor:'Nutribom alimentos LTDA', data:'10/05/2025', validade:null },
    { id:3, nome:'Canela em pau',     categoria:'Especiarias', quantidade:'500 G', qtdBruta:'500', unidade:'G',  estoque:500,estoqueMin:'5', fornecedor:'Nutribom alimentos LTDA', data:'10/05/2025', validade:null },
  ];
  localStorage.setItem('insumos', JSON.stringify(iniciais));
  return iniciais;
}

function salvarInsumo(insumo) {
  const lista = carregarInsumosDoStorage();
  lista.unshift(insumo);
  localStorage.setItem('insumos', JSON.stringify(lista));
}

function carregarFornecedoresDoStorage() {
  const select = document.getElementById('fornecedorInsumo');
  if (!select) return;
  try {
    const raw = localStorage.getItem('fornecedores');
    if (!raw) return;
    const fornecedores = JSON.parse(raw);
    if (!fornecedores.length) return;
    select.innerHTML = '<option value="">Selecione o fornecedor</option>';
    fornecedores.forEach(function (f) {
      const opt = document.createElement('option');
      opt.value       = f.nome;
      opt.textContent = f.nome;
      select.appendChild(opt);
    });
  } catch (e) { /* mantém opções estáticas */ }
}

/* ─────────────────────────────────────────────
   8. TOAST
───────────────────────────────────────────── */
function showToast(msg, erro) {
  let toast = document.getElementById('toast');
  if (toast) {
    toast.className = 'toast' + (erro ? ' erro' : '');
    toast.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      (erro
        ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
        : '<polyline points="20 6 9 17 4 12"/>') +
      '</svg>' + msg;
    if (erro) toast.style.background = 'var(--red-500, #ef4444)';
    else toast.style.background = '';
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
    return;
  }

  const existing = document.querySelector('.toast-dynamic');
  if (existing) existing.remove();
  toast = document.createElement('div');
  toast.className = 'toast toast-dynamic';
  if (erro) toast.style.background = 'var(--red-500, #ef4444)';
  toast.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
    (erro
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
   9. UTILITÁRIOS
───────────────────────────────────────────── */
function obterValor(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function escapar(str) {
  if (!str) return '—';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inferirCategoria(nome) {
  const n = nome.toLowerCase();
  if (/infusor|tela|argola|corrente/.test(n)) return 'Infusor';
  if (/lata|embalagem|saco|caixa/.test(n))    return 'Embalagem';
  if (/canela|gengibre|cravo|anis|cúrcuma|curcuma/.test(n)) return 'Especiarias';
  if (/hibisco|lavanda/.test(n))              return 'Flores';
  if (/álcool|alcool/.test(n))               return 'Outros';
  if (/chá|cha|erva|hortelã|capim|melissa|camomila|erva-doce/.test(n)) return 'Chá';
  return 'Ervas';
}