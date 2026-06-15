/* =============================================================
   editar-insumo.js — Chás da Laura · Editar Insumo
   ============================================================= */

/* ─────────────────────────────────────────────
   UTILITÁRIOS DE STORAGE
───────────────────────────────────────────── */
function carregarInsumosDoStorage() {
  try {
    const raw = localStorage.getItem('insumos');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.length) return parsed;
    }
  } catch (e) { /* ignore */ }
  return [];
}

function salvarInsumosNoStorage(lista) {
  try {
    localStorage.setItem('insumos', JSON.stringify(lista));
  } catch (e) { /* ignore */ }
}

function inferirCategoria(nome) {
  const n = (nome || '').toLowerCase();
  if (/infusor|tela|argola|corrente/.test(n)) return 'Infusor';
  if (/lata|embalagem|saco|caixa/.test(n))    return 'Embalagem';
  if (/canela|gengibre|cravo|anis|cúrcuma|curcuma/.test(n)) return 'Especiarias';
  if (/hibisco|lavanda/.test(n))              return 'Flores';
  if (/álcool|alcool/.test(n))               return 'Outros';
  if (/chá|cha|erva|hortelã|capim|melissa|camomila|erva-doce/.test(n)) return 'Chá';
  return 'Ervas';
}

/* ─────────────────────────────────────────────
   1. CARREGA O INSUMO PELO ID DA URL
───────────────────────────────────────────── */
function obterIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return id ? Number(id) : null;
}

function preencherFormulario(insumo) {
  /* Campos de texto simples */
  const setVal = function (id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('nome',       insumo.nome);
  setVal('valor',      insumo.valor   || '');
  setVal('estoque-min', insumo.estoqueMin || '');
  setVal('descricao',  insumo.descricao || '');

  /* Validade — converte de YYYY-MM-DD para DD/MM/AAAA se necessário */
  if (insumo.validade) {
    let val = insumo.validade;
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const partes = val.split('-');
      val = partes[2] + '/' + partes[1] + '/' + partes[0];
    }
    setVal('validade', val);
  }

  /* Quantidade + unidade */
  if (insumo.quantidade && insumo.quantidade !== '—') {
    /* Tenta separar "500 G" → qtd="500", unidade="G" */
    const match = insumo.quantidade.match(/^([\d.,]+)\s*(.*)$/);
    if (match) {
      setVal('quantidade', match[1]);
      /* Seleciona a unidade correta no <select> */
      const selectUnidade = document.querySelector('.input-group select');
      if (selectUnidade) {
        const unid = (insumo.unidade || match[2] || 'KG').toUpperCase();
        for (let i = 0; i < selectUnidade.options.length; i++) {
          if (selectUnidade.options[i].value.toUpperCase() === unid ||
              selectUnidade.options[i].text.toUpperCase()  === unid) {
            selectUnidade.selectedIndex = i;
            break;
          }
        }
      }
    } else {
      setVal('quantidade', insumo.qtdBruta || '');
    }
  } else if (insumo.qtdBruta) {
    setVal('quantidade', insumo.qtdBruta);
  }

  /* Fornecedor */
  const selectForn = document.getElementById('fornecedor');
  if (selectForn && insumo.fornecedor && insumo.fornecedor !== '—') {
    /* Tenta selecionar opção existente */
    let encontrado = false;
    for (let i = 0; i < selectForn.options.length; i++) {
      if (selectForn.options[i].text === insumo.fornecedor ||
          selectForn.options[i].value === insumo.fornecedor) {
        selectForn.selectedIndex = i;
        encontrado = true;
        break;
      }
    }
    /* Se não encontrou, adiciona dinamicamente */
    if (!encontrado) {
      const opt = document.createElement('option');
      opt.value       = insumo.fornecedor;
      opt.textContent = insumo.fornecedor;
      opt.selected    = true;
      selectForn.appendChild(opt);
    }
  }

  /* Atualiza o painel lateral com os dados do insumo */
  atualizarPainelComInsumo(insumo);
}

