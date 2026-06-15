/* js/editarproduto.js — Editar produto existente */
document.addEventListener('DOMContentLoaded', function () {
    const fmt = window.CL?.fmt || {
        moeda: v => Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }),
    };

    /* Ler id da URL: editarproduto.html?id=3 */
    const params = new URLSearchParams(window.location.search);
    const id     = parseInt(params.get('id')) || null;
    const prod   = id ? DB.getById('produtos', id) : DB.produtos[0];

    if (!prod) {
        alert('Produto não encontrado.');
        window.location.href = 'produtoscadastrados.html';
        return;
    }

    /* Preencher campos */
    const inputs  = document.querySelectorAll('.linhaForm2 input[type="text"], .linhaForm2 input[type="number"]');
    const selects = document.querySelectorAll('.linhaForm2 select, select');
    const textarea = document.querySelector('textarea');

    /* Nome */
    const inputNome = document.querySelector('input[value="Blend 1"], .linhaForm2 input[type="text"]');
    if (inputNome) inputNome.value = prod.nome;

    /* Estoque */
    const inputEst = document.querySelector('input[type="number"]');
    if (inputEst) inputEst.value = prod.estoque;

    /* Preço */
    const inputPreco = document.querySelector('input[value*="R$"], input[value*="50"]');
    if (inputPreco) inputPreco.value = prod.preco;

    /* Descrição */
    if (textarea) textarea.value = prod.descricao || '';

    /* Painel direito — info atual */
    atualizarPainelInfo(prod);

    function atualizarPainelInfo(p) {
        const ladoDireito = document.querySelector('.ladoDireitoReceita, .painelLateral');
        if (!ladoDireito) return;
        ladoDireito.innerHTML = `
            <div class="cardResumoReceita" style="background:white;border-radius:10px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin-bottom:16px;">
                <div style="width:44px;height:44px;border-radius:50%;background:#0D4B24;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;margin-bottom:12px;">${p.nome.slice(0,2).toUpperCase()}</div>
                <strong style="font-size:15px;">${p.nome}</strong>
                <span style="display:inline-block;margin:6px 0;background:#e6f7ee;color:#0D5B2A;padding:2px 10px;border-radius:20px;font-size:11px;">Ativo</span>
                <p style="font-size:13px;color:#555;margin:4px 0;">Categoria: ${p.categoria}</p>
                <p style="font-size:13px;color:#555;margin:4px 0;">Estoque: ${p.estoque} ${p.unidade}</p>
                <p style="font-size:13px;color:#555;margin:4px 0;">Preço: ${fmt.moeda(p.preco)}</p>
            </div>
            <div class="cardResumoVerde" style="background:#DDF7C9;border-radius:10px;padding:20px;">
                <h3 style="margin:0 0 12px;color:#0D4B24;">Valor em estoque</h3>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Unidades</span><strong>${p.estoque}</strong></p>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Preço unit.</span><strong>${fmt.moeda(p.preco)}</strong></p>
                <p style="display:flex;justify-content:space-between;font-size:13px;"><span>Total</span><strong>${fmt.moeda(p.estoque * p.preco)}</strong></p>
            </div>
            <button onclick="excluirProduto()" style="width:100%;margin-top:14px;padding:10px;border:1px solid #e53e3e;background:white;color:#e53e3e;border-radius:6px;cursor:pointer;font-weight:600;">&#128465; Excluir produto</button>`;
    }

    /* Excluir */
    window.excluirProduto = function () {
        if (confirm(`Excluir "${prod.nome}"? Esta ação não pode ser desfeita.`)) {
            DB.remove('produtos', prod.id);
            window.location.href = 'produtoscadastrados.html';
        }
    };

    /* Salvar */
    const btnSalvar   = document.querySelector('.btnVerde');
    const btnCancelar = document.querySelector('.btnVoltar');

    if (btnCancelar) btnCancelar.addEventListener('click', () => window.location.href = 'produtoscadastrados.html');

    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            const novoNome    = document.querySelector('input[type="text"]')?.value.trim()  || prod.nome;
            const novoEst     = parseInt(document.querySelector('input[type="number"]')?.value) || prod.estoque;
            const novoPreco   = parseFloat(document.querySelector('input[value*="R$"], input[placeholder*="0,00"]')?.value) || prod.preco;
            const novoStatus  = novoEst === 0 ? 'zerado' : novoEst <= 5 ? 'baixo' : 'normal';

            DB.update('produtos', prod.id, {
                nome:     novoNome,
                estoque:  novoEst,
                preco:    novoPreco,
                status:   novoStatus,
                descricao: textarea?.value || '',
            });

            alert('Produto atualizado com sucesso!');
            window.location.href = 'produtoscadastrados.html';
        });
    }
});
