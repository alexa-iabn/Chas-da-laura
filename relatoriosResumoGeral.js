/* js/relatoriosResumoGeral.js — Relatório de resumo geral */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
        data:  iso => { const [y,m,d] = String(iso).split('-'); return `${d}/${m}/${y}`; },
        num:   v => Number(v).toLocaleString('pt-BR'),
    };

    function calcularPorPeriodo(dias) {
        if (!dias) return DB.vendas;
        const limite = new Date();
        limite.setDate(limite.getDate() - dias);
        return DB.vendas.filter(v => new Date(v.data) >= limite);
    }

    function atualizar() {
        const select = document.getElementById('selectPeriodo');
        const dias   = select ? parseInt(select.value) || 0 : 0;
        const vendas = calcularPorPeriodo(dias);

        /* ---- Cards de resumo ---- */
        const faturamento = vendas.reduce((s, v) => s + v.valor, 0);
        const totalEstoque = DB.produtos.reduce((s, p) => s + p.estoque * p.preco, 0);
        const totalReceitas = DB.receitas.length;
        const totalProducoes = DB.producoes.length;

        setCard('cardFaturamento', fmt.moeda(faturamento));
        setCard('cardEstoque',     fmt.moeda(totalEstoque));
        setCard('cardReceitas',    totalReceitas + ' receitas');
        setCard('cardProducoes',   totalProducoes + ' produções');

        /* ---- Destaques ---- */
        const vendasPorProd = {};
        vendas.forEach(v => { vendasPorProd[v.produto] = (vendasPorProd[v.produto] || 0) + v.valor; });
        const prodDestaque = Object.entries(vendasPorProd).sort((a,b) => b[1]-a[1])[0];

        setText('produtoDestaque',  prodDestaque ? prodDestaque[0] : '—');
        setText('receitaDestaque',  DB.receitas[0]?.nome || '—');
        setText('insumoDestaque',   DB.insumos.find(i => i.status !== 'normal')?.nome || 'Todos ok');
        setText('ticketMedio',      vendas.length ? fmt.moeda(faturamento / vendas.length) : '—');
        setText('totalClientes',    DB.clientes.length);

        /* ---- Últimas vendas ---- */
        const tabelaVendas = document.getElementById('tabelaUltimasVendas');
        if (tabelaVendas) {
            const tbody = tabelaVendas.querySelector('tbody') || tabelaVendas;
            tbody.innerHTML = vendas.slice(0, 5).map(v => `
                <tr>
                    <td>${fmt.data(v.data)}</td>
                    <td>${v.produto}</td>
                    <td>${v.cliente}</td>
                    <td>${v.qtd}</td>
                    <td>${fmt.moeda(v.valor)}</td>
                    <td><span style="background:${v.tipo==='Cliente'?'#e6f7ee':'#e8f0fe'};color:${v.tipo==='Cliente'?'#0D5B2A':'#1a56db'};padding:2px 8px;border-radius:20px;font-size:11px;">${v.tipo}</span></td>
                </tr>`).join('') || '<tr><td colspan="6" style="color:#aaa;text-align:center;">Sem vendas no período.</td></tr>';
        }

        /* ---- Estoque crítico ---- */
        const listaCritico = document.getElementById('listaEstoqueCritico');
        if (listaCritico) {
            const criticos = [
                ...DB.produtos.filter(p => p.status !== 'normal').map(p => ({ nome: p.nome, tipo: 'Produto', status: p.status })),
                ...DB.insumos.filter(i => i.status !== 'normal').map(i => ({ nome: i.nome, tipo: 'Insumo', status: i.status })),
            ];
            listaCritico.innerHTML = criticos.length
                ? criticos.map(c => `
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;">
                        <div>
                            <strong style="font-size:13px;">${c.nome}</strong>
                            <div style="font-size:11px;color:#888;">${c.tipo}</div>
                        </div>
                        <span style="background:${c.status==='zerado'||c.status==='crítico'?'#fde':'#fff3e0'};color:${c.status==='zerado'||c.status==='crítico'?'#c00':'#e65c00'};padding:2px 8px;border-radius:20px;font-size:11px;">${c.status}</span>
                    </div>`).join('')
                : '<p style="color:#aaa;font-size:13px;">Sem alertas de estoque.</p>';
        }

        /* ---- Tabela consolidada ---- */
        const tabelaConsol = document.getElementById('tabelaConsolidado');
        if (tabelaConsol) {
            const tbody = tabelaConsol.querySelector('tbody') || tabelaConsol;
            const categorias = {};
            DB.produtos.forEach(p => {
                if (!categorias[p.categoria]) categorias[p.categoria] = { qtd: 0, valor: 0 };
                categorias[p.categoria].qtd   += p.estoque;
                categorias[p.categoria].valor += p.estoque * p.preco;
            });
            tbody.innerHTML = Object.entries(categorias).map(([cat, d]) => `
                <tr>
                    <td>${cat}</td>
                    <td>${d.qtd}</td>
                    <td>${fmt.moeda(d.valor)}</td>
                </tr>`).join('');
        }

        /* ---- Gráfico de barras ---- */
        const grafico = document.getElementById('graficoFaturamento');
        if (grafico) {
            const meses = {};
            DB.vendas.forEach(v => {
                const mes = v.data.slice(0, 7);
                meses[mes] = (meses[mes] || 0) + v.valor;
            });
            const maxVal = Math.max(...Object.values(meses), 1);
            grafico.innerHTML = Object.entries(meses).slice(-6).map(([mes, val]) => `
                <div class="barraItem">
                    <div class="barra" style="height:${Math.round((val/maxVal)*160)}px;background:#0D5B2A;"></div>
                    <span style="font-size:10px;">${mes.slice(5)}</span>
                </div>`).join('');
        }
    }

    function setCard(id, valor) {
        const el = document.getElementById(id);
        if (!el) return;
        const strong = el.querySelector('strong') || el;
        strong.textContent = valor;
    }

    function setText(id, valor) {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    }

    /* ---- Bind filtro de período ---- */
    const btnAtualizar = document.getElementById('btnAtualizar');
    if (btnAtualizar) btnAtualizar.addEventListener('click', atualizar);

    const selectPeriodo = document.getElementById('selectPeriodo');
    if (selectPeriodo) selectPeriodo.addEventListener('change', atualizar);

    /* ---- Busca na tabela consolidada ---- */
    const buscaCat = document.getElementById('buscaCategoria');
    if (buscaCat) {
        buscaCat.addEventListener('input', () => {
            const q = buscaCat.value.toLowerCase();
            const tabelaConsol = document.getElementById('tabelaConsolidado');
            if (!tabelaConsol) return;
            tabelaConsol.querySelectorAll('tbody tr').forEach(tr => {
                tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    atualizar();
});