function atualizarPainelComInsumo(insumo) {
  const h3 = document.querySelector('.insumo-card__header h3');
  if (h3) h3.textContent = insumo.nome || '—';

  const avatar = document.querySelector('.insumo-avatar');
  if (avatar) {
    const partes   = (insumo.nome || '').split(' ');
    const iniciais = partes.length >= 2
      ? partes[0][0] + partes[partes.length - 1][0]
      : (insumo.nome || 'IN').slice(0, 2);
    avatar.textContent = iniciais.toUpperCase();
  }

  const detalhes = document.querySelectorAll('.insumo-details li span');
  if (detalhes[0]) detalhes[0].textContent = insumo.categoria  || '—';
  if (detalhes[1]) detalhes[1].textContent = insumo.quantidade || '—';
  if (detalhes[2]) detalhes[2].textContent = insumo.fornecedor || '—';
  if (detalhes[3]) {
    detalhes[3].innerHTML = 'Cadastrado em<br /><strong>' + (insumo.data || '—') + '</strong>';
  }

  /* Modal de exclusão */
  const modalAvatar = document.querySelector('.modal-insumo-avatar');
  const modalNome   = document.querySelector('.modal-insumo-nome');
  if (modalAvatar) modalAvatar.textContent = avatar ? avatar.textContent : '??';
  if (modalNome)   modalNome.textContent   = insumo.nome || '—';

  /* Detalhes dentro do modal */
  const modalDetalhes = document.querySelectorAll('.modal-insumo-detalhe');
  if (modalDetalhes[0]) {
    const span = modalDetalhes[0].querySelector('span') || modalDetalhes[0];
    span.textContent = insumo.categoria || '—';
  }
  if (modalDetalhes[1]) {
    const span = modalDetalhes[1].querySelector('span') || modalDetalhes[1];
    span.textContent = insumo.quantidade || '—';
  }
  if (modalDetalhes[2]) {
    const span = modalDetalhes[2].querySelector('span') || modalDetalhes[2];
    span.textContent = insumo.fornecedor || '—';
  }
}

/* ─────────────────────────────────────────────
   2. SIDEBAR
───────────────────────────────────────────── */
document.querySelectorAll('.nav-item--expandable').forEach(function (item) {
  item.addEventListener('click', function () {
    const submenu = item.nextElementSibling;
    if (!submenu || !submenu.classList.contains('nav-submenu')) return;
    const expanded = submenu.style.display === 'block';
    submenu.style.display = expanded ? 'none' : 'block';
    const chevron = item.querySelector('.nav-item__chevron');
    if (chevron) chevron.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});

document.querySelectorAll('.nav-submenu').forEach(function (sub) {
  if (sub.querySelector('.submenu-active')) sub.style.display = 'block';
});

/* ─────────────────────────────────────────────
   3. TOPBAR (mobile)
───────────────────────────────────────────── */
const menuBtn = document.querySelector('.topbar__menu');
const sidebar = document.querySelector('.sidebar');

if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar--open');
  });
  document.addEventListener('click', function (e) {
    if (sidebar.classList.contains('sidebar--open') &&
        !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('sidebar--open');
    }
  });
}

/* ─────────────────────────────────────────────
   4. VALIDAÇÃO
───────────────────────────────────────────── */
const camposObrigatorios = [
  { id: 'nome',       msg: 'Nome do insumo é obrigatório.' },
  { id: 'quantidade', msg: 'Quantidade é obrigatória.' },
  { id: 'fornecedor', msg: 'Selecione um fornecedor.' },
];

const campoValor    = document.getElementById('valor');
const campoValidade = document.getElementById('validade');

if (campoValor) {
  campoValor.addEventListener('input', function (e) {
    let raw = e.target.value.replace(/\D/g, '');
    if (!raw) { e.target.value = ''; return; }
    const num = (parseInt(raw, 10) / 100).toFixed(2);
    e.target.value = num.replace('.', ',');
  });
}

