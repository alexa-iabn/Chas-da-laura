/* =============================================================
   cadastrofornecedor.js
   Chás da Laura — Cadastro de Fornecedor
   ============================================================= */

/* ─────────────────────────────────────────────
   1. INICIALIZAÇÃO
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  iniciarMascaras();
  iniciarSidebar();
  iniciarFormulario();
  carregarCidadesIniciais();
});


/* ─────────────────────────────────────────────
   2. MÁSCARAS DE INPUT
───────────────────────────────────────────── */
function iniciarMascaras() {

  /* ── CNPJ: 00.000.000/0001-00 ── */
  const cnpjInput = document.getElementById('cnpj');
  if (cnpjInput) {
    cnpjInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').substring(0, 14);
      v = v.replace(/^(\d{2})(\d)/,          '$1.$2');
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      v = v.replace(/\.(\d{3})(\d)/,         '.$1/$2');
      v = v.replace(/(\d{4})(\d)/,           '$1-$2');
      this.value = v;
    });
  }

  /* ── Telefone: (00) 00000-0000 ou (00) 0000-0000 ── */
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').substring(0, 11);
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      this.value = v;
    });
  }
}


/* ─────────────────────────────────────────────
   3. SIDEBAR — TOGGLE DE SUB-MENUS
───────────────────────────────────────────── */
function iniciarSidebar() {
  const subCad = document.getElementById('sub-cadastros');
  if (subCad) subCad.style.display = 'flex';

  document.querySelectorAll('.nav-item.has-sub, .nav-item[onclick]').forEach(function (item) {
    item.removeAttribute('onclick');
    item.addEventListener('click', function () {
      toggleSub(this);
    });
  });
}

function toggleSub(el) {
  const isOpen = el.classList.contains('open');

  document.querySelectorAll('.nav-item.open').forEach(function (i) {
    i.classList.remove('open');
  });
  document.querySelectorAll('.nav-sub').forEach(function (s) {
    s.style.display = 'none';
  });

  if (!isOpen) {
    el.classList.add('open');
    const target = el.nextElementSibling;
    if (target && target.classList.contains('nav-sub')) {
      target.style.display = 'flex';
    }
  }
}

window.toggleSub = toggleSub;


/* ─────────────────────────────────────────────
   4. CIDADES VIA API IBGE
───────────────────────────────────────────── */
const cidadesCache = {};

function carregarCidadesIniciais() {
  const estadoSelect = document.getElementById('estado');
  if (estadoSelect && estadoSelect.value) {
    carregarCidades();
  }
}

function carregarCidades() {
  const estadoSelect  = document.getElementById('estado');
  const cidadeSelect  = document.getElementById('cidade');
  if (!estadoSelect || !cidadeSelect) return;

  const estado = estadoSelect.value;
  cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

  if (!estado) {
    cidadeSelect.innerHTML = '<option value="">Selecione...</option>';
    return;
  }

  if (cidadesCache[estado]) {
    preencherCidades(cidadesCache[estado]);
    return;
  }

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estado + '/municipios')
    .then(function (r) {
      if (!r.ok) throw new Error('Erro na requisição IBGE');
      return r.json();
    })
    .then(function (data) {
      const cidades = data.map(function (c) { return c.nome; }).sort();
      cidadesCache[estado] = cidades;
      preencherCidades(cidades);
    })
    .catch(function () {
      cidadeSelect.innerHTML = '<option value="">Erro ao carregar cidades</option>';
      showToast('⚠️  Não foi possível carregar as cidades. Tente novamente.', true);
    });
}

