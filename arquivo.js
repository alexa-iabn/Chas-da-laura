   /* ABRIR E FECHAR O MENU LATERAL */
   
   const btnSidebar = document.querySelector("#botaoRetratil");

    btnSidebar.addEventListener("click", () => {
        document.body.classList.toggle("sidebarFechado");
    });


    const itensMenu = document.querySelectorAll(".blocoOpcao");

    itensMenu.forEach((item) => {
        item.addEventListener("click", () => {
            itensMenu.forEach((outroItem) => {
                outroItem.classList.remove("ativo");
            });

            item.classList.add("ativo");
        });
    });

    /* ALTERANAR ENTRE CONTEUDO DE LISTA E DE CARD */

    const botaoLista = document.querySelector(".botaoTabelaLista");
    const botaoCard = document.querySelector(".botaoTabelaCard");

    const conteinerTabela = document.querySelector(".conteinerTabela");
    const conteinerCartas = document.querySelector(".conteinerCartas");

    botaoCard.addEventListener("click", () => {
        conteinerTabela.style.display = "none";
        conteinerCartas.style.display = "flex";
    });

    botaoLista.addEventListener("click", () => {
        conteinerTabela.style.display = "block";
        conteinerCartas.style.display = "none";
    });

    /* ABRIR E FECHAR MODAL EXCLUIR PRODUTOS */

    const botoesAbrirModal = document.querySelectorAll(".abrirModalExcluir");
    const modalExcluir = document.querySelector(".modalExcluirProduto");
    const botaoCancelar = document.querySelector(".cancelar");

    botoesAbrirModal.forEach((botao) => {
        botao.addEventListener("click", () => {
            modalExcluir.classList.remove("escondido");
        });
    });

    botaoCancelar.addEventListener("click", () => {
        modalExcluir.classList.add("escondido");
    });


/* ================= ESTOQUE PRODUTOS  ================= */

const tabelaProdutos = document.querySelector(".tabelaProdutos");
const conteinerCartasProdutos = document.querySelector(".conteinerCartas");
const barraPesquisa = document.querySelector(".barraPesquisaTabela");
const filtroTabela = document.querySelector(".filtroTabela");

function pegarProdutos(){
    return JSON.parse(localStorage.getItem("produtos")) || [];
}

