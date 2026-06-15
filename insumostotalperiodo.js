/* ============================================================
   insumos-total-periodo.js — Chás da Laura
   Página: Insumos Total por Período
   ============================================================ */

/* ---------- BASE DE INSUMOS (cadastro) ---------- */
const INSUMOS_CADASTRO = [
  { nome: 'Camomila',             unidadeMedida: 'kg',       custoUnit: 48.00 },
  { nome: 'Erva-doce',            unidadeMedida: 'kg',       custoUnit: 35.00 },
  { nome: 'Hortelã',              unidadeMedida: 'kg',       custoUnit: 30.00 },
  { nome: 'Capim-limão',          unidadeMedida: 'kg',       custoUnit: 28.00 },
  { nome: 'Chá-preto',            unidadeMedida: 'kg',       custoUnit: 55.00 },
  { nome: 'Chá-verde',            unidadeMedida: 'kg',       custoUnit: 52.00 },
  { nome: 'Canela em casca',      unidadeMedida: 'g',        custoUnit: 0.08  },
  { nome: 'Gengibre desidratado', unidadeMedida: 'g',        custoUnit: 0.06  },
  { nome: 'Hibisco',              unidadeMedida: 'kg',       custoUnit: 42.00 },
  { nome: 'Lavanda',              unidadeMedida: 'g',        custoUnit: 0.12  },
  { nome: 'Melissa',              unidadeMedida: 'kg',       custoUnit: 38.00 },
  { nome: 'Lata para blend',      unidadeMedida: 'unidades', custoUnit: 4.50  },
  { nome: 'Cúrcuma',              unidadeMedida: 'g',        custoUnit: 0.09  },
  { nome: 'Cravo-da-índia',       unidadeMedida: 'g',        custoUnit: 0.10  },
  { nome: 'Anis-estrelado',       unidadeMedida: 'g',        custoUnit: 0.11  },
  { nome: 'Infusor inox redondo', unidadeMedida: 'unidades', custoUnit: 12.00 },
  { nome: 'Álcool de cereal',     unidadeMedida: 'litros',   custoUnit: 18.00 },
  { nome: 'Corrente para infusor',unidadeMedida: 'unidades', custoUnit: 2.50  },
  { nome: 'Tela de aço inox',     unidadeMedida: 'metros',   custoUnit: 22.00 },
  { nome: 'Argola metálica',      unidadeMedida: 'unidades', custoUnit: 0.80  },
];

/* ---------- GERAÇÃO DE DADOS DE CONSUMO ---------- */
/* Simula registros semanais de uso de cada insumo em produção */
const SEMANAS = [
  '20/05 - 26/05',
  '27/05 - 02/06',
  '03/06 - 09/06',
  '10/06 - 16/06',
];

const STATUS_OPTIONS = ['Concluído', 'Concluído', 'Concluído', 'Em andamento', 'Cancelado'];

function statusAleatorio(seed) {
  return STATUS_OPTIONS[seed % STATUS_OPTIONS.length];
}

/* Gera SOURCE: cada insumo × cada semana = 1 registro */
const SOURCE = [];
INSUMOS_CADASTRO.forEach((ins, i) => {
  SEMANAS.forEach((sem, j) => {
    const qty        = parseFloat((2.5 + (i % 4) * 0.5 + j * 0.3).toFixed(2));
    const custoTotal = parseFloat((qty * ins.custoUnit).toFixed(2));
    const utilizados = 6 + (i % 5) + j;

    SOURCE.push({
      semana:     sem,
      insumo:     ins.nome,
      unidade:    ins.unidadeMedida,
      qty,
      custoUnit:  ins.custoUnit,
      custoTotal,
      utilizados,
      status:     statusAleatorio(i + j),
    });
  });
});

/* ---------- ESTADO ---------- */
const PAGE_SIZE  = 19; // ~19 linhas visíveis como na imagem
let currentPage  = 1;
let activeData   = [...SOURCE];
let sortedData   = [...SOURCE];

/* ---------- HELPERS ---------- */
function brl(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtQty(val, unit) {
  return val.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' ' + unit.toUpperCase();
}

/* ---------- RENDER TABELA ---------- */
function renderTable(data) {
  const tbody    = document.getElementById('tableBody');
  if (!tbody) return;

  /* totais sempre sobre o dataset completo filtrado */
  const totalQty       = data.reduce((s, r) => s + r.qty, 0);
  const totalCusto     = data.reduce((s, r) => s + r.custoTotal, 0);
  const totalUtilizados = data.reduce((s, r) => s + r.utilizados, 0);

  /* paginação */
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * PAGE_SIZE;
  const paged = data.slice(start, start + PAGE_SIZE);

  tbody.innerHTML = '';

  if (!paged.length) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">Nenhum resultado encontrado.</td></tr>`;
  } else {
    paged.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.semana}</td>
        <td>${r.insumo}</td>
        <td>${r.unidade.toUpperCase()}</td>
        <td>${fmtQty(r.qty, r.unidade)}</td>
        <td>${brl(r.custoUnit)}</td>
        <td>${brl(r.custoTotal)}</td>
        <td>${r.utilizados}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* totais no tfoot */
  const elQty  = document.getElementById('totalQty');
  const elCusto = document.getElementById('totalCusto');
  const elUtil  = document.getElementById('totalUtilizados');

  if (elQty)   elQty.textContent   = totalQty.toLocaleString('pt-BR', { minimumFractionDigits: 1 }) + ' KG';
  if (elCusto) elCusto.textContent = brl(totalCusto);
  if (elUtil)  elUtil.textContent  = totalUtilizados;

  renderPaginacao(data.length);
}

