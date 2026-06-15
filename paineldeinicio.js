/* js/paineldeinicio.js — Painel de início */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    /* ---- KPIs principais ---- */
    const totalProd    = DB.produtos.length;
    const totalEstoque = DB.produtos.reduce((s, p) => s + p.estoque, 0);
    const baixos       = DB.produtos.filter(p => p.status === 'baixo').length;
    const zerados      = DB.produtos.filter(p => p.status === 'zerado').length;

    const demos = document.querySelectorAll('.demo .demoTitulo');
    if (demos[0]) demos[0].textContent = totalProd;
    if (demos[1]) demos[1].textContent = totalEstoque.toLocaleString('pt-BR');
    if (demos[2]) demos[2].textContent = baixos;
    if (demos[3]) demos[3].textContent = zerados;

    /* ---- Estoque por status ---- */
    const normal   = DB.produtos.filter(p => p.status === 'normal').length;
    const statusDemos = document.querySelectorAll('.conteinerTabela .demo .demoTitulo');
    if (statusDemos[0]) statusDemos[0].textContent = normal;
    if (statusDemos[1]) statusDemos[1].textContent = baixos;
    if (statusDemos[2]) statusDemos[2].textContent = zerados;

    /* ---- Tabela de movimentações (últimas vendas) ---- */
    const tbodyMov = document.querySelector('.tabelaGeral tbody');
    if (tbodyMov) {
        const ultimas = DB.vendas.slice(0, 7);
        tbodyMov.innerHTML = ultimas.map(v => `
            <tr>
                <td>${v.data}</td>
                <td>${v.produto}</td>
                <td>${v.qtd}</td>
                <td>${v.tipo}</td>
                <td>${fmt.moeda(v.valor)}</td>
            </tr>`).join('') || '<tr><td colspan="5" style="color:#aaa;text-align:center;">Sem movimentações.</td></tr>';
    }

    /* ---- Saudação com nome do usuário ---- */
    const subtitulo = document.querySelector('.subtituloPagina');
    const usuario = localStorage.getItem('chl_usuario') || 'Laura';
    if (subtitulo) subtitulo.textContent = `Olá ${usuario}! Veja o resumo do seu estoque`;

    /* ---- Gráfico de barras (se existir) ---- */
    const grafico = document.querySelector('.graficoBarras');
    if (grafico && DB.vendas.length) {
        const meses = {};
        DB.vendas.forEach(v => {
            const mes = v.data.slice(0, 7);
            meses[mes] = (meses[mes] || 0) + v.valor;
        });
        const maxVal = Math.max(...Object.values(meses), 1);
        grafico.innerHTML = Object.entries(meses).slice(-6).map(([mes, val]) => `
            <div class="barraItem">
                <div class="barra" style="height:${Math.round((val/maxVal)*160)}px;background:#0D5B2A;border-radius:4px 4px 0 0;"></div>
                <span style="font-size:10px;margin-top:4px;">${mes.slice(5)}</span>
            </div>`).join('');
    }
});