if (campoValidade) {
  campoValidade.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5)      v = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
    else if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });
}

function setErro(id, msg) {
  const campo = document.getElementById(id);
  if (!campo) return;
  const wrapper  = campo.closest('.field') || campo.parentElement;
  const anterior = wrapper.querySelector('.field-error');
  if (anterior) anterior.remove();
  campo.classList.remove('field--invalid');
  if (msg) {
    campo.classList.add('field--invalid');
    const span = document.createElement('span');
    span.className   = 'field-error';
    span.textContent = msg;
    wrapper.appendChild(span);
  }
}

function validarForm() {
  let valido = true;
  camposObrigatorios.forEach(function (c) {
    const campo = document.getElementById(c.id);
    if (!campo) return;
    const vazio = campo.value.trim() === '' || campo.value === '0,00';
    if (vazio) { setErro(c.id, c.msg); valido = false; }
    else setErro(c.id, null);
  });
  if (campoValidade && campoValidade.value.trim()) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(campoValidade.value)) {
      setErro('validade', 'Use o formato DD/MM/AAAA.'); valido = false;
    } else setErro('validade', null);
  }
  return valido;
}

camposObrigatorios.forEach(function (c) {
  const campo = document.getElementById(c.id);
  if (campo) campo.addEventListener('input', function () { setErro(c.id, null); });
});

/* ─────────────────────────────────────────────
   5. SALVAR — atualiza o registro no storage
───────────────────────────────────────────── */
const btnSalvar = document.querySelector('.btn--primary');
if (btnSalvar) {
  btnSalvar.addEventListener('click', function () {
    if (!validarForm()) {
      mostrarToast('Preencha os campos obrigatórios.', 'erro');
      return;
    }

    btnSalvar.disabled = true;
    const textoOriginal = btnSalvar.innerHTML;
    btnSalvar.innerHTML = '<span class="spinner"></span> Salvando...';

    setTimeout(function () {
      /* ── Lê os valores do formulário ── */
      const nome      = (document.getElementById('nome')?.value      || '').trim();
      const valor     = (document.getElementById('valor')?.value     || '').trim();
      const qtd       = (document.getElementById('quantidade')?.value|| '').trim();
      const estoqueMin= (document.getElementById('estoque-min')?.value|| '').trim();
      const descricao = (document.getElementById('descricao')?.value || '').trim();

      const selectUnid = document.querySelector('.input-group select');
      const unidade    = selectUnid ? selectUnid.value : 'KG';

      const selectForn = document.getElementById('fornecedor');
      const fornecedor = selectForn
        ? (selectForn.options[selectForn.selectedIndex]?.text || '').trim()
        : '';

      /* Validade: converte DD/MM/AAAA → YYYY-MM-DD para consistência */
      let validade = (document.getElementById('validade')?.value || '').trim();
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(validade)) {
        const p = validade.split('/');
        validade = p[2] + '-' + p[1] + '-' + p[0];
      }

      /* ── Atualiza o registro no localStorage ── */
      const insumoId = obterIdDaUrl();
      let lista      = carregarInsumosDoStorage();

      if (insumoId !== null) {
        /* MODO EDIÇÃO — encontra e substitui */
        const idx = lista.findIndex(function (i) { return i.id === insumoId; });
        if (idx !== -1) {
          const atual = lista[idx];
          lista[idx] = Object.assign({}, atual, {
            nome:        nome,
            categoria:   inferirCategoria(nome),
            quantidade:  qtd ? (qtd + ' ' + unidade) : (atual.quantidade || '—'),
            qtdBruta:    qtd || atual.qtdBruta || '0',
            unidade:     unidade,
            fornecedor:  fornecedor || atual.fornecedor || '—',
            validade:    validade   || atual.validade   || null,
            estoqueMin:  estoqueMin || atual.estoqueMin || '0',
            valor:       valor      || atual.valor      || '0',
            descricao:   descricao,
          });
        }
      }

      salvarInsumosNoStorage(lista);
      atualizarPainel();

      btnSalvar.disabled = false;
      btnSalvar.innerHTML = textoOriginal;
      mostrarToast('Insumo salvo com sucesso!', 'sucesso');
    }, 900);
  });
}