function moeda(valor){
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function statusProduto(produto){
    const quantidade = Number(produto.quantidade || produto.quantidadeEstoque || 0);
    const minimo = Number(produto.estoqueMinimo || 0);

    if(quantidade <= 0){
        return "Zerado";
    }

    if(quantidade <= minimo){
        return "Estoque baixo";
    }

    return "Normal";
}

function valorProduto(produto){
    return produto.valorUnitario || produto.precoVenda || produto.valorUnidade || 0;
}

function quantidadeProduto(produto){
    return produto.quantidade || produto.quantidadeEstoque || 0;
}

function unidadeProduto(produto){
    return produto.unidadeEstoque || "un";
}

function imagemProduto(produto){
    return produto.imagem || "Imagens/xicara.svg";
}

function renderizarProdutos(lista = pegarProdutos()){

    if(tabelaProdutos){
        let tbody = tabelaProdutos.querySelector("tbody");

        if(!tbody){
            tbody = document.createElement("tbody");
            tabelaProdutos.appendChild(tbody);
        }

        tbody.innerHTML = "";

        lista.forEach(produto => {
            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="Produto">
                            <img class="fotoProduto" src="${imagemProduto(produto)}" alt="imagem produto">
                            <span>${produto.nome || "Sem nome"}</span>
                        </div>
                    </td>

                    <td>
                        <div class="Categoria">
                            <span>${produto.categoria || produto.nomeReceita || "Sem categoria"}</span>
                        </div>
                    </td>

                    <td>
                        <div class="Status">
                            <span>${statusProduto(produto)}</span>
                        </div>
                    </td>

                    <td>${moeda(valorProduto(produto))}</td>

                    <td>${quantidadeProduto(produto)} ${unidadeProduto(produto)}</td>

                    <td>
                        <div class="Acao">
                            <a href="editarproduto.html?id=${produto.id}" class="iconeLapisTabela"></a>
                            <button type="button" class="iconeLixeira abrirModalExcluir" data-id="${produto.id}"></button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    if(conteinerCartasProdutos){
        conteinerCartasProdutos.innerHTML = "";

        lista.forEach(produto => {
            conteinerCartasProdutos.innerHTML += `
                <article class="carta">

                    <div class="conteucoCarta">

                        <div class="imagemCarta">
                            <img src="${imagemProduto(produto)}" alt="${produto.nome || "Produto"}">
                        </div>

                        <div class="infoCarta">

                            <h2 class="TituloCarta">${produto.nome || "Sem nome"}</h2>

                            <div class="tipo">
                                <span>${produto.categoria || produto.nomeReceita || "Sem categoria"}</span>
                            </div>

                            <div class="status">
                                <span>${statusProduto(produto)}</span>
                            </div>

                        </div>

                        <div class="detalhesCarta">

                            <span class="detalhesNome nome1">
                                preço de venda
                            </span>

                            <strong>${moeda(valorProduto(produto))}</strong>

                            <hr>

                            <span class="detalhesNome">
                                Em estoque
                            </span>

                            <strong>${quantidadeProduto(produto)} ${unidadeProduto(produto)}</strong>

                        </div>

                    </div>

                    <hr>

                    <div class="acoesCarta">

                        <a href="editarproduto.html?id=${produto.id}">
                            <button class="editarCartas"></button>
                        </a>

                        <button class="exluircartas abrirModalExcluir" data-id="${produto.id}"></button>

                    </div>

                </article>
            `;
        });
    }
}

function filtrarEOrdenarProdutos(){
    let produtos = pegarProdutos();

    const textoBusca = barraPesquisa ? barraPesquisa.value.toLowerCase() : "";
    const valorFiltro = filtroTabela ? filtroTabela.value : "";

    produtos = produtos.filter(produto =>
        String(produto.nome || "").toLowerCase().includes(textoBusca)
    );

    if(valorFiltro === "maiorPreco"){
        produtos.sort((a, b) => valorProduto(b) - valorProduto(a));
    }

    if(valorFiltro === "menorPreco"){
        produtos.sort((a, b) => valorProduto(a) - valorProduto(b));
    }

    if(valorFiltro === "maiorQuantidade"){
        produtos.sort((a, b) => quantidadeProduto(b) - quantidadeProduto(a));
    }

    if(valorFiltro === "menorQuantidade"){
        produtos.sort((a, b) => quantidadeProduto(a) - quantidadeProduto(b));
    }

    renderizarProdutos(produtos);
}

if(tabelaProdutos || conteinerCartasProdutos){

    renderizarProdutos();

    if(barraPesquisa){
        barraPesquisa.addEventListener("input", filtrarEOrdenarProdutos);
    }

    if(filtroTabela){
        filtroTabela.addEventListener("change", filtrarEOrdenarProdutos);
    }
}


/* INSUMOS */

const insumos = [
  {
    nome: "Camomila",
    categoria: "chá",
    preco: 45.00,
    estoque: 25,
    quantidade: 2,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-12-10",
    imagem: "imagens/insumos/camomila.png"
  },
  {
    nome: "Erva-doce",
    categoria: "chá",
    preco: 38.00,
    estoque: 18,
    quantidade: 1.5,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-11-20",
    imagem: "imagens/insumos/erva-doce.png"
  },
  {
    nome: "Hortelã",
    categoria: "chá",
    preco: 42.00,
    estoque: 20,
    quantidade: 1.8,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-10-15",
    imagem: "imagens/insumos/hortela.png"
  },
  {
    nome: "Capim-limão",
    categoria: "chá",
    preco: 36.00,
    estoque: 16,
    quantidade: 1.2,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-09-30",
    imagem: "imagens/insumos/capim-limao.png"
  },
  {
    nome: "Chá-preto",
    categoria: "chá",
    preco: 58.00,
    estoque: 22,
    quantidade: 2.5,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2027-01-05",
    imagem: "imagens/insumos/cha-preto.png"
  },
  {
    nome: "Chá-verde",
    categoria: "chá",
    preco: 55.00,
    estoque: 19,
    quantidade: 2,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-12-18",
    imagem: "imagens/insumos/cha-verde.png"
  },
  {
    nome: "Canela em casca",
    categoria: "chá",
    preco: 28.00,
    estoque: 14,
    quantidade: 900,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-03-12",
    imagem: "imagens/insumos/canela-em-casca.png"
  },
  {
    nome: "Gengibre desidratado",
    categoria: "chá",
    preco: 32.00,
    estoque: 13,
    quantidade: 850,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-02-25",
    imagem: "imagens/insumos/gengibre-desidratado.png"
  },
  {
    nome: "Hibisco",
    categoria: "chá",
    preco: 40.00,
    estoque: 21,
    quantidade: 1.7,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-11-08",
    imagem: "imagens/insumos/hibisco.png"
  },
  {
    nome: "Lavanda",
    categoria: "chá",
    preco: 65.00,
    estoque: 12,
    quantidade: 700,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2026-08-22",
    imagem: "imagens/insumos/lavanda.png"
  },
  {
    nome: "Melissa",
    categoria: "chá",
    preco: 47.00,
    estoque: 17,
    quantidade: 1.3,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-10-02",
    imagem: "imagens/insumos/melissa.png"
  },
  {
    nome: "Lata para blend",
    categoria: "chá",
    preco: 8.00,
    estoque: 45,
    quantidade: 45,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/lata-para-blend.png"
  },
  {
    nome: "Cúrcuma",
    categoria: "chá",
    preco: 35.00,
    estoque: 11,
    quantidade: 600,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-04-10",
    imagem: "imagens/insumos/curcuma.png"
  },
  {
    nome: "Cravo-da-índia",
    categoria: "chá",
    preco: 30.00,
    estoque: 13,
    quantidade: 500,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-05-01",
    imagem: "imagens/insumos/cravo-da-india.png"
  },
  {
    nome: "Anis-estrelado",
    categoria: "chá",
    preco: 52.00,
    estoque: 10,
    quantidade: 450,
    unidadeMedida: "g",
    estoqueMinimo: 2,
    validade: "2027-03-28",
    imagem: "imagens/insumos/anis-estrelado.png"
  },
  {
    nome: "Infusor inox redondo",
    categoria: "infusor",
    preco: 18.00,
    estoque: 30,
    quantidade: 30,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/infusor-inox-redondo.png"
  },
  {
    nome: "Álcool de cereal",
    categoria: "infusor",
    preco: 25.00,
    estoque: 20,
    quantidade: 5,
    unidadeMedida: "litros",
    estoqueMinimo: 5,
    validade: "2027-01-18",
    imagem: "imagens/insumos/alcool-de-cereal.png"
  },
  {
    nome: "Corrente para infusor",
    categoria: "infusor",
    preco: 6.00,
    estoque: 25,
    quantidade: 25,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/corrente-para-infusor.png"
  },
  {
    nome: "Tela de aço inox",
    categoria: "infusor",
    preco: 22.00,
    estoque: 12,
    quantidade: 5,
    unidadeMedida: "metros",
    estoqueMinimo: 2,
    validade: null,
    imagem: "imagens/insumos/tela-de-aco-inox.png"
  },
  {
    nome: "Argola metálica",
    categoria: "infusor",
    preco: 4.50,
    estoque: 35,
    quantidade: 35,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/argola-metalica.png"
  }
];

const tabelaInsumos = document.querySelector('.tabelaInsumos')

const tbodyInsumos = document.createElement('tbody')

insumos.forEach((insumo) => {
    tbodyInsumos.innerHTML += `
        <tr>
            <td>
                <div class="Produto">
                    <img class="fotoProduto" src="${insumo.imagem}" alt="imagem produtos">
                    <span>${insumo.nome}</span>
                </div>
            </td>

            <td>
                <div class="Categoria">
                    <span>${insumo.categoria}</span>
                </div>
            </td>

            <td>
                <div class="Status">
                    <span>Normal</span>
                </div>
            </td>

            <td>R$ ${insumo.preco.toFixed(2).replace(".", ",")}</td>

            <td>${insumo.estoque} ${insumo.unidadeMedida}</td>

            <td>
                <div class="Acao">
                    <i class="iconeLapisTabela"></i>
                    <i class="iconeLixeira abrirModalExcluir"></i>
                </div>
            </td>
        </tr>
    `;
});

tabelaInsumos.appendChild(tbodyInsumos);


    /* PESQUISAR INSUMOS */

const barraPesquisaInsumos = document.querySelector(".barraPesquisaTabela");

barraPesquisa.addEventListener("input", () => {

    const valorPesquisa = barraPesquisaInsumos.value.toLowerCase();

    const linhasTabela = document.querySelectorAll(".tabelaInsumos tbody tr");

    linhasTabela.forEach((linha) => {

        const nomeProduto = linha.querySelector(".Produto span")
        .textContent
        .toLowerCase();

        if(nomeProduto.includes(valorPesquisa)){
            linha.style.display = "";
        } else{
            linha.style.display = "none";
        }

    });

});

    /* ORDENAR INSUMOS */

const filtroTabelaInsumo = document.querySelector(".filtroTabela");

filtroTabelaInsumo.addEventListener("change", () => {

    const valorFiltro = filtroTabelaInsumo.value;

    if(valorFiltro === "maiorPreco"){
        insumos.sort((a, b) => b.preco - a.preco);
    }

    if(valorFiltro === "menorPreco"){
        insumos.sort((a, b) => a.preco - b.preco);
    }

    if(insumos === "maiorQuantidade"){
        insumos.sort((a, b) => b.quantidade - a.quantidade);
    }

    if(valorFiltro === "menorQuantidade"){
        insumos.sort((a, b) => a.quantidade - b.quantidade);
    }

    atualizarTabelaInsumos();

});


function atualizarTabelaInsumos(){

    tbodyInsumos.innerHTML = "";

    insumos.forEach((insumo) => {

        tbodyInsumos.innerHTML += `
            <tr>
                <td>
                    <div class="Produto">
                        <img class="fotoProduto" src="${insumo.imagem}" alt="imagem produtos">
                        <span>${insumo.nome}</span>
                    </div>
                </td>

                <td>
                    <div class="Categoria">
                        <span>${insumo.categoria}</span>
                    </div>
                </td>

                <td>
                    <div class="Status">
                        <span>Normal</span>
                    </div>
                </td>

                <td>
                    R$ ${insumo.preco.toFixed(2).replace(".", ",")}
                </td>

                <td>
                    ${insumo.quantidade} ${insumo.unidadeMedida}
                </td>

                <td>
                    <div class="Acao">
                        <i class="iconeLapisTabela"></i>
                        <i class="iconeLixeira abrirModalExcluir"></i>
                    </div>
                </td>
            </tr>
        `;
    });

}