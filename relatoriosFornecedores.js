/* js/relatoriosFornecedores.js — Relatório de fornecedores */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
        data:  iso => { const [y,m,d] = String(iso).split('-'); return `${d}/${m}/${y}`; },
    };

    function atualizar() {
        const select = document.getElementById('selectPeriodoForn');
        const dias   = select ? parseInt(select.value) || 0 : 0;

        const fornAtivos   = DB.fornecedores.filter(f => f.ativo);
        const totalCompras = DB.fornecedores.reduce((s, f) => s + f.valorTotal, 0);
        const totalInsumos = DB.insumos.length;

        /* ---- Cards ---- */
        setText('cardTotalForn',    DB.fornecedores.length);
        setText('cardFornAtivos',   fornAtivos.length);
        setText('cardTotalCompras', fmt.moeda(totalCompras));
        setText('cardInsumosForn',  totalInsumos);

        /* ---- Tabela de fornecedores ---- */
        const tabelaForn = document.getElementById('tabelaFornecedores');
        if (tabelaForn) {
            const tbody = tabelaForn.querySelector('tbody') || tabelaForn;
            tbody.innerHTML = DB.fornecedores.map(f => `
                <tr>
                    <td><strong>${f.nome}</strong></td>
                    <td>${f.cnpj}</td>
                    <td>${f.telefone}</td>
                    <td>${f.insumos}</td>
                    <td>${fmt.data(f.ultimaCompra)}</td>
                    <td>${fmt.moeda(f.valorTotal)}</td>
                    <td><span style="background:${f.ativo?'#e6f7ee':'#fde'};color:${f.ativo?'#0D5B2A':'#c00'};padding:2px 8px;border-radius:20px;font-size:11px;">${f.ativo?'Ativo':'Inativo'}</span></td>
                </tr>`).join('');
        }

        /* ---- Tabela de insumos por fornecedor ---- */
        const tabelaIns = document.getElementById('tabelaInsumosForn');
        const filtroForn = document.getElementById('filtroFornecedorInsumos');
        const fornFiltrado = filtroForn?.value || '';

        if (tabelaIns) {
            const tbody = tabelaIns.querySelector('tbody') || tabelaIns;
            const insumosFiltrados = fornFiltrado
                ? DB.insumos.filter(i => i.fornecedor === fornFiltrado)
                : DB.insumos;
            tbody.innerHTML = insumosFiltrados.map(i => `
                <tr>
                    <td>${i.nome}</td>
                    <td>${i.fornecedor}</td>
                    <td>${i.estoque} ${i.unidade}</td>
                    <td>${fmt.moeda(i.preco)}</td>
                    <td><span style="background:${i.status==='normal'?'#e6f7ee':i.status==='baixo'?'#fff3e0':'#fde'};color:${i.status==='normal'?'#0D5B2A':i.status==='baixo'?'#e65c00':'#c00'};padding:2px 8px;border-radius:20px;font-size:11px;">${i.status}</span></td>
                </tr>`).join('') || '<tr><td colspan="5" style="color:#aaa;text-align:center;">Nenhum insumo encontrado.</td></tr>';
        }

        /* ---- Preencher select de filtro de fornecedor ---- */
        if (filtroForn && filtroForn.children.length <= 1) {
            filtroForn.innerHTML = '<option value="">Todos os fornecedores</option>' +
                DB.fornecedores.map(f => `<option value="${f.nome}">${f.nome}</option>`).join('');
        }

        /* ---- Fornecedor destaque (maior valor) ---- */
        const destaque = [...DB.fornecedores].sort((a,b) => b.valorTotal - a.valorTotal)[0];
        if (destaque) {
            setText('fornDestaqueName',         destaque.nome);
            setText('fornDestaqueTotalComprado', fmt.moeda(destaque.valorTotal));
            setText('fornDestaqueValor',         fmt.moeda(destaque.valorTotal));
            setText('fornDestaqueInsumos',       destaque.insumos + ' insumos');
            setText('fornDestaqueUltima',        fmt.data(destaque.ultimaCompra));
        }

        /* ---- Resumo compras ---- */
        const ticketMedio = DB.fornecedores.length
            ? totalCompras / DB.fornecedores.length
            : 0;
        const fornMaisBarato = [...DB.fornecedores].sort((a,b) => a.valorTotal - b.valorTotal)[0];
        const insumoMaisComprado = DB.insumos[0]?.nome || '—';

        setText('resumoComprasPeriodo',     fmt.moeda(totalCompras));
        setText('resumoTicketMedioForn',    fmt.moeda(ticketMedio));
        setText('resumoFornMaisBarato',     fornMaisBarato?.nome || '—');
        setText('resumoInsumoMaisComprado', insumoMaisComprado);

        /* ---- Lista últimas compras ---- */
        const listaCompras = document.getElementById('listaUltimasCompras');
        if (listaCompras) {
            listaCompras.innerHTML = [...DB.fornecedores]
                .sort((a,b) => new Date(b.ultimaCompra) - new Date(a.ultimaCompra))
                .slice(0, 5)
                .map(f => `
                    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f0f0;">
                        <div>
                            <strong style="font-size:13px;">${f.nome}</strong>
                            <div style="font-size:11px;color:#888;">${fmt.data(f.ultimaCompra)}</div>
                        </div>
                        <strong style="font-size:13px;color:#0D5B2A;">${fmt.moeda(f.valorTotal)}</strong>
                    </div>`).join('');
        }
    }

    function setText(id, valor) {
        const el = document.getElementById(id);
        if (!el) return;
        /* Se tem um <strong> filho, atualizar ele; senão o próprio elemento */
        const target = el.tagName === 'STRONG' ? el : (el.querySelector('strong') || el);
        target.textContent = valor;
    }

    /* ---- Bind eventos ---- */
    document.getElementById('btnFiltrarForn')?.addEventListener('click', atualizar);
    document.getElementById('filtroFornecedorInsumos')?.addEventListener('change', atualizar);

    /* ---- Busca fornecedores ---- */
    document.getElementById('buscaFornecedor')?.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        document.querySelectorAll('#tabelaFornecedores tbody tr').forEach(tr => {
            tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });

    /* ---- Exportar (simulado) ---- */
    document.getElementById('btnExportarForn')?.addEventListener('click', () => {
        alert('Exportação disponível em versões futuras.');
    });

    atualizar();
});
