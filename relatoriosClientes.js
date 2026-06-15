const relatorioClientes = [
  {
    cliente: "Mariana Oliveira",
    primeiraCompra: "2026-06-01",
    ultimaCompra: "2026-06-12",
    totalCompras: 5,
    faturamento: 720.00,
    ticketMedio: 144.00,
    produtosComprados: 11,
    statusCliente: "ativo",
    tipoCliente: "antigo",
    pedidosRealizados: 5
  },

  {
    cliente: "Carlos Henrique",
    primeiraCompra: "2026-06-01",
    ultimaCompra: "2026-06-07",
    totalCompras: 3,
    faturamento: 350.00,
    ticketMedio: 116.67,
    produtosComprados: 5,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 3
  },

  {
    cliente: "Fernanda Souza",
    primeiraCompra: "2026-06-02",
    ultimaCompra: "2026-06-06",
    totalCompras: 4,
    faturamento: 475.00,
    ticketMedio: 118.75,
    produtosComprados: 8,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 4
  },

  {
    cliente: "Lucas Martins",
    primeiraCompra: "2026-06-02",
    ultimaCompra: "2026-06-02",
    totalCompras: 1,
    faturamento: 0.00,
    ticketMedio: 0.00,
    produtosComprados: 0,
    statusCliente: "inativo",
    tipoCliente: "novo",
    pedidosRealizados: 1
  },

  {
    cliente: "Patrícia Almeida",
    primeiraCompra: "2026-06-03",
    ultimaCompra: "2026-06-08",
    totalCompras: 2,
    faturamento: 45.00,
    ticketMedio: 22.50,
    produtosComprados: 9,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 2
  },

  {
    cliente: "Ricardo Gomes",
    primeiraCompra: "2026-06-03",
    ultimaCompra: "2026-06-09",
    totalCompras: 2,
    faturamento: 225.00,
    ticketMedio: 112.50,
    produtosComprados: 4,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 2
  },

  {
    cliente: "Juliana Costa",
    primeiraCompra: "2026-06-04",
    ultimaCompra: "2026-06-04",
    totalCompras: 1,
    faturamento: 100.00,
    ticketMedio: 100.00,
    produtosComprados: 2,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 1
  },

  {
    cliente: "Eduardo Lima",
    primeiraCompra: "2026-06-04",
    ultimaCompra: "2026-06-04",
    totalCompras: 1,
    faturamento: 0.00,
    ticketMedio: 0.00,
    produtosComprados: 0,
    statusCliente: "inativo",
    tipoCliente: "novo",
    pedidosRealizados: 1
  },

  {
    cliente: "Aline Ferreira",
    primeiraCompra: "2026-06-05",
    ultimaCompra: "2026-06-05",
    totalCompras: 1,
    faturamento: 150.00,
    ticketMedio: 150.00,
    produtosComprados: 3,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 1
  },

  {
    cliente: "Thiago Ribeiro",
    primeiraCompra: "2026-06-05",
    ultimaCompra: "2026-06-05",
    totalCompras: 1,
    faturamento: 50.00,
    ticketMedio: 50.00,
    produtosComprados: 1,
    statusCliente: "ativo",
    tipoCliente: "novo",
    pedidosRealizados: 1
  }
];

/* ======================================= RELATÓRIO CLIENTES ======================================== */

const tabelaClientes = document.querySelector("#tabelaVendas");

const dataInicioClientes = document.querySelector("#dataInicioClientes");
const dataFimClientes = document.querySelector("#dataFimClientes");
const botaoFiltrarClientes = document.querySelector("#botaoFiltrarClientes");
const botaoLimparFiltroClientes = document.querySelector("#botaoLimparFiltroClientes");
const demonstracoesClientes = document.querySelector("#demostracoesClientes");

const canvasClientesMaiorFaturamento = document.querySelector(".graficoClientesMaiorFaturamento");
const canvasEvolucaoTicketMedio = document.querySelector(".graficoEvolucaoTicketMedio");
const canvasFrequenciaCompra = document.querySelector(".graficoMargemContribuicaoReceita");

let graficoClientesMaiorFaturamento;
let graficoEvolucaoTicketMedio;
let graficoFrequenciaCompra;

