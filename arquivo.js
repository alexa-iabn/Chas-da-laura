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


    /* CRIANDO PRODUTO ESTOQUE */

    const produtos = [

  {
    id: 1,
    nome: "Blend Calme Lata",
    categoria: "blend",
    quantidadeEstoque: 18,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-calme-lata.png"
  },

  {
    id: 2,
    nome: "Blend Felicitá Lata",
    categoria: "blend",
    quantidadeEstoque: 12,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-felicita-lata.png"
  },

  {
    id: 3,
    nome: "Blend Ormoni Lata",
    categoria: "blend",
    quantidadeEstoque: 9,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-ormoni-lata.png"
  },

  {
    id: 4,
    nome: "Blend MaterniTea Lata",
    categoria: "blend",
    quantidadeEstoque: 7,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-maternitea-lata.png"
  },

  {
    id: 5,
    nome: "Blend Airmid Lata",
    categoria: "blend",
    quantidadeEstoque: 15,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-airmid-lata.png"
  },

  {
    id: 6,
    nome: "Blend Chai Masala Lata",
    categoria: "blend",
    quantidadeEstoque: 10,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-chai-masala-lata.png"
  },

  {
    id: 7,
    nome: "Blend DesintoxiTea Lata",
    categoria: "blend",
    quantidadeEstoque: 11,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-desintoxitea-lata.png"
  },

  {
    id: 8,
    nome: "Blend Animé Lata",
    categoria: "blend",
    quantidadeEstoque: 14,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-anime-lata.png"
  },

  {
    id: 9,
    nome: "Blend Amore Lata",
    categoria: "blend",
    quantidadeEstoque: 6,
    unidadeEstoque: "un",
    valorUnidade: 50.00,
    imagem: "imagens/blend-amore-lata.png"
  },


  {
    id: 10,
    nome: "Home Spray Ormoni",
    categoria: "home spray",
    quantidadeEstoque: 8,
    unidadeEstoque: "un",
    valorUnidade: 95.00,
    imagem: "imagens/home-spray-ormoni.png"
  },

  {
    id: 11,
    nome: "Home Spray Maternitea",
    categoria: "home spray",
    quantidadeEstoque: 5,
    unidadeEstoque: "un",
    valorUnidade: 95.00,
    imagem: "imagens/home-spray-maternitea.png"
  },

  {
    id: 12,
    nome: "Home Spray Airmid",
    categoria: "home spray",
    quantidadeEstoque: 13,
    unidadeEstoque: "un",
    valorUnidade: 95.00,
    imagem: "imagens/home-spray-airmid.png"
  },


  {
    id: 13,
    nome: "Kit Presente Lata + Home Spray",
    categoria: "kit",
    quantidadeEstoque: 4,
    unidadeEstoque: "un",
    valorUnidade: 150.00,
    imagem: "imagens/kit-presente-lata-home-spray.png"
  },


  {
    id: 14,
    nome: "Sacola Chás da Laura",
    categoria: "embalagem",
    quantidadeEstoque: 40,
    unidadeEstoque: "un",
    valorUnidade: 5.00,
    imagem: "imagens/sacola-chas-da-laura.png"
  },


  {
    id: 15,
    nome: "Infusor",
    categoria: "acessório",
    quantidadeEstoque: 22,
    unidadeEstoque: "un",
    valorUnidade: 25.00,
    imagem: "imagens/infusor.png"
  }

];


const tabelaProdutos = document.querySelector('.tabelaProdutos');

if(tabelaProdutos){
    const tbodyProdutos = document.createElement('tbody');

    produtos.forEach((produto) => {
        tbodyProdutos.innerHTML += `
            <tr>
                <td>
                    <div class="Produto">
                        <img class="fotoProduto" src="${produto.imagem}" alt="imagem produtos">
                        <span>${produto.nome}</span>
                    </div>
                </td>
                <td>
                    <div class="Categoria">
                        <span>${produto.categoria}</span>
                    </div>
                </td>

                <td>
                    <div class="Status">
                        <span>Normal</span>
                    </div>
                </td>
                <td>R$ ${produto.valorUnidade.toFixed(2).replace(".", ",")}</td>

                <td>${produto.quantidadeEstoque} ${produto.unidadeEstoque}</td>

                <td>
                    <div class="Acao">
                        <i class="iconeLapisTabela"></i>
                        <i class="iconeLixeira abrirModalExcluir"></i>
                    </div>
                </td>
            </tr>
        `;
    });

    tabelaProdutos.appendChild(tbodyProdutos);
}


  /* CRIAR CARTA */

const conteinerCartasProdutos = document.querySelector(".conteinerCartas");

produtos.forEach((produto) => {

    conteinerCartasProdutos.innerHTML += `
    
        <article class="carta">

            <div class="conteucoCarta">

                <div class="imagemCarta">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>

                <div class="infoCarta">

                    <h2 class="TituloCarta">${produto.nome}</h2>

                    <div class="tipo">
                        <span>${produto.categoria}</span>
                    </div>

                    <div class="status">
                        <span>normal</span>
                    </div>

                </div>

                <div class="detalhesCarta">

                    <span class="detalhesNome nome1">
                        preço de venda
                    </span>

                    <strong>
                        R$ ${produto.valorUnidade.toFixed(2).replace(".", ",")}
                    </strong>

                    <hr>

                    <span class="detalhesNome">
                        Em estoque
                    </span>

                    <strong>
                        ${produto.quantidadeEstoque} ${produto.unidadeEstoque}
                    </strong>

                </div>

            </div>

            <hr>

            <div class="acoesCarta">

                <a href="editarproduto.html">
                    <button class="editarCartas"></button>
                </a>

                <button class="exluircartas abrirModalExcluir"></button>

            </div>

        </article>

    `;
});


    /* PESQUISAR PRODUTO */

const barraPesquisa = document.querySelector(".barraPesquisaTabela");

barraPesquisa.addEventListener("input", () => {

    const valorPesquisa = barraPesquisa.value.toLowerCase();

    const linhasTabela = document.querySelectorAll(".tabelaProdutos tbody tr");

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


    /* ORDENAR PRODUTOS */

const filtroTabela = document.querySelector(".filtroTabela");

filtroTabela.addEventListener("change", () => {

    const valorFiltro = filtroTabela.value;

    if(valorFiltro === "maiorPreco"){
        produtos.sort((a, b) => b.valorUnidade - a.valorUnidade);
    }

    if(valorFiltro === "menorPreco"){
        produtos.sort((a, b) => a.valorUnidade - b.valorUnidade);
    }

    if(valorFiltro === "maiorQuantidade"){
        produtos.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);
    }

    if(valorFiltro === "menorQuantidade"){
        produtos.sort((a, b) => a.quantidadeEstoque - b.quantidadeEstoque);
    }

    atualizarTabela();

});


function atualizarTabela(){

    tbody.innerHTML = "";

    produtos.forEach((produto) => {

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="Produto">
                        <img class="fotoProduto" src="${produto.imagem}" alt="imagem produtos">
                        <span>${produto.nome}</span>
                    </div>
                </td>

                <td>
                    <div class="Categoria">
                        <span>${produto.categoria}</span>
                    </div>
                </td>

                <td>
                    <div class="Status">
                        <span>Normal</span>
                    </div>
                </td>

                <td>
                    R$ ${produto.valorUnidade.toFixed(2).replace(".", ",")}
                </td>

                <td>
                    ${produto.quantidadeEstoque} ${produto.unidadeEstoque}
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