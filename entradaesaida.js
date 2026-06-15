/* ============================================================
   entradas-saidas.js — Chás da Laura
   Página: Entradas x Saídas
   ============================================================ */

/* ---------- DADOS ---------- */
const allRows = [
  { tipo: 'Produto', item: 'Ered 1 - 90g',       entQty: 25,    entVal: 1250.00, saiQty: 18.75, saiVal: 937.50,  salQty: 6.25,  salVal: 312.50  },
  { tipo: 'Produto', item: 'Ered 2 - 90g',       entQty: 25,    entVal: 1240.00, saiQty: 18.75, saiVal: 937.50,  salQty: 6.25,  salVal: 312.93  },
  { tipo: 'Insumo',  item: 'Flor de camomila',   entQty: 15,    entVal: 400.00,  saiQty: 8.30,  saiVal: 498.00,  salQty: 4.70,  salVal: 401.85  },
  { tipo: 'Insumo',  item: 'Flor de hibisco',    entQty: 3,     entVal: 450.00,  saiQty: 2.25,  saiVal: 337.50,  salQty: 0.75,  salVal: 112.50  },
  { tipo: 'Produto', item: 'Ered 1 - 50g',       entQty: 25,    entVal: 1253.00, saiQty: 18.75, saiVal: 927.50,  salQty: 6.25,  salVal: 312.95  },
  { tipo: 'Insumo',  item: 'Flor de camomila',   entQty: 15,    entVal: 500.00,  saiQty: 8.30,  saiVal: 498.00,  salQty: 4.70,  salVal: 401.85  },
  { tipo: 'Insumo',  item: 'Flor de hibisco',    entQty: 15,    entVal: 400.00,  saiQty: 8.30,  saiVal: 386.10,  salQty: 4.75,  salVal: 402.65  },
  { tipo: 'Produto', item: 'Ered 1 - 50g',       entQty: 25,    entVal: 1255.00, saiQty: 18.75, saiVal: 937.50,  salQty: 6.25,  salVal: 312.95  },
  { tipo: 'Insumo',  item: 'Flor de camomila',   entQty: 15,    entVal: 500.00,  saiQty: 8.30,  saiVal: 498.00,  salQty: 4.70,  salVal: 401.85  },
  { tipo: 'Insumo',  item: 'Flor de hibisco',    entQty: 15,    entVal: 400.00,  saiQty: 8.30,  saiVal: 498.00,  salQty: 4.70,  salVal: 401.85  },
  { tipo: 'Insumo',  item: 'Flor de camomila',   entQty: 15,    entVal: 400.00,  saiQty: 8.30,  saiVal: 498.00,  salQty: 4.70,  salVal: 401.85  },
];

