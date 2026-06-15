/* ============================================================
   valor-estoque-tipo.js — Chás da Laura
   Página: Valor de Estoque por Tipo
   ============================================================ */

/* ---------- DADOS ---------- */
const allItems = [
  { tipo: 'Produto', item: 'Ered 1 - 50g',     estoqueAtual: 75,   unidade: 'UN',  pctQty: 51.0, valorTotal: 1250.00, pctVal: 2.0,  valorMedio: 50.00,  situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 2 - 50g',     estoqueAtual: 0,    unidade: 'UN',  pctQty: 0.0,  valorTotal: 0.00,   pctVal: 0.0,  valorMedio: 50.00,  situacao: 'Zerado'        },
  { tipo: 'Insumo',  item: 'Flor de hibisco',  estoqueAtual: 2,    unidade: 'KG',  pctQty: 1.4,  valorTotal: 40.00,  pctVal: 3.0,  valorMedio: 20.00,  situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 1 - 50g',     estoqueAtual: 25,   unidade: 'UN',  pctQty: 17.0, valorTotal: 1250.00, pctVal: 2.0, valorMedio: 50.00,  situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 2 - 50g',     estoqueAtual: 0,    unidade: 'UN',  pctQty: 0.0,  valorTotal: 0.00,   pctVal: 0.0,  valorMedio: 50.00,  situacao: 'Zerado'        },
  { tipo: 'Insumo',  item: 'Flor de camomila', estoqueAtual: 0.1,  unidade: 'KG',  pctQty: 0.5,  valorTotal: 2.00,   pctVal: 0.5,  valorMedio: 20.00,  situacao: 'Estoque baixo' },
  { tipo: 'Insumo',  item: 'Flor de hibisco',  estoqueAtual: 2,    unidade: 'KG',  pctQty: 3.0,  valorTotal: 40.00,  pctVal: 3.0,  valorMedio: 20.00,  situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 1 - 50g',     estoqueAtual: 25,   unidade: 'UN',  pctQty: 3.0,  valorTotal: 1250.00, pctVal: 2.0, valorMedio: 50.00,  situacao: 'Normal'        },
  { tipo: 'Insumo',  item: 'Flor de camomila', estoqueAtual: 0.1,  unidade: 'KG',  pctQty: 0.5,  valorTotal: 2.00,   pctVal: 0.5,  valorMedio: 20.00,  situacao: 'Estoque baixo' },
  { tipo: 'Produto', item: 'Ered 1 - 50g',     estoqueAtual: 25,   unidade: 'UN',  pctQty: 13.0, valorTotal: 1250.00, pctVal: 2.0, valorMedio: 50.00,  situacao: 'Normal'        },
  { tipo: 'Insumo',  item: 'Flor de hibisco',  estoqueAtual: 2,    unidade: 'KG',  pctQty: 3.0,  valorTotal: 40.00,  pctVal: 3.0,  valorMedio: 20.00,  situacao: 'Normal'        },
  { tipo: 'Produto', item: 'Ered 1 - 50g',     estoqueAtual: 0,    unidade: 'UN',  pctQty: 0.0,  valorTotal: 0.00,   pctVal: 0.0,  valorMedio: 50.00,  situacao: 'Zerado'        },
  { tipo: 'Insumo',  item: 'Flor de camomila', estoqueAtual: 0.1,  unidade: 'KG',  pctQty: 0.5,  valorTotal: 2.00,   pctVal: 0.5,  valorMedio: 20.00,  situacao: 'Estoque baixo' },
];

/* ---------- HELPERS ---------- */
function fmtBRL(val) {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

function fmtQty(val, unit) {
  // Para KG com decimais pequenos, mostra em gramas se < 1
  if (unit === 'KG' && val < 1) {
    return (val * 1000).toLocaleString('pt-BR') + 'g';
  }
  return val.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' ' + unit;
}

function badgeForSituacao(s) {
  if (s === 'Normal')        return 'badge-normal';
  if (s === 'Estoque baixo') return 'badge-baixo';
  if (s === 'Zerado')        return 'badge-zerado';
  return '';
}

/* ---------- RENDER ---------- */
function renderTable(data) {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  // Remove linhas de dados (mantém a total-row se existir)
  const totalRow = tbody.querySelector('.total-row');
  tbody.innerHTML = '';

  data.forEach(r => {
    const tipoCls  = r.tipo === 'Produto' ? 'badge-produto' : 'badge-insumo';
    const emoji    = r.tipo === 'Insumo' ? '🌿 ' : '';
    const badgeCls = badgeForSituacao(r.situacao);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="badge-tipo ${tipoCls}">${r.tipo}</span></td>
      <td>${emoji}${r.item}</td>
      <td>${fmtQty(r.estoqueAtual, r.unidade)}</td>
      <td>${r.pctQty.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</td>
      <td>${fmtBRL(r.valorTotal)}</td>
      <td>${r.pctVal.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</td>
      <td>${fmtBRL(r.valorMedio)}</td>
      <td><span class="badge-status ${badgeCls}">${r.situacao}</span></td>
    `;
    tbody.appendChild(tr);
  });

  // Recalcula total geral
  const totalVal = data.reduce((s, r) => s + r.valorTotal, 0);
  const trTotal  = document.createElement('tr');
  trTotal.className = 'total-row';
  trTotal.innerHTML = `
    <td colspan="4"><strong>TOTAL GERAL</strong></td>
    <td><strong>${fmtBRL(totalVal)}</strong></td>
    <td><strong>100%</strong></td>
    <td>—</td>
    <td>—</td>
  `;
  tbody.appendChild(trTotal);
}

/* ---------- FILTER ---------- */
function getFiltered() {
  const searchVal = (document.querySelector('.search-input-wrap input')?.value || '').toLowerCase();
  const tipoSel   = document.querySelectorAll('.filtro-group select')[0]?.value || 'Todos os estoques';
  const statusSel = document.querySelectorAll('.filtro-group select')[1]?.value || 'Todos';

  return allItems.filter(r => {
    const matchSearch = !searchVal
      || r.item.toLowerCase().includes(searchVal)
      || r.tipo.toLowerCase().includes(searchVal);

    const matchTipo = tipoSel === 'Todos os estoques'
      || r.tipo === tipoSel.replace(/s$/, ''); // 'Produtos' → 'Produto'

    const matchStatus = statusSel === 'Todos' || r.situacao === statusSel;

    return matchSearch && matchTipo && matchStatus;
  });
}

/* ---------- SORT ---------- */
function getSorted(data) {
  const orderVal = document.querySelector('.ordenar-select select')?.value || '';
  const sorted   = [...data];
  if (orderVal.includes('Maior quantidade'))    sorted.sort((a, b) => b.estoqueAtual - a.estoqueAtual);
  else if (orderVal.includes('Menor quantidade')) sorted.sort((a, b) => a.estoqueAtual - b.estoqueAtual);
  else if (orderVal.includes('Maior valor'))    sorted.sort((a, b) => b.valorTotal - a.valorTotal);
  else if (orderVal.includes('Menor valor'))    sorted.sort((a, b) => a.valorTotal - b.valorTotal);
  return sorted;
}

function applyAndRender() {
  renderTable(getSorted(getFiltered()));
}

/* ---------- SIDEBAR ---------- */
function initSidebar() {
  document.querySelectorAll('.nav-group-title').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.nav-group').classList.toggle('open'));
  });
}

/* ---------- EVENTOS ---------- */
function initFilters() {
  document.querySelector('.btn-filtrar')?.addEventListener('click', applyAndRender);

  document.querySelector('.btn-limpar')?.addEventListener('click', () => {
    document.querySelectorAll('.filtro-group select').forEach(s => s.selectedIndex = 0);
    const search = document.querySelector('.search-input-wrap input');
    if (search) search.value = '';
    applyAndRender();
  });

  document.querySelector('.search-input-wrap input')
    ?.addEventListener('input', applyAndRender);

  document.querySelector('.ordenar-select select')
    ?.addEventListener('change', applyAndRender);
}

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