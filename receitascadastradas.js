/* js/receitascadastradas.js — Lista de receitas (tabela) */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    function renderTabela() {
        const tbody = document.querySelector('.tabelaGeral tbody');
        if (!tbody) return;
        tbody.innerHTML = DB.receitas.map(r => `
            <tr>
                <td>${r.nome}</td>
                <td>${r.rendimento}</td>
                <td>${fmt.moeda(r.custo)}</td>
                <td>${fmt.moeda(r.preco)}</td>
                <td>${r.margem || '—'}</td>
                <td>
                    <a href="editarreceita.html?id=${r.id}" style="margin-right:6px;font-size:16px;">&#9998;</a>
                    <button class="botaoAbrirModal" data-id="${r.id}" data-nome="${r.nome}"
                        style="background:none;border:none;color:#e53e3e;font-size:16px;cursor:pointer;">&#128465;</button>
                </td>
            </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:#aaa;">Nenhuma receita cadastrada.</td></tr>';
        bindExcluir();
    }

    function bindExcluir() {
        document.querySelectorAll('.botaoAbrirModal').forEach(btn => {
            btn.addEventListener('click', () => {
                const { id, nome } = btn.dataset;
                const fundo = document.querySelector('.fundoModal');
                if (fundo) {
                    fundo.style.display = 'flex';
                    const confirmar = fundo.querySelector('.botaoConfirmarExcluir');
                    const cancelar  = fundo.querySelector('.botaoCancelar');
                    if (confirmar) confirmar.onclick = () => { DB.remove('receitas', parseInt(id)); fundo.style.display = 'none'; renderTabela(); };
                    if (cancelar)  cancelar.onclick  = () => fundo.style.display = 'none';
                    fundo.onclick = e => { if (e.target === fundo) fundo.style.display = 'none'; };
                }
            });
        });
    }

    /* Busca */
    const inputBusca = document.querySelector('input[placeholder*="Buscar"]');
    if (inputBusca) {
        inputBusca.addEventListener('input', () => {
            const q = inputBusca.value.toLowerCase();
            document.querySelectorAll('.tabelaGeral tbody tr').forEach(tr => {
                tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    renderTabela();
});