/* ─────────────────────────────────────────────
   6. PAINEL LATERAL — atualiza com os valores
───────────────────────────────────────────── */
function atualizarPainel() {
  const nome    = document.getElementById('nome')?.value.trim();
  const qtd     = document.getElementById('quantidade')?.value.trim();
  const unidade = document.querySelector('.input-group select')?.value || 'KG';
  const selectF = document.getElementById('fornecedor');
  const fornTxt = selectF?.options[selectF.selectedIndex]?.text;

  if (nome) {
    const h3 = document.querySelector('.insumo-card__header h3');
    if (h3) h3.textContent = nome;
    const avatar = document.querySelector('.insumo-avatar');
    if (avatar) {
      const partes = nome.split(' ');
      avatar.textContent = (partes.length >= 2
        ? partes[0][0] + partes[partes.length - 1][0]
        : nome.slice(0, 2)).toUpperCase();
    }
  }
  if (qtd) {
    const li = document.querySelector('.insumo-details li:nth-child(2) span');
    if (li) li.textContent = qtd + ' ' + unidade;
  }
  if (fornTxt && fornTxt !== 'Selecione o fornecedor') {
    const li = document.querySelector('.insumo-details li:nth-child(3) span');
    if (li) li.textContent = fornTxt;
  }

  const modalNome   = document.querySelector('.modal-insumo-nome');
  const modalAvatar = document.querySelector('.modal-insumo-avatar');
  if (modalNome && nome)   modalNome.textContent   = nome;
  if (modalAvatar && nome) {
    const partes = nome.split(' ');
    modalAvatar.textContent = (partes.length >= 2
      ? partes[0][0] + partes[partes.length - 1][0]
      : nome.slice(0, 2)).toUpperCase();
  }
}

/* ─────────────────────────────────────────────
   7. CANCELAR — volta para lista
───────────────────────────────────────────── */
const btnCancelar = document.querySelector('.btn--ghost');
if (btnCancelar) {
  btnCancelar.addEventListener('click', function () {
    window.location.href = 'InsumosCadastrados.html';
  });
}

/* ─────────────────────────────────────────────
   8. MODAL EXCLUIR
───────────────────────────────────────────── */
window.abrirModal = function () {
  const overlay = document.getElementById('modalExcluir');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.fecharModal = function () {
  const overlay = document.getElementById('modalExcluir');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
};

window.fecharModalFora = function (e) {
  if (e.target === document.getElementById('modalExcluir')) window.fecharModal();
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') window.fecharModal();
});

const btnExcluir = document.querySelector('.btn--excluir');
if (btnExcluir) {
  btnExcluir.addEventListener('click', function () {
    btnExcluir.disabled = true;
    const textoOriginal = btnExcluir.innerHTML;
    btnExcluir.innerHTML = '<span class="spinner spinner--white"></span> Excluindo...';

    setTimeout(function () {
      const insumoId = obterIdDaUrl();
      if (insumoId !== null) {
        let lista = carregarInsumosDoStorage();
        lista     = lista.filter(function (i) { return i.id !== insumoId; });
        salvarInsumosNoStorage(lista);
      }

      window.fecharModal();
      btnExcluir.disabled = false;
      btnExcluir.innerHTML = textoOriginal;
      mostrarToast('Insumo excluído com sucesso.', 'sucesso');

      /* Redireciona para a lista após breve delay */
      setTimeout(function () {
        window.location.href = 'InsumosCadastrados.html';
      }, 1200);
    }, 900);
  });
}

/* ─────────────────────────────────────────────
   9. TOAST
───────────────────────────────────────────── */
let toastTimer = null;

