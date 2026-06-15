/* js/cadastroprodutos.js — Formulário de novo produto */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    /* Campos do formulário */
    const inputs = {
        nome:      document.querySelector('input[placeholder*="camomila"], input[placeholder*="produto"]'),
        categoria: document.querySelectorAll('select')[0],
        unidade:   document.querySelectorAll('select')[1],
        estoque:   document.querySelector('input[type="number"][value="0"]'),
        preco:     document.querySelector('input[placeholder*="0,00"]'),
        validade:  document.querySelector('input[placeholder*="meses"]'),
        descricao: document.querySelector('textarea'),
    };

    const btnSalvar  = document.querySelector('.btnVerde');
    const btnCancelar = document.querySelector('.btnVoltar');

    /* ---- Cancelar ---- */
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            window.history.back();
        });
    }

    /* ---- Salvar ---- */
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            const nome = inputs.nome?.value.trim();
            if (!nome) {
                alert('Informe o nome do produto.');
                return;
            }
            const estoque = parseInt(inputs.estoque?.value) || 0;
            const preco   = parseFloat(inputs.preco?.value) || 0;
            const status  = estoque === 0 ? 'zerado' : estoque <= 5 ? 'baixo' : 'normal';

            DB.add('produtos', {
                nome,
                categoria: inputs.categoria?.value || 'Blend',
                unidade:   inputs.unidade?.value   || 'lata',
                estoque,
                preco,
                status,
                validade:  inputs.validade?.value  || '',
                descricao: inputs.descricao?.value || '',
            });

            alert(`Produto "${nome}" cadastrado com sucesso!`);
            window.location.href = 'produtoscadastrados.html';
        });
    }

    /* ---- Preview de preço em tempo real ---- */
    if (inputs.preco) {
        inputs.preco.addEventListener('input', () => {
            const val = parseFloat(inputs.preco.value) || 0;
            const preview = document.getElementById('previewPreco');
            if (preview) preview.textContent = fmt.moeda(val);
        });
    }
});
