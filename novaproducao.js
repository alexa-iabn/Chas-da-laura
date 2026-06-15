/* =============================================================
   nova-producao.js — Chás da Laura · Nova Produção
   ============================================================= */

/* ─────────────────────────────────────────
   1. DADOS DAS RECEITAS
───────────────────────────────────────── */
const receitas = {
  blend1: {
    nome: 'Blend 1 - Lata 50g',
    rendimento: '10 Latas 50g',
    insumos: [
      { nome: 'Flor de camomila',  porUnidade: '20,00 g' },
      { nome: 'Flor de liz',       porUnidade: '20,00 g' },
      { nome: 'Flor de calendula', porUnidade: '20,00 g' },
      { nome: 'Semente de mamão',  porUnidade: '5,00 g'  },
      { nome: 'Lata',              porUnidade: '1 uni'   },
    ],
  },
  blend2: {
    nome: 'Blend 2 - Caixa 250g',
    rendimento: '8 Caixas 250g',
    insumos: [
      { nome: 'Erva-doce',  porUnidade: '30,00 g' },
      { nome: 'Hortelã',    porUnidade: '15,00 g' },
      { nome: 'Gengibre',   porUnidade: '10,00 g' },
      { nome: 'Caixa 250g', porUnidade: '1 uni'   },
    ],
  },
  camomila: {
    nome: 'Chá de Camomila - 100g',
    rendimento: '5 Sacos 100g',
    insumos: [
      { nome: 'Camomila seca', porUnidade: '100,00 g' },
      { nome: 'Saco kraft',    porUnidade: '1 uni'    },
    ],
  },
  'hortelã': {
    nome: 'Chá de Hortelã - 100g',
    rendimento: '5 Sacos 100g',
    insumos: [
      { nome: 'Hortelã seca', porUnidade: '100,00 g' },
      { nome: 'Saco kraft',   porUnidade: '1 uni'    },
    ],
  },
  hibisco: {
    nome: 'Chá de Hibisco - 200g',
    rendimento: '6 Sacos 200g',
    insumos: [
      { nome: 'Hibisco seco', porUnidade: '200,00 g' },
      { nome: 'Saco kraft',   porUnidade: '1 uni'    },
    ],
  },
};

