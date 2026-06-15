/* js/receitascards.js — Receitas em modo cards */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    const secaoCards = document.querySelector('.cardsReceitas');

    function renderCards() {
        if (!secaoCards) return;
        secaoCards.innerHTML = DB.receitas.map(r => `
            <article class="cardReceita">
                <div class="bolinhaReceita" style="width:36px;height:36px;border-radius:50%;background:#B9F7A8;color:#0D5B2A;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">R${r.id}</div>
                <div class="infoReceita" style="flex:1;">
                    <h3 style="margin:0 0 6px;font-size:14px;">${r.nome}</h3>
                    <p style="margin:2px 0;font-size:12px;color:#555;">Rendimento: ${r.rendimento}</p>
                    <p style="margin:2px 0;font-size:12px;color:#555;">Custo: ${fmt.moeda(r.custo)}</p>
                    <p style="margin:2px 0;font-size:12px;color:#555;">Margem: <strong>${r.margem || '—'}</strong></p>
                </div>
                <div class="acoesReceita" style="display:flex;flex-direction:column;gap:8px;margin-left:auto;">
                    <a href="editarreceita.html?id=${r.id}" style="font-size:16px;color:#0D5B2A;text-decoration:none;">&#9998;</a>
                    <button class="botaoExcluirCard" data-id="${r.id}" data-nome="${r.nome}"
                        style="background:none;border:none;color:#e53e3e;font-size:16px;cursor:pointer;">&#128465;</button>
                </div>
            </article>`).join('') || '<p style="color:#aaa;padding:20px;">Nenhuma receita cadastrada.</p>';
        bindExcluir();
    }

    function bindExcluir() {
        document.querySelectorAll('.botaoExcluirCard').forEach(btn => {
            btn.addEventListener('click', () => {
                const { id, nome } = btn.dataset;
                const fundo = document.querySelector('.fundoModal');
                if (fundo) {
                    fundo.style.display = 'flex';
                    const confirmar = fundo.querySelector('.botaoConfirmarExcluir');
                    const cancelar  = fundo.querySelector('.botaoCancelar');
                    if (confirmar) confirmar.onclick = () => { DB.remove('receitas', parseInt(id)); fundo.style.display = 'none'; renderCards(); };
                    if (cancelar)  cancelar.onclick  = () => fundo.style.display = 'none';
                    fundo.onclick = e => { if (e.target === fundo) fundo.style.display = 'none'; };
                } else if (confirm(`Excluir "${nome}"?`)) {
                    DB.remove('receitas', parseInt(id));
                    renderCards();
                }
            });
        });
    }

    /* Busca */
    const inputBusca = document.querySelector('input[placeholder*="Buscar"]');
    if (inputBusca) {
        inputBusca.addEventListener('input', () => {
            const q = inputBusca.value.toLowerCase();
            document.querySelectorAll('.cardReceita').forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    renderCards();
});
