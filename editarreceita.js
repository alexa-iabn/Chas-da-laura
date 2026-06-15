/* js/editarreceita.js — Editar receita existente */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    const params  = new URLSearchParams(window.location.search);
    const id      = parseInt(params.get('id')) || null;
    const receita = id ? DB.getById('receitas', id) : DB.receitas[0];

    if (!receita) {
        alert('Receita não encontrada.');
        window.location.href = 'receitascadastradas.html';
        return;
    }

    /* Preencher campos */
    const selectProd  = document.querySelector('select.campoGrande, select');
    const inputRend   = document.querySelector('input[type="number"]');
    const inputValid  = document.querySelector('input[type="text"].campoGrande, input[placeholder*="dias"]');
    const textarea    = document.querySelector('textarea');

    /* Popular select com produtos */
    if (selectProd && DB.produtos.length) {
        selectProd.innerHTML = DB.produtos.map(p =>
            `<option value="${p.id}" ${receita.nome === p.nome ? 'selected' : ''}>${p.nome}</option>`
        ).join('');
    }

    if (inputRend)  inputRend.value  = parseInt(receita.rendimento) || 1;
    if (inputValid) inputValid.value = receita.validade || '';
    if (textarea)   textarea.value   = receita.descricao || '';

    /* Painel direito */
    function renderPainel() {
        const ladoDireito = document.querySelector('.ladoDireitoReceita');
        if (!ladoDireito) return;

        const cardCusto = ladoDireito.querySelector('.cardResumoReceita');
        const cardVerde = ladoDireito.querySelector('.cardResumoVerde');

        if (cardCusto) {
            cardCusto.innerHTML = `
                <div style="width:38px;height:38px;border-radius:50%;background:#B9F7A8;color:#0D5B2A;display:flex;align-items:center;justify-content:center;font-weight:700;margin-bottom:8px;">R${receita.id}</div>
                <strong style="font-size:14px;">${receita.nome}</strong>
                <p style="font-size:12px;color:#555;margin:4px 0;">Rendimento: ${receita.rendimento}</p>
                <p style="font-size:12px;color:#555;margin:4px 0;">Custo por unidade: ${fmt.moeda(receita.custo)}</p>
                <p style="font-size:12px;color:#555;margin:4px 0;">Custo total: ${fmt.moeda(receita.custo)}</p>
                <button onclick="excluirReceita()" style="width:100%;margin-top:14px;padding:8px;border:1px solid #e53e3e;background:white;color:#e53e3e;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;">Excluir receita</button>`;
        }

        if (cardVerde) {
            cardVerde.innerHTML = `
                <h3 style="margin:0 0 12px;color:#0D4B24;">Resumo da receita</h3>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Total de insumos</span><strong>${DB.insumos.length}</strong></p>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Valor total</span><strong>${fmt.moeda(receita.preco)}</strong></p>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Margem</span><strong>${receita.margem || '—'}</strong></p>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Status</span><strong style="color:#0D5B2A;">Disponível</strong></p>`;
        }
    }

    renderPainel();

    /* Excluir */
    window.excluirReceita = function () {
        if (confirm(`Excluir "${receita.nome}"? Esta ação não pode ser desfeita.`)) {
            DB.remove('receitas', receita.id);
            window.location.href = 'receitascadastradas.html';
        }
    };

    /* Botões */
    const btnSalvar   = document.querySelector('.btnVerde');
    const btnCancelar = document.querySelector('.btnVoltar');

    if (btnCancelar) btnCancelar.addEventListener('click', () => window.location.href = 'receitascadastradas.html');

    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            const rend = parseInt(inputRend?.value) || 1;
            const selectUnid = document.querySelectorAll('select')[1];
            DB.update('receitas', receita.id, {
                rendimento: rend + ' ' + (selectUnid?.value || 'latas'),
                validade:   inputValid?.value  || '',
                descricao:  textarea?.value    || '',
            });
            alert('Receita atualizada com sucesso!');
            window.location.href = 'receitascadastradas.html';
        });
    }
});