function formatarMoedaClientes(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarPaginaClientes(dados){
    atualizarDemonstrativosClientes(dados);
    atualizarTabelaClientes(dados);
    atualizarGraficoFrequenciaCompra(dados);
    atualizarGraficoEvolucaoTicketMedio(dados);
    atualizarGraficoClientesMaiorFaturamento(dados);
}

/* DEMONSTRATIVOS */

function atualizarDemonstrativosClientes(dados){

    const clientesAtivos = dados.filter((item) => {
        return item.statusCliente === "ativo";
    }).length;

    const novosClientes = dados.filter((item) => {
        return item.tipoCliente === "novo";
    }).length;

    const pedidosRealizados = dados.reduce((soma, item) => {
        return soma + item.pedidosRealizados;
    }, 0);

    const ticketMedioPeriodo = dados.length > 0
        ? dados.reduce((soma, item) => soma + item.ticketMedio, 0) / dados.length
        : 0;

    demonstracoesClientes.innerHTML = `
        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeUsuariosDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Clientes ativos</span>
                <span class="demoTitulo">${clientesAtivos}</span>
                <span class="demoTextoNormal">Clientes</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeNovoUsuarioDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Novos clientes</span>
                <span class="demoTitulo">${novosClientes}</span>
                <span class="demoTextoNormal">Clientes</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeCarrinhoDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Pedidos realizados</span>
                <span class="demoTitulo">${pedidosRealizados}</span>
                <span class="demoTextoNormal">Pedidos</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeTicketDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Ticket médio geral</span>
                <span class="demoTitulo">R$ ${formatarMoedaClientes(ticketMedioPeriodo)}</span>
                <span class="demoTextoNormal">por cliente</span>
            </div>
        </div>
    `;
}

/* TABELA */

function atualizarTabelaClientes(dados){

    if(!tabelaClientes){
        return;
    }

    const tbodyAntigo = tabelaClientes.querySelector("tbody");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    const tbody = document.createElement("tbody");

    dados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.cliente}</td>
                <td>${item.primeiraCompra.split("-").reverse().join("/")}</td>
                <td>${item.ultimaCompra.split("-").reverse().join("/")}</td>
                <td>${item.totalCompras}</td>
                <td>R$ ${formatarMoedaClientes(item.faturamento)}</td>
                <td>R$ ${formatarMoedaClientes(item.ticketMedio)}</td>
                <td>${item.produtosComprados}</td>
            </tr>
        `;
    });

    tabelaClientes.appendChild(tbody);
}

/* GRÁFICO 1 - FREQUÊNCIA DE COMPRA */

function atualizarGraficoFrequenciaCompra(dados){

    if(graficoFrequenciaCompra){
        graficoFrequenciaCompra.destroy();
    }

    const frequencia = {
        "1 compra": 0,
        "2 a 3 compras": 0,
        "4 ou mais compras": 0
    };

    dados.forEach((item) => {
        if(item.totalCompras === 1){
            frequencia["1 compra"]++;
        } else if(item.totalCompras >= 2 && item.totalCompras <= 3){
            frequencia["2 a 3 compras"]++;
        } else {
            frequencia["4 ou mais compras"]++;
        }
    });

    graficoFrequenciaCompra = new Chart(canvasFrequenciaCompra, {
        type: "pie",

        data: {
            labels: Object.keys(frequencia),

            datasets: [{
                data: Object.values(frequencia),
                backgroundColor: [
                    "#144621",
                    "#2E7D32",
                    "#43A047"
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* GRÁFICO 2 - EVOLUÇÃO DO TICKET MÉDIO */

function atualizarGraficoEvolucaoTicketMedio(dados){

    if(graficoEvolucaoTicketMedio){
        graficoEvolucaoTicketMedio.destroy();
    }

    const dadosOrdenados = [...dados].sort((a, b) => {
        return new Date(a.ultimaCompra) - new Date(b.ultimaCompra);
    });

    graficoEvolucaoTicketMedio = new Chart(canvasEvolucaoTicketMedio, {
        type: "line",

        data: {
            labels: dadosOrdenados.map((item) => {
                return item.ultimaCompra.split("-").reverse().slice(0, 2).join("/");
            }),

            datasets: [{
                label: "Ticket médio",
                data: dadosOrdenados.map((item) => item.ticketMedio),
                borderColor: "#144621",
                backgroundColor: "#144621",
                tension: 0.4,
                fill: false
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* GRÁFICO 3 - TOP 5 CLIENTES COM MAIOR FATURAMENTO */

function atualizarGraficoClientesMaiorFaturamento(dados){

    if(graficoClientesMaiorFaturamento){
        graficoClientesMaiorFaturamento.destroy();
    }

    const topClientes = [...dados]
        .sort((a, b) => b.faturamento - a.faturamento)
        .slice(0, 5);

    graficoClientesMaiorFaturamento = new Chart(canvasClientesMaiorFaturamento, {
        type: "bar",

        data: {
            labels: topClientes.map((item) => item.cliente),

            datasets: [{
                label: "Faturamento",
                data: topClientes.map((item) => item.faturamento),
                backgroundColor: "#144621"
            }]
        },

        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* FILTRO POR PERÍODO */

function filtrarClientes(){

    const inicio = dataInicioClientes.value;
    const fim = dataFimClientes.value;

    const dadosFiltrados = relatorioClientes.filter((item) => {

        if(inicio && fim){
            return item.ultimaCompra >= inicio && item.ultimaCompra <= fim;
        }

        if(inicio){
            return item.ultimaCompra >= inicio;
        }

        if(fim){
            return item.ultimaCompra <= fim;
        }

        return true;
    });

    atualizarPaginaClientes(dadosFiltrados);
}

/* INICIAR */

if(tabelaClientes){

    atualizarPaginaClientes(relatorioClientes);

    botaoFiltrarClientes.addEventListener("click", (event) => {
        event.preventDefault();
        filtrarClientes();
    });

    botaoLimparFiltroClientes.addEventListener("click", (event) => {
        event.preventDefault();

        dataInicioClientes.value = "";
        dataFimClientes.value = "";

        atualizarPaginaClientes(relatorioClientes);
    });
}