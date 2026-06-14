/* RELATORIOS VENDAS */

const clientes = [
  {
    nome: "Mariana Oliveira",
    primeiraCompra: "2025-01-15",
    ultimaCompra: "2026-06-10",
    totalCompras: 8,
    faturamento: 1240.00,
    ticketMedio: 155.00,
    quantidadeProdutosComprados: 14
  },

  {
    nome: "Carlos Henrique",
    primeiraCompra: "2025-03-22",
    ultimaCompra: "2026-06-01",
    totalCompras: 5,
    faturamento: 870.00,
    ticketMedio: 174.00,
    quantidadeProdutosComprados: 9
  },

  {
    nome: "Fernanda Souza",
    primeiraCompra: "2025-04-10",
    ultimaCompra: "2026-05-28",
    totalCompras: 11,
    faturamento: 1980.00,
    ticketMedio: 180.00,
    quantidadeProdutosComprados: 20
  },

  {
    nome: "Lucas Martins",
    primeiraCompra: "2025-06-05",
    ultimaCompra: "2026-06-12",
    totalCompras: 3,
    faturamento: 410.00,
    ticketMedio: 136.67,
    quantidadeProdutosComprados: 5
  },

  {
    nome: "Patrícia Almeida",
    primeiraCompra: "2025-02-18",
    ultimaCompra: "2026-05-30",
    totalCompras: 9,
    faturamento: 1520.00,
    ticketMedio: 168.89,
    quantidadeProdutosComprados: 17
  },

  {
    nome: "Ricardo Gomes",
    primeiraCompra: "2025-07-11",
    ultimaCompra: "2026-06-02",
    totalCompras: 6,
    faturamento: 990.00,
    ticketMedio: 165.00,
    quantidadeProdutosComprados: 10
  },

  {
    nome: "Juliana Costa",
    primeiraCompra: "2025-05-09",
    ultimaCompra: "2026-06-09",
    totalCompras: 4,
    faturamento: 620.00,
    ticketMedio: 155.00,
    quantidadeProdutosComprados: 7
  },

  {
    nome: "Eduardo Lima",
    primeiraCompra: "2025-08-14",
    ultimaCompra: "2026-05-25",
    totalCompras: 7,
    faturamento: 1340.00,
    ticketMedio: 191.43,
    quantidadeProdutosComprados: 12
  },

  {
    nome: "Aline Ferreira",
    primeiraCompra: "2025-09-03",
    ultimaCompra: "2026-06-08",
    totalCompras: 10,
    faturamento: 1760.00,
    ticketMedio: 176.00,
    quantidadeProdutosComprados: 18
  },

  {
    nome: "Thiago Ribeiro",
    primeiraCompra: "2025-10-20",
    ultimaCompra: "2026-06-11",
    totalCompras: 2,
    faturamento: 280.00,
    ticketMedio: 140.00,
    quantidadeProdutosComprados: 4
  }
];



const tabelaRelatoriosVendas = document.querySelector('.tabelaRelatoriosVendas')

if(tabelaRelatoriosVendas){
    const tbodyRelatoriosVendas = document.createElement('tbody')

    clientes.forEach((cliente) => {

        tbodyRelatoriosVendas.innerHTML +=`
            <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.primeiraCompra}</td>
                <td>${cliente.ultimaCompra}</td>
                <td>${cliente.totalCompras}</td>
                <td>R$ ${cliente.faturamento.toFixed(2)}</td>
                <td>R$ ${cliente.ticketMedio.toFixed(2)}</td>
                <td>${cliente.quantidadeProdutosComprados}</td>
            </tr>
        
        `
    })
    tabelaRelatoriosVendas.appendChild(tbodyRelatoriosVendas)
}




/* RELATORIOS RECEITA */

