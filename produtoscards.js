/* js/produtoscards.js — Produtos em modo cards */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    const statusColor = {
        normal: { bg:'#e6f7ee', color:'#0D5B2A' },
        baixo:  { bg:'#fff3e0', color:'#e65c00' },
        zerado: { bg:'#fde',    color:'#c00'     },
    };

    const secaoCards = document.querySelector('.cardsReceitas, section.cardsReceitas');

    function renderCards() {
        if (!secaoCards) return;
        secaoCards.innerHTML = DB.produtos.map(p => {
            const sc = statusColor[p.status] || statusColor.normal;
            return `
            <article class="cardReceita" style="background:white;border-radius:8px;padding:16px;display:flex;gap:12px;box-shadow:0 3px 10px rgba(0,0,0,0.1);">
                <div style="width:38px;height:38px;border-radius:50%;background:#0D4B24;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;font-size:12px;">${p.nome.slice(0,2).toUpperCase()}</div>
                <div style="flex:1;">
                    <h3 style="margin:0 0 6px;font-size:13px;">${p.nome}</h3>
                    <p style="margin:2px 0;font-size:12px;color:#555;">${p.categoria}</p>
                    <p style="margin:2px 0;font-size:12px;color:#555;">Estoque: ${p.estoque} ${p.unidade}</p>
                    <p style="margin:2px 0;font-size:12px;color:#555;">${fmt.moeda(p.preco)}</p>
                    <span style="background:${sc.bg};color:${sc.color};padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600;">${p.status}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;margin-left:auto;">
                    <a href="editarproduto.html?id=${p.id}" style="font-size:16px;color:#0D5B2A;text-decoration:none;">&#9998;</a>
                    <button data-id="${p.id}" data-nome="${p.nome}"
                        style="background:none;border:none;color:#e53e3e;font-size:16px;cursor:pointer;" class="btnExcluirCard">&#128465;</button>
                </div>
            </article>`;
        }).join('') || '<p style="color:#aaa;padding:20px;">Nenhum produto cadastrado.</p>';
        bindExcluir();
    }

    function bindExcluir() {
        document.querySelectorAll('.btnExcluirCard').forEach(btn => {
            btn.addEventListener('click', () => {
                const { id, nome } = btn.dataset;
                const fundo = document.querySelector('.fundoModal');
                if (fundo) {
                    fundo.style.display = 'flex';
                    const confirmar = fundo.querySelector('.botaoConfirmarExcluir');
                    const cancelar  = fundo.querySelector('.botaoCancelar');
                    if (confirmar) confirmar.onclick = () => { DB.remove('produtos', parseInt(id)); fundo.style.display = 'none'; renderCards(); };
                    if (cancelar)  cancelar.onclick  = () => fundo.style.display = 'none';
                } else if (confirm(`Excluir "${nome}"?`)) {
                    DB.remove('produtos', parseInt(id));
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
            document.querySelectorAll('article.cardReceita').forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    renderCards();
});
