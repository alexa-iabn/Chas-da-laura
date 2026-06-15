/* js/cadastroreceitas.js — Formulário de nova receita */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    /* Campos */
    const selectProd  = document.querySelector('select');
    const inputRend   = document.querySelector('input[type="number"]');
    const selectUnid  = document.querySelectorAll('select')[1];
    const inputValid  = document.querySelector('input[type="text"]');
    const textarea    = document.querySelector('textarea');
    const btnSalvar   = document.querySelector('.btnVerde');
    const btnCancelar = document.querySelector('.btnVoltar');

    /* Popular select de produtos */
    if (selectProd && DB.produtos.length) {
        selectProd.innerHTML = '<option value="" disabled selected>Selecione o produto...</option>' +
            DB.produtos.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
    }

    if (btnCancelar) btnCancelar.addEventListener('click', () => window.history.back());

    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            const prodId = parseInt(selectProd?.value);
            const prod   = DB.getById('produtos', prodId);
            const rend   = parseInt(inputRend?.value) || 1;

            if (!prod) {
                alert('Selecione um produto.');
                return;
            }

            DB.add('receitas', {
                nome:       prod.nome,
                rendimento: rend + ' ' + (selectUnid?.value || 'latas'),
                custo:      0,
                preco:      prod.preco * rend,
                margem:     '—',
                validade:   inputValid?.value || '',
                descricao:  textarea?.value   || '',
            });

            alert(`Receita para "${prod.nome}" cadastrada!`);
            window.location.href = 'receitascadastradas.html';
        });
    }
});