/* ---------- PAGINAÇÃO ---------- */
function renderPaginacao(total) {
  const pg = document.getElementById('paginacao');
  if (!pg) return;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end   = Math.min(currentPage * PAGE_SIZE, total);

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(p => `<button class="pg-btn ${p === currentPage ? 'active' : ''}" onclick="goPage(${p})">${p}</button>`)
    .join('');

  pg.innerHTML = `
    <span>Mostrando ${total ? start : 0}–${end} de ${total} registros</span>
    <div class="pg-btns">
      <button class="pg-btn" onclick="goPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>‹</button>
      ${pageButtons}
      <button class="pg-btn" onclick="goPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>›</button>
    </div>
  `;
}

window.goPage = function(p) {
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  renderTable(sortedData);
};

/* ---------- FILTRO ---------- */
function getFiltered() {
  const insumo = document.getElementById('filtroInsumo')?.value  || '';
  const status = document.getElementById('filtroStatus')?.value  || '';
  const q      = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();

  return SOURCE.filter(r => {
    const okInsumo = !insumo || r.insumo === insumo;
    const okStatus = !status || r.status === status;
    const okSearch = !q
      || r.insumo.toLowerCase().includes(q)
      || r.semana.toLowerCase().includes(q)
      || r.unidade.toLowerCase().includes(q);
    return okInsumo && okStatus && okSearch;
  });
}

/* ---------- ORDENAÇÃO ---------- */
function getOrdered(data) {
  const val    = document.getElementById('ordenar')?.value || 'qty-desc';
  const sorted = [...data];
  if      (val === 'qty-desc')   sorted.sort((a, b) => b.qty        - a.qty);
  else if (val === 'qty-asc')    sorted.sort((a, b) => a.qty        - b.qty);
  else if (val === 'custo-desc') sorted.sort((a, b) => b.custoTotal - a.custoTotal);
  else if (val === 'custo-asc')  sorted.sort((a, b) => a.custoTotal - b.custoTotal);
  else if (val === 'insumo')     sorted.sort((a, b) => a.insumo.localeCompare(b.insumo, 'pt-BR'));
  else if (val === 'week')       sorted.sort((a, b) => a.semana.localeCompare(b.semana));
  return sorted;
}

function applyAndRender() {
  currentPage = 1;
  activeData  = getFiltered();
  sortedData  = getOrdered(activeData);
  renderTable(sortedData);
}

/* ---------- SIDEBAR ---------- */
window.toggleGroup = function(id) {
  document.getElementById(id)?.classList.toggle('open');
};

/* ---------- POPULA SELECT DE INSUMOS ---------- */
function populaFiltroInsumos() {
  const sel = document.getElementById('filtroInsumo');
  if (!sel) return;
  /* limpa opções existentes além da primeira */
  while (sel.options.length > 1) sel.remove(1);

  const nomes = [...new Set(SOURCE.map(r => r.insumo))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  nomes.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    sel.appendChild(opt);
  });
}

/* ---------- EVENTOS ---------- */
function initEventos() {
  document.getElementById('btnFiltrar')
    ?.addEventListener('click', applyAndRender);

  document.getElementById('btnLimpar')
    ?.addEventListener('click', () => {
      ['filtroInsumo', 'filtroStatus', 'filtroPeriodo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = 0;
      });
      const s = document.getElementById('searchInput');
      if (s) s.value = '';
      applyAndRender();
    });

  /* busca com debounce */
  let timer;
  document.getElementById('searchInput')
    ?.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(applyAndRender, 250);
    });

  document.getElementById('ordenar')
    ?.addEventListener('change', () => {
      currentPage = 1;
      sortedData  = getOrdered(activeData);
      renderTable(sortedData);
    });

  document.getElementById('btnExcel')
    ?.addEventListener('click', () => alert('Exportação para Excel será implementada com os dados reais do backend.'));

  document.getElementById('btnPdf')
    ?.addEventListener('click', () => alert('Download do PDF será implementado com os dados reais do backend.'));
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  populaFiltroInsumos();
  initEventos();
  applyAndRender();
});