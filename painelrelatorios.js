/* js/painelrelatorios.js — Painel de relatórios */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    const faturamento  = DB.vendas.reduce((s, v) => s + v.valor, 0);
    const totalEstoque = DB.produtos.reduce((s, p) => s + p.estoque * p.preco, 0);
    const totalProd    = DB.producoes.reduce((s, p) => s + p.qtd, 0);
    const ticketMedio  = DB.vendas.length ? faturamento / DB.vendas.length : 0;

    /* Preencher cards de KPI genéricos */
    const valores = [faturamento, totalEstoque, totalProd, ticketMedio];
    document.querySelectorAll('.demo .demoTitulo, .cardResumo strong, .demoTitulo').forEach((el, i) => {
        if (i < valores.length) el.textContent = fmt.moeda(valores[i]);
    });

    /* Tabela de últimas vendas */
    const tbody = document.querySelector('.tabelaGeral tbody');
    if (tbody) {
        tbody.innerHTML = DB.vendas.slice(0, 8).map(v => `
            <tr>
                <td>${v.data}</td>
                <td>${v.produto}</td>
                <td>${v.cliente}</td>
                <td>${v.qtd}</td>
                <td>${fmt.moeda(v.valor)}</td>
                <td><span style="background:${v.tipo==='Cliente'?'#e6f7ee':'#e8f0fe'};color:${v.tipo==='Cliente'?'#0D5B2A':'#1a56db'};padding:2px 8px;border-radius:20px;font-size:11px;">${v.tipo}</span></td>
            </tr>`).join('') || '<tr><td colspan="6" style="color:#aaa;text-align:center;">Sem vendas registradas.</td></tr>';
    }

    /* Gráfico barras */
    const grafico = document.querySelector('.graficoBarras');
    if (grafico) {
        const meses = {};
        DB.vendas.forEach(v => { const m = v.data.slice(0,7); meses[m] = (meses[m]||0) + v.valor; });
        const maxVal = Math.max(...Object.values(meses), 1);
        grafico.innerHTML = Object.entries(meses).slice(-6).map(([mes, val]) => `
            <div class="barraItem">
                <div class="barra" style="height:${Math.round((val/maxVal)*160)}px;background:#0D5B2A;border-radius:4px 4px 0 0;"></div>
                <span style="font-size:10px;margin-top:4px;">${mes.slice(5)}</span>
            </div>`).join('');
    }
});
