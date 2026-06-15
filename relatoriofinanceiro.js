/* js/relatoriofinanceiro.js — Relatório financeiro */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
        data:  iso => { const [y,m,d] = String(iso).split('-'); return `${d}/${m}/${y}`; },
    };

    function calcular(dias) {
        const limite = dias ? new Date(Date.now() - dias * 86400000) : null;
        const vendas = limite ? DB.vendas.filter(v => new Date(v.data) >= limite) : DB.vendas;

        const faturamento  = vendas.reduce((s, v) => s + v.valor, 0);
        const qtdVendas    = vendas.length;
        const ticketMedio  = qtdVendas ? faturamento / qtdVendas : 0;
        const custoTotal   = DB.receitas.reduce((s, r) => s + r.custo, 0);
        const lucroEstimado = faturamento - custoTotal;

        /* Cards */
        const cards = document.querySelectorAll('.cardResumo, .demo');
        const valores = [faturamento, lucroEstimado, ticketMedio, qtdVendas];
        cards.forEach((card, i) => {
            const el = card.querySelector('strong, .demoTitulo, span[class*="Numero"]');
            if (el && valores[i] !== undefined) {
                el.textContent = i === 3 ? valores[i] : fmt.moeda(valores[i]);
            }
        });

        /* Tabela */
        const tbody = document.querySelector('.tabelaGeral tbody');
        if (tbody) {
            tbody.innerHTML = vendas.map(v => `
                <tr>
                    <td>${fmt.data(v.data)}</td>
                    <td>${v.produto}</td>
                    <td>${v.cliente}</td>
                    <td>${v.tipo}</td>
                    <td>${v.qtd}</td>
                    <td>${fmt.moeda(v.valor)}</td>
                </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:#aaa;">Sem registros no período.</td></tr>';
        }

        /* Gráfico */
        const grafico = document.querySelector('.graficoBarras');
        if (grafico) {
            const meses = {};
            vendas.forEach(v => { const m = v.data.slice(0,7); meses[m] = (meses[m]||0) + v.valor; });
            const maxVal = Math.max(...Object.values(meses), 1);
            grafico.innerHTML = Object.entries(meses).slice(-6).map(([mes, val]) => `
                <div class="barraItem">
                    <div class="barra" style="height:${Math.round((val/maxVal)*160)}px;background:#0D5B2A;border-radius:4px 4px 0 0;"></div>
                    <span style="font-size:10px;margin-top:4px;">${mes.slice(5)}</span>
                </div>`).join('');
        }
    }

    /* Filtro de período */
    const selectPeriodo = document.querySelector('select[id*="periodo"], select[id*="Periodo"], select');
    if (selectPeriodo) selectPeriodo.addEventListener('change', () => calcular(parseInt(selectPeriodo.value) || 0));

    const btnFiltrar = document.querySelector('button[id*="filtrar"], button[id*="Filtrar"], button[id*="atualizar"]');
    if (btnFiltrar) btnFiltrar.addEventListener('click', () => calcular(parseInt(selectPeriodo?.value) || 0));

    /* Busca */
    const inputBusca = document.querySelector('input[type="text"][placeholder*="Buscar"]');
    if (inputBusca) {
        inputBusca.addEventListener('input', () => {
            const q = inputBusca.value.toLowerCase();
            document.querySelectorAll('.tabelaGeral tbody tr').forEach(tr => {
                tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    /* Exportar (simulado) */
    document.querySelectorAll('button[id*="xport"], button[id*="Export"]').forEach(btn => {
        btn.addEventListener('click', () => alert('Exportação disponível em versões futuras.'));
    });

    calcular(0);
});
