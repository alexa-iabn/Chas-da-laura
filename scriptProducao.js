const selectReceita = document.querySelector("#receita");
const inputData = document.querySelector("#dataProducao");
const inputQuantidade = document.querySelector("#quantidade");
const selectUnidade = document.querySelector("#unidadeMedida");
const selectProduto = document.querySelector("#responsavel");
const textareaObservacoes = document.querySelector("#observacoes");
const tbodyInsumos = document.querySelector(".tabelaInsumosProducao tbody");
const botaoRegistrar = document.querySelector(".btnRegistrarProducao");

const produtoFinal = document.querySelectorAll(".dadosResumo")[0];
const dataResumo = document.querySelectorAll(".dadosResumo")[1];
const rendimentoResumo = document.querySelectorAll(".dadosResumo")[2];

const quantidadeResumo = document.querySelectorAll(".valorDestaqueVerde")[0];
const estoqueResumo = document.querySelectorAll(".valorDestaqueVerde")[1];

function pegarProdutos(){
    return JSON.parse(localStorage.getItem("produtos")) || [];
}

function pegarReceitas(){
    return JSON.parse(localStorage.getItem("receitas")) || [];
}

function pegarProducoes(){
    return JSON.parse(localStorage.getItem("producoes")) || [];
}

function salvarProducoes(producoes){
    localStorage.setItem("producoes", JSON.stringify(producoes));
}

function numero(valor){
    return Number(
        String(valor || 0)
            .replace("R$", "")
            .replace(",", ".")
            .trim()
    ) || 0;
}