/* ─────────────────────────────────────────
   2. RENDERIZAR TABELA DE INSUMOS
───────────────────────────────────────── */
function renderInsumos() {
  const key   = document.getElementById('receita').value;
  const qty   = parseInt(document.getElementById('quantidade').value) || 0;
  const tbody = document.getElementById('insumosBody');

  tbody.innerHTML = '';

  if (!key || !receitas[key]) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="3" class="table-empty">Selecione uma receita para visualizar os insumos.</td>`;
    tbody.appendChild(tr);
    return;
  }

  receitas[key].insumos.forEach((ins, i) => {
    const tr    = document.createElement('tr');
    const isUni = ins.porUnidade.includes('uni');

    let totalStr = '—';
    if (qty > 0) {
      if (isUni) {
        totalStr = `${qty} uni`;
      } else {
        const valNum = parseFloat(ins.porUnidade.replace(',', '.'));
        const total  = (valNum * qty).toFixed(2).replace('.', ',');
        const unit   = ins.porUnidade.replace(/[\d,. ]+/, '').trim();
        totalStr     = `${total} ${unit}`;
      }
    }

    // Animação sequencial nas linhas
    tr.style.animationDelay = `${i * 50}ms`;
    tr.classList.add('row-enter');

    tr.innerHTML = `
      <td>${ins.nome}</td>
      <td>${ins.porUnidade}</td>
      <td><strong>${totalStr}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

/* ─────────────────────────────────────────
   3. ATUALIZAR RESUMO LATERAL
───────────────────────────────────────── */
function atualizarResumo() {
  const key       = document.getElementById('receita').value;
  const qty       = parseInt(document.getElementById('quantidade').value) || 0;
  const unidadeSel = document.getElementById('unidade');
  const unitLabel  = unidadeSel.options[unidadeSel.selectedIndex]?.text || '';
  const dataVal    = document.getElementById('dataProd').value;
  const rec        = receitas[key];

  // Anima os valores ao atualizar
  animarValor('rProduto',    rec ? rec.nome : '—');
  animarValor('rRendimento', rec ? rec.rendimento : '—');

  const qtyText = qty && unitLabel ? `${qty} ${unitLabel}` : '—';
  animarValor('rQtd',     qtyText);
  animarValor('rEstoque', qty ? `+ ${qty} ${unitLabel}` : '—');

  if (dataVal) {
    const [y, m, d] = dataVal.split('-');
    animarValor('rData', `${d}/${m}/${y}`);
  }

  // Destaque visual no estoque quando quantidade > 0
  const estoqueEl = document.getElementById('rEstoque');
  if (estoqueEl) {
    estoqueEl.classList.toggle('estoque-add-val--active', qty > 0);
  }

  renderInsumos();
}

function atualizarReceita() {
  // Esconde banner ao trocar de receita
  const banner = document.getElementById('resumoBanner');
  if (banner) banner.classList.remove('show');

  // Reseta botão
  const btn = document.querySelector('.btn-registrar');
  if (btn) {
    btn.disabled = false;
    btn.classList.remove('btn-registrar--done');
    btn.innerHTML = `
      <img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/certo.svg" alt="" />
      Registrar produção
    `;
  }

  atualizarResumo();
}

/* Anima a troca de valor em um elemento */
function animarValor(id, novoValor) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.textContent === novoValor) return;

  el.classList.remove('valor-fade');
  void el.offsetWidth; // reflow para reiniciar animação
  el.classList.add('valor-fade');
  el.textContent = novoValor;
}

/* ─────────────────────────────────────────
   4. VALIDAÇÃO DO FORMULÁRIO
───────────────────────────────────────── */
function validarFormulario() {
  let valido = true;

  // Receita
  const receita = document.getElementById('receita');
  if (!receita.value) {
    marcarErro(receita, 'Selecione uma receita.');
    valido = false;
  } else {
    limparErro(receita);
  }

  // Quantidade
  const quantidade = document.getElementById('quantidade');
  const qty = parseInt(quantidade.value);
  if (!qty || qty < 1) {
    marcarErro(quantidade, 'Informe uma quantidade válida (mín. 1).');
    valido = false;
  } else {
    limparErro(quantidade);
  }

  // Data de produção
  const dataProd = document.getElementById('dataProd');
  if (!dataProd.value) {
    marcarErro(dataProd, 'Informe a data de produção.');
    valido = false;
  } else {
    limparErro(dataProd);
  }

  return valido;
}

function marcarErro(el, msg) {
  el.classList.add('input--invalid');
  let erroSpan = el.parentElement.querySelector('.input-error');
  if (!erroSpan) {
    erroSpan = document.createElement('span');
    erroSpan.className = 'input-error';
    el.parentElement.appendChild(erroSpan);
  }
  erroSpan.textContent = msg;
}

function limparErro(el) {
  el.classList.remove('input--invalid');
  const erroSpan = el.parentElement.querySelector('.input-error');
  if (erroSpan) erroSpan.remove();
}

// Remove erros ao interagir com os campos
['receita', 'quantidade', 'dataProd'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input',  () => limparErro(el));
  if (el) el.addEventListener('change', () => limparErro(el));
});

