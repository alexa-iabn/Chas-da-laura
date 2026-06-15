/* ============================================================
   situacao-estoque.js — Chás da Laura
   Página: Situação do Estoque
   ============================================================ */

/* ---------- DADOS ---------- */
const allGroups = [
  {
    situacao: 'Em estoque',
    badgeClass: 'badge-normal',
    groupClass: 'grupo-em-estoque',
    groupLabel: 'Total – Em estoque',
    rows: [
      { tipo: 'Produtos', itens: 90,  qtdTotal: '3.245 un',      pct: '67,2%', valor: 20875.40, valorMedio: 'R$ 10,12' },
      { tipo: 'Insumos',  itens: 36,  qtdTotal: 'R$ 30,10 kg/l/un', pct: '32,6%', valor: 13582.90, valorMedio: 'R$ 18,04' },
    ],
    totalItens: 128,
    totalPct: '99,8%',
    totalValor: 48856.90,
    rowBg: '#f0fdf4',
  },
  {
    situacao: 'Estoque baixo',
    badgeClass: 'badge-baixo',
    groupClass: 'grupo-estoque-baixo',
    groupLabel: 'Total – Estoque baixo',
    rows: [
      { tipo: 'Produtos', itens: 11, qtdTotal: '143 un',          pct: '4,9%', valor: 7493.60, valorMedio: 'R$ 13,025' },
      { tipo: 'Insumos',  itens: 8,  qtdTotal: '0,40 kg/l/un',    pct: '2,6%', valor: 1290.38, valorMedio: 'R$ 19,54' },
    ],
    totalItens: 19,
    totalPct: '7,5%',
    totalValor: 3700.00,
    rowBg: '#fffbeb',
  },
  {
    situacao: 'Sem estoque',
    badgeClass: 'badge-zerado',
    groupClass: 'grupo-sem-estoque',
    groupLabel: 'Total – Sem estoque',
    rows: [
      { tipo: 'Produtos', itens: 4,  qtdTotal: '0 un',     pct: '0%', valor: 0, valorMedio: '—' },
      { tipo: 'Insumos',  itens: 3,  qtdTotal: '0 kg/l/un', pct: '0%', valor: 0, valorMedio: '—' },
    ],
    totalItens: 7,
    totalPct: '0%',
    totalValor: 0,
    rowBg: '#fef2f2',
  },
];

/* ---------- HELPERS ---------- */
function fmtBRL(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

/* ---------- RENDER ---------- */
function renderTable(groups) {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  let grandTotal = 0;
  let grandItens = 0;

  groups.forEach(g => {
    g.rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.style.background = g.rowBg;
      tr.innerHTML = `
        <td><span class="badge-status ${g.badgeClass}">${g.situacao}</span></td>
        <td>${r.tipo}</td>
        <td>${r.itens}</td>
        <td>${r.qtdTotal}</td>
        <td>${r.pct}</td>
        <td>${fmtBRL(r.valor)}</td>
        <td>${r.valorMedio}</td>
      `;
      tbody.appendChild(tr);
    });

    // Subtotal row
    const sub = document.createElement('tr');
    sub.className = g.groupClass;
    sub.innerHTML = `
      <td colspan="2"><strong>${g.groupLabel}</strong></td>
      <td><strong>${g.totalItens}</strong></td>
      <td>—</td>
      <td><strong>${g.totalPct}</strong></td>
      <td><strong>${fmtBRL(g.totalValor)}</strong></td>
      <td>—</td>
    `;
    tbody.appendChild(sub);

    grandTotal += g.totalValor;
    grandItens += g.totalItens;
  });

  // Total Geral
  const total = document.createElement('tr');
  total.className = 'grupo-total-geral';
  total.innerHTML = `
    <td colspan="2"><strong>TOTAL GERAL</strong></td>
    <td><strong>${grandItens}</strong></td>
    <td>—</td>
    <td><strong>100%</strong></td>
    <td><strong>${fmtBRL(grandTotal)}</strong></td>
    <td>—</td>
  `;
  tbody.appendChild(total);
}

/* ---------- FILTER ---------- */
function getFiltered() {
  const tipoSel   = document.querySelectorAll('.filtro-group select')[0]?.value || 'Todos os estoques';
  const statusSel = document.querySelectorAll('.filtro-group select')[1]?.value || 'Todos';

  return allGroups
    .filter(g => {
      if (statusSel === 'Todos') return true;
      const map = { 'Em estoque': 'Em estoque', 'Estoque baixo': 'Estoque baixo', 'Sem estoque': 'Sem estoque' };
      return g.situacao === map[statusSel];
    })
    .map(g => {
      if (tipoSel === 'Todos os estoques') return g;
      const filteredRows = g.rows.filter(r => r.tipo === tipoSel);
      if (!filteredRows.length) return null;
      return { ...g, rows: filteredRows };
    })
    .filter(Boolean);
}

function applyAndRender() {
  renderTable(getFiltered());
}

/* ---------- SIDEBAR ---------- */
function initSidebar() {
  document.querySelectorAll('.nav-group-title').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.nav-group').classList.toggle('open'));
  });
}

/* ---------- FILTER BUTTONS ---------- */
function initFilters() {
  const btnFiltrar = document.querySelector('.btn-filtrar');
  const btnLimpar  = document.querySelector('.btn-limpar');

  if (btnFiltrar) btnFiltrar.addEventListener('click', applyAndRender);

  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      document.querySelectorAll('.filtro-group select').forEach(s => s.selectedIndex = 0);
      applyAndRender();
    });
  }
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