const rentabilidadeInsumos = [
  {
    data: "2026-06-01",
    insumo: "Camomila",
    unidadesUtilizadas: 12,
    unidadeMedida: "kg",
    custoTotal: 540.00,
    custoPorUnidade: 45.00,
    margemContribuicao: 38.5,
    rentabilidade: 62.0
  },

  {
    data: "2026-06-02",
    insumo: "Erva-doce",
    unidadesUtilizadas: 9,
    unidadeMedida: "kg",
    custoTotal: 342.00,
    custoPorUnidade: 38.00,
    margemContribuicao: 35.2,
    rentabilidade: 57.4
  },

  {
    data: "2026-06-03",
    insumo: "Hortelã",
    unidadesUtilizadas: 11,
    unidadeMedida: "kg",
    custoTotal: 462.00,
    custoPorUnidade: 42.00,
    margemContribuicao: 40.1,
    rentabilidade: 64.8
  },

  {
    data: "2026-06-04",
    insumo: "Capim-limão",
    unidadesUtilizadas: 8,
    unidadeMedida: "kg",
    custoTotal: 288.00,
    custoPorUnidade: 36.00,
    margemContribuicao: 31.4,
    rentabilidade: 52.3
  },

  {
    data: "2026-06-05",
    insumo: "Chá-preto",
    unidadesUtilizadas: 14,
    unidadeMedida: "kg",
    custoTotal: 812.00,
    custoPorUnidade: 58.00,
    margemContribuicao: 46.7,
    rentabilidade: 71.5
  },

  {
    data: "2026-06-06",
    insumo: "Chá-verde",
    unidadesUtilizadas: 13,
    unidadeMedida: "kg",
    custoTotal: 715.00,
    custoPorUnidade: 55.00,
    margemContribuicao: 44.3,
    rentabilidade: 69.2
  },

  {
    data: "2026-06-07",
    insumo: "Canela em casca",
    unidadesUtilizadas: 7,
    unidadeMedida: "g",
    custoTotal: 196.00,
    custoPorUnidade: 28.00,
    margemContribuicao: 27.8,
    rentabilidade: 49.1
  },

  {
    data: "2026-06-08",
    insumo: "Gengibre desidratado",
    unidadesUtilizadas: 6,
    unidadeMedida: "g",
    custoTotal: 192.00,
    custoPorUnidade: 32.00,
    margemContribuicao: 29.5,
    rentabilidade: 51.6
  },

  {
    data: "2026-06-09",
    insumo: "Hibisco",
    unidadesUtilizadas: 10,
    unidadeMedida: "kg",
    custoTotal: 400.00,
    custoPorUnidade: 40.00,
    margemContribuicao: 36.9,
    rentabilidade: 60.7
  },

  {
    data: "2026-06-10",
    insumo: "Lavanda",
    unidadesUtilizadas: 5,
    unidadeMedida: "g",
    custoTotal: 325.00,
    custoPorUnidade: 65.00,
    margemContribuicao: 48.2,
    rentabilidade: 73.4
  },

  {
    data: "2026-06-11",
    insumo: "Melissa",
    unidadesUtilizadas: 8,
    unidadeMedida: "kg",
    custoTotal: 376.00,
    custoPorUnidade: 47.00,
    margemContribuicao: 37.1,
    rentabilidade: 61.2
  },

  {
    data: "2026-06-12",
    insumo: "Lata para blend",
    unidadesUtilizadas: 20,
    unidadeMedida: "unidades",
    custoTotal: 160.00,
    custoPorUnidade: 8.00,
    margemContribuicao: 18.5,
    rentabilidade: 35.9
  },

  {
    data: "2026-06-13",
    insumo: "Cúrcuma",
    unidadesUtilizadas: 6,
    unidadeMedida: "g",
    custoTotal: 210.00,
    custoPorUnidade: 35.00,
    margemContribuicao: 30.4,
    rentabilidade: 53.0
  },

  {
    data: "2026-06-14",
    insumo: "Cravo-da-índia",
    unidadesUtilizadas: 5,
    unidadeMedida: "g",
    custoTotal: 150.00,
    custoPorUnidade: 30.00,
    margemContribuicao: 28.6,
    rentabilidade: 50.2
  },

  {
    data: "2026-06-15",
    insumo: "Anis-estrelado",
    unidadesUtilizadas: 4,
    unidadeMedida: "g",
    custoTotal: 208.00,
    custoPorUnidade: 52.00,
    margemContribuicao: 42.8,
    rentabilidade: 67.5
  },

  {
    data: "2026-06-16",
    insumo: "Alecrim",
    unidadesUtilizadas: 9,
    unidadeMedida: "kg",
    custoTotal: 387.00,
    custoPorUnidade: 43.00,
    margemContribuicao: 39.6,
    rentabilidade: 63.9
  },

  {
    data: "2026-06-17",
    insumo: "Jasmim",
    unidadesUtilizadas: 3,
    unidadeMedida: "kg",
    custoTotal: 240.00,
    custoPorUnidade: 80.00,
    margemContribuicao: 51.2,
    rentabilidade: 74.8
  },

  {
    data: "2026-06-18",
    insumo: "Pimenta rosa",
    unidadesUtilizadas: 4,
    unidadeMedida: "g",
    custoTotal: 176.00,
    custoPorUnidade: 44.00,
    margemContribuicao: 34.9,
    rentabilidade: 58.7
  },

  {
    data: "2026-06-19",
    insumo: "Rosas secas",
    unidadesUtilizadas: 6,
    unidadeMedida: "kg",
    custoTotal: 420.00,
    custoPorUnidade: 70.00,
    margemContribuicao: 49.5,
    rentabilidade: 72.1
  },

  {
    data: "2026-06-20",
    insumo: "Embalagem kraft",
    unidadesUtilizadas: 30,
    unidadeMedida: "unidades",
    custoTotal: 210.00,
    custoPorUnidade: 7.00,
    margemContribuicao: 19.8,
    rentabilidade: 38.4
  }
];


