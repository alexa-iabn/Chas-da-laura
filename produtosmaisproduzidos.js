/* ============================================================
   produtos-mais-produzidos.js — Chás da Laura
   Página: Produtos mais produzidos
   ============================================================ */

/* ---------- CORES ---------- */
const COLORS = {
  'Bled 1 - 50g': '#1a5c1a',
  'Bled 2 - 50g': '#c8952c',
  'Bled 3 - 50g': '#6aab3a',
  'Bled 4 - 50g': '#7b3fbe',
};

/* ---------- DADOS ---------- */
const SOURCE = [
  { semana: '20/05 - 26/05', produto: 'Bled 1 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 2 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 3 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 4 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 1 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 2 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 3 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 4 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 1 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 2 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 3 - 50g', qty: 50, custo: 294.00, status: 'Em andamento' },
  { semana: '20/05 - 26/05', produto: 'Bled 4 - 50g', qty: 50, custo: 294.00, status: 'Em andamento' },
  { semana: '20/05 - 26/05', produto: 'Bled 1 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 2 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 3 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 4 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 1 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 2 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
  { semana: '20/05 - 26/05', produto: 'Bled 3 - 50g', qty: 50, custo: 294.00, status: 'Concluído'    },
];

/* ---------- PAGINAÇÃO ---------- */
const PAGE_SIZE = 10;
let currentPage = 1;
let activeData  = [...SOURCE];
let sortedData  = [...SOURCE];

/* ---------- HELPERS ---------- */
function brl(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function statusBadge(s) {
  const map = {
    'Concluído':    { cls: 'badge-status badge-normal', label: 'Concluído'    },
    'Em andamento': { cls: 'badge-status badge-baixo',  label: 'Em andamento' },
    'Cancelado':    { cls: 'badge-status badge-zerado', label: 'Cancelado'    },
  };
  const b = map[s] || { cls: 'badge-status', label: s };
  return `<span class="${b.cls}">${b.label}</span>`;
}

/* ---------- RENDER TABELA ---------- */
function renderTable(data) {
  const tbody    = document.getElementById('tableBody');
  const totalQty = data.reduce((s, r) => s + r.qty, 0);

  /* Paginação */
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  const start  = (currentPage - 1) * PAGE_SIZE;
  const paged  = data.slice(start, start + PAGE_SIZE);

  tbody.innerHTML = '';

  if (!paged.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#9ca3af;padding:24px">Nenhum resultado encontrado.</td></tr>`;
  } else {
    paged.forEach(r => {
      const color = COLORS[r.produto] || '#888';
      const pct   = totalQty ? ((r.qty / totalQty) * 100).toFixed(1) : '0.0';
      const media = r.qty ? r.custo / r.qty : 0;

      // Mini barra de % do total
      const barWidth = Math.round(parseFloat(pct));
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.semana}</td>
        <td>
          <div class="product-cell">
            <span class="product-dot" style="background:${color}; display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:6px; flex-shrink:0;"></span>
            ${r.produto}
          </div>
        </td>
        <td style="text-align:center">${r.qty} un</td>
        <td style="text-align:center">
          <div style="display:flex;align-items:center;gap:6px;justify-content:center;">
            <div style="width:60px;height:6px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
              <div style="width:${barWidth}%;height:100%;background:${color};border-radius:4px;"></div>
            </div>
            <span>${pct}%</span>
          </div>
        </td>
        <td style="text-align:center">${brl(r.custo)}</td>
        <td style="text-align:center">${brl(media)}</td>
        <td style="text-align:center">${statusBadge(r.status)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* Totais */
  const totalValor = data.reduce((s, r) => s + r.custo, 0);
  const mediaGlobal = totalQty ? totalValor / totalQty : 0;
  document.getElementById('totalQty').textContent   = totalQty + ' UN';
  document.getElementById('totalPct').textContent   = '100%';
  document.getElementById('totalValor').textContent = brl(totalValor);
  document.getElementById('totalMedia').textContent = brl(mediaGlobal);

  renderPagination(data.length);
}

/* ---------- PAGINAÇÃO UI ---------- */
function renderPagination(total) {
  let pg = document.getElementById('paginacao');
  if (!pg) {
    pg = document.createElement('div');
    pg.id = 'paginacao';
    pg.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #e5e7eb;';
    document.querySelector('.table-wrap')?.after(pg);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end   = Math.min(currentPage * PAGE_SIZE, total);

  pg.innerHTML = `
    <span>Mostrando ${total ? start : 0}–${end} de ${total} registros</span>
    <div style="display:flex;gap:4px;">
      <button onclick="goPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}
        style="padding:4px 10px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;${currentPage<=1?'opacity:.4;cursor:default':''}">‹</button>
      ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
        <button onclick="goPage(${p})"
          style="padding:4px 10px;border:1px solid ${p===currentPage?'#1a5c1a':'#d1d5db'};border-radius:6px;
          background:${p===currentPage?'#1a5c1a':'#fff'};color:${p===currentPage?'#fff':'#374151'};cursor:pointer;font-weight:${p===currentPage?'700':'400'}">
          ${p}
        </button>`).join('')}
      <button onclick="goPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}
        style="padding:4px 10px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;${currentPage>=totalPages?'opacity:.4;cursor:default':''}">›</button>
    </div>
  `;
}

window.goPage = function(p) {
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  renderTable(sortedData);
};

/* ---------- ATUALIZA CABEÇALHO DA TABELA (adiciona coluna Status) ---------- */
function ensureStatusColumn() {
  const thead = document.querySelector('#mainTable thead tr');
  if (!thead) return;
  if (!thead.querySelector('th[data-status]')) {
    const th = document.createElement('th');
    th.setAttribute('data-status', '1');
    th.style.textAlign = 'center';
    th.textContent = 'Status';
    thead.appendChild(th);
  }
}

/* ---------- FILTROS ---------- */
function getFiltered() {
  const produto = document.getElementById('filtroProduto')?.value || '';
  const status  = document.getElementById('filtroStatus')?.value  || '';
  const q       = (document.getElementById('searchInput')?.value || '').toLowerCase();

  return SOURCE.filter(r => {
    const okProduto = !produto || r.produto === produto;
    const okStatus  = !status  || r.status  === status;
    const okSearch  = !q || r.produto.toLowerCase().includes(q) || r.semana.toLowerCase().includes(q);
    return okProduto && okStatus && okSearch;
  });
}

function getOrdered(data) {
  const val    = document.getElementById('ordenar')?.value || 'qty-desc';
  const sorted = [...data];
  if      (val === 'qty-desc')   sorted.sort((a, b) => b.qty   - a.qty);
  else if (val === 'qty-asc')    sorted.sort((a, b) => a.qty   - b.qty);
  else if (val === 'valor-desc') sorted.sort((a, b) => b.custo - a.custo);
  else if (val === 'valor-asc')  sorted.sort((a, b) => a.custo - b.custo);
  else if (val === 'pct-desc')   sorted.sort((a, b) => b.qty   - a.qty);
  else if (val === 'week')       sorted.sort((a, b) => a.semana.localeCompare(b.semana));
  else if (val === 'status')     sorted.sort((a, b) => a.status.localeCompare(b.status));
  return sorted;
}

function applyAndRender() {
  currentPage = 1;
  activeData  = getFiltered();
  sortedData  = getOrdered(activeData);
  renderTable(sortedData);
}

/* ---------- EXPOSTOS PARA ONCLICK NO HTML ---------- */
window.applyFilters = applyAndRender;

window.clearFilters = function () {
  ['filtroProduto', 'filtroStatus'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const s = document.getElementById('searchInput');
  if (s) s.value = '';
  applyAndRender();
};

window.filterTable = applyAndRender;

window.sortTable = function (val) {
  currentPage = 1;
  sortedData  = getOrdered(activeData);
  renderTable(sortedData);
};

/* ---------- SIDEBAR ---------- */
window.toggleGroup = function (id) {
  document.getElementById(id)?.classList.toggle('open');
};

/* ---------- EXPORTAÇÃO (stubs) ---------- */
function initExports() {
  document.querySelector('.btn-export-excel')?.addEventListener('click', () => {
    alert('Exportação para Excel será implementada com os dados reais do backend.');
  });
  document.querySelector('.btn-export-pdf')?.addEventListener('click', () => {
    alert('Download do PDF será implementado com os dados reais do backend.');
  });
}

/* ---------- OPÇÃO DE ORDENAR POR STATUS (adiciona ao select) ---------- */
function addStatusSortOption() {
  const sel = document.getElementById('ordenar');
  if (!sel) return;
  if (!sel.querySelector('option[value="status"]')) {
    const opt = document.createElement('option');
    opt.value = 'status';
    opt.textContent = 'Status';
    sel.appendChild(opt);
  }
}

/* ---------- BUSCA COM DEBOUNCE ---------- */
function initSearch() {
  let timer;
  document.getElementById('searchInput')?.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(applyAndRender, 250);
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  ensureStatusColumn();
  addStatusSortOption();
  initExports();
  initSearch();
  applyAndRender();
});