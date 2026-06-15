/* ============================================================
   produtos-periodo.js — Chás da Laura
   Página: Produtos Total por Período
   ============================================================ */

/* ---------- CORES POR PRODUTO ---------- */
const COLORS = {
  'Bled 1 - 50g': '#1a5c1a',
  'Bled 2 - 50g': '#c8952c',
  'Bled 3 - 50g': '#6aab3a',
  'Bled 4 - 50g': '#8b4a8b',
};

/* ---------- DADOS ---------- */
const allRows = [
  { semana: '20/05 - 26/05', produto: 'Bled 1 - 50g', qty: 50, receita: 'Receita 1', custo: 294.00, resp: 'Laura' },
  { semana: '20/05 - 26/05', produto: 'Bled 2 - 50g', qty: 50, receita: 'Receita 2', custo: 294.00, resp: 'Laura' },
  { semana: '20/05 - 26/05', produto: 'Bled 3 - 50g', qty: 50, receita: 'Receita 3', custo: 294.00, resp: 'Laura' },
  { semana: '20/05 - 26/05', produto: 'Bled 4 - 50g', qty: 50, receita: 'Receita 4', custo: 294.00, resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Bled 1 - 50g', qty: 50, receita: 'Receita 1', custo: 294.00, resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Bled 2 - 50g', qty: 50, receita: 'Receita 2', custo: 294.00, resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Bled 3 - 50g', qty: 50, receita: 'Receita 3', custo: 294.00, resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Bled 4 - 50g', qty: 50, receita: 'Receita 4', custo: 294.00, resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Bled 1 - 50g', qty: 50, receita: 'Receita 1', custo: 294.00, resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Bled 2 - 50g', qty: 50, receita: 'Receita 2', custo: 294.00, resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Bled 3 - 50g', qty: 50, receita: 'Receita 3', custo: 294.00, resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Bled 4 - 50g', qty: 50, receita: 'Receita 4', custo: 294.00, resp: 'Laura' },
  { semana: '10/06 - 16/06', produto: 'Bled 1 - 50g', qty: 50, receita: 'Receita 1', custo: 294.00, resp: 'Laura' },
  { semana: '10/06 - 16/06', produto: 'Bled 2 - 50g', qty: 50, receita: 'Receita 2', custo: 294.00, resp: 'Laura' },
  { semana: '10/06 - 16/06', produto: 'Bled 3 - 50g', qty: 50, receita: 'Receita 3', custo: 294.00, resp: 'Laura' },
  { semana: '10/06 - 16/06', produto: 'Bled 4 - 50g', qty: 50, receita: 'Receita 4', custo: 294.00, resp: 'Laura' },
  { semana: '17/06 - 23/06', produto: 'Bled 1 - 50g', qty: 50, receita: 'Receita 1', custo: 294.00, resp: 'Laura' },
  { semana: '17/06 - 23/06', produto: 'Bled 2 - 50g', qty: 50, receita: 'Receita 2', custo: 294.00, resp: 'Laura' },
  { semana: '17/06 - 23/06', produto: 'Bled 3 - 50g', qty: 50, receita: 'Receita 3', custo: 294.00, resp: 'Laura' },
];

/* ---------- HELPERS ---------- */
function fmtBRL(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

/* ---------- STATE ---------- */
let currentRows = [...allRows];

/* ---------- RENDER ---------- */
function renderTable(data) {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach(r => {
    const color = COLORS[r.produto] || '#888';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.semana}</td>
      <td class="product-name">
        <span class="product-color" style="background:${color}"></span>
        ${r.produto}
      </td>
      <td>${r.qty} un</td>
      <td>${r.receita}</td>
      <td>${fmtBRL(r.custo)}</td>
      <td>${r.resp}</td>
    `;
    tbody.appendChild(tr);
  });

  // Totals
  const totalQty  = data.reduce((s, r) => s + r.qty, 0);
  const totalCost = data.reduce((s, r) => s + r.custo, 0);
  const elQty  = document.getElementById('totalQty');
  const elCost = document.getElementById('totalCost');
  if (elQty)  elQty.textContent  = totalQty + ' UN';
  if (elCost) elCost.textContent = fmtBRL(totalCost);
}

/* ---------- FILTER ---------- */
function getFiltered() {
  const searchVal  = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const produtoSel = document.querySelectorAll('.filter-select-wrap select')[1]?.value || 'Todos os produtos';
  const statusSel  = document.querySelectorAll('.filter-select-wrap select')[2]?.value || 'Todos';

  return allRows.filter(r => {
    const matchSearch  = !searchVal
      || r.produto.toLowerCase().includes(searchVal)
      || r.semana.toLowerCase().includes(searchVal)
      || r.receita.toLowerCase().includes(searchVal)
      || r.resp.toLowerCase().includes(searchVal);
    const matchProduto = produtoSel === 'Todos os produtos' || r.produto === produtoSel;
    // Status: todos os dados são "Concluído" no mock
    const matchStatus  = statusSel === 'Todos' || statusSel === 'Concluído';
    return matchSearch && matchProduto && matchStatus;
  });
}

/* ---------- SORT ---------- */
function getSorted(data, val) {
  const sorted = [...data];
  if (!val) val = document.querySelector('.order-wrap select')?.value || '';
  if (val === 'qty-desc')  sorted.sort((a, b) => b.qty - a.qty);
  else if (val === 'qty-asc')   sorted.sort((a, b) => a.qty - b.qty);
  else if (val === 'cost-desc') sorted.sort((a, b) => b.custo - a.custo);
  else if (val === 'cost-asc')  sorted.sort((a, b) => a.custo - b.custo);
  else if (val === 'week')      sorted.sort((a, b) => a.semana.localeCompare(b.semana));
  return sorted;
}

function applyAndRender() {
  currentRows = getFiltered();
  renderTable(getSorted(currentRows));
}

/* ---------- EXPOSED GLOBALS (usados inline no HTML original) ---------- */
window.filterTable = function () { applyAndRender(); };
window.sortTable   = function (val) { renderTable(getSorted(currentRows, val)); };
window.toggleGroup = function (id) {
  document.getElementById(id)?.classList.toggle('open');
};

/* ---------- SIDEBAR TOGGLE ---------- */
function initSidebar() {
  document.querySelectorAll('.nav-group-title').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.nav-group') || btn.closest('li.nav-group');
      if (group) group.classList.toggle('open');
    });
  });
}

/* ---------- FILTER BUTTON ---------- */
function initFilters() {
  const btnFiltrar = document.querySelector('.btn-filtrar');
  const btnLimpar  = document.querySelector('.btn-limpar');
  const searchInput = document.getElementById('searchInput');

  if (btnFiltrar) btnFiltrar.addEventListener('click', applyAndRender);

  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      document.querySelectorAll('.filter-select-wrap select').forEach(s => s.selectedIndex = 0);
      if (searchInput) searchInput.value = '';
      applyAndRender();
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyAndRender);
}

/* ---------- EXPORT STUBS ---------- */
function initExports() {
  document.querySelector('.btn-export-excel')?.addEventListener('click', () => {
    alert('Exportação para Excel será implementada com os dados reais do backend.');
  });
  document.querySelector('.btn-export-pdf')?.addEventListener('click', () => {
    alert('Download do PDF será implementado com os dados reais do backend.');
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initFilters();
  initExports();
  renderTable(allRows); // renderTable já é chamado pelo inline oninput/onchange do HTML original
});