const evolucaoReceita = [
  {
    data: "2026-06-01",
    insumo: "Camomila",
    categoria: "Flores",
    quantidade: 2,
    unidadeMedida: "kg",
    custoTotal: 90.00,
    valorUnitario: 45.00,
    valorUtilizadoProducao: 90.00,
    receitaGerada: 320.00,
    lucroGerado: 230.00,
    rentabilidade: 71.87
  },

  {
    data: "2026-06-02",
    insumo: "Erva-doce",
    categoria: "Ervas",
    quantidade: 1.5,
    unidadeMedida: "kg",
    custoTotal: 57.00,
    valorUnitario: 38.00,
    valorUtilizadoProducao: 57.00,
    receitaGerada: 280.00,
    lucroGerado: 223.00,
    rentabilidade: 79.64
  },

  {
    data: "2026-06-03",
    insumo: "Hortelã",
    categoria: "Ervas",
    quantidade: 1.8,
    unidadeMedida: "kg",
    custoTotal: 75.60,
    valorUnitario: 42.00,
    valorUtilizadoProducao: 75.60,
    receitaGerada: 350.00,
    lucroGerado: 274.40,
    rentabilidade: 78.40
  },

  {
    data: "2026-06-04",
    insumo: "Capim-limão",
    categoria: "Ervas",
    quantidade: 1.2,
    unidadeMedida: "kg",
    custoTotal: 43.20,
    valorUnitario: 36.00,
    valorUtilizadoProducao: 43.20,
    receitaGerada: 260.00,
    lucroGerado: 216.80,
    rentabilidade: 83.38
  },

  {
    data: "2026-06-05",
    insumo: "Chá-preto",
    categoria: "Chás base",
    quantidade: 2.5,
    unidadeMedida: "kg",
    custoTotal: 145.00,
    valorUnitario: 58.00,
    valorUtilizadoProducao: 145.00,
    receitaGerada: 500.00,
    lucroGerado: 355.00,
    rentabilidade: 71.00
  },

  {
    data: "2026-06-06",
    insumo: "Chá-verde",
    categoria: "Chás base",
    quantidade: 2,
    unidadeMedida: "kg",
    custoTotal: 110.00,
    valorUnitario: 55.00,
    valorUtilizadoProducao: 110.00,
    receitaGerada: 460.00,
    lucroGerado: 350.00,
    rentabilidade: 76.08
  },

  {
    data: "2026-06-07",
    insumo: "Canela em casca",
    categoria: "Especiarias",
    quantidade: 900,
    unidadeMedida: "g",
    custoTotal: 28.00,
    valorUnitario: 28.00,
    valorUtilizadoProducao: 28.00,
    receitaGerada: 180.00,
    lucroGerado: 152.00,
    rentabilidade: 84.44
  },

  {
    data: "2026-06-08",
    insumo: "Gengibre desidratado",
    categoria: "Especiarias",
    quantidade: 850,
    unidadeMedida: "g",
    custoTotal: 32.00,
    valorUnitario: 32.00,
    valorUtilizadoProducao: 32.00,
    receitaGerada: 210.00,
    lucroGerado: 178.00,
    rentabilidade: 84.76
  },

  {
    data: "2026-06-09",
    insumo: "Hibisco",
    categoria: "Flores",
    quantidade: 1.7,
    unidadeMedida: "kg",
    custoTotal: 68.00,
    valorUnitario: 40.00,
    valorUtilizadoProducao: 68.00,
    receitaGerada: 390.00,
    lucroGerado: 322.00,
    rentabilidade: 82.56
  },

  {
    data: "2026-06-10",
    insumo: "Lavanda",
    categoria: "Flores",
    quantidade: 700,
    unidadeMedida: "g",
    custoTotal: 65.00,
    valorUnitario: 65.00,
    valorUtilizadoProducao: 65.00,
    receitaGerada: 300.00,
    lucroGerado: 235.00,
    rentabilidade: 78.33
  }
];

