/* =============================================================
   scriptinsumosCadastrados.js
   Chás da Laura — Insumos Cadastrados
   ============================================================= */

/* ─────────────────────────────────────────────
   1. DADOS INICIAIS DO PROJETO
───────────────────────────────────────────── */
const INSUMOS_INICIAIS = [
  { id:1,  nome:'Camomila',              categoria:'Chá',       quantidade:'2 KG',      fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:25, estoqueMin:10, validade:'2026-12-10' },
  { id:2,  nome:'Erva-doce',             categoria:'Chá',       quantidade:'1.5 KG',    fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:18, estoqueMin:10, validade:'2026-11-20' },
  { id:3,  nome:'Hortelã',               categoria:'Chá',       quantidade:'1.8 KG',    fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:20, estoqueMin:10, validade:'2026-10-15' },
  { id:4,  nome:'Capim-limão',           categoria:'Chá',       quantidade:'1.2 KG',    fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:16, estoqueMin:10, validade:'2026-09-30' },
  { id:5,  nome:'Chá-preto',             categoria:'Chá',       quantidade:'2.5 KG',    fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:22, estoqueMin:10, validade:'2027-01-05' },
  { id:6,  nome:'Chá-verde',             categoria:'Chá',       quantidade:'2 KG',      fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:19, estoqueMin:10, validade:'2026-12-18' },
  { id:7,  nome:'Canela em casca',       categoria:'Especiarias',quantidade:'900 G',    fornecedor:'Agrotech Especiarias',    data:'12/05/2026', estoque:14, estoqueMin:10, validade:'2027-03-12' },
  { id:8,  nome:'Gengibre desidratado',  categoria:'Especiarias',quantidade:'850 G',    fornecedor:'Agrotech Especiarias',    data:'12/05/2026', estoque:13, estoqueMin:10, validade:'2027-02-25' },
  { id:9,  nome:'Hibisco',               categoria:'Flores',    quantidade:'1.7 KG',    fornecedor:'Ervas do Campo Ltda',     data:'12/05/2026', estoque:21, estoqueMin:10, validade:'2026-11-08' },
  { id:10, nome:'Lavanda',               categoria:'Flores',    quantidade:'700 G',     fornecedor:'Ervas do Campo Ltda',     data:'12/05/2026', estoque:12, estoqueMin:10, validade:'2026-08-22' },
  { id:11, nome:'Melissa',               categoria:'Chá',       quantidade:'1.3 KG',    fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:17, estoqueMin:10, validade:'2026-10-02' },
  { id:12, nome:'Lata para blend',       categoria:'Embalagem', quantidade:'45 UN',     fornecedor:'Embalagens Verde Natural', data:'12/05/2026', estoque:45, estoqueMin:10, validade:null },
  { id:13, nome:'Cúrcuma',               categoria:'Especiarias',quantidade:'600 G',    fornecedor:'Agrotech Especiarias',    data:'12/05/2026', estoque:11, estoqueMin:10, validade:'2027-04-10' },
  { id:14, nome:'Cravo-da-índia',        categoria:'Especiarias',quantidade:'500 G',    fornecedor:'Agrotech Especiarias',    data:'12/05/2026', estoque:13, estoqueMin:10, validade:'2027-05-01' },
  { id:15, nome:'Anis-estrelado',        categoria:'Especiarias',quantidade:'450 G',    fornecedor:'Agrotech Especiarias',    data:'12/05/2026', estoque:10, estoqueMin:10, validade:'2027-03-28' },
  { id:16, nome:'Infusor inox redondo',  categoria:'Infusor',   quantidade:'30 UN',     fornecedor:'Embalagens Verde Natural', data:'12/05/2026', estoque:30, estoqueMin:10, validade:null },
  { id:17, nome:'Álcool de cereal',      categoria:'Outros',    quantidade:'5 L',       fornecedor:'Nutribom alimentos LTDA', data:'12/05/2026', estoque:20, estoqueMin:10, validade:'2027-01-18' },
  { id:18, nome:'Corrente para infusor', categoria:'Infusor',   quantidade:'25 UN',     fornecedor:'Embalagens Verde Natural', data:'12/05/2026', estoque:25, estoqueMin:10, validade:null },
  { id:19, nome:'Tela de aço inox',      categoria:'Infusor',   quantidade:'5 Metros',  fornecedor:'Embalagens Verde Natural', data:'12/05/2026', estoque:12, estoqueMin:10, validade:null },
  { id:20, nome:'Argola metálica',       categoria:'Infusor',   quantidade:'35 UN',     fornecedor:'Embalagens Verde Natural', data:'12/05/2026', estoque:35, estoqueMin:10, validade:null },
];

/* ─────────────────────────────────────────────
   2. ESTADO GLOBAL
───────────────────────────────────────────── */
let insumos      = carregarDoStorage();
let filtered     = [...insumos];
let currentView  = 'lista';
let currentPage  = 1;
const PER_PAGE   = 10;
let deleteTarget = null;

/* ─────────────────────────────────────────────
   3. INICIALIZAÇÃO
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  iniciarSidebar();
  iniciarBusca();
  iniciarModal();
  render();
});

/* ─────────────────────────────────────────────
   4. PERSISTÊNCIA — localStorage
───────────────────────────────────────────── */
function carregarDoStorage() {
  try {
    const raw = localStorage.getItem('insumos');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.length) return parsed;
    }
  } catch (e) { /* ignore */ }
  /* Salva e retorna dados iniciais do projeto */
  localStorage.setItem('insumos', JSON.stringify(INSUMOS_INICIAIS));
  return INSUMOS_INICIAIS.map(function (i) { return Object.assign({}, i); });
}

function salvarNoStorage() {
  try {
    localStorage.setItem('insumos', JSON.stringify(insumos));
  } catch (e) { /* ignore */ }
}

/* ─────────────────────────────────────────────
   5. SIDEBAR
───────────────────────────────────────────── */
function iniciarSidebar() {
  const subCad = document.getElementById('sub-cadastros');
  if (subCad) subCad.classList.add('open');
}

function toggleSub(id, el) {
  const sub = document.getElementById(id);
  if (sub) sub.classList.toggle('open');
  if (el)  el.classList.toggle('open');
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}

window.toggleSub     = toggleSub;
window.toggleSidebar = toggleSidebar;

/* ─────────────────────────────────────────────
   6. VIEW TOGGLE
───────────────────────────────────────────── */
function setView(v) {
  currentView = v;
  currentPage = 1;

  const listaEl = document.getElementById('listaView');
  const cardsEl = document.getElementById('cardsView');
  const btnL    = document.getElementById('btnLista');
  const btnC    = document.getElementById('btnCards');

  if (listaEl) listaEl.style.display = v === 'lista' ? '' : 'none';
  if (cardsEl) cardsEl.style.display = v === 'cards' ? '' : 'none';
  if (btnL)    btnL.classList.toggle('active', v === 'lista');
  if (btnC)    btnC.classList.toggle('active', v === 'cards');

  render();
}

window.setView = setView;

/* ─────────────────────────────────────────────
   7. BUSCA
───────────────────────────────────────────── */
function iniciarBusca() {
  const input = document.getElementById('searchInput');
  if (input) input.addEventListener('input', filterData);
}

function filterData() {
  const q = (document.getElementById('searchInput') || {}).value || '';
  const termo = q.toLowerCase().trim();
  filtered = insumos.filter(function (i) {
    return (
      i.nome.toLowerCase().includes(termo) ||
      (i.categoria  || '').toLowerCase().includes(termo) ||
      (i.fornecedor || '').toLowerCase().includes(termo)
    );
  });
  currentPage = 1;
  render();
}

window.filterData = filterData;

/* ─────────────────────────────────────────────
   8. RENDER PRINCIPAL
───────────────────────────────────────────── */
function render() {
  if (currentView === 'lista') renderLista();
  else renderCards();
}

/* ─────────────────────────────────────────────
   9. RENDER — TABELA
───────────────────────────────────────────── */
function renderLista() {
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyList');
  if (!tbody) return;

  const total      = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PER_PAGE;
  const slice = filtered.slice(start, start + PER_PAGE);

  if (!total) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    atualizarPaginacao('paginationInfo', 'paginationBtns', 0, 1);
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = slice.map(function (i) {
    return (
      '<tr>' +
        '<td>' + escapar(i.nome)       + '</td>' +
        '<td>' + escapar(i.categoria)  + '</td>' +
        '<td>' + escapar(i.quantidade) + '</td>' +
        '<td>' + escapar(i.fornecedor) + '</td>' +
        '<td>' +
          '<div class="td-actions">' +
            '<button class="action-btn edit"   onclick="editItem('   + i.id + ')" title="Editar">' +
              '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lapiz.svg" width="14" height="14" alt="Editar" />' +
            '</button>' +
            '<button class="action-btn delete" onclick="openModal(' + i.id + ')" title="Excluir">' +
              '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lixeira.svg" width="14" height="14" alt="Excluir" />' +
            '</button>' +
          '</div>' +
        '</td>' +
      '</tr>'
    );
  }).join('');

  atualizarPaginacao('paginationInfo', 'paginationBtns', total, totalPages);
}

/* ─────────────────────────────────────────────
   10. RENDER — CARDS
───────────────────────────────────────────── */
function renderCards() {
  const grid  = document.getElementById('cardsGrid');
  const empty = document.getElementById('emptyCards');
  if (!grid) return;

  if (!filtered.length) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  grid.innerHTML = filtered.map(function (i) {
    const initials = gerarIniciais(i.nome);
    const validade = i.validade
      ? new Date(i.validade).toLocaleDateString('pt-BR')
      : 'Sem validade';

    return (
      '<div class="insumo-card">' +
        '<div class="card-head">' +
          '<div class="card-initials">' + initials + '</div>' +
          '<div class="card-name">' + escapar(i.nome) + '</div>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-row">' +
            '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/etiqueta.svg" width="13" height="13" alt="" />' +
            escapar(i.categoria) +
          '</div>' +
          '<div class="card-row">' +
            '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/balanca.svg" width="13" height="13" alt="" />' +
            escapar(i.quantidade) +
          '</div>' +
          '<div class="card-row">' +
            '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/prancheta.svg" width="13" height="13" alt="" />' +
            escapar(i.fornecedor) +
          '</div>' +
          '<div class="card-row">' +
            '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lista.svg" width="13" height="13" alt="" />' +
            validade +
          '</div>' +
        '</div>' +
        '<div class="card-footer">' +
          '<button class="card-action-btn edit"   onclick="editItem('   + i.id + ')" title="Editar">' +
            '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lapiz.svg" width="14" height="14" alt="Editar" />' +
          '</button>' +
          '<button class="card-action-btn delete" onclick="openModal(' + i.id + ')" title="Excluir">' +
            '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lixeira.svg" width="14" height="14" alt="Excluir" />' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

/* ─────────────────────────────────────────────
   11. PAGINAÇÃO
───────────────────────────────────────────── */
function atualizarPaginacao(infoId, btnsId, total, totalPages) {
  const infoEl = document.getElementById(infoId);
  const btnsEl = document.getElementById(btnsId);
  if (!infoEl || !btnsEl) return;

  if (total > 0) {
    const start = (currentPage - 1) * PER_PAGE + 1;
    const end   = Math.min(currentPage * PER_PAGE, total);
    infoEl.textContent = 'Mostrando ' + start + '–' + end + ' de ' + total + ' insumos';
  } else {
    infoEl.textContent = '';
  }

  btnsEl.innerHTML = '';

  const prev = document.createElement('button');
  prev.className = 'pg-btn';
  prev.innerHTML = '‹';
  prev.disabled  = currentPage === 1;
  prev.addEventListener('click', function () { currentPage--; render(); });
  btnsEl.appendChild(prev);

  for (var p = 1; p <= totalPages; p++) {
    var ehBorda   = p === 1 || p === totalPages;
    var distancia = Math.abs(p - currentPage);

    if (totalPages > 7 && !ehBorda && distancia > 1) {
      if (p === 3 || p === totalPages - 1) {
        var dots = document.createElement('span');
        dots.className   = 'pg-dots';
        dots.textContent = '…';
        btnsEl.appendChild(dots);
      }
      continue;
    }

    var btn = document.createElement('button');
    btn.className   = 'pg-btn' + (p === currentPage ? ' active' : '');
    btn.textContent = p;
    btn.addEventListener('click', (function (pg) {
      return function () { currentPage = pg; render(); };
    })(p));
    btnsEl.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = 'pg-btn';
  next.innerHTML = '›';
  next.disabled  = currentPage === totalPages;
  next.addEventListener('click', function () { currentPage++; render(); });
  btnsEl.appendChild(next);
}

/* ─────────────────────────────────────────────
   12. MODAL DE EXCLUSÃO
───────────────────────────────────────────── */
function iniciarModal() {
  const overlay = document.getElementById('deleteModal');
  if (!overlay) return;

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(id) {
  const i = insumos.find(function (x) { return x.id === id; });
  if (!i) return;

  deleteTarget = id;

  const initials = gerarIniciais(i.nome);
  const setEl = function (elId, val) {
    const el = document.getElementById(elId);
    if (el) el.textContent = val || '—';
  };

  setEl('modalInitials', initials);
  setEl('modalName',     i.nome);
  setEl('modalCat',      i.categoria);
  setEl('modalQtd',      i.quantidade);
  setEl('modalForn',     i.fornecedor);

  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('deleteModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  deleteTarget = null;
}

function confirmDelete() {
  if (deleteTarget === null) return;

  insumos  = insumos.filter(function (i)  { return i.id !== deleteTarget; });
  filtered = filtered.filter(function (i) { return i.id !== deleteTarget; });

  salvarNoStorage();
  closeModal();
  render();
  showToast('Insumo excluído com sucesso.');
}

window.openModal     = openModal;
window.closeModal    = closeModal;
window.confirmDelete = confirmDelete;

/* ─────────────────────────────────────────────
   13. AÇÕES
───────────────────────────────────────────── */
function editItem(id) {
  window.location.href = 'editarinsumos.html?id=' + id;
}

window.editItem = editItem;

/* ─────────────────────────────────────────────
   14. TOAST
───────────────────────────────────────────── */
function showToast(msg, erro) {
  const existing = document.querySelector('.toast-dyn');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast toast-dyn';
  if (erro) toast.style.background = 'var(--red-500, #ef4444)';

  const iconPath = erro
    ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
    : '<polyline points="20 6 9 17 4 12"/>';

  toast.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
    iconPath + '</svg>' + msg;

  document.body.appendChild(toast);
  void toast.offsetWidth;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}

window.showToast = showToast;

/* ─────────────────────────────────────────────
   15. UTILITÁRIOS
───────────────────────────────────────────── */
function gerarIniciais(nome) {
  if (!nome) return '??';
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

function escapar(str) {
  if (!str) return '—';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}