function mostrarToast(mensagem, tipo) {
  tipo = tipo || 'sucesso';
  const existente = document.getElementById('toast-global');
  if (existente) existente.remove();
  if (toastTimer) clearTimeout(toastTimer);

  const cores = {
    sucesso: { bg: '#1a3a2a', icon: '✓' },
    erro:    { bg: '#dc2626', icon: '✕' },
    info:    { bg: '#2d5c3f', icon: 'i' },
  };

  const { bg, icon } = cores[tipo] || cores.sucesso;
  const toast = document.createElement('div');
  toast.id = 'toast-global';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span>' + mensagem + '</span>';

  Object.assign(toast.style, {
    position: 'fixed', bottom: '28px', right: '28px',
    background: bg, color: '#fff', borderRadius: '8px',
    padding: '13px 20px', fontSize: '13px', fontWeight: '600',
    fontFamily: 'inherit', display: 'flex', alignItems: 'center',
    gap: '10px', boxShadow: '0 4px 18px rgba(0,0,0,.18)',
    zIndex: '2000', opacity: '0', transform: 'translateY(12px)',
    transition: 'opacity .25s ease, transform .25s ease',
    pointerEvents: 'none', minWidth: '220px',
  });

  const iconEl = toast.querySelector('.toast-icon');
  Object.assign(iconEl.style, {
    width: '22px', height: '22px', borderRadius: '50%',
    background: 'rgba(255,255,255,.2)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: '0', fontSize: '12px', fontWeight: '700',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  toastTimer = setTimeout(function () {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}

/* ─────────────────────────────────────────────
   10. CSS DINÂMICO
───────────────────────────────────────────── */
const estilos = document.createElement('style');
estilos.textContent = `
  .field--invalid { border-color: #dc2626 !important; box-shadow: 0 0 0 3px rgba(220,38,38,.12) !important; }
  .field-error { font-size: 11.5px; color: #dc2626; font-weight: 600; margin-top: 2px; display: block; }
  @media (max-width: 768px) {
    .sidebar { left: -100% !important; transition: left .25s ease !important; }
    .sidebar.sidebar--open { left: 0 !important; }
  }
  .spinner { display: inline-block; width: 13px; height: 13px; border: 2px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .6s linear infinite; flex-shrink: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(estilos);

/* ─────────────────────────────────────────────
   11. INICIALIZAÇÃO — carrega dados ao abrir
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  /* Garante submenu aberto */
  document.querySelectorAll('.nav-submenu').forEach(function (sub) {
    if (sub.querySelector('.submenu-active')) {
      sub.style.display = 'block';
      const pai     = sub.previousElementSibling;
      const chevron = pai?.querySelector('.nav-item__chevron');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  });

  /* ── Preenche o formulário com os dados do insumo ── */
  const insumoId = obterIdDaUrl();
  if (insumoId !== null) {
    const lista   = carregarInsumosDoStorage();
    const insumo  = lista.find(function (i) { return i.id === insumoId; });
    if (insumo) {
      preencherFormulario(insumo);
    } else {
      mostrarToast('Insumo não encontrado.', 'erro');
    }
  }

  /* Carrega fornecedores do storage no select */
  carregarFornecedoresNoSelect();
});

function carregarFornecedoresNoSelect() {
  const select = document.getElementById('fornecedor');
  if (!select) return;
  try {
    const raw = localStorage.getItem('fornecedores');
    if (!raw) return;
    const fornecedores = JSON.parse(raw);
    if (!fornecedores.length) return;

    /* Guarda o valor selecionado atual (se existir) */
    const valorAtual = select.value;

    select.innerHTML = '<option value="">Selecione o fornecedor</option>';
    fornecedores.forEach(function (f) {
      const opt = document.createElement('option');
      opt.value       = f.nome;
      opt.textContent = f.nome;
      select.appendChild(opt);
    });

    /* Restaura seleção */
    if (valorAtual) select.value = valorAtual;
  } catch (e) { /* mantém opções estáticas do HTML */ }
}