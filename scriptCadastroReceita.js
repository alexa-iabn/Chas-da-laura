const insumos = [
    "Flores de Camomila",
    "Flor de Liz",
    "Flor de Calêndula",
    "Semente de Mamão",
    "Lata",
    "Erva-doce",
    "Hortelã",
    "Capim-limão",
    "Canela",
    "Gengibre"
];

const produtos = [
    { id: 1, nome: "Calme Lata 30g" },
    { id: 2, nome: "Felicitá Lata 80g" },
    { id: 3, nome: "Ormoni Lata 40g" },
    { id: 4, nome: "MaterniTea Lata 90g" },
    { id: 5, nome: "Airmid Lata 60g" },
    { id: 6, nome: "Chai Masala 80g" },
    { id: 7, nome: "Home Spray Lavanda" },
    { id: 8, nome: "Home Spray Capim Limão" }
];

const unidadesMedida = ["g", "kg", "l", "ml"];

const conteinerReceitas = document.querySelector(".conteinerReceitas");
const botaoAdicionar = document.querySelector(".adicionarMais");
const botaoSalvar = document.querySelector(".botoes button:last-child");

const produto = document.querySelector("#nomeProduto");
const rendimento = document.querySelector(".blocoduplo input");
const unidadeRendimento = document.querySelector("#unidadeMedida");
const validade = document.querySelector('.conteinerReceita input[placeholder="Ex: 10 dias"]');
const descricao = document.querySelector(".conteinerReceita textarea");

function gerarOptions(lista){
    return lista.map(item => `<option value="${item}">${item}</option>`).join("");
}

function carregarProdutos(){
    produto.innerHTML = `
        <option value="">Selecione um produto...</option>
        ${produtos.map(produto => `
            <option value="${produto.nome}">${produto.nome}</option>
        `).join("")}
    `;
}

function criarBlocoInsumo(){
    const bloco = document.createElement("div");
    bloco.className = "blocoInsumo";

    bloco.innerHTML = `
        <div class="blocoReceita">
            <label>Insumo</label>
            <select class="selectInsumo">
                ${gerarOptions(insumos)}
            </select>
        </div>

        <div class="linhaInsumo">
            <div class="blocoReceita">
                <label>Quantidade</label>
                <input type="number" class="inputQuantidade">
            </div>

            <div class="blocoReceita">
                <label>Unidade</label>
                <select class="selectUnidade">
                    ${gerarOptions(unidadesMedida)}
                </select>
            </div>
        </div>
    `;

    conteinerReceitas.insertBefore(bloco, botaoAdicionar);
}

function limparFormulario(){
    produto.selectedIndex = 0;
    rendimento.value = "";
    unidadeRendimento.selectedIndex = 0;
    validade.value = "";
    descricao.value = "";

    document.querySelectorAll(".blocoInsumo").forEach(bloco => bloco.remove());

    criarBlocoInsumo();
}

function salvarReceita(){
    const blocos = document.querySelectorAll(".blocoInsumo");
    const listaInsumos = [];

    blocos.forEach(bloco => {
        listaInsumos.push({
            insumo: bloco.querySelector(".selectInsumo").value,
            quantidade: bloco.querySelector(".inputQuantidade").value,
            unidade: bloco.querySelector(".selectUnidade").value
        });
    });

    const novaReceita = {
        id: Date.now(),
        produto: produto.value,
        rendimento: rendimento.value,
        unidadeRendimento: unidadeRendimento.value,
        validade: validade.value,
        descricao: descricao.value,
        insumos: listaInsumos
    };

    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    receitas.push(novaReceita);

    localStorage.setItem("receitas", JSON.stringify(receitas));

    limparFormulario();

    alert("Receita salva com sucesso!");
}

botaoAdicionar.addEventListener("click", criarBlocoInsumo);
botaoSalvar.addEventListener("click", salvarReceita);

document.querySelectorAll(".conteinerReceitas > .blocoReceita").forEach(item => item.remove());
document.querySelector(".conteinerReceitas > div")?.remove();

carregarProdutos();
criarBlocoInsumo();