function moeda(valor){
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/* ================= SELECT DE PRODUTOS ================= */

function carregarProdutos(){
    const produtos = pegarProdutos();

    selectProduto.innerHTML = `<option value="">Selecione um produto...</option>`;

    produtos.forEach(produto => {
        selectProduto.innerHTML += `
            <option value="${produto.id}">
                ${produto.nome}
            </option>
        `;
    });
}

/* ================= SELECT DE RECEITAS ================= */

function carregarReceitas(){
    const receitas = pegarReceitas();

    selectReceita.innerHTML = `<option value="">Selecione uma receita...</option>`;

    receitas.forEach(receita => {
        selectReceita.innerHTML += `
            <option value="${receita.id}">
                ${receita.produto}
            </option>
        `;
    });
}

/* ================= BUSCAS ================= */

function buscarProdutoSelecionado(){
    const produtos = pegarProdutos();

    return produtos.find(produto =>
        String(produto.id) === String(selectProduto.value)
    );
}

function buscarReceitaSelecionada(){
    const receitas = pegarReceitas();

    return receitas.find(receita =>
        String(receita.id) === String(selectReceita.value)
    );
}

function buscarReceitaDoProduto(produto){
    if(!produto){
        return null;
    }

    const receitas = pegarReceitas();

    return receitas.find(receita =>
        String(receita.id) === String(produto.receita) ||
        String(receita.produto).toLowerCase().trim() === String(produto.nome).toLowerCase().trim()
    );
}

/* ================= QUANDO ESCOLHER PRODUTO ================= */

function selecionarProduto(){
    const produto = buscarProdutoSelecionado();

    carregarReceitas();

    if(produto){
        const receitaProduto = buscarReceitaDoProduto(produto);

        if(receitaProduto){
            selectReceita.value = receitaProduto.id;
        }
    }

    atualizarTabelaInsumos();
}

/* ================= QUANDO ESCOLHER RECEITA ================= */

function selecionarReceita(){
    const receita = buscarReceitaSelecionada();

    if(!receita){
        atualizarTabelaInsumos();
        return;
    }

    const produtos = pegarProdutos();

    const produtoDaReceita = produtos.find(produto =>
        String(produto.receita) === String(receita.id) ||
        String(produto.nome).toLowerCase().trim() === String(receita.produto).toLowerCase().trim()
    );

    if(produtoDaReceita){
        selectProduto.value = produtoDaReceita.id;
    }

    atualizarTabelaInsumos();
}

/* ================= CÁLCULOS ================= */

function calcularValorUnitarioReceita(receita){
    const custoTotalReceita = numero(receita.custoTotalReceita);
    const rendimentoReceita = numero(receita.rendimento) || 1;

    return custoTotalReceita / rendimentoReceita;
}

function calcularValorTotalProducao(receita, quantidadeProduzida){
    const valorPorUnidade = calcularValorUnitarioReceita(receita);

    return valorPorUnidade * quantidadeProduzida;
}

function calcularQuantidadePorUnidade(item, receita){
    const quantidadeTotalReceita = numero(item.quantidade);
    const rendimentoReceita = numero(receita.rendimento) || 1;

    return quantidadeTotalReceita / rendimentoReceita;
}

function calcularQuantidadeTotalUtilizada(item, receita, quantidadeProduzida){
    const quantidadePorUnidade = calcularQuantidadePorUnidade(item, receita);

    return quantidadePorUnidade * quantidadeProduzida;
}

/* ================= TABELA DE INSUMOS ================= */

function atualizarTabelaInsumos(){
    const receita = buscarReceitaSelecionada();
    const quantidadeProduzida = numero(inputQuantidade.value);

    tbodyInsumos.innerHTML = "";

    if(!receita || !receita.insumos || receita.insumos.length === 0){
        atualizarResumo();
        return;
    }

    receita.insumos.forEach(item => {
        const quantidadePorUnidade = calcularQuantidadePorUnidade(item, receita);
        const quantidadeTotalUtilizada = calcularQuantidadeTotalUtilizada(
            item,
            receita,
            quantidadeProduzida
        );

        tbodyInsumos.innerHTML += `
            <tr>
                <td><strong>${item.insumo}</strong></td>
                <td>${quantidadePorUnidade.toFixed(2).replace(".", ",")} ${item.unidade}</td>
                <td>${quantidadeTotalUtilizada.toFixed(2).replace(".", ",")} ${item.unidade}</td>
            </tr>
        `;
    });

    atualizarResumo();
}

/* ================= RESUMO ================= */

function atualizarResumo(){
    const produto = buscarProdutoSelecionado();
    const receita = buscarReceitaSelecionada();

    produtoFinal.textContent = produto ? produto.nome : "-";

    quantidadeResumo.textContent =
        `${inputQuantidade.value || 0} ${selectUnidade.value || ""}`;

    dataResumo.textContent = inputData.value || "-";

    rendimentoResumo.textContent = receita
        ? `${receita.rendimento} ${receita.unidadeRendimento}`
        : "-";

    estoqueResumo.textContent =
        `+ ${inputQuantidade.value || 0} ${selectUnidade.value || ""}`;
}

/* ================= SALVAR PRODUÇÃO ================= */

function salvarProducao(){
    const produto = buscarProdutoSelecionado();
    const receita = buscarReceitaSelecionada();

    if(!produto){
        alert("Selecione um produto.");
        return;
    }

    if(!receita){
        alert("Selecione uma receita.");
        return;
    }

    if(!inputData.value || !inputQuantidade.value){
        alert("Preencha a data e a quantidade produzida.");
        return;
    }

    const quantidadeProduzida = numero(inputQuantidade.value);

    const valorPorUnidade = calcularValorUnitarioReceita(receita);
    const valorTotalProducao = calcularValorTotalProducao(receita, quantidadeProduzida);

    const novaProducao = {
        id: Date.now(),

        produtoId: produto.id,
        produto: produto.nome,
        nomeProduto: produto.nome,

        receitaId: receita.id,
        receita: receita.produto,
        nomeReceita: receita.produto,

        quantidadeProduzida: quantidadeProduzida,
        unidadeMedida: selectUnidade.value,

        dataProducao: inputData.value,
        responsavel: "Laura",
        status: "Finalizada",
        observacoes: textareaObservacoes.value.trim(),

        rendimentoReceita: `${receita.rendimento} ${receita.unidadeRendimento}`,

        custoTotalReceita: numero(receita.custoTotalReceita),
        rendimento: numero(receita.rendimento),

        valorPorUnidade: Number(valorPorUnidade.toFixed(2)),
        custoUnitarioReceita: Number(valorPorUnidade.toFixed(2)),

        valorTotalProducao: Number(valorTotalProducao.toFixed(2)),
        custoTotalProducao: Number(valorTotalProducao.toFixed(2)),

        insumosUtilizados: receita.insumos.map(item => {
            const quantidadePorUnidade = calcularQuantidadePorUnidade(item, receita);
            const quantidadeTotalUtilizada = calcularQuantidadeTotalUtilizada(
                item,
                receita,
                quantidadeProduzida
            );

            return {
                insumo: item.insumo,
                quantidadeTotalReceita: numero(item.quantidade),
                quantidadePorUnidade: Number(quantidadePorUnidade.toFixed(2)),
                unidade: item.unidade,
                quantidadeTotalUtilizada: Number(quantidadeTotalUtilizada.toFixed(2))
            };
        }),

        criadoEm: new Date().toLocaleString("pt-BR")
    };

    const producoes = pegarProducoes();

    producoes.push(novaProducao);

    salvarProducoes(producoes);

    alert("Produção salva com sucesso!");
}

/* ================= EVENTOS ================= */

selectProduto.addEventListener("change", selecionarProduto);
selectReceita.addEventListener("change", selecionarReceita);
inputQuantidade.addEventListener("input", atualizarTabelaInsumos);
inputData.addEventListener("input", atualizarResumo);
selectUnidade.addEventListener("change", atualizarResumo);

botaoRegistrar.addEventListener("click", event => {
    event.preventDefault();
    salvarProducao();
});

/* ================= INICIAR ================= */

carregarProdutos();
carregarReceitas();
atualizarResumo();