/* js/produtoscadastrados.js — Produtos cadastrados */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    const statusColor = {
        normal: { bg:'#e6f7ee', color:'#0D5B2A' },
        baixo:  { bg:'#fff3e0', color:'#e65c00' },
        zerado: { bg:'#fde',    color:'#c00'     },
    };

    /* ---- Preencher tabela ---- */
    function renderTabela() {
        const tbody = document.querySelector('.tabelaGeral tbody');
        if (!tbody) return;
        tbody.innerHTML = DB.produtos.map(p => {
            const sc = statusColor[p.status] || statusColor.normal;
            return `
            <tr>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${p.unidade}</td>
                <td>${fmt.moeda(p.preco)}</td>
                <td>${p.estoque}</td>
                <td>
                    <span style="background:${sc.bg};color:${sc.color};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;">${p.status}</span>
                </td>
                <td>
                    <a href="editarproduto.html?id=${p.id}" style="margin-right:6px;">&#9998;</a>
                    <button class="botaoAbrirModal" data-id="${p.id}" data-nome="${p.nome}"
                        style="background:none;border:none;color:#e53e3e;font-size:16px;cursor:pointer;">&#128465;</button>
                </td>
            </tr>`;
        }).join('') || '<tr><td colspan="7" style="text-align:center;color:#aaa;">Nenhum produto cadastrado.</td></tr>';

        bindExcluir();
    }

    /* ---- Modal excluir ---- */
    function bindExcluir() {
        document.querySelectorAll('.botaoAbrirModal').forEach(btn => {
            btn.addEventListener('click', () => {
                const { id, nome } = btn.dataset;
                const fundo = document.querySelector('.fundoModal');
                if (fundo) {
                    fundo.style.display = 'flex';
                    const confirmar = fundo.querySelector('.botaoConfirmarExcluir');
                    const cancelar  = fundo.querySelector('.botaoCancelar');
                    if (confirmar) {
                        confirmar.onclick = () => {
                            DB.remove('produtos', parseInt(id));
                            fundo.style.display = 'none';
                            renderTabela();
                        };
                    }
                    if (cancelar) cancelar.onclick = () => fundo.style.display = 'none';
                    fundo.onclick = e => { if (e.target === fundo) fundo.style.display = 'none'; };
                }
            });
        });
    }

    /* ---- Busca ---- */
    const inputBusca = document.querySelector('input[placeholder*="Buscar produto"]');
    if (inputBusca) {
        inputBusca.addEventListener('input', () => {
            const q = inputBusca.value.toLowerCase();
            document.querySelectorAll('.tabelaGeral tbody tr').forEach(tr => {
                tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    /* ---- Atualizar contador no topo ---- */
    const subtitulo = document.querySelector('.subtituloPagina');
    if (subtitulo) subtitulo.textContent = `${DB.produtos.length} produto(s) cadastrado(s)`;

    renderTabela();
});
