/* js/calcularprecio.js — Calculadora de preço de venda */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    /* ---- Preencher select de receitas com dados do DB ---- */
    const selectReceita = document.querySelector('select.campoGrande, select[class*="grande"]') || document.querySelectorAll('select')[0];
    if (selectReceita && DB.receitas.length) {
        selectReceita.innerHTML = DB.receitas.map(r =>
            `<option value="${r.id}">${r.nome} — ${r.rendimento}</option>`
        ).join('');
    }

    /* ---- Elementos do formulário ---- */
    const inputs = document.querySelectorAll('.linhaForm2 input[type="number"]');
    const inputMargem  = inputs[0]; /* margem de lucro % */
    const inputMaoObra = inputs[1]; /* mão de obra R$ */

    /* ---- Elementos do painel direito ---- */
    const cardCusto  = document.querySelector('.cardResumoReceita');
    const cardVerde  = document.querySelector('.cardResumoVerde');

    /* ---- Referências dinâmicas ---- */
    let custoInsumos = 0;

    function getReceitaSelecionada() {
        if (!selectReceita) return null;
        const id = parseInt(selectReceita.value);
        return DB.getById('receitas', id) || DB.receitas[0] || null;
    }

    /* ---- Preencher tabela de insumos da receita ---- */
    function atualizarTabelaInsumos() {
        const receita = getReceitaSelecionada();
        const tbody = document.querySelector('.tabelaGeral tbody');
        if (!tbody || !receita) return;

        /* Usar insumos do DB como exemplo para a receita */
        const insumosMock = DB.insumos.slice(0, 3).map(i => ({
            nome: i.nome,
            qtd:  20,
            unidade: i.unidade,
            custoUnit: i.preco,
            custoTotal: i.preco * 20,
        }));

        tbody.innerHTML = insumosMock.map(i => `
            <tr>
                <td>${i.nome}</td>
                <td>${i.qtd}</td>
                <td>${i.unidade}</td>
                <td>${fmt.moeda(i.custoUnit)}</td>
                <td>${fmt.moeda(i.custoTotal)}</td>
            </tr>`).join('');

        custoInsumos = insumosMock.reduce((s, i) => s + i.custoTotal, 0);
        calcular();
    }

    /* ---- Cálculo principal ---- */
    function calcular() {
        const receita    = getReceitaSelecionada();
        const margem     = parseFloat(inputMargem?.value)  || 50;
        const maoObra    = parseFloat(inputMaoObra?.value) || 5;
        const outrosPct  = 0.05;
        const outros     = (custoInsumos + maoObra) * outrosPct;
        const custoTotal = custoInsumos + maoObra + outros;
        const precoSugerido = margem >= 100 ? custoTotal * 10 : custoTotal / (1 - margem / 100);
        const lucroUnit  = precoSugerido - custoTotal;
        const rendimento = receita?.rendimento || '10 latas';

        /* Atualizar painel de custos */
        if (cardCusto) {
            cardCusto.innerHTML = `
                <h3>Resumo de custos</h3>
                <p>Custo dos insumos</p><strong>${fmt.moeda(custoInsumos)}</strong>
                <p>Mão de obra</p><strong>${fmt.moeda(maoObra)}</strong>
                <p>Outros custos (5%)</p><strong>${fmt.moeda(outros)}</strong>
                <hr style="margin:12px 0;border:none;border-top:1px solid #eee;">
                <p>Custo total</p><strong style="font-size:18px;color:#0D5B2A;">${fmt.moeda(custoTotal)}</strong>`;
        }

        /* Atualizar painel verde */
        if (cardVerde) {
            cardVerde.innerHTML = `
                <h3>Preço sugerido</h3>
                <h2 style="font-size:28px;color:#0D4B24;margin:8px 0;">${fmt.moeda(precoSugerido)}</h2>
                <p>Custo de produção <strong>${fmt.moeda(custoTotal)}</strong></p>
                <p>Margem de lucro <strong>${margem}%</strong></p>
                <p>Lucro por unidade <strong>${fmt.moeda(lucroUnit)}</strong></p>
                <p>Rendimento <strong>${rendimento}</strong></p>`;
        }
    }

    /* ---- Bind eventos ---- */
    if (selectReceita) selectReceita.addEventListener('change', atualizarTabelaInsumos);
    if (inputMargem)   inputMargem.addEventListener('input', calcular);
    if (inputMaoObra)  inputMaoObra.addEventListener('input', calcular);

    /* ---- Botão aplicar preço ---- */
    const btnAplicar = document.querySelector('.btnVerde');
    if (btnAplicar) {
        btnAplicar.addEventListener('click', () => {
            const receita = getReceitaSelecionada();
            if (!receita) return;
            const margem     = parseFloat(inputMargem?.value) || 50;
            const maoObra    = parseFloat(inputMaoObra?.value) || 5;
            const outros     = (custoInsumos + maoObra) * 0.05;
            const custoTotal = custoInsumos + maoObra + outros;
            const preco      = margem >= 100 ? custoTotal * 10 : custoTotal / (1 - margem / 100);

            DB.update('receitas', receita.id, {
                custo:  Math.round(custoTotal * 100) / 100,
                preco:  Math.round(preco * 100) / 100,
                margem: margem + '%',
            });

            alert(`Preço de ${fmt.moeda(preco)} aplicado à receita "${receita.nome}"!`);
        });
    }

    /* ---- Botão cancelar ---- */
    const btnCancelar = document.querySelector('.btnVoltar');
    if (btnCancelar) btnCancelar.addEventListener('click', () => window.history.back());

    /* ---- Init ---- */
    atualizarTabelaInsumos();
});