/* ─────────────────────────────────────────
   5. REGISTRAR PRODUÇÃO
───────────────────────────────────────── */
function registrarProducao() {
  if (!validarFormulario()) {
    showToast('Preencha todos os campos obrigatórios.', 'error');
    return;
  }

  const btn = document.querySelector('.btn-registrar');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> Registrando...`;

  setTimeout(() => {
    // Mostra banner de sucesso
    const banner = document.getElementById('resumoBanner');
    if (banner) banner.classList.add('show');

    // Atualiza botão para estado "concluído"
    btn.classList.add('btn-registrar--done');
    btn.innerHTML = `
      <img src="https://raw.githubusercontent.com/alexa-iabn/Chas-da-laura/main/Imagens/certo.svg" alt="" />
      Produção registrada!
    `;

    showToast('Produção registrada com sucesso! Estoque atualizado.', 'success');

    // Scroll suave para o resumo lateral (mobile)
    const resumo = document.querySelector('.resumo-card');
    if (resumo && window.innerWidth < 900) {
      resumo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 900);
}

/* ─────────────────────────────────────────
   6. TOAST
───────────────────────────────────────── */
let toastTimer = null;

function showToast(msg, tipo = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;

  clearTimeout(toastTimer);
  t.textContent = msg;
  t.className   = `toast show ${tipo}`;

  toastTimer = setTimeout(() => {
    t.classList.remove('show');
  }, 3200);
}

/* ─────────────────────────────────────────
   7. SIDEBAR — toggle (mobile) e grupos
───────────────────────────────────────── */
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// Fecha sidebar ao clicar fora (mobile)
document.addEventListener('click', e => {
  const sidebar  = document.querySelector('.sidebar');
  const menuBtn  = document.querySelector('.topbar-menu-btn');
  if (
    sidebar &&
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    menuBtn && !menuBtn.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});

function toggleGroup(id) {
  const grupo = document.getElementById(id);
  if (!grupo) return;
  grupo.classList.toggle('open');
}

/* ─────────────────────────────────────────
   8. CAMPO DE QUANTIDADE — setas +/−
      (melhoria UX: segura o botão acelera)
───────────────────────────────────────── */
function ajustarQuantidade(delta) {
  const el  = document.getElementById('quantidade');
  const val = parseInt(el.value) || 0;
  const novo = Math.max(1, val + delta);
  el.value = novo;
  atualizarResumo();
}

/* ─────────────────────────────────────────
   9. CSS DINÂMICO — estados JS-only
───────────────────────────────────────── */
const estilosDinamicos = document.createElement('style');
estilosDinamicos.textContent = `
  /* Entrada animada das linhas da tabela */
  .row-enter {
    animation: rowFade .25s ease both;
  }
  @keyframes rowFade {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Animação de troca de valor no painel */
  .valor-fade {
    animation: valorPulse .3s ease;
  }
  @keyframes valorPulse {
    0%   { opacity: .3; transform: scale(.97); }
    100% { opacity: 1;  transform: scale(1); }
  }

  /* Campo inválido */
  .input--invalid {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(220,38,38,.12) !important;
  }
  .input-error {
    display: block;
    font-size: 11.5px;
    color: #dc2626;
    font-weight: 600;
    margin-top: 3px;
  }

  /* Empty state da tabela */
  .table-empty {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    padding: 28px 16px !important;
    font-style: italic;
  }

  /* Estoque com destaque quando preenchido */
  .estoque-add-val--active {
    color: #25572d;
  }

  /* Botão registrar — estado concluído */
  .btn-registrar--done {
    background: #25572d !important;
    opacity: .85;
    cursor: default;
  }

  /* Spinner */
  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .6s linear infinite;
    vertical-align: middle;
    flex-shrink: 0;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Sidebar mobile */
  @media (max-width: 768px) {
    .sidebar {
      position: fixed !important;
      left: -100% !important;
      transition: left .25s ease !important;
      z-index: 200;
    }
    .sidebar.open {
      left: 0 !important;
    }
    .topbar-menu-btn {
      display: flex !important;
    }
  }
`;
document.head.appendChild(estilosDinamicos);

/* ─────────────────────────────────────────
   10. INICIALIZAÇÃO
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Preenche data de hoje se não houver valor
  const dataProd = document.getElementById('dataProd');
  if (dataProd && !dataProd.value) {
    dataProd.value = new Date().toISOString().split('T')[0];
  }

  // Roda o resumo inicial com os valores padrão do HTML
  atualizarResumo();
});