/* ---------- HELPERS ---------- */
function fmtQty(val, unit) {
  return val.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' ' + unit;
}
function fmtBRL(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function unitFor(tipo) {
  return tipo === 'Produto' ? 'un' : 'kg';
}

/* ---------- RENDER ---------- */
function renderTable(data) {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  // Remove existing data rows (keep total row)
  const totalRow = tbody.querySelector('.total-row-entradas');
  tbody.innerHTML = '';

  data.forEach(r => {
    const unit = unitFor(r.tipo);
    const tipoCls = r.tipo === 'Produto' ? 'badge-produto' : 'badge-insumo';
    const emoji = r.tipo === 'Insumo' ? '🌿 ' : '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="badge-tipo ${tipoCls}">${r.tipo}</span></td>
      <td>${emoji}${r.item}</td>
      <td class="td-center cel-entrada">${fmtQty(r.entQty, unit)}</td>
      <td class="td-center cel-entrada">${fmtBRL(r.entVal)}</td>
      <td class="td-center cel-saida">${fmtQty(r.saiQty, unit)}</td>
      <td class="td-center cel-saida">${fmtBRL(r.saiVal)}</td>
      <td class="td-center cel-saldo">${fmtQty(r.salQty, unit)}</td>
      <td class="td-center cel-saldo">${fmtBRL(r.salVal)}</td>
    `;
    tbody.appendChild(tr);
  });

  // Recalculate totals
  const totEntVal = data.reduce((s, r) => s + r.entVal, 0);
  const totSaiQty = data.reduce((s, r) => s + r.saiQty, 0);
  const totSaiVal = data.reduce((s, r) => s + r.saiVal, 0);
  const totSalQty = data.reduce((s, r) => s + r.salQty, 0);
  const totSalVal = data.reduce((s, r) => s + r.salVal, 0);
  const totEntQty = data.reduce((s, r) => s + r.entQty, 0);

  const tr = document.createElement('tr');
  tr.className = 'total-row-entradas';
  tr.innerHTML = `
    <td colspan="2"><strong>TOTAL GERAL</strong></td>
    <td class="td-center"><strong>${totEntQty.toLocaleString('pt-BR')}</strong></td>
    <td class="td-center"><strong>${fmtBRL(totEntVal)}</strong></td>
    <td class="td-center" style="color:#ef4444;"><strong>${totSaiQty.toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong></td>
    <td class="td-center" style="color:#ef4444;"><strong>${fmtBRL(totSaiVal)}</strong></td>
    <td class="td-center" style="color:#4338ca;"><strong>${totSalQty.toLocaleString('pt-BR', {minimumFractionDigits:2})}</strong></td>
    <td class="td-center" style="color:#4338ca;"><strong>${fmtBRL(totSalVal)}</strong></td>
  `;
  tbody.appendChild(tr);
}

/* ---------- FILTER & SEARCH ---------- */
function getFiltered() {
  const searchVal  = (document.querySelector('.tabela-card-header input[type="text"]')?.value || '').toLowerCase();
  const tipoSelect = document.querySelectorAll('.filtro-group select')[0]?.value || 'Todos os estoques';
  const statusSel  = document.querySelectorAll('.filtro-group select')[1]?.value || 'Todos';

  return allRows.filter(r => {
    const matchSearch = !searchVal || r.item.toLowerCase().includes(searchVal) || r.tipo.toLowerCase().includes(searchVal);
    const matchTipo   = tipoSelect === 'Todos os estoques' || r.tipo === tipoSelect.replace('s', ''); // 'Produtos' → 'Produto'
    // Status filter: Entrada = entQty > 0, Saída = saiQty > 0
    const matchStatus = statusSel === 'Todos'
      || (statusSel === 'Entrada' && r.entQty > 0)
      || (statusSel === 'Saída'   && r.saiQty > 0);
    return matchSearch && matchTipo && matchStatus;
  });
}

/* ---------- SORT ---------- */
function getSorted(data) {
  const orderSel = document.querySelector('.ordenar-select select')?.value || '';
  const sorted = [...data];
  if (orderSel.includes('Maior quantidade')) sorted.sort((a, b) => (b.salQty - a.salQty));
  else if (orderSel.includes('Menor quantidade')) sorted.sort((a, b) => (a.salQty - b.salQty));
  else if (orderSel.includes('Maior valor')) sorted.sort((a, b) => (b.salVal - a.salVal));
  return sorted;
}

function applyAndRender() {
  renderTable(getSorted(getFiltered()));
}

/* ---------- SIDEBAR TOGGLE ---------- */
function initSidebar() {
  document.querySelectorAll('.nav-group-title').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.nav-group').classList.toggle('open'));
  });
}

/* ---------- FILTER BUTTON ---------- */
function initFilters() {
  const btnFiltrar = document.querySelector('.btn-filtrar');
  const btnLimpar  = document.querySelector('.btn-limpar');
  const searchInput = document.querySelector('.tabela-card-header input[type="text"]');
  const orderSelect = document.querySelector('.ordenar-select select');

  if (btnFiltrar) btnFiltrar.addEventListener('click', applyAndRender);

  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      document.querySelectorAll('.filtro-group select').forEach(s => s.selectedIndex = 0);
      if (searchInput) searchInput.value = '';
      applyAndRender();
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyAndRender);
  if (orderSelect) orderSelect.addEventListener('change', applyAndRender);
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
  applyAndRender();
});