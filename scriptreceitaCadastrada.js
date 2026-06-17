const valoresInsumos = [
    { nome: "Flores de Camomila", valorPorUnidade: 0.08 },
    { nome: "Flor de Liz", valorPorUnidade: 0.12 },
    { nome: "Flor de Calêndula", valorPorUnidade: 0.10 },
    { nome: "Semente de Mamão", valorPorUnidade: 0.05 },
    { nome: "Lata", valorPorUnidade: 3.50 },
    { nome: "Erva-doce", valorPorUnidade: 0.07 },
    { nome: "Hortelã", valorPorUnidade: 0.09 },
    { nome: "Capim-limão", valorPorUnidade: 0.06 },
    { nome: "Canela", valorPorUnidade: 0.11 },
    { nome: "Gengibre", valorPorUnidade: 0.13 }
];

const tabelaBody = document.querySelector(".tabelaGeral tbody");
const modal = document.querySelector(".fundoModal");
const botaoCancelar = document.querySelector(".botaoCancelar");

function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function buscarValorInsumo(nomeInsumo){
    const insumoEncontrado = valoresInsumos.find(item => item.nome === nomeInsumo);
    return insumoEncontrado ? insumoEncontrado.valorPorUnidade : 0;
}

function calcularCustoTotal(receita){
    let total = 0;

    receita.insumos.forEach(item => {
        const quantidade = Number(item.quantidade) || 0;
        const valor = buscarValorInsumo(item.insumo);

        total += quantidade * valor;
    });

    return total;
}

function carregarReceitasNaTabela(){
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];

    tabelaBody.innerHTML = "";

    receitas.forEach(receita => {
        const custoTotal = calcularCustoTotal(receita);
        const rendimento = Number(receita.rendimento) || 1;
        const custoPorUnidade = custoTotal / rendimento;

        tabelaBody.innerHTML += `
            <tr>
                <td>${receita.produto}</td>
                <td>${receita.rendimento} ${receita.unidadeRendimento}</td>
                <td>${formatarMoeda(custoPorUnidade)}</td>
                <td>${formatarMoeda(custoTotal)}</td>
                <td>
                    <div class="acoes">
                        <a href="editarreceita.html" class="editarReceita"></a>
                        <button type="button" class="botaoAbrirModal"></button>
                    </div>
                </td>
            </tr>
        `;
    });
}

document.addEventListener("click", event => {
    if(event.target.classList.contains("botaoAbrirModal")){
        modal.showModal();
    }
});

botaoCancelar.addEventListener("click", () => {
    modal.close();
});

carregarReceitasNaTabela();