function preencherCidades(lista) {
  const sel = document.getElementById('cidade');
  if (!sel) return;
  sel.innerHTML = '<option value="">Selecione...</option>';
  lista.forEach(function (c) {
    const opt = document.createElement('option');
    opt.value       = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

window.carregarCidades = carregarCidades;


/* ─────────────────────────────────────────────
   5. FORMULÁRIO — VALIDAÇÃO E SUBMIT
───────────────────────────────────────────── */
function iniciarFormulario() {
  const form = document.getElementById('formFornecedor');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmit(e);
  });

  form.querySelectorAll('.form-control').forEach(function (input) {
    input.addEventListener('input', function () {
      this.classList.remove('input-error');
    });
  });
}

function handleSubmit(e) {
  if (e) e.preventDefault();

  /* ── Validações ── */
  const nome = document.getElementById('nomeCompleto');
  if (!nome || !nome.value.trim()) {
    marcarErro(nome, 'Informe o nome completo do fornecedor.');
    return;
  }

  const cnpj = document.getElementById('cnpj');
  if (cnpj && cnpj.value && !validarCNPJ(cnpj.value)) {
    marcarErro(cnpj, 'CNPJ inválido. Verifique e tente novamente.');
    return;
  }

  const email = document.getElementById('email');
  if (email && email.value && !validarEmail(email.value)) {
    marcarErro(email, 'Informe um e-mail válido.');
    return;
  }

  /* ── Coleta dos dados ── */
  const agora = new Date();

  /* Data formatada dd/mm/aaaa para exibição nos cards/lista */
  const dia  = String(agora.getDate()).padStart(2, '0');
  const mes  = String(agora.getMonth() + 1).padStart(2, '0');
  const ano  = agora.getFullYear();
  const dataFormatada = dia + '/' + mes + '/' + ano;

  const dados = {
    nome:          obterValor('nomeCompleto'),
    cnpj:          obterValor('cnpj'),
    telefone:      obterValor('telefone'),
    email:         obterValor('email'),
    razaoSocial:   obterValor('razaoSocial'),
    estado:        obterValor('estado'),
    cidade:        obterValor('cidade'),
    endereco:      obterValor('endereco'),
    numero:        obterValor('numero'),
    categoria:     obterValor('categoria'),
    pagamento:     obterValor('pagamento'),
    observacao:    obterValor('observacao'),
    cadastradoEm:  agora.toISOString(),  /* ISO para cálculos */
    cadastrado:    dataFormatada,        /* dd/mm/aaaa para exibição */
  };

  console.log('📦 Fornecedor salvo:', dados);

  salvarFornecedor(dados);

  showToast('✓  Fornecedor cadastrado com sucesso!');
  setTimeout(function () {
    window.location.href = 'FornecedoresCadastrados.html';
  }, 1600);
}

window.handleSubmit = handleSubmit;


/* ─────────────────────────────────────────────
   6. PERSISTÊNCIA LOCAL (localStorage)
───────────────────────────────────────────── */
function salvarFornecedor(dados) {
  try {
    const lista = JSON.parse(localStorage.getItem('fornecedores') || '[]');
    dados.id = Date.now(); /* ID único baseado em timestamp */
    lista.push(dados);
    localStorage.setItem('fornecedores', JSON.stringify(lista));
  } catch (err) {
    console.warn('Não foi possível salvar no localStorage:', err);
  }
}


/* ─────────────────────────────────────────────
   7. VALIDAÇÕES AUXILIARES
───────────────────────────────────────────── */
function validarCNPJ(cnpj) {
  const nums = cnpj.replace(/\D/g, '');
  if (nums.length !== 14) return false;
  if (/^(\d)\1+$/.test(nums)) return false;

  function calcDigito(base, peso) {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  const d1 = calcDigito(nums.substring(0, 12), 5);
  const d2 = calcDigito(nums.substring(0, 13), 6);
  return parseInt(nums[12]) === d1 && parseInt(nums[13]) === d2;
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function obterValor(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function marcarErro(input, mensagem) {
  if (!input) return;
  input.classList.add('input-error');
  input.focus();
  showToast('⚠️  ' + mensagem, true);
}


/* ─────────────────────────────────────────────
   8. TOAST DE NOTIFICAÇÃO
───────────────────────────────────────────── */
function showToast(msg, erro) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (erro) toast.style.background = 'var(--red-500, #ef4444)';

  const iconPath = erro
    ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
    : '<polyline points="20 6 9 17 4 12"/>';

  toast.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
    iconPath + '</svg>' + msg;

  document.body.appendChild(toast);

  void toast.offsetWidth;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}

window.showToast = showToast;