const composicaoReceitaCategoria = [
  {
    data: "2026-06-01",
    categoria: "Ervas",
    receitaGerada: 4250.00,
    participacao: 18.76,
    custoUtilizado: 1420.00,
    lucroGerado: 2830.00,
    rentabilidade: 66.59
  },

  {
    data: "2026-06-02",
    categoria: "Flores",
    receitaGerada: 3180.00,
    participacao: 14.03,
    custoUtilizado: 1120.00,
    lucroGerado: 2060.00,
    rentabilidade: 64.78
  },

  {
    data: "2026-06-03",
    categoria: "Especiarias",
    receitaGerada: 2350.00,
    participacao: 10.37,
    custoUtilizado: 890.00,
    lucroGerado: 1460.00,
    rentabilidade: 62.13
  },

  {
    data: "2026-06-04",
    categoria: "Chás base",
    receitaGerada: 1180.00,
    participacao: 5.21,
    custoUtilizado: 510.00,
    lucroGerado: 670.00,
    rentabilidade: 56.78
  },

  {
    data: "2026-06-05",
    categoria: "Embalagens",
    receitaGerada: 470.00,
    participacao: 2.07,
    custoUtilizado: 160.00,
    lucroGerado: 310.00,
    rentabilidade: 65.96
  },

  {
    data: "2026-06-06",
    categoria: "Ervas",
    receitaGerada: 3980.00,
    participacao: 17.56,
    custoUtilizado: 1330.00,
    lucroGerado: 2650.00,
    rentabilidade: 66.58
  },

  {
    data: "2026-06-07",
    categoria: "Flores",
    receitaGerada: 2870.00,
    participacao: 12.67,
    custoUtilizado: 1010.00,
    lucroGerado: 1860.00,
    rentabilidade: 64.81
  },

  {
    data: "2026-06-08",
    categoria: "Especiarias",
    receitaGerada: 2540.00,
    participacao: 11.21,
    custoUtilizado: 930.00,
    lucroGerado: 1610.00,
    rentabilidade: 63.39
  },

  {
    data: "2026-06-09",
    categoria: "Chás base",
    receitaGerada: 1320.00,
    participacao: 5.83,
    custoUtilizado: 560.00,
    lucroGerado: 760.00,
    rentabilidade: 57.57
  },

  {
    data: "2026-06-10",
    categoria: "Embalagens",
    receitaGerada: 520.00,
    participacao: 2.29,
    custoUtilizado: 180.00,
    lucroGerado: 340.00,
    rentabilidade: 65.38
  }
];



/* DEMONSTRAÇÕES RELATÓRIOS RECEITA */

/* RECEITA MAIS RENTÁVEL */

const receitaMaisRentavel = composicaoReceitaCategoria.reduce((maior, atual) => {

    if(atual.rentabilidade > maior.rentabilidade){
        return atual;
    } else{
        return maior;
    }

});


/* RECEITA TOTAL DO PERÍODO */

const receitaTotalPeriodo = composicaoReceitaCategoria.reduce((acumulador, item) => {

    return acumulador + item.receitaGerada;

}, 0);


/* CUSTO TOTAL DE PRODUÇÃO */

const custoTotalProducao = composicaoReceitaCategoria.reduce((acumulador, item) => {

    return acumulador + item.custoUtilizado;

}, 0);


/* LUCRO BRUTO */

const lucroBruto = composicaoReceitaCategoria.reduce((acumulador, item) => {

    return acumulador + item.lucroGerado;

}, 0);


/* FILTRANDO E DESFILTRANDO */

const dataInicio = document.querySelector("#dataInicio");
const dataFim = document.querySelector("#dataFim");
const botaoFiltrar = document.querySelector("#botaoFiltrarReceita");
const botaoLimparFiltro = document.querySelector("#botaoLimparFiltroReceita");

let graficoReceita;
let graficoComposicao;
let graficoRentabilidade;

if(botaoFiltrar && botaoLimparFiltro && dataInicio && dataFim){

    botaoFiltrar.addEventListener("click", (event) => {
        event.preventDefault();

        const inicio = dataInicio.value;
        const fim = dataFim.value;

        const dadosFiltrados = evolucaoReceita.filter((item) => {

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

        atualizarPaginaReceita(dadosFiltrados);
    });

    botaoLimparFiltro.addEventListener("click", (event) => {
        event.preventDefault();

        dataInicio.value = "";
        dataFim.value = "";

        atualizarPaginaReceita([]);
    });

}

function atualizarPaginaReceita(dados){

    atualizarDemonstrativos(dados);
    atualizarTabelaReceita(dados);
    atualizarGraficoEvolucaoReceita(dados);
    atualizarGraficoComposicao(dados);
    atualizarGraficoRentabilidade(dados);

}


/* ATUALIZANDO OS DEMOSRATIVOS */


function atualizarDemonstrativos(dados){

    const demonstracoes = document.querySelector("#demostracoesReceita");

    const receitaTotal = dados.reduce((soma, item) => soma + item.receitaGerada, 0);
    const custoTotal = dados.reduce((soma, item) => soma + item.custoTotal, 0);
    const lucroBruto = dados.reduce((soma, item) => soma + item.lucroGerado, 0);

    const maisRentavel = dados.length > 0
    ? dados.reduce((maior, atual) => {
        return atual.rentabilidade > maior.rentabilidade ? atual : maior;
    })
    : null;


    demonstracoes.innerHTML = `
        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeSetaCimaDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Destaque do período</span>
                <span class="demoTitulo">${maisRentavel ? maisRentavel.insumo : "-"}</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeDinehiroDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Receita total</span>
                <span class="demoTitulo">R$ ${receitaTotal.toFixed(2)}</span>
                <span class="demoTextoNormal">Do período</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeCarrinhoDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Custo total</span>
                <span class="demoTitulo">R$ ${custoTotal.toFixed(2)}</span>
                <span class="demoTextoNormal">Do período</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeMoedasDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Lucro bruto</span>
                <span class="demoTitulo">R$ ${lucroBruto.toFixed(2)}</span>
                <span class="demoTextoNormal">Do período</span>
            </div>
        </div>
    `;
}

/* ATUALIZANDO A TABELA */

function atualizarTabelaReceita(dados){

    const tabelaReceita = document.querySelector("#tabelaReceita");
    const tbodyAntigo = tabelaReceita.querySelector("tbody");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    const tbody = document.createElement("tbody");

    dados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.insumo}</td>
                <td>${item.quantidade} ${item.unidadeMedida}</td>
                <td>R$ ${item.custoTotal.toFixed(2)}</td>
                <td>R$ ${item.valorUnitario.toFixed(2)}</td>
                <td>R$ ${item.lucroGerado.toFixed(2)}</td>
                <td>${item.rentabilidade.toFixed(1)}%</td>
            </tr>
        `;
    });

    tabelaReceita.appendChild(tbody);
}

/* ATUALIZANDO O GRAFICO 1 */

function atualizarGraficoEvolucaoReceita(dados){

    if(graficoReceita){
        graficoReceita.destroy();
    }

    const ctx = document.querySelector(".graficoEvolucaoReceita");

    graficoReceita = new Chart(ctx, {
        type: "line",

        data: {
            labels: dados.map(item => {
                return item.data.split("-").reverse().slice(0, 2).join("/");
            }),

            datasets: [{
                label: "Receita gerada",
                data: dados.map(item => item.receitaGerada),
                borderColor: "#144621",
                backgroundColor: "#144621",
                tension: 0.4,
                fill: false
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


/* ATUALIZANDO O GRAFICO 2 */


function atualizarGraficoComposicao(dados){

    if(graficoComposicao){
        graficoComposicao.destroy();
    }

    const categorias = {};

    dados.forEach((item) => {
        if(categorias[item.categoria]){
            categorias[item.categoria] += item.receitaGerada;
        } else {
            categorias[item.categoria] = item.receitaGerada;
        }
    });

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    const ctx = document.querySelector(".graficoComposicaoReceita");

    graficoComposicao = new Chart(ctx, {
        type: "pie",

        data: {
            labels: labels,

            datasets: [{
                data: valores,

                backgroundColor: [
                    "#144621",
                    "#1B5E20",
                    "#2E7D32",
                    "#388E3C",
                    "#43A047"
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

/* ATUALIZANDO O GRAFICO 3 */

function atualizarGraficoRentabilidade(dados){

    if(graficoRentabilidade){
        graficoRentabilidade.destroy();
    }

    const mediaRentabilidade = dados.length > 0
        ? dados.reduce((soma, item) => soma + item.rentabilidade, 0) / dados.length
        : 0;

    const restante = 100 - mediaRentabilidade;

    const ctx = document.querySelector(".graficoRentabilidadeMedia");

    graficoRentabilidade = new Chart(ctx, {
        type: "doughnut",

        data: {
            datasets: [{
                data: [mediaRentabilidade, restante],
                backgroundColor: ["#144621", "#E5E7EB"],
                borderWidth: 0
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90,
            circumference: 180,
            cutout: "75%",

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    enabled: false
                }
            }
        }
    });

    const valorRentabilidade = document.querySelector(".valorRentabilidade");

    if(valorRentabilidade){
        valorRentabilidade.textContent = mediaRentabilidade.toFixed(1) + "%";
    }
}

if(document.querySelector('.tabelaReceita')){
    atualizarPaginaReceita(evolucaoReceita);
}





/*===================================== TABELA DO PRIMEIRO GRAFICO ========================================*/

/* ELEMENTOS DA PÁGINA */
const tabelaEvolucao = document.querySelector("#tabelaEvolucao");
const dataInicioEvolucao = document.querySelector("#dataInicioEvolucao");
const dataFimEvolucao = document.querySelector("#dataFimEvolucao");
const botaoFiltrarEvolucao = document.querySelector("#botaoFiltrarEvolucao");
const botaoLimparFiltroEvolucao = document.querySelector("#botaoLimparFiltroEvolucao");
const buscarProdutoEvolucao = document.querySelector("#buscarProdutoEvolucao");
const ordenarEvolucao = document.querySelector("#ordenarEvolucao");
const botaoBaixarExcelEvolucao = document.querySelector("#botaoBaixarExcelEvolucao");
const botaoBaixarPdfEvolucao = document.querySelector("#botaoBaixarPdfEvolucao");

let dadosAtuaisEvolucao = [...rentabilidadeInsumos];


/* FORMATAR VALORES */
function formatarValorEvolucao(valor){
    return valor.toFixed(2).replace(".", ",");
}


/* RENDERIZAR TABELA */
function atualizarTabelaRentabilidade(dados){

    if(!tabelaEvolucao){
        return;
    }

    const tbodyAntigo = tabelaEvolucao.querySelector("tbody");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    const tbody = document.createElement("tbody");

    dados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.data.split("-").reverse().join("/")}</td>
                <td>${item.insumo}</td>
                <td>Insumo</td>
                <td>${item.unidadesUtilizadas}</td>
                <td>${item.unidadeMedida}</td>
                <td>R$ ${formatarValorEvolucao(item.custoTotal)}</td>
                <td>R$ ${formatarValorEvolucao(item.custoPorUnidade)}</td>
                <td>R$ ${formatarValorEvolucao(item.custoTotal)}</td>
                <td>R$ ${formatarValorEvolucao(item.custoTotal + item.margemContribuicao)}</td>
                <td>R$ ${formatarValorEvolucao(item.margemContribuicao)}</td>
                <td>${formatarValorEvolucao(item.rentabilidade)}%</td>
            </tr>
        `;
    });

    tabelaEvolucao.appendChild(tbody);
}



function aplicarBuscaEOrdenacaoComposicao(){

    let resultado = [...dadosAtuaisComposicao];

    if(buscarProdutoComposicao){
        const textoBusca = buscarProdutoComposicao.value.toLowerCase();

        if(textoBusca){
            resultado = resultado.filter((item) => {
                return item.categoria.toLowerCase().includes(textoBusca);
            });
        }
    }

    if(ordenarComposicao){
        const tipoOrdenacao = ordenarComposicao.value;

        if(tipoOrdenacao === "maiorLucro"){
            resultado.sort((a, b) => b.lucroGerado - a.lucroGerado);
        }

        if(tipoOrdenacao === "menorLucro"){
            resultado.sort((a, b) => a.lucroGerado - b.lucroGerado);
        }

        if(tipoOrdenacao === "maiorRentabilidade"){
            resultado.sort((a, b) => b.rentabilidade - a.rentabilidade);
        }

        if(tipoOrdenacao === "menorRentabilidade"){
            resultado.sort((a, b) => a.rentabilidade - b.rentabilidade);
        }
    }

    atualizarTabelaComposicao(resultado);
}


/* INICIAR SOMENTE SE ESTIVER NA PÁGINA DO PRIMEIRO GRÁFICO */
if(tabelaEvolucao){

    atualizarTabelaRentabilidade(dadosAtuaisEvolucao);

    /* BUSCAR ENQUANTO DIGITA */
    if(buscarProdutoEvolucao){

        buscarProdutoEvolucao.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoEvolucao();
        });

    }

    /* FILTRAR POR PERÍODO */
    if(botaoFiltrarEvolucao){

        botaoFiltrarEvolucao.addEventListener("click", (event) => {
            event.preventDefault();

            const inicio = dataInicioEvolucao.value;
            const fim = dataFimEvolucao.value;

            dadosAtuaisEvolucao = rentabilidadeInsumos.filter((item) => {

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

            aplicarBuscaEOrdenacaoEvolucao();
        });

    }

    /* LIMPAR FILTRO */
    if(botaoLimparFiltroEvolucao){

        botaoLimparFiltroEvolucao.addEventListener("click", (event) => {
            event.preventDefault();

            dataInicioEvolucao.value = "";
            dataFimEvolucao.value = "";

            if(buscarProdutoEvolucao){
                buscarProdutoEvolucao.value = "";
            }

            dadosAtuaisEvolucao = [];

            atualizarTabelaRentabilidade([]);
        });

    }

    /* ORDENAR */
    if(ordenarEvolucao){

        ordenarEvolucao.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoEvolucao();
        });

    }

    /* EXPORTAR EXCEL */
    if(botaoBaixarExcelEvolucao){

        botaoBaixarExcelEvolucao.addEventListener("click", () => {

            const workbook = XLSX.utils.table_to_book(tabelaEvolucao, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-evolucao-receita.xlsx");

        });

    }

    /* EXPORTAR PDF */
    if(botaoBaixarPdfEvolucao){

        botaoBaixarPdfEvolucao.addEventListener("click", () => {

            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaEvolucao"
            });

            doc.save("relatorio-evolucao-receita.pdf");

        });

    }

}



/*===================================== TABELA DO SEGUNDO GRAFICO ========================================*/


const tabelaComposicao = document.querySelector("#tabelaComposicao");
const dataInicioComposicao = document.querySelector("#dataInicioComposicao");
const dataFimComposicao = document.querySelector("#dataFimComposicao");
const botaoFiltrarComposicao = document.querySelector("#botaoFiltrarComposicao");
const botaoLimparFiltroComposicao = document.querySelector("#botaoLimparFiltroComposicao");
const buscarProdutoComposicao = document.querySelector("#buscarProdutoComposicao");
const ordenarComposicao = document.querySelector("#ordenarComposicao");
const botaoBaixarExcelComposicao = document.querySelector('#botaoBaixarExcelComposicao');
const botaoBaixarPdfComposicao = document.querySelector('#botaoBaixarPdfComposicao')

let dadosAtuaisComposicao = [...composicaoReceitaCategoria];

function formatarMoeda(valor){
    return valor.toFixed(2).replace(".", ",");
}


function atualizarTabelaComposicao(dados){

    if(!tabelaComposicao){
        return;
    }

    const tbodyAntigo = tabelaComposicao.querySelector("tbody");
    const tfootAntigo = tabelaComposicao.querySelector("tfoot");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    if(tfootAntigo){
        tfootAntigo.remove();
    }

    const tbodyComposicao = document.createElement("tbody");

    dados.forEach((item) => {
        tbodyComposicao.innerHTML += `
            <tr>
                <td>${item.categoria}</td>
                <td>R$ ${formatarMoeda(item.receitaGerada)}</td>
                <td>${formatarMoeda(item.participacao)}%</td>
                <td>R$ ${formatarMoeda(item.custoUtilizado)}</td>
                <td>R$ ${formatarMoeda(item.lucroGerado)}</td>
                <td>${formatarMoeda(item.rentabilidade)}%</td>
            </tr>
        `;
    });

    tabelaComposicao.appendChild(tbodyComposicao);

    const receitaTotalComposicao = dados.reduce((soma, item) => soma + item.receitaGerada, 0);
    const participacaoTotalComposicao = dados.reduce((soma, item) => soma + item.participacao, 0);
    const custoTotalComposicao = dados.reduce((soma, item) => soma + item.custoUtilizado, 0);
    const lucroTotalComposicao = dados.reduce((soma, item) => soma + item.lucroGerado, 0);

    const rentabilidadeMediaComposicao = dados.length > 0
        ? dados.reduce((soma, item) => soma + item.rentabilidade, 0) / dados.length
        : 0;

    const tfootComposicao = document.createElement("tfoot");
    tfootComposicao.classList.add("totais");

    tfootComposicao.innerHTML = `
        <tr>
            <th>Totais</th>
            <th>R$ ${formatarMoeda(receitaTotalComposicao)}</th>
            <th>${formatarMoeda(participacaoTotalComposicao)}%</th>
            <th>R$ ${formatarMoeda(custoTotalComposicao)}</th>
            <th>R$ ${formatarMoeda(lucroTotalComposicao)}</th>
            <th>${formatarMoeda(rentabilidadeMediaComposicao)}%</th>
        </tr>
    `;

    tabelaComposicao.appendChild(tfootComposicao);
}


if(tabelaComposicao){

    atualizarTabelaComposicao(dadosAtuaisComposicao);

    buscarProdutoComposicao.addEventListener("input", () => {
        aplicarBuscaEOrdenacaoComposicao();
    });

    ordenarComposicao.addEventListener("change", () => {
        aplicarBuscaEOrdenacaoComposicao();
    });

    botaoFiltrarComposicao.addEventListener("click", (event) => {
        event.preventDefault();

        const inicio = dataInicioComposicao.value;
        const fim = dataFimComposicao.value;

        dadosAtuaisComposicao = composicaoReceitaCategoria.filter((item) => {

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

        aplicarBuscaEOrdenacaoComposicao();
    });



    botaoLimparFiltroComposicao.addEventListener("click", (event) => {
        event.preventDefault();

        dataInicioComposicao.value = "";
        dataFimComposicao.value = "";
        buscarProdutoComposicao.value = "";

        dadosAtuaisComposicao = [];

        atualizarTabelaComposicao([]);
    });



        /* EXPORTAR EXCEL */
    if(botaoBaixarExcelComposicao){

        botaoBaixarExcelComposicao.addEventListener("click", () => {

            const workbookComposicao = XLSX.utils.table_to_book(tabelaComposicao, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbookComposicao, "relatorio-composicao-receita.xlsx");

        });

    }


    /* EXPORTAR PDF */
    if(botaoBaixarPdfComposicao){

        botaoBaixarPdfComposicao.addEventListener("click", () => {

            const { jsPDF } = window.jspdf;

            const docComposicao = new jsPDF();

            docComposicao.autoTable({
                html: "#tabelaComposicao"
            });

            docComposicao.save("relatorio-composicao-receita.pdf");

        });

    }

}


/*===================================== TABELA DO TERCEIRO GRAFICO ========================================*/

/*===================================== TABELA RENTABILIDADE MÉDIA ========================================*/

const tabelaRentabilidade = document.querySelector("#tabelaRentabilidade");
const dataInicioRentabilidade = document.querySelector("#dataInicioRentabilidade");
const dataFimRentabilidade = document.querySelector("#dataFimRentabilidade");
const botaoFiltrarRentabilidade = document.querySelector("#botaoFiltrarRentabilidade");
const botaoLimparFiltroRentabilidade = document.querySelector("#botaoLimparFiltroRentabilidade");
const buscarProdutoRentabilidade = document.querySelector("#buscarProdutoRentabilidade");
const ordenarRentabilidade = document.querySelector("#ordenarRentabilidade");
const botaoBaixarExcelRentabilidade = document.querySelector("#botaoBaixarExcelRentabilidade");
const botaoBaixarPdfRentabilidade = document.querySelector("#botaoBaixarPdfRentabilidade");

let dadosAtuaisRentabilidade = [...rentabilidadeInsumos];

function formatarMoedaRentabilidade(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarTabelaRentabilidadeMedia(dados){

    if(!tabelaRentabilidade){
        return;
    }

    const tbodyAntigo = tabelaRentabilidade.querySelector("tbody");
    const tfootAntigo = tabelaRentabilidade.querySelector("tfoot");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    if(tfootAntigo){
        tfootAntigo.remove();
    }

    const tbody = document.createElement("tbody");

    dados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.insumo}</td>
                <td>R$ ${formatarMoedaRentabilidade(item.custoTotal + item.margemContribuicao)}</td>
                <td>R$ ${formatarMoedaRentabilidade(item.custoTotal)}</td>
                <td>R$ ${formatarMoedaRentabilidade(item.margemContribuicao)}</td>
                <td>${formatarMoedaRentabilidade(item.rentabilidade)}%</td>
            </tr>
        `;
    });

    tabelaRentabilidade.appendChild(tbody);

    const receitaTotal = dados.reduce((soma, item) => soma + (item.custoTotal + item.margemContribuicao), 0);
    const custoTotal = dados.reduce((soma, item) => soma + item.custoTotal, 0);
    const lucroTotal = dados.reduce((soma, item) => soma + item.margemContribuicao, 0);

    const rentabilidadeMedia = dados.length > 0
        ? dados.reduce((soma, item) => soma + item.rentabilidade, 0) / dados.length
        : 0;

    const tfoot = document.createElement("tfoot");
    tfoot.classList.add("totais");

    tfoot.innerHTML = `
        <tr>
            <th>Totais</th>
            <th>R$ ${formatarMoedaRentabilidade(receitaTotal)}</th>
            <th>R$ ${formatarMoedaRentabilidade(custoTotal)}</th>
            <th>R$ ${formatarMoedaRentabilidade(lucroTotal)}</th>
            <th>${formatarMoedaRentabilidade(rentabilidadeMedia)}%</th>
        </tr>
    `;

    tabelaRentabilidade.appendChild(tfoot);
}

function aplicarBuscaEOrdenacaoRentabilidade(){

    let resultado = [...dadosAtuaisRentabilidade];

    if(buscarProdutoRentabilidade){
        const textoBusca = buscarProdutoRentabilidade.value.toLowerCase();

        if(textoBusca){
            resultado = resultado.filter((item) => {
                return item.insumo.toLowerCase().includes(textoBusca);
            });
        }
    }

    if(ordenarRentabilidade){
        const tipoOrdenacao = ordenarRentabilidade.value;

        if(tipoOrdenacao === "maiorLucro"){
            resultado.sort((a, b) => b.margemContribuicao - a.margemContribuicao);
        }

        if(tipoOrdenacao === "menorLucro"){
            resultado.sort((a, b) => a.margemContribuicao - b.margemContribuicao);
        }

        if(tipoOrdenacao === "maiorRentabilidade"){
            resultado.sort((a, b) => b.rentabilidade - a.rentabilidade);
        }

        if(tipoOrdenacao === "menorRentabilidade"){
            resultado.sort((a, b) => a.rentabilidade - b.rentabilidade);
        }
    }

    atualizarTabelaRentabilidadeMedia(resultado);
}

if(tabelaRentabilidade){

    atualizarTabelaRentabilidadeMedia(dadosAtuaisRentabilidade);

    if(buscarProdutoRentabilidade){
        buscarProdutoRentabilidade.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoRentabilidade();
        });
    }

    if(ordenarRentabilidade){
        ordenarRentabilidade.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoRentabilidade();
        });
    }

    if(botaoFiltrarRentabilidade){
        botaoFiltrarRentabilidade.addEventListener("click", (event) => {
            event.preventDefault();

            const inicio = dataInicioRentabilidade.value;
            const fim = dataFimRentabilidade.value;

            dadosAtuaisRentabilidade = rentabilidadeInsumos.filter((item) => {

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

            aplicarBuscaEOrdenacaoRentabilidade();
        });
    }

    if(botaoLimparFiltroRentabilidade){
        botaoLimparFiltroRentabilidade.addEventListener("click", (event) => {
            event.preventDefault();

            dataInicioRentabilidade.value = "";
            dataFimRentabilidade.value = "";

            if(buscarProdutoRentabilidade){
                buscarProdutoRentabilidade.value = "";
            }

            dadosAtuaisRentabilidade = [];

            atualizarTabelaRentabilidadeMedia([]);
        });
    }

    if(botaoBaixarExcelRentabilidade){
        botaoBaixarExcelRentabilidade.addEventListener("click", () => {
            const workbook = XLSX.utils.table_to_book(tabelaRentabilidade, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-rentabilidade-media.xlsx");
        });
    }

    if(botaoBaixarPdfRentabilidade){
        botaoBaixarPdfRentabilidade.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaRentabilidade"
            });

            doc.save("relatorio-rentabilidade-media.pdf");
        });
    }
}