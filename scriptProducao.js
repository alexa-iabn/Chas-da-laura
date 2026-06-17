const selectReceita = document.querySelector("#receita");
const inputData = document.querySelector("#dataProducao");
const inputQuantidade = document.querySelector("#quantidade");
const selectUnidade = document.querySelector("#unidadeMedida");
const selectResponsavel = document.querySelector("#responsavel");
const textareaObservacoes = document.querySelector("#observacoes");
const tbodyInsumos = document.querySelector(".tabelaInsumosProducao tbody");
const botaoRegistrar = document.querySelector(".btnRegistrarProducao");

const produtoFinal = document.querySelectorAll(".dadosResumo")[0];
const dataResumo = document.querySelectorAll(".dadosResumo")[1];
const rendimentoResumo = document.querySelectorAll(".dadosResumo")[2];
const quantidadeResumo = document.querySelectorAll(".valorDestaqueVerde")[0];
const estoqueResumo = document.querySelectorAll(".valorDestaqueVerde")[1];

function carregarReceitas(){
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];

    selectReceita.innerHTML = `<option value="">Selecione uma receita...</option>`;

    receitas.forEach(receita => {
        selectReceita.innerHTML += `
            <option value="${receita.id}">
                ${receita.produto}
            </option>
        `;
    });
}

function buscarReceitaSelecionada(){
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    const idReceita = Number(selectReceita.value);

    return receitas.find(receita => receita.id === idReceita);
}

function atualizarTabelaInsumos(){
    const receita = buscarReceitaSelecionada();
    const quantidadeProduzida = Number(inputQuantidade.value.replace(",", ".")) || 0;

    tbodyInsumos.innerHTML = "";

    if(!receita){
        return;
    }

    receita.insumos.forEach(item => {
        const quantidadePorUnidade = Number(item.quantidade) || 0;
        const quantidadeTotal = quantidadePorUnidade * quantidadeProduzida;

        tbodyInsumos.innerHTML += `
            <tr>
                <td><strong>${item.insumo}</strong></td>
                <td>${quantidadePorUnidade} ${item.unidade}</td>
                <td>${quantidadeTotal} ${item.unidade}</td>
            </tr>
        `;
    });

    atualizarResumo();
}

function atualizarResumo(){
    const receita = buscarReceitaSelecionada();

    if(!receita){
        produtoFinal.textContent = "-";
        quantidadeResumo.textContent = "-";
        dataResumo.textContent = "-";
        rendimentoResumo.textContent = "-";
        estoqueResumo.textContent = "-";
        return;
    }

    produtoFinal.textContent = receita.produto;
    quantidadeResumo.textContent = `${inputQuantidade.value || 0} ${selectUnidade.value}`;
    dataResumo.textContent = inputData.value || "-";
    rendimentoResumo.textContent = `${receita.rendimento} ${receita.unidadeRendimento}`;
    estoqueResumo.textContent = `+ ${inputQuantidade.value || 0} ${selectUnidade.value}`;
}

function salvarProducao(){
    const receita = buscarReceitaSelecionada();

    if(!receita){
        alert("Selecione uma receita.");
        return;
    }

    const novaProducao = {
        id: Date.now(),
        receitaId: receita.id,
        produtoFinal: receita.produto,
        quantidadeProduzida: inputQuantidade.value,
        unidadeMedida: selectUnidade.value,
        dataProducao: inputData.value,
        responsavel: selectResponsavel.value,
        observacoes: textareaObservacoes.value,
        rendimentoReceita: `${receita.rendimento} ${receita.unidadeRendimento}`,
        insumosUtilizados: receita.insumos.map(item => {
            const quantidadePorUnidade = Number(item.quantidade) || 0;
            const quantidadeProduzida = Number(inputQuantidade.value.replace(",", ".")) || 0;

            return {
                insumo: item.insumo,
                quantidadePorUnidade,
                unidade: item.unidade,
                quantidadeTotalUtilizada: quantidadePorUnidade * quantidadeProduzida
            };
        })
    };

    const producoes = JSON.parse(localStorage.getItem("producoes")) || [];
    producoes.push(novaProducao);

    localStorage.setItem("producoes", JSON.stringify(producoes));

    alert("Produção salva com sucesso!");
}

selectReceita.addEventListener("change", atualizarTabelaInsumos);
inputQuantidade.addEventListener("input", atualizarTabelaInsumos);
inputData.addEventListener("input", atualizarResumo);
selectUnidade.addEventListener("change", atualizarResumo);
botaoRegistrar.addEventListener("click", salvarProducao);

carregarReceitas();
atualizarResumo();