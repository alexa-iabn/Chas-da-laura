/* ============================================================
   relatorios-producao.js — Chás da Laura
   Página: Relatórios de Produção (KPIs + gráficos + tabela)
   ============================================================ */

/* ---------- DADOS ---------- */
const allProducao = [
  { semana: '20/05 - 26/05', produto: 'Blend 1 - 50g', dot: 'dot-a', qty: 50, receita: 'Receita 1', custo: 294.00,  resp: 'Laura' },
  { semana: '20/05 - 26/05', produto: 'Blend 2 - 50g', dot: 'dot-b', qty: 50, receita: 'Receita 2', custo: 294.00,  resp: 'Laura' },
  { semana: '20/05 - 26/05', produto: 'Blend 3 - 50g', dot: 'dot-c', qty: 50, receita: 'Receita 3', custo: 254.40,  resp: 'Laura' },
  { semana: '20/05 - 26/05', produto: 'Blend 4 - 50g', dot: 'dot-d', qty: 50, receita: 'Receita 4', custo: 274.35,  resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Blend 1 - 50g', dot: 'dot-a', qty: 50, receita: 'Receita 1', custo: 294.00,  resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Blend 2 - 50g', dot: 'dot-b', qty: 50, receita: 'Receita 2', custo: 294.00,  resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Blend 3 - 50g', dot: 'dot-c', qty: 50, receita: 'Receita 3', custo: 254.40,  resp: 'Laura' },
  { semana: '27/05 - 02/06', produto: 'Blend 4 - 50g', dot: 'dot-d', qty: 50, receita: 'Receita 4', custo: 274.35,  resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Blend 1 - 50g', dot: 'dot-a', qty: 50, receita: 'Receita 1', custo: 294.00,  resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Blend 2 - 50g', dot: 'dot-b', qty: 50, receita: 'Receita 2', custo: 294.00,  resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Blend 3 - 50g', dot: 'dot-c', qty: 50, receita: 'Receita 3', custo: 254.40,  resp: 'Laura' },
  { semana: '03/06 - 09/06', produto: 'Blend 4 - 50g', dot: 'dot-d', qty: 50, receita: 'Receita 4', custo: 274.35,  resp: 'Laura' },
];

/* Dados semanais para o gráfico de barras */
const weeklyData = [
  { label: 'Semana 1', sub: '26/04-02/05', qty: 120 },
  { label: 'Semana 2', sub: '05/05-12/05', qty: 340 },
  { label: 'Semana 3', sub: '13/05-19/05', qty: 210 },
  { label: 'Semana 4', sub: '20/05-26/05', qty: 580 },
  { label: 'Semana 5', sub: '27/05-02/06', qty: 0   },
];

/* Insumos para barras horizontais */
const insumos = [
  { label: 'Camomila',   kg: 6.10 },
  { label: 'Hibisco',    kg: 4.10 },
  { label: 'Erva-doce',  kg: 3.30 },
  { label: 'Capim-limão',kg: 2.80 },
  { label: 'Gengibre',   kg: 1.80 },
  { label: 'Outros',     kg: 0.55 },
];

/* ---------- HELPERS ---------- */
function fmtBRL(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

/* ---------- KPI CARDS ---------- */
function updateKPIs(data) {
  const totalQty      = data.reduce((s, r) => s + r.qty, 0);
  const totalCusto    = data.reduce((s, r) => s + r.custo, 0);
  const produtos      = [...new Set(data.map(r => r.produto))].length;
  const custoMedio    = totalQty ? (totalCusto / totalQty) : 0;
  // Insumos: estimativa baseada em 0,015kg/un
  const insumoTotal   = (totalQty * 0.015).toFixed(2);

  const kpiEls = document.querySelectorAll('.kpi-value');
  if (kpiEls[0]) kpiEls[0].textContent = totalQty.toLocaleString('pt-BR');
  if (kpiEls[1]) kpiEls[1].textContent = produtos;
  if (kpiEls[2]) kpiEls[2].textContent = fmtBRL(totalCusto);
  if (kpiEls[3]) kpiEls[3].textContent = insumoTotal + ' kg';

  const subs = document.querySelectorAll('.kpi-sub');
  if (subs[2]) subs[2].textContent = `Custo médio: ${fmtBRL(custoMedio)}/ un`;
}

/* ---------- TABELA ---------- */
function renderTable(data) {
  const tbody = document.querySelector('.production-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.semana}</td>
      <td><span class="product-dot ${r.dot}"></span>${r.produto}</td>
      <td>${r.qty} un</td>
      <td>${r.receita}</td>
      <td>${fmtBRL(r.custo)}</td>
      <td>${r.resp}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ---------- GRÁFICO DE BARRAS (SVG dinâmico) ---------- */
function renderBarChart(data) {
  const container = document.querySelector('.bars-container');
  if (!container) return;

  const maxQty = Math.max(...data.map(d => d.qty), 1);
  container.innerHTML = '';

  data.forEach((d, i) => {
    const pct     = Math.max((d.qty / maxQty) * 100, 2);
    const highlight = i === data.indexOf(data.reduce((a, b) => a.qty > b.qty ? a : b)) ? 'highlight' : '';
    const isEmpty = d.qty === 0 ? 'bar-fill--empty' : '';

    const div = document.createElement('div');
    div.className = `bar-group ${highlight}`;
    div.innerHTML = `
      <div class="bar-value">${d.qty}</div>
      <div class="bar-col" style="height:${pct}%"><div class="bar-fill ${isEmpty}"></div></div>
      <div class="bar-label">${d.label}<br><small>${d.sub}</small></div>
    `;
    container.appendChild(div);
  });

  // Atualiza labels do eixo Y
  const yLabels = document.querySelector('.bar-y-labels');
  if (yLabels) {
    const maxLabel = Math.ceil(maxQty / 100) * 100;
    yLabels.innerHTML = [
      maxLabel,
      Math.round(maxLabel * 0.75),
      Math.round(maxLabel * 0.5),
      Math.round(maxLabel * 0.25),
      0,
    ].map(v => `<span>${v}</span>`).join('');
  }
}

/* ---------- BARRAS HORIZONTAIS (insumos) ---------- */
function renderHBar() {
  const container = document.querySelector('.hbar-chart');
  if (!container) return;

  const maxKg = Math.max(...insumos.map(d => d.kg));
  container.innerHTML = '';

  insumos.forEach((d, i) => {
    const pct     = Math.round((d.kg / maxKg) * 100);
    const isLight = i === insumos.length - 1 ? 'hbar-fill--light' : '';
    const item = document.createElement('div');
    item.className = 'hbar-item';
    item.innerHTML = `
      <span class="hbar-label">${d.label}</span>
      <div class="hbar-track"><div class="hbar-fill ${isLight}" style="width:${pct}%"></div></div>
      <span class="hbar-value">${d.kg.toFixed(2).replace('.', ',')} kg</span>
    `;
    container.appendChild(item);
  });
}

/* ---------- FILTER ---------- */
function getFiltered() {
  const produtoSel = document.querySelectorAll('.filter-select')[1]?.value || 'Todos os produtos';
  const statusSel  = document.querySelectorAll('.filter-select')[2]?.value || 'Todos';

  return allProducao.filter(r => {
    const matchProduto = produtoSel === 'Todos os produtos' || r.produto === produtoSel;
    const matchStatus  = statusSel === 'Todos' || statusSel === 'Concluído';
    return matchProduto && matchStatus;
  });
}

function applyAndRender() {
  const data = getFiltered();
  renderTable(data);
  updateKPIs(data);
}

/* ---------- SIDEBAR ---------- */
function initSidebar() {
  // A função toggleGroup já está definida inline no HTML; só garantimos o listener alternativo
  document.querySelectorAll('.nav-group-title').forEach(btn => {
    // Não duplica se o onclick já está no elemento
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener('click', () => {
        const group = btn.closest('.nav-group') || btn.closest('li.nav-group');
        if (group) group.classList.toggle('open');
      });
    }
  });
}

// Expõe para o onclick inline do HTML
window.toggleGroup = function (id) {
  document.getElementById(id)?.classList.toggle('open');
};

/* ---------- FILTER BUTTONS ---------- */
function initFilters() {
  // Popula selects de produto
  const prodSelect = document.querySelectorAll('.filter-select')[1];
  if (prodSelect) {
    const produtos = [...new Set(allProducao.map(r => r.produto))];
    produtos.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      prodSelect.appendChild(opt);
    });
  }

  // Status
  const statusSelect = document.querySelectorAll('.filter-select')[2];
  if (statusSelect) {
    ['Concluído', 'Em andamento', 'Cancelado'].forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      statusSelect.appendChild(opt);
    });
  }

  document.querySelector('.btn-filtrar')?.addEventListener('click', applyAndRender);
  document.querySelector('.btn-limpar')?.addEventListener('click', () => {
    document.querySelectorAll('.filter-select').forEach(s => s.selectedIndex = 0);
    applyAndRender();
  });
}

/* ---------- EXPORT STUBS ---------- */
function initExports() {
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', () => alert('Exportação será implementada com os dados reais do backend.'));
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initFilters();
  initExports();
  renderBarChart(weeklyData);
  renderHBar();
  applyAndRender();
});