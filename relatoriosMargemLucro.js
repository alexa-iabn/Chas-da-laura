const margemLucroProdutos = [

  {
    data: "2026-06-12",
    colocacao: "1°",
    produto: "Kit Presente Lata + Home Spray",
    receitaGerada: 4500.00,
    custosVariaveis: 1650.00,
    margemContribuicao: 2850.00,
    lucroLiquido: 2400.00,
    margemLucro: 53.33
  },

  {
    data: "2026-06-12",
    colocacao: "2°",
    produto: "Home Spray Airmid",
    receitaGerada: 3980.00,
    custosVariaveis: 1420.00,
    margemContribuicao: 2560.00,
    lucroLiquido: 2180.00,
    margemLucro: 54.77
  },

  {
    data: "2026-06-12",
    colocacao: "3°",
    produto: "Home Spray Ormoni",
    receitaGerada: 3720.00,
    custosVariaveis: 1380.00,
    margemContribuicao: 2340.00,
    lucroLiquido: 2010.00,
    margemLucro: 54.03
  },

  {
    data: "2026-06-12",
    colocacao: "4°",
    produto: "Blend MaterniTea Lata",
    receitaGerada: 3480.00,
    custosVariaveis: 1220.00,
    margemContribuicao: 2260.00,
    lucroLiquido: 1940.00,
    margemLucro: 55.75
  },

  {
    data: "2026-06-12",
    colocacao: "5°",
    produto: "Blend Airmid Lata",
    receitaGerada: 3250.00,
    custosVariaveis: 1160.00,
    margemContribuicao: 2090.00,
    lucroLiquido: 1810.00,
    margemLucro: 55.69
  },

  {
    data: "2026-06-15",
    colocacao: "6°",
    produto: "Blend Chai Masala Lata",
    receitaGerada: 3100.00,
    custosVariaveis: 1120.00,
    margemContribuicao: 1980.00,
    lucroLiquido: 1700.00,
    margemLucro: 54.84
  },

  {
    data: "2026-06-15",
    colocacao: "7°",
    produto: "Blend Calme Lata",
    receitaGerada: 2980.00,
    custosVariaveis: 1080.00,
    margemContribuicao: 1900.00,
    lucroLiquido: 1640.00,
    margemLucro: 55.03
  },

  {
    data: "2026-06-15",
    colocacao: "8°",
    produto: "Blend Felicitá Lata",
    receitaGerada: 2840.00,
    custosVariaveis: 1030.00,
    margemContribuicao: 1810.00,
    lucroLiquido: 1560.00,
    margemLucro: 54.93
  },

  {
    data: "2026-06-15",
    colocacao: "9°",
    produto: "Blend Ormoni Lata",
    receitaGerada: 2690.00,
    custosVariaveis: 980.00,
    margemContribuicao: 1710.00,
    lucroLiquido: 1470.00,
    margemLucro: 54.65
  },

  {
    data: "2026-06-15",
    colocacao: "10°",
    produto: "Blend Animé Lata",
    receitaGerada: 2520.00,
    custosVariaveis: 940.00,
    margemContribuicao: 1580.00,
    lucroLiquido: 1360.00,
    margemLucro: 53.97
  },

  {
    data: "2026-06-15",
    colocacao: "11°",
    produto: "Blend DesintoxiTea Lata",
    receitaGerada: 2380.00,
    custosVariaveis: 910.00,
    margemContribuicao: 1470.00,
    lucroLiquido: 1260.00,
    margemLucro: 52.94
  },

  {
    data: "2026-06-15",
    colocacao: "12°",
    produto: "Blend Amore Lata",
    receitaGerada: 2210.00,
    custosVariaveis: 860.00,
    margemContribuicao: 1350.00,
    lucroLiquido: 1160.00,
    margemLucro: 52.49
  },

  {
    data: "2026-06-15",
    colocacao: "13°",
    produto: "Home Spray Maternitea",
    receitaGerada: 2050.00,
    custosVariaveis: 790.00,
    margemContribuicao: 1260.00,
    lucroLiquido: 1080.00,
    margemLucro: 52.68
  },

  {
    data: "2026-06-15",
    colocacao: "14°",
    produto: "Infusor",
    receitaGerada: 980.00,
    custosVariaveis: 420.00,
    margemContribuicao: 560.00,
    lucroLiquido: 470.00,
    margemLucro: 47.96
  },

  {
    data: "2026-06-15",
    colocacao: "15°",
    produto: "Sacola Chás da Laura",
    receitaGerada: 420.00,
    custosVariaveis: 210.00,
    margemContribuicao: 210.00,
    lucroLiquido: 170.00,
    margemLucro: 40.48
  }

];


const analiseFinanceiraProdutos = [

  {
    data: "2026-06-01",
    produto: "Blend Calme Lata",
    categoria: "blend",
    receitaLiquida: 3200.00,
    custoInsumo: 980.00,
    custoEmbalagem: 180.00,
    custoTotal: 1160.00,
    margemContribuicao: 2040.00,
    lucroLiquido: 1760.00,
    margemLucro: 55.00,
    participacaoReceita: 7.84,
    participacaoMargemContribuicao: 7.91
  },

  {
    data: "2026-06-02",
    produto: "Blend Felicitá Lata",
    categoria: "blend",
    receitaLiquida: 2950.00,
    custoInsumo: 910.00,
    custoEmbalagem: 170.00,
    custoTotal: 1080.00,
    margemContribuicao: 1870.00,
    lucroLiquido: 1620.00,
    margemLucro: 54.92,
    participacaoReceita: 7.22,
    participacaoMargemContribuicao: 7.25
  },

  {
    data: "2026-06-03",
    produto: "Blend Ormoni Lata",
    categoria: "blend",
    receitaLiquida: 2870.00,
    custoInsumo: 900.00,
    custoEmbalagem: 160.00,
    custoTotal: 1060.00,
    margemContribuicao: 1810.00,
    lucroLiquido: 1560.00,
    margemLucro: 54.35,
    participacaoReceita: 7.03,
    participacaoMargemContribuicao: 7.01
  },

  {
    data: "2026-06-04",
    produto: "Blend MaterniTea Lata",
    categoria: "blend",
    receitaLiquida: 3480.00,
    custoInsumo: 1120.00,
    custoEmbalagem: 190.00,
    custoTotal: 1310.00,
    margemContribuicao: 2170.00,
    lucroLiquido: 1880.00,
    margemLucro: 54.02,
    participacaoReceita: 8.52,
    participacaoMargemContribuicao: 8.40
  },

  {
    data: "2026-06-05",
    produto: "Blend Airmid Lata",
    categoria: "blend",
    receitaLiquida: 3300.00,
    custoInsumo: 1050.00,
    custoEmbalagem: 180.00,
    custoTotal: 1230.00,
    margemContribuicao: 2070.00,
    lucroLiquido: 1790.00,
    margemLucro: 54.24,
    participacaoReceita: 8.08,
    participacaoMargemContribuicao: 8.01
  },

  {
    data: "2026-06-06",
    produto: "Blend Chai Masala Lata",
    categoria: "blend",
    receitaLiquida: 3100.00,
    custoInsumo: 1010.00,
    custoEmbalagem: 170.00,
    custoTotal: 1180.00,
    margemContribuicao: 1920.00,
    lucroLiquido: 1660.00,
    margemLucro: 53.55,
    participacaoReceita: 7.59,
    participacaoMargemContribuicao: 7.43
  },

  {
    data: "2026-06-07",
    produto: "Blend DesintoxiTea Lata",
    categoria: "blend",
    receitaLiquida: 2760.00,
    custoInsumo: 890.00,
    custoEmbalagem: 150.00,
    custoTotal: 1040.00,
    margemContribuicao: 1720.00,
    lucroLiquido: 1490.00,
    margemLucro: 53.99,
    participacaoReceita: 6.76,
    participacaoMargemContribuicao: 6.66
  },

  {
    data: "2026-06-08",
    produto: "Blend Animé Lata",
    categoria: "blend",
    receitaLiquida: 2590.00,
    custoInsumo: 840.00,
    custoEmbalagem: 150.00,
    custoTotal: 990.00,
    margemContribuicao: 1600.00,
    lucroLiquido: 1380.00,
    margemLucro: 53.28,
    participacaoReceita: 6.34,
    participacaoMargemContribuicao: 6.20
  },

  {
    data: "2026-06-09",
    produto: "Blend Amore Lata",
    categoria: "blend",
    receitaLiquida: 2480.00,
    custoInsumo: 820.00,
    custoEmbalagem: 145.00,
    custoTotal: 965.00,
    margemContribuicao: 1515.00,
    lucroLiquido: 1310.00,
    margemLucro: 52.82,
    participacaoReceita: 6.07,
    participacaoMargemContribuicao: 5.87
  },

  {
    data: "2026-06-10",
    produto: "Home Spray Ormoni",
    categoria: "home spray",
    receitaLiquida: 4200.00,
    custoInsumo: 1320.00,
    custoEmbalagem: 280.00,
    custoTotal: 1600.00,
    margemContribuicao: 2600.00,
    lucroLiquido: 2250.00,
    margemLucro: 53.57,
    participacaoReceita: 10.28,
    participacaoMargemContribuicao: 10.07
  },

  {
    data: "2026-06-11",
    produto: "Home Spray Maternitea",
    categoria: "home spray",
    receitaLiquida: 3920.00,
    custoInsumo: 1260.00,
    custoEmbalagem: 260.00,
    custoTotal: 1520.00,
    margemContribuicao: 2400.00,
    lucroLiquido: 2080.00,
    margemLucro: 53.06,
    participacaoReceita: 9.59,
    participacaoMargemContribuicao: 9.29
  },

  {
    data: "2026-06-12",
    produto: "Home Spray Airmid",
    categoria: "home spray",
    receitaLiquida: 4050.00,
    custoInsumo: 1290.00,
    custoEmbalagem: 270.00,
    custoTotal: 1560.00,
    margemContribuicao: 2490.00,
    lucroLiquido: 2160.00,
    margemLucro: 53.33,
    participacaoReceita: 9.91,
    participacaoMargemContribuicao: 9.64
  },

  {
    data: "2026-06-13",
    produto: "Kit Presente Lata + Home Spray",
    categoria: "kit",
    receitaLiquida: 4700.00,
    custoInsumo: 1500.00,
    custoEmbalagem: 320.00,
    custoTotal: 1820.00,
    margemContribuicao: 2880.00,
    lucroLiquido: 2480.00,
    margemLucro: 52.77,
    participacaoReceita: 11.51,
    participacaoMargemContribuicao: 11.15
  },

  {
    data: "2026-06-14",
    produto: "Sacola Chás da Laura",
    categoria: "embalagem",
    receitaLiquida: 620.00,
    custoInsumo: 180.00,
    custoEmbalagem: 120.00,
    custoTotal: 300.00,
    margemContribuicao: 320.00,
    lucroLiquido: 260.00,
    margemLucro: 41.94,
    participacaoReceita: 1.52,
    participacaoMargemContribuicao: 1.24
  },

  {
    data: "2026-06-15",
    produto: "Infusor",
    categoria: "acessório",
    receitaLiquida: 1180.00,
    custoInsumo: 410.00,
    custoEmbalagem: 90.00,
    custoTotal: 500.00,
    margemContribuicao: 680.00,
    lucroLiquido: 560.00,
    margemLucro: 47.46,
    participacaoReceita: 2.89,
    participacaoMargemContribuicao: 2.63
  }

];

/* ======================================= RELATÓRIO MARGEM DE LUCRO ======================================== */

const tabelaMargem = document.querySelector("#tabelaMargem");
const dataInicioMargem = document.querySelector("#dataInicioMargem");
const dataFimMargem = document.querySelector("#dataFimMargem");
const botaoFiltrarMargem = document.querySelector("#botaoFiltrarMargem");
const botaoLimparFiltroMargem = document.querySelector("#botaoLimparFiltroMargem");
const demonstracoesMargem = document.querySelector("#demostracoesMargem");

const canvasAnaliseLucratividade = document.querySelector(".graficoAnaliseLucratividade");
const canvasEvolucaoMargemLucro = document.querySelector(".graficoEvolucaoMargemLucro");
const canvasMargemContribuicaoReceita = document.querySelector(".graficoMargemContribuicaoReceita");

let graficoAnaliseLucratividade;
let graficoEvolucaoMargemLucro;
let graficoMargemContribuicaoReceita;

function formatarMoedaMargem(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarPaginaMargem(dados){
    atualizarDemonstrativosMargem(dados);
    atualizarTabelaMargem(dados);
    atualizarGraficoAnaliseLucratividade(dados);
    atualizarGraficoEvolucaoMargemLucro(dados);
    atualizarGraficoMargemContribuicaoReceita(dados);
}

/* DEMONSTRATIVOS */

function atualizarDemonstrativosMargem(dados){

    const receitaBrutaTotal = dados.reduce((soma, item) => {
        return soma + item.receitaGerada;
    }, 0);

    const custosVariaveisTotais = dados.reduce((soma, item) => {
        return soma + item.custosVariaveis;
    }, 0);

    const margemContribuicaoTotal = dados.reduce((soma, item) => {
        return soma + item.margemContribuicao;
    }, 0);

    const mediaMargemLucro = dados.length > 0
        ? dados.reduce((soma, item) => soma + item.margemLucro, 0) / dados.length
        : 0;

    demonstracoesMargem.innerHTML = `
        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeDinheiroDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Receita bruta</span>
                <span class="demoTitulo">R$ ${formatarMoedaMargem(receitaBrutaTotal)}</span>
                <span class="demoTextoNormal">Total do período</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeGraficoRedondoDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Custos variáveis</span>
                <span class="demoTitulo">R$ ${formatarMoedaMargem(custosVariaveisTotais)}</span>
                <span class="demoTextoNormal">Total do período</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeMoedasDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Margem contribuição</span>
                <span class="demoTitulo">R$ ${formatarMoedaMargem(margemContribuicaoTotal)}</span>
                <span class="demoTextoNormal">Total do período</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconePorcentagemDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Margem de lucro</span>
                <span class="demoTitulo">${mediaMargemLucro.toFixed(1).replace(".", ",")}%</span>
                <span class="demoTextoNormal">Média do período</span>
            </div>
        </div>
    `;
}

/* TABELA */

function atualizarTabelaMargem(dados){

    if(!tabelaMargem){
        return;
    }

    const tbodyAntigo = tabelaMargem.querySelector("tbody");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    const tbody = document.createElement("tbody");

    dados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.colocacao}</td>

                <td>
                    <div class="Produto">
                        <span>${item.produto}</span>
                    </div>
                </td>

                <td>R$ ${formatarMoedaMargem(item.receitaGerada)}</td>
                <td>R$ ${formatarMoedaMargem(item.custosVariaveis)}</td>
                <td>R$ ${formatarMoedaMargem(item.margemContribuicao)}</td>
                <td>R$ ${formatarMoedaMargem(item.lucroLiquido)}</td>
                <td>${item.margemLucro.toFixed(1).replace(".", ",")}%</td>
            </tr>
        `;
    });

    tabelaMargem.appendChild(tbody);
}

/* GRÁFICO 1 - MARGEM CONTRIBUIÇÃO E MARGEM LUCRO POR DIA */

function atualizarGraficoAnaliseLucratividade(dados){

    if(graficoAnaliseLucratividade){
        graficoAnaliseLucratividade.destroy();
    }

    graficoAnaliseLucratividade = new Chart(canvasAnaliseLucratividade, {
        type: "line",

        data: {
            labels: dados.map((item) => {
                return item.data.split("-").reverse().slice(0, 2).join("/");
            }),

            datasets: [
                {
                    label: "Margem de contribuição",
                    data: dados.map((item) => item.margemContribuicao),
                    borderColor: "#144621",
                    backgroundColor: "#144621",
                    tension: 0.4,
                    fill: false
                },

                {
                    label: "Margem de lucro (%)",
                    data: dados.map((item) => item.margemLucro),
                    borderColor: "#2E7D32",
                    backgroundColor: "#2E7D32",
                    tension: 0.4,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* GRÁFICO 2 - EVOLUÇÃO DA MARGEM DE LUCRO */

function atualizarGraficoEvolucaoMargemLucro(dados){

    if(graficoEvolucaoMargemLucro){
        graficoEvolucaoMargemLucro.destroy();
    }

    graficoEvolucaoMargemLucro = new Chart(canvasEvolucaoMargemLucro, {
        type: "line",

        data: {
            labels: dados.map((item) => {
                return item.data.split("-").reverse().slice(0, 2).join("/");
            }),

            datasets: [
                {
                    label: "Margem de lucro (%)",
                    data: dados.map((item) => item.margemLucro),
                    borderColor: "#144621",
                    backgroundColor: "#144621",
                    tension: 0.4,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* GRÁFICO 3 - BARRA MARGEM CONTRIBUIÇÃO + LINHA RECEITA */

function atualizarGraficoMargemContribuicaoReceita(dados){

    if(graficoMargemContribuicaoReceita){
        graficoMargemContribuicaoReceita.destroy();
    }

    graficoMargemContribuicaoReceita = new Chart(canvasMargemContribuicaoReceita, {
        data: {
            labels: dados.map((item) => {
                return item.data.split("-").reverse().slice(0, 2).join("/");
            }),

            datasets: [
                {
                    type: "bar",
                    label: "Margem de contribuição",
                    data: dados.map((item) => item.margemContribuicao),
                    backgroundColor: "#2E7D32"
                },

                {
                    type: "line",
                    label: "Receita bruta",
                    data: dados.map((item) => item.receitaGerada),
                    borderColor: "#144621",
                    backgroundColor: "#144621",
                    tension: 0.4,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* FILTRO POR PERÍODO */

function filtrarMargem(){

    const inicio = dataInicioMargem.value;
    const fim = dataFimMargem.value;

    const dadosFiltrados = margemLucroProdutos.filter((item) => {

        if(inicio && fim){
            return item.data >= inicio && item.data <= fim;
        }

        if(inicio){
            return item.data >= inicio;
        }

        if(fim){
            return item.data <= fim;
        }

        return true;
    });

    atualizarPaginaMargem(dadosFiltrados);
}

/* INICIAR */

if(tabelaMargem){

    atualizarPaginaMargem(margemLucroProdutos);

    botaoFiltrarMargem.addEventListener("click", (event) => {
        event.preventDefault();
        filtrarMargem();
    });

    botaoLimparFiltroMargem.addEventListener("click", (event) => {
        event.preventDefault();

        dataInicioMargem.value = "";
        dataFimMargem.value = "";

        atualizarPaginaMargem(margemLucroProdutos);
    });
}


/* ======================================= PRIMEIRO GRAFICO ======================================== */


const tabelaAnalise = document.querySelector("#tabelaAnalise");
const dataInicioAnalise = document.querySelector("#dataInicioAnalise");
const dataFimAnalise = document.querySelector("#dataFimAnalise");
const botaoFiltrarAnalise = document.querySelector("#botaoFiltrarAnalise");
const botaoLimparFiltroAnalise = document.querySelector("#botaoLimparFiltroAnalise");
const buscarProdutoAnalise = document.querySelector("#buscarProdutoAnalise");
const ordenarAnalise = document.querySelector("#OrdenarAnalise");
const botaoBaixarExcelAnalise = document.querySelector("#botaoBaixarExcelAnalise");
const botaoBaixarPdfAnalise = document.querySelector("#botaoBaixarPdfAnalise");

let dadosAtuaisAnalise = [...analiseFinanceiraProdutos];

function formatarMoedaAnalise(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarTabelaAnalise(dados){

    if(!tabelaAnalise){
        return;
    }

    const tbodyAntigo = tabelaAnalise.querySelector("tbody");
    const tfootAntigo = tabelaAnalise.querySelector("tfoot");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    if(tfootAntigo){
        tfootAntigo.remove();
    }

    let dadosFiltrados = [...dados];

    /* BUSCA */

    if(buscarProdutoAnalise){

        const textoBusca = buscarProdutoAnalise.value.toLowerCase();

        if(textoBusca){

            dadosFiltrados = dadosFiltrados.filter((item) => {

                return (
                    item.produto.toLowerCase().includes(textoBusca) ||
                    item.categoria.toLowerCase().includes(textoBusca)
                );

            });

        }

    }

    /* ORDENAÇÃO */

    if(ordenarAnalise){

        const tipoOrdenacao = ordenarAnalise.value;

        if(tipoOrdenacao === "maiorLucroLiquido"){
            dadosFiltrados.sort((a, b) => b.lucroLiquido - a.lucroLiquido);
        }

        if(tipoOrdenacao === "menorLucroLiquido"){
            dadosFiltrados.sort((a, b) => a.lucroLiquido - b.lucroLiquido);
        }

        if(tipoOrdenacao === "dataRecente"){
            dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

        if(tipoOrdenacao === "dataLonge"){
            dadosFiltrados.sort((a, b) => new Date(a.data) - new Date(b.data));
        }

        if(tipoOrdenacao === "maiorCusto"){
            dadosFiltrados.sort((a, b) => b.custoTotal - a.custoTotal);
        }

        if(tipoOrdenacao === "menorCusto"){
            dadosFiltrados.sort((a, b) => a.custoTotal - b.custoTotal);
        }

    }

    /* TBODY */

    const tbody = document.createElement("tbody");

    dadosFiltrados.forEach((item) => {

        tbody.innerHTML += `
            <tr>

                <td>${item.produto}</td>

                <td>${item.categoria}</td>

                <td>R$ ${formatarMoedaAnalise(item.receitaLiquida)}</td>

                <td>R$ ${formatarMoedaAnalise(item.custoInsumo)}</td>

                <td>R$ ${formatarMoedaAnalise(item.custoEmbalagem)}</td>

                <td>R$ ${formatarMoedaAnalise(item.custoTotal)}</td>

                <td>R$ ${formatarMoedaAnalise(item.margemContribuicao)}</td>

                <td>R$ ${formatarMoedaAnalise(item.lucroLiquido)}</td>

                <td>${item.margemLucro.toFixed(2).replace(".", ",")}%</td>

            </tr>
        `;

    });

    tabelaAnalise.appendChild(tbody);

    /* TOTAIS */

    const receitaLiquidaTotal = dadosFiltrados.reduce((soma, item) => {
        return soma + item.receitaLiquida;
    }, 0);

    const custoInsumoTotal = dadosFiltrados.reduce((soma, item) => {
        return soma + item.custoInsumo;
    }, 0);

    const custoEmbalagemTotal = dadosFiltrados.reduce((soma, item) => {
        return soma + item.custoEmbalagem;
    }, 0);

    const custoTotalGeral = dadosFiltrados.reduce((soma, item) => {
        return soma + item.custoTotal;
    }, 0);

    const margemContribuicaoTotal = dadosFiltrados.reduce((soma, item) => {
        return soma + item.margemContribuicao;
    }, 0);

    const lucroLiquidoTotal = dadosFiltrados.reduce((soma, item) => {
        return soma + item.lucroLiquido;
    }, 0);

    const margemLucroMedia = dadosFiltrados.length > 0

        ? dadosFiltrados.reduce((soma, item) => {
            return soma + item.margemLucro;
        }, 0) / dadosFiltrados.length

        : 0;

    /* TFOOT */

    const tfoot = document.createElement("tfoot");

    tfoot.classList.add("totais");

    tfoot.innerHTML = `
        <tr>

            <th>Totais</th>

            <th>--</th>

            <th>R$ ${formatarMoedaAnalise(receitaLiquidaTotal)}</th>

            <th>R$ ${formatarMoedaAnalise(custoInsumoTotal)}</th>

            <th>R$ ${formatarMoedaAnalise(custoEmbalagemTotal)}</th>

            <th>R$ ${formatarMoedaAnalise(custoTotalGeral)}</th>

            <th>R$ ${formatarMoedaAnalise(margemContribuicaoTotal)}</th>

            <th>R$ ${formatarMoedaAnalise(lucroLiquidoTotal)}</th>

            <th>${margemLucroMedia.toFixed(2).replace(".", ",")}%</th>

        </tr>
    `;

    tabelaAnalise.appendChild(tfoot);

}

/* BUSCA E ORDENAÇÃO */

function aplicarBuscaEOrdenacaoAnalise(){
    atualizarTabelaAnalise(dadosAtuaisAnalise);
}

/* INICIAR */

if(tabelaAnalise){

    atualizarTabelaAnalise(dadosAtuaisAnalise);

    /* BUSCAR */

    if(buscarProdutoAnalise){

        buscarProdutoAnalise.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoAnalise();
        });

    }

    /* ORDENAR */

    if(ordenarAnalise){

        ordenarAnalise.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoAnalise();
        });

    }

    /* FILTRAR */

    if(botaoFiltrarAnalise){

        botaoFiltrarAnalise.addEventListener("click", (event) => {

            event.preventDefault();

            const inicio = dataInicioAnalise.value;
            const fim = dataFimAnalise.value;

            dadosAtuaisAnalise = analiseFinanceiraProdutos.filter((item) => {

                if(inicio && fim){
                    return item.data >= inicio && item.data <= fim;
                }

                if(inicio){
                    return item.data >= inicio;
                }

                if(fim){
                    return item.data <= fim;
                }

                return true;

            });

            atualizarTabelaAnalise(dadosAtuaisAnalise);

        });

    }

    /* LIMPAR FILTRO */

    if(botaoLimparFiltroAnalise){

        botaoLimparFiltroAnalise.addEventListener("click", (event) => {

            event.preventDefault();

            dataInicioAnalise.value = "";
            dataFimAnalise.value = "";

            if(buscarProdutoAnalise){
                buscarProdutoAnalise.value = "";
            }

            if(ordenarAnalise){
                ordenarAnalise.value = "maiorLucroLiquido";
            }

            dadosAtuaisAnalise = [...analiseFinanceiraProdutos];

            atualizarTabelaAnalise(dadosAtuaisAnalise);

        });

    }

    /* EXPORTAR EXCEL */

    if(botaoBaixarExcelAnalise){

        botaoBaixarExcelAnalise.addEventListener("click", () => {

            const workbook = XLSX.utils.table_to_book(tabelaAnalise, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-analise-lucratividade.xlsx");

        });

    }

    /* EXPORTAR PDF */

    if(botaoBaixarPdfAnalise){

        botaoBaixarPdfAnalise.addEventListener("click", () => {

            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaAnalise"
            });

            doc.save("relatorio-analise-lucratividade.pdf");

        });

    }

}


/* ======================================= SEGUNDO GRAFICO ======================================== */

const tabelaLucro = document.querySelector("#tabelaLucro");
const dataInicioLucro = document.querySelector("#dataInicioLucro");
const dataFimLucro = document.querySelector("#dataFimLucro");
const botaoFiltrarLucro = document.querySelector("#botaoFiltrarLucro");
const botaoLimparFiltroLucro = document.querySelector("#botaoLimparFiltroLucro");
const buscarProdutoLucro = document.querySelector("#buscarProdutoLucro");
const ordenarLucro = document.querySelector("#OrdenarLucro");
const botaoBaixarExcelLucro = document.querySelector("#botaoBaixarExcelLucro");
const botaoBaixarPdfLucro = document.querySelector("#botaoBaixarPdfLucro");

let dadosAtuaisLucro = [...analiseFinanceiraProdutos];

function formatarMoedaLucro(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarTabelaLucro(dados){

    if(!tabelaLucro){
        return;
    }

    const tbodyAntigo = tabelaLucro.querySelector("tbody");
    const tfootAntigo = tabelaLucro.querySelector("tfoot");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    if(tfootAntigo){
        tfootAntigo.remove();
    }

    let dadosFiltrados = [...dados];

    if(buscarProdutoLucro){

        const textoBusca = buscarProdutoLucro.value.toLowerCase();

        if(textoBusca){
            dadosFiltrados = dadosFiltrados.filter((item) => {
                return (
                    item.produto.toLowerCase().includes(textoBusca) ||
                    item.categoria.toLowerCase().includes(textoBusca)
                );
            });
        }
    }

    if(ordenarLucro){

        const tipoOrdenacao = ordenarLucro.value;

        if(tipoOrdenacao === "maiorcusto"){
            dadosFiltrados.sort((a, b) => b.custoTotal - a.custoTotal);
        }

        if(tipoOrdenacao === "menorcusto"){
            dadosFiltrados.sort((a, b) => a.custoTotal - b.custoTotal);
        }

        if(tipoOrdenacao === "dataRecente"){
            dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

        if(tipoOrdenacao === "dataLonge"){
            dadosFiltrados.sort((a, b) => new Date(a.data) - new Date(b.data));
        }

        if(tipoOrdenacao === "maiorLucro"){
            dadosFiltrados.sort((a, b) => b.lucroLiquido - a.lucroLiquido);
        }

        if(tipoOrdenacao === "menorLucro"){
            dadosFiltrados.sort((a, b) => a.lucroLiquido - b.lucroLiquido);
        }
    }

    const tbody = document.createElement("tbody");

    dadosFiltrados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.data.split("-").reverse().join("/")}</td>
                <td>${item.produto}</td>
                <td>${item.categoria}</td>
                <td>R$ ${formatarMoedaLucro(item.receitaLiquida)}</td>
                <td>R$ ${formatarMoedaLucro(item.custoTotal)}</td>
                <td>R$ ${formatarMoedaLucro(item.margemContribuicao)}</td>
                <td>R$ ${formatarMoedaLucro(item.lucroLiquido)}</td>
                <td>${item.margemLucro.toFixed(2).replace(".", ",")}%</td>
            </tr>
        `;
    });

    tabelaLucro.appendChild(tbody);

    const receitaLiquidaTotal = dadosFiltrados.reduce((soma, item) => soma + item.receitaLiquida, 0);
    const custoTotalGeral = dadosFiltrados.reduce((soma, item) => soma + item.custoTotal, 0);
    const margemContribuicaoTotal = dadosFiltrados.reduce((soma, item) => soma + item.margemContribuicao, 0);
    const lucroLiquidoTotal = dadosFiltrados.reduce((soma, item) => soma + item.lucroLiquido, 0);

    const margemLucroMedia = dadosFiltrados.length > 0
        ? dadosFiltrados.reduce((soma, item) => soma + item.margemLucro, 0) / dadosFiltrados.length
        : 0;

    const tfoot = document.createElement("tfoot");
    tfoot.classList.add("totais");

    tfoot.innerHTML = `
        <tr>
            <th>Totais</th>
            <th>--</th>
            <th>--</th>
            <th>R$ ${formatarMoedaLucro(receitaLiquidaTotal)}</th>
            <th>R$ ${formatarMoedaLucro(custoTotalGeral)}</th>
            <th>R$ ${formatarMoedaLucro(margemContribuicaoTotal)}</th>
            <th>R$ ${formatarMoedaLucro(lucroLiquidoTotal)}</th>
            <th>${margemLucroMedia.toFixed(2).replace(".", ",")}%</th>
        </tr>
    `;

    tabelaLucro.appendChild(tfoot);
}

function aplicarBuscaEOrdenacaoLucro(){
    atualizarTabelaLucro(dadosAtuaisLucro);
}

if(tabelaLucro){

    atualizarTabelaLucro(dadosAtuaisLucro);

    if(buscarProdutoLucro){
        buscarProdutoLucro.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoLucro();
        });
    }

    if(ordenarLucro){
        ordenarLucro.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoLucro();
        });
    }

    if(botaoFiltrarLucro){
        botaoFiltrarLucro.addEventListener("click", (event) => {
            event.preventDefault();

            const inicio = dataInicioLucro.value;
            const fim = dataFimLucro.value;

            dadosAtuaisLucro = analiseFinanceiraProdutos.filter((item) => {

                if(inicio && fim){
                    return item.data >= inicio && item.data <= fim;
                }

                if(inicio){
                    return item.data >= inicio;
                }

                if(fim){
                    return item.data <= fim;
                }

                return true;
            });

            atualizarTabelaLucro(dadosAtuaisLucro);
        });
    }

    if(botaoLimparFiltroLucro){
        botaoLimparFiltroLucro.addEventListener("click", (event) => {
            event.preventDefault();

            dataInicioLucro.value = "";
            dataFimLucro.value = "";

            if(buscarProdutoLucro){
                buscarProdutoLucro.value = "";
            }

            if(ordenarLucro){
                ordenarLucro.value = "maiorcusto";
            }

            dadosAtuaisLucro = [...analiseFinanceiraProdutos];

            atualizarTabelaLucro(dadosAtuaisLucro);
        });
    }

    if(botaoBaixarExcelLucro){
        botaoBaixarExcelLucro.addEventListener("click", () => {
            const workbook = XLSX.utils.table_to_book(tabelaLucro, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-evolucao-margem-lucro.xlsx");
        });
    }

    if(botaoBaixarPdfLucro){
        botaoBaixarPdfLucro.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaLucro"
            });

            doc.save("relatorio-evolucao-margem-lucro.pdf");
        });
    }
}

/* ======================================= TERCEIRO GRAFICO ======================================== */

const tabelaReceita = document.querySelector("#tabelaReceita");
const dataInicioReceita = document.querySelector("#dataInicioReceita");
const dataFimReceita = document.querySelector("#dataFimReceita");
const botaoFiltrarReceita = document.querySelector("#botaoFiltrarReceita");
const botaoLimparFiltroReceita = document.querySelector("#botaoLimparFiltroReceita");
const buscarProdutoReceita = document.querySelector("#buscarProdutoReceita");
const ordenarReceita = document.querySelector("#ordenarReceita");
const botaoBaixarExcelReceita = document.querySelector("#botaoBaixarExcelReceita");
const botaoBaixarPdfReceita = document.querySelector("#botaoBaixarPdfReceita");

let dadosAtuaisReceita = [...analiseFinanceiraProdutos];

function formatarMoedaReceita(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarTabelaReceita(dados){

    if(!tabelaReceita){
        return;
    }

    const tbodyAntigo = tabelaReceita.querySelector("tbody");
    const tfootAntigo = tabelaReceita.querySelector("tfoot");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    if(tfootAntigo){
        tfootAntigo.remove();
    }

    let dadosFiltrados = [...dados];

    if(buscarProdutoReceita){
        const textoBusca = buscarProdutoReceita.value.toLowerCase();

        if(textoBusca){
            dadosFiltrados = dadosFiltrados.filter((item) => {
                return item.produto.toLowerCase().includes(textoBusca) ||
                       item.categoria.toLowerCase().includes(textoBusca);
            });
        }
    }

    if(ordenarReceita){
        const tipoOrdenacao = ordenarReceita.value;

        if(tipoOrdenacao === "maiorFaturamento"){
            dadosFiltrados.sort((a, b) => b.receitaLiquida - a.receitaLiquida);
        }

        if(tipoOrdenacao === "menorFaturamento"){
            dadosFiltrados.sort((a, b) => a.receitaLiquida - b.receitaLiquida);
        }

        if(tipoOrdenacao === "dataRecente"){
            dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

        if(tipoOrdenacao === "dataLonge"){
            dadosFiltrados.sort((a, b) => new Date(a.data) - new Date(b.data));
        }

        if(tipoOrdenacao === "maiorTicket"){
            dadosFiltrados.sort((a, b) => b.margemContribuicao - a.margemContribuicao);
        }

        if(tipoOrdenacao === "menorTicket"){
            dadosFiltrados.sort((a, b) => a.margemContribuicao - b.margemContribuicao);
        }
    }

    const tbody = document.createElement("tbody");

    dadosFiltrados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.data.split("-").reverse().join("/")}</td>
                <td>${item.produto}</td>
                <td>${item.categoria}</td>
                <td>R$ ${formatarMoedaReceita(item.receitaLiquida)}</td>
                <td>R$ ${formatarMoedaReceita(item.custoTotal)}</td>
                <td>R$ ${formatarMoedaReceita(item.margemContribuicao)}</td>
                <td>${item.participacaoReceita.toFixed(2).replace(".", ",")}%</td>
                <td>${item.participacaoMargemContribuicao.toFixed(2).replace(".", ",")}%</td>
            </tr>
        `;
    });

    tabelaReceita.appendChild(tbody);

    const receitaLiquidaTotal = dadosFiltrados.reduce((soma, item) => soma + item.receitaLiquida, 0);
    const custoTotalGeral = dadosFiltrados.reduce((soma, item) => soma + item.custoTotal, 0);
    const margemContribuicaoTotal = dadosFiltrados.reduce((soma, item) => soma + item.margemContribuicao, 0);
    const participacaoReceitaTotal = dadosFiltrados.reduce((soma, item) => soma + item.participacaoReceita, 0);
    const participacaoMargemTotal = dadosFiltrados.reduce((soma, item) => soma + item.participacaoMargemContribuicao, 0);

    const tfoot = document.createElement("tfoot");
    tfoot.classList.add("totais");

    tfoot.innerHTML = `
        <tr>
            <th>Totais</th>
            <th>--</th>
            <th>--</th>
            <th>R$ ${formatarMoedaReceita(receitaLiquidaTotal)}</th>
            <th>R$ ${formatarMoedaReceita(custoTotalGeral)}</th>
            <th>R$ ${formatarMoedaReceita(margemContribuicaoTotal)}</th>
            <th>${participacaoReceitaTotal.toFixed(2).replace(".", ",")}%</th>
            <th>${participacaoMargemTotal.toFixed(2).replace(".", ",")}%</th>
        </tr>
    `;

    tabelaReceita.appendChild(tfoot);
}

function aplicarBuscaEOrdenacaoReceita(){
    atualizarTabelaReceita(dadosAtuaisReceita);
}

if(tabelaReceita){

    atualizarTabelaReceita(dadosAtuaisReceita);

    if(buscarProdutoReceita){
        buscarProdutoReceita.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoReceita();
        });
    }

    if(ordenarReceita){
        ordenarReceita.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoReceita();
        });
    }

    if(botaoFiltrarReceita){
        botaoFiltrarReceita.addEventListener("click", (event) => {
            event.preventDefault();

            const inicio = dataInicioReceita.value;
            const fim = dataFimReceita.value;

            dadosAtuaisReceita = analiseFinanceiraProdutos.filter((item) => {

                if(inicio && fim){
                    return item.data >= inicio && item.data <= fim;
                }

                if(inicio){
                    return item.data >= inicio;
                }

                if(fim){
                    return item.data <= fim;
                }

                return true;
            });

            atualizarTabelaReceita(dadosAtuaisReceita);
        });
    }

    if(botaoLimparFiltroReceita){
        botaoLimparFiltroReceita.addEventListener("click", (event) => {
            event.preventDefault();

            dataInicioReceita.value = "";
            dataFimReceita.value = "";

            if(buscarProdutoReceita){
                buscarProdutoReceita.value = "";
            }

            if(ordenarReceita){
                ordenarReceita.value = "maiorFaturamento";
            }

            dadosAtuaisReceita = [...analiseFinanceiraProdutos];

            atualizarTabelaReceita(dadosAtuaisReceita);
        });
    }

    if(botaoBaixarExcelReceita){
        botaoBaixarExcelReceita.addEventListener("click", () => {
            const workbook = XLSX.utils.table_to_book(tabelaReceita, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-margem-contribuicao-receita.xlsx");
        });
    }

    if(botaoBaixarPdfReceita){
        botaoBaixarPdfReceita.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaReceita"
            });

            doc.save("relatorio-margem-contribuicao-receita.pdf");
        });
    }
}