/* ============================================================
   relatorios-estoque.js — Chás da Laura
   Página: Relatórios de Estoque (cards KPI + gráficos + tabela)
   ============================================================ */

/* ---------- DADOS ---------- */
const allItems = [
  { tipo: 'Produto', item: 'Ered 1 - 50g',       estoqueAtual: '25 UN',  estoqueMin: '10 UN',  valorUnit: 'R$ 50,00 UN',  valorTotal: 1250.00, situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 2 - 50g',       estoqueAtual: '0 UN',   estoqueMin: '10 UN',  valorUnit: 'R$ 50,00 UN',  valorTotal: 0,       situacao: 'Zerado'        },
  { tipo: 'Insumo',  item: 'Flor de hibisco',    estoqueAtual: '2 KG',   estoqueMin: '500 g',  valorUnit: 'R$ 20,00 KG',  valorTotal: 40.00,   situacao: 'Normal'        },
  { tipo: 'Insumo',  item: 'Flor de camomila',   estoqueAtual: '100 g',  estoqueMin: '500 g',  valorUnit: 'R$ 30,00 KG',  valorTotal: 3.00,    situacao: 'Estoque baixo' },
  { tipo: 'Produto', item: 'Ered 1 - 100g',      estoqueAtual: '18 UN',  estoqueMin: '10 UN',  valorUnit: 'R$ 90,00 UN',  valorTotal: 1620.00, situacao: 'Normal'        },
  { tipo: 'Insumo',  item: 'Folha de hortelã',   estoqueAtual: '3 KG',   estoqueMin: '1 KG',   valorUnit: 'R$ 15,00 KG',  valorTotal: 45.00,   situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 2 - 100g',      estoqueAtual: '5 UN',   estoqueMin: '10 UN',  valorUnit: 'R$ 90,00 UN',  valorTotal: 450.00,  situacao: 'Estoque baixo' },
];

/* ---------- HELPERS ---------- */
function fmtBRL(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}
function badgeForSituacao(s) {
  if (s === 'Normal')        return 'badge-normal';
  if (s === 'Estoque baixo') return 'badge-baixo';
  if (s === 'Zerado')        return 'badge-zerado';
  return '';
}

/* ---------- KPI CARDS (atualização dinâmica) ---------- */
function updateKPIs(data) {
  const totalValor = data.reduce((s, r) => s + r.valorTotal, 0);
  const totalItens = data.length;
  const baixo      = data.filter(r => r.situacao === 'Estoque baixo').length;
  const zerado     = data.filter(r => r.situacao === 'Zerado').length;

  const kpiValorEl = document.querySelector('.card-resumo-valor');
  const kpiEls     = document.querySelectorAll('.card-resumo-valor');

  if (kpiEls[0]) kpiEls[0].textContent = fmtBRL(totalValor);
  if (kpiEls[1]) kpiEls[1].textContent = baixo;
  if (kpiEls[2]) kpiEls[2].textContent = zerado;
  if (kpiEls[3]) kpiEls[3].textContent = totalItens;
}

/* ---------- TABELA ---------- */
function renderTable(data) {
  const tbody = document.querySelector('.tabela-card table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach(r => {
    const tipoCls  = r.tipo === 'Produto' ? 'badge-produto' : 'badge-insumo';
    const emoji    = r.tipo === 'Insumo' ? '🌿 ' : '';
    const badgeCls = badgeForSituacao(r.situacao);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="badge-tipo ${tipoCls}">${r.tipo}</span></td>
      <td>${emoji}${r.item}</td>
      <td>${r.estoqueAtual}</td>
      <td>${r.estoqueMin}</td>
      <td>${r.valorUnit}</td>
      <td>${fmtBRL(r.valorTotal)}</td>
      <td><span class="badge-status ${badgeCls}">${r.situacao}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

/* ---------- DONUT — Situação (SVG inline já presente, só atualiza legenda) ---------- */
function updateDonutSituacao(data) {
  const total  = data.length || 1;
  const normal = data.filter(r => r.situacao === 'Normal').length;
  const baixo  = data.filter(r => r.situacao === 'Estoque baixo').length;
  const zerado = data.filter(r => r.situacao === 'Zerado').length;

  const circ = 2 * Math.PI * 38; // ≈ 238.76

  const normalArc = (normal / total) * circ;
  const baixoArc  = (baixo  / total) * circ;
  const zeradoArc = (zerado / total) * circ;

  const svgs = document.querySelectorAll('.grafico-card svg');
  if (svgs[1]) {
    const circles = svgs[1].querySelectorAll('circle');
    if (circles[1]) circles[1].setAttribute('stroke-dasharray', `${normalArc.toFixed(1)} ${circ.toFixed(1)}`);
    if (circles[2]) {
      circles[2].setAttribute('stroke-dasharray', `${baixoArc.toFixed(1)} ${circ.toFixed(1)}`);
      circles[2].setAttribute('stroke-dashoffset', `-${normalArc.toFixed(1)}`);
    }
    if (circles[3]) {
      circles[3].setAttribute('stroke-dasharray', `${zeradoArc.toFixed(1)} ${circ.toFixed(1)}`);
      circles[3].setAttribute('stroke-dashoffset', `-${(normalArc + baixoArc).toFixed(1)}`);
    }

    // Texto central
    const texts = svgs[1].querySelectorAll('text');
    if (texts[0]) texts[0].textContent = total;

    // Legenda
    const legendItems = svgs[1].closest('.grafico-card').querySelectorAll('.legend-value');
    if (legendItems[0]) legendItems[0].textContent = `${normal} (${((normal/total)*100).toFixed(1)}%)`;
    if (legendItems[1]) legendItems[1].textContent = `${baixo} (${((baixo/total)*100).toFixed(1)}%)`;
    if (legendItems[2]) legendItems[2].textContent = `${zerado} (${((zerado/total)*100).toFixed(1)}%)`;
  }
}

/* ---------- FILTER ---------- */
function getFiltered() {
  const catSel  = document.querySelectorAll('.filtro-group select')[0]?.value || 'Todas as categorias';
  const tipoSel = document.querySelectorAll('.filtro-group select')[1]?.value || 'Todos os tipos';

  return allItems.filter(r => {
    const matchCat  = catSel  === 'Todas as categorias' || r.tipo === catSel.replace(/s$/, ''); // 'Produtos'→'Produto'
    const matchTipo = tipoSel === 'Todos os tipos'      || true; // tipos fictícios no mock
    return matchCat && matchTipo;
  });
}

function applyAndRender() {
  const data = getFiltered();
  renderTable(data);
  updateKPIs(data);
  updateDonutSituacao(data);
}

/* ---------- SIDEBAR ---------- */
function initSidebar() {
  document.querySelectorAll('.nav-group-title').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.nav-group').classList.toggle('open'));
  });
}

/* ---------- FILTER BUTTONS ---------- */
function initFilters() {
  document.querySelector('.btn-filtrar')?.addEventListener('click', applyAndRender);
  document.querySelector('.btn-limpar')?.addEventListener('click', () => {
    document.querySelectorAll('.filtro-group select').forEach(s => s.selectedIndex = 0);
    applyAndRender();
  });
}

/* ---------- EXPORT STUBS ---------- */
function initExports() {
  document.querySelectorAll('.grafico-export-btn').forEach(btn => {
    btn.addEventListener('click', () => alert('Exportação será implementada com os dados reais do backend.'));
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initFilters();
  initExports();
  applyAndRender();
});