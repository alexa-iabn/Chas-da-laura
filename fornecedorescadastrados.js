/* =============================================================
   fornecedorescadastrados.js
   Chás da Laura — Fornecedores Cadastrados
   ============================================================= */

/* ─────────────────────────────────────────────
   1. ESTADO GLOBAL
───────────────────────────────────────────── */
let fornecedores  = carregarDoStorage();
let filtered      = [...fornecedores];
let currentView   = 'lista';
let currentPage   = 1;
const PER_PAGE    = 10;
let toDeleteId    = null;


/* ─────────────────────────────────────────────
   2. INICIALIZAÇÃO
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  iniciarNavGroups();
  iniciarBusca();
  iniciarModal();
  iniciarViewToggle();
  filterAndRender();
});


/* ─────────────────────────────────────────────
   3. PERSISTÊNCIA — localStorage
───────────────────────────────────────────── */
function carregarDoStorage() {
  try {
    const raw = localStorage.getItem('fornecedores');
    if (raw) {
      const lista = JSON.parse(raw);
      if (Array.isArray(lista) && lista.length > 0) return lista;
    }
  } catch (e) { /* ignore */ }

  /* Lista vazia — sem dados de exemplo hardcoded */
  return [];
}

function salvarNoStorage() {
  try {
    localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  } catch (e) { /* ignore */ }
}


/* ─────────────────────────────────────────────
   4. SIDEBAR — NAV GROUPS
───────────────────────────────────────────── */
function iniciarNavGroups() {
  const navCad = document.getElementById('navCadastros');
  if (navCad) navCad.classList.add('open');
}

function toggleGroup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function toggleSidebar() {
  const sb = document.querySelector('.sidebar');
  if (sb) sb.classList.toggle('open');
}

window.toggleGroup   = toggleGroup;
window.toggleSidebar = toggleSidebar;


/* ─────────────────────────────────────────────
   5. VIEW TOGGLE (Lista / Cards)
───────────────────────────────────────────── */
function iniciarViewToggle() {
  setView('lista');
}

function setView(v) {
  currentView = v;
  currentPage = 1;

  document.getElementById('listaView').style.display  = v === 'lista' ? '' : 'none';
  document.getElementById('cardsView').style.display  = v === 'cards' ? '' : 'none';

  const btnLista = document.getElementById('btnLista');
  const btnCards = document.getElementById('btnCards');
  if (btnLista) btnLista.classList.toggle('active', v === 'lista');
  if (btnCards) btnCards.classList.toggle('active', v === 'cards');

  render();
}

window.setView = setView;


/* ─────────────────────────────────────────────
   6. BUSCA
───────────────────────────────────────────── */
function iniciarBusca() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('input', filterAndRender);
  }
}

function filterAndRender() {
  const input = document.getElementById('searchInput');
  const q = input ? input.value.toLowerCase().trim() : '';

  filtered = fornecedores.filter(function (f) {
    return (
      (f.nome     || '').toLowerCase().includes(q) ||
      (f.cnpj     || '').includes(q)               ||
      (f.telefone || '').includes(q)               ||
      (f.endereco || '').toLowerCase().includes(q) ||
      (f.email    || '').toLowerCase().includes(q) ||
      (f.cidade   || '').toLowerCase().includes(q)
    );
  });

  currentPage = 1;
  render();
}

window.filterAndRender = filterAndRender;


/* ─────────────────────────────────────────────
   7. RENDER PRINCIPAL
───────────────────────────────────────────── */
function render() {
  const total      = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PER_PAGE;
  const slice = filtered.slice(start, start + PER_PAGE);

  if (currentView === 'lista') {
    renderLista(slice, total, totalPages);
  } else {
    renderCards(slice, total, totalPages);
  }
}


/* ─────────────────────────────────────────────
   8. RENDER — TABELA (LISTA)
───────────────────────────────────────────── */
function renderLista(slice, total, totalPages) {
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyList');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!slice.length) {
    if (empty) empty.style.display = '';
    renderPaginacao('paginationInfo', 'paginationBtns', total, totalPages);
    return;
  }
  if (empty) empty.style.display = 'none';

  slice.forEach(function (f) {
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td><strong>' + escapar(f.nome) + '</strong></td>' +
      '<td>' + escapar(f.cnpj)      + '</td>' +
      '<td>' + escapar(f.telefone)  + '</td>' +
      '<td>' + escapar(enderecoFormatado(f)) + '</td>' +
      '<td class="td-actions">' +
        '<button class="action-btn edit" title="Editar" onclick="editarFornecedor(' + f.id + ')">' +
          '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lapiz.svg" alt="Editar" />' +
        '</button>' +
        '<button class="action-btn delete" title="Excluir" onclick="openModal(' + f.id + ')">' +
          '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lixeira.svg" alt="Excluir" />' +
        '</button>' +
      '</td>';
    tbody.appendChild(tr);
  });

  renderPaginacao('paginationInfo', 'paginationBtns', total, totalPages);
}


/* ─────────────────────────────────────────────
   9. RENDER — CARDS
───────────────────────────────────────────── */
function renderCards(slice, total, totalPages) {
  const grid  = document.getElementById('cardsGrid');
  const empty = document.getElementById('emptyCards');
  if (!grid) return;

  grid.innerHTML = '';

  if (!slice.length) {
    if (empty) empty.style.display = '';
    renderPaginacao('paginationInfoCards', 'paginationBtnsCards', total, totalPages);
    return;
  }
  if (empty) empty.style.display = 'none';

  slice.forEach(function (f) {
    const initials = gerarIniciais(f.nome);
    const div = document.createElement('div');
    div.className = 'supplier-card';
    div.innerHTML =
      '<div class="sc-head">' +
        '<div class="sc-initials">' + initials + '</div>' +
        '<div>' +
          '<div class="sc-name">'  + escapar(f.nome) + '</div>' +
          '<div class="sc-cnpj">'  + escapar(f.cnpj) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="sc-body">' +
        '<div class="sc-row">' + svgTelefone() + escapar(f.telefone) + '</div>' +
        '<div class="sc-row">' + svgEmail()    + escapar(f.email || '—')    + '</div>' +
        '<div class="sc-row">' + svgPin()      + escapar(enderecoFormatado(f)) + '</div>' +
        '<div class="sc-row">' + svgCalendario() + escapar(f.cadastrado || formatarData(f.cadastradoEm) || '—') + '</div>' +
      '</div>' +
      '<div class="sc-footer">' +
        '<button class="sc-btn sc-edit" title="Editar"  onclick="editarFornecedor(' + f.id + ')">' +
          '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lapiz.svg" alt="Editar" />' +
        '</button>' +
        '<button class="sc-btn sc-del"  title="Excluir" onclick="openModal(' + f.id + ')">' +
          '<img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/lixeira.svg" alt="Excluir" />' +
        '</button>' +
      '</div>';
    grid.appendChild(div);
  });

  renderPaginacao('paginationInfoCards', 'paginationBtnsCards', total, totalPages);
}


/* ─────────────────────────────────────────────
   10. PAGINAÇÃO
───────────────────────────────────────────── */
function renderPaginacao(infoId, btnsId, total, totalPages) {
  const infoEl = document.getElementById(infoId);
  const btnsEl = document.getElementById(btnsId);
  if (!infoEl || !btnsEl) return;

  if (total > 0) {
    const start = (currentPage - 1) * PER_PAGE + 1;
    const end   = Math.min(currentPage * PER_PAGE, total);
    infoEl.textContent = 'Exibindo ' + start + '–' + end + ' de ' + total + ' fornecedores';
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

  for (let i = 1; i <= totalPages; i++) {
    const distancia = Math.abs(i - currentPage);
    const ehBorda   = i === 1 || i === totalPages;

    if (totalPages > 7 && !ehBorda && distancia > 1) {
      if (i === 3 || i === totalPages - 1) {
        const dots = document.createElement('span');
        dots.className   = 'pg-dots';
        dots.textContent = '…';
        btnsEl.appendChild(dots);
      }
      continue;
    }

    const btn = document.createElement('button');
    btn.className   = 'pg-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', (function (p) {
      return function () { currentPage = p; render(); };
    })(i));
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
   11. AÇÕES — Editar e Excluir
───────────────────────────────────────────── */
function editarFornecedor(id) {
  window.location.href = 'EditarFornecedor.html?id=' + id;
}

function openModal(id) {
  toDeleteId = id;
  /* Compara com == para suportar tanto IDs numéricos do exemplo quanto timestamps */
  const f = fornecedores.find(function (x) { return x.id == id; });
  if (!f) return;

  document.getElementById('modalInitials').textContent = gerarIniciais(f.nome);
  document.getElementById('modalName').textContent     = f.nome;
  document.getElementById('modalTel').textContent      = f.telefone;
  document.getElementById('modalAddr').textContent     = enderecoFormatado(f);

  document.getElementById('deleteModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('deleteModal').classList.remove('open');
  document.body.style.overflow = '';
  toDeleteId = null;
}

function confirmDelete() {
  if (!toDeleteId) return;

  fornecedores = fornecedores.filter(function (f) { return f.id != toDeleteId; });
  filtered     = filtered.filter(function (f)     { return f.id != toDeleteId; });

  salvarNoStorage();
  closeModal();
  render();
  showToast('Fornecedor excluído com sucesso.');
}

window.editarFornecedor = editarFornecedor;
window.openModal        = openModal;
window.closeModal       = closeModal;
window.confirmDelete    = confirmDelete;


/* ─────────────────────────────────────────────
   12. MODAL — fechar no overlay ou ESC
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


/* ─────────────────────────────────────────────
   13. TOAST DE NOTIFICAÇÃO
───────────────────────────────────────────── */
function showToast(msg, erro) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
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
   14. UTILITÁRIOS
───────────────────────────────────────────── */
function escapar(str) {
  if (!str) return '—';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function gerarIniciais(nome) {
  if (!nome) return '??';
  return nome
    .trim()
    .split(' ')
    .slice(0, 2)
    .map(function (w) { return w[0] || ''; })
    .join('')
    .toUpperCase();
}

function enderecoFormatado(f) {
  const partes = [f.endereco, f.cidade, f.estado].filter(Boolean);
  return partes.join(', ') || '—';
}

function formatarData(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return dia + '/' + mes + '/' + d.getFullYear();
  } catch (e) { return ''; }
}

/* Mini SVGs nos cards */
function svgTelefone() {
  return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.45 2 2 0 0 1 3.59 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.02-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>';
}
function svgEmail() {
  return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
}
function svgPin() {
  return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
}
function svgCalendario() {
  return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
}