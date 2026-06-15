/* js/parceiroscadastrados.js — Parceiros cadastrados */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    /* ---- Preencher tabela ---- */
    function renderTabela() {
        const tbody = document.querySelector('.tabelaGeral tbody');
        if (!tbody) return;
        tbody.innerHTML = DB.parceiros.map(p => `
            <tr>
                <td><div style="display:flex;align-items:center;gap:8px;">
                    <div style="width:32px;height:32px;border-radius:50%;background:#0D4B24;color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">${p.nome.slice(0,2).toUpperCase()}</div>
                    ${p.nome}
                </div></td>
                <td>${p.cnpj}</td>
                <td>${p.telefone}</td>
                <td>${p.email}</td>
                <td>
                    <a href="editarparceiro.html?id=${p.id}" style="margin-right:6px;">&#9998;</a>
                    <button class="botaoAbrirModal" data-id="${p.id}" data-nome="${p.nome}"
                        style="background:none;border:none;color:#e53e3e;font-size:16px;cursor:pointer;">&#128465;</button>
                </td>
            </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:#aaa;">Nenhum parceiro cadastrado.</td></tr>';

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
                    const cancelar = fundo.querySelector('.botaoCancelar');
                    if (confirmar) {
                        confirmar.onclick = () => {
                            DB.remove('parceiros', parseInt(id));
                            fundo.style.display = 'none';
                            renderTabela();
                            alert(`${nome} removido com sucesso.`);
                        };
                    }
                    if (cancelar) cancelar.onclick = () => fundo.style.display = 'none';
                    fundo.onclick = e => { if (e.target === fundo) fundo.style.display = 'none'; };
                }
            });
        });
    }

    /* ---- Busca ---- */
    const inputBusca = document.querySelector('input[placeholder*="Buscar parceiro"]');
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
