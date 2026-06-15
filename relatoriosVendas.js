const vendas = [
  {
    data: "2026-06-01",
    categoria: "blend",
    produto: "Blend Calme Lata",
    imagem: "imagens/blend-calme-lata.png",
    cliente: "Mariana Oliveira",
    quantidadeComprada: 2,
    valorUnitario: 50.00,
    valorTotal: 100.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-02",
    categoria: "blend",
    produto: "Blend Felicitá Lata",
    imagem: "imagens/blend-felicita-lata.png",
    cliente: "Carlos Henrique",
    quantidadeComprada: 1,
    valorUnitario: 50.00,
    valorTotal: 50.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-03",
    categoria: "home spray",
    produto: "Home Spray Ormoni",
    imagem: "imagens/home-spray-ormoni.png",
    cliente: "Fernanda Souza",
    quantidadeComprada: 2,
    valorUnitario: 95.00,
    valorTotal: 190.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-04",
    categoria: "acessório",
    produto: "Infusor",
    imagem: "imagens/infusor.png",
    cliente: "Lucas Martins",
    quantidadeComprada: 3,
    valorUnitario: 25.00,
    valorTotal: 75.00,
    situacao: "cancelada"
  },

  {
    data: "2026-06-05",
    categoria: "sacola",
    produto: "Sacola Chás da Laura",
    imagem: "imagens/sacola-chas-da-laura.png",
    cliente: "Patrícia Almeida",
    quantidadeComprada: 4,
    valorUnitario: 5.00,
    valorTotal: 20.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-06",
    categoria: "kit",
    produto: "Kit Presente Lata + Home Spray",
    imagem: "imagens/kit-presente-lata-home-spray.png",
    cliente: "Ricardo Gomes",
    quantidadeComprada: 1,
    valorUnitario: 150.00,
    valorTotal: 150.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-07",
    categoria: "blend",
    produto: "Blend Ormoni Lata",
    imagem: "imagens/blend-ormoni-lata.png",
    cliente: "Juliana Costa",
    quantidadeComprada: 2,
    valorUnitario: 50.00,
    valorTotal: 100.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-08",
    categoria: "home spray",
    produto: "Home Spray Airmid",
    imagem: "imagens/home-spray-airmid.png",
    cliente: "Eduardo Lima",
    quantidadeComprada: 1,
    valorUnitario: 95.00,
    valorTotal: 95.00,
    situacao: "cancelada"
  },

  {
    data: "2026-06-09",
    categoria: "blend",
    produto: "Blend MaterniTea Lata",
    imagem: "imagens/blend-maternitea-lata.png",
    cliente: "Aline Ferreira",
    quantidadeComprada: 3,
    valorUnitario: 50.00,
    valorTotal: 150.00,
    situacao: "finalizada"
  },

  {
    data: "2026-06-10",
    categoria: "blend",
    produto: "Blend Airmid Lata",
    imagem: "imagens/blend-airmid-lata.png",
    cliente: "Thiago Ribeiro",
    quantidadeComprada: 1,
    valorUnitario: 50.00,
    valorTotal: 50.00,
    situacao: "finalizada"
  }
];


const faturamentoDiario = [
  {
    data: "2026-06-01",
    cliente: "Mariana Oliveira",
    categoria: "blend",
    formaPagamento: "Pix",
    faturamentoDia: 100.00,
    percentualTodo: 12.35,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 100.00,
    itensVendidos: 2,
    cancelamentos: 0
  },

  {
    data: "2026-06-01",
    cliente: "Carlos Henrique",
    categoria: "blend",
    formaPagamento: "Cartão de crédito",
    faturamentoDia: 50.00,
    percentualTodo: 6.17,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 50.00,
    itensVendidos: 1,
    cancelamentos: 0
  },

  {
    data: "2026-06-02",
    cliente: "Fernanda Souza",
    categoria: "home spray",
    formaPagamento: "Pix",
    faturamentoDia: 190.00,
    percentualTodo: 23.46,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 190.00,
    itensVendidos: 2,
    cancelamentos: 0
  },

  {
    data: "2026-06-02",
    cliente: "Lucas Martins",
    categoria: "acessório",
    formaPagamento: "Boleto",
    faturamentoDia: 0.00,
    percentualTodo: 0.00,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 0.00,
    itensVendidos: 0,
    cancelamentos: 1
  },

  {
    data: "2026-06-03",
    cliente: "Patrícia Almeida",
    categoria: "sacola",
    formaPagamento: "Dinheiro",
    faturamentoDia: 20.00,
    percentualTodo: 2.47,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 20.00,
    itensVendidos: 4,
    cancelamentos: 0
  },

  {
    data: "2026-06-03",
    cliente: "Ricardo Gomes",
    categoria: "kit",
    formaPagamento: "Cartão de débito",
    faturamentoDia: 150.00,
    percentualTodo: 18.52,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 150.00,
    itensVendidos: 1,
    cancelamentos: 0
  },

  {
    data: "2026-06-04",
    cliente: "Juliana Costa",
    categoria: "blend",
    formaPagamento: "Pix",
    faturamentoDia: 100.00,
    percentualTodo: 12.35,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 100.00,
    itensVendidos: 2,
    cancelamentos: 0
  },

  {
    data: "2026-06-04",
    cliente: "Eduardo Lima",
    categoria: "home spray",
    formaPagamento: "Cartão de crédito",
    faturamentoDia: 0.00,
    percentualTodo: 0.00,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 0.00,
    itensVendidos: 0,
    cancelamentos: 1
  },

  {
    data: "2026-06-05",
    cliente: "Aline Ferreira",
    categoria: "blend",
    formaPagamento: "Pix",
    faturamentoDia: 150.00,
    percentualTodo: 18.52,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 150.00,
    itensVendidos: 3,
    cancelamentos: 0
  },

  {
    data: "2026-06-05",
    cliente: "Thiago Ribeiro",
    categoria: "blend",
    formaPagamento: "Dinheiro",
    faturamentoDia: 50.00,
    percentualTodo: 6.17,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 50.00,
    itensVendidos: 1,
    cancelamentos: 0
  },

  {
    data: "2026-06-06",
    cliente: "Mariana Oliveira",
    categoria: "blend",
    formaPagamento: "Pix",
    faturamentoDia: 200.00,
    percentualTodo: 24.69,
    pedidosRealizados: 2,
    clientesAtendidos: 1,
    ticketMedio: 100.00,
    itensVendidos: 4,
    cancelamentos: 0
  },

  {
    data: "2026-06-06",
    cliente: "Fernanda Souza",
    categoria: "home spray",
    formaPagamento: "Cartão de crédito",
    faturamentoDia: 95.00,
    percentualTodo: 11.73,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 95.00,
    itensVendidos: 1,
    cancelamentos: 0
  },

  {
    data: "2026-06-07",
    cliente: "Carlos Henrique",
    categoria: "kit",
    formaPagamento: "Pix",
    faturamentoDia: 150.00,
    percentualTodo: 18.52,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 150.00,
    itensVendidos: 1,
    cancelamentos: 0
  },

  {
    data: "2026-06-08",
    cliente: "Patrícia Almeida",
    categoria: "sacola",
    formaPagamento: "Dinheiro",
    faturamentoDia: 25.00,
    percentualTodo: 3.09,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 25.00,
    itensVendidos: 5,
    cancelamentos: 0
  },

  {
    data: "2026-06-09",
    cliente: "Ricardo Gomes",
    categoria: "acessório",
    formaPagamento: "Boleto",
    faturamentoDia: 75.00,
    percentualTodo: 9.26,
    pedidosRealizados: 1,
    clientesAtendidos: 1,
    ticketMedio: 75.00,
    itensVendidos: 3,
    cancelamentos: 0
  }
];

/*===================================== RELATÓRIO DE VENDAS ========================================*/

const tabelaVendas = document.querySelector("#tabelaVendas");

const dataInicioVendas = document.querySelector("#dataInicioVendas");
const dataFimVendas = document.querySelector("#dataFimVendas");
const filtroVendasCategorias = document.querySelector("#filtroVendasCategorias");
const filtroVendasProdutos = document.querySelector("#filtroVendasProdutos");
const botaoFiltrarVendas = document.querySelector("#botaoFiltrarVendas");
const botaoLimparFiltroVendas = document.querySelector("#botaoLimparFiltroVendas");
const demonstracoesVenda = document.querySelector("#demostracoesVenda");

let graficoFaturamentoDiario;
let graficoFaturamentoCategoria;
let graficoVendasFormaPagamento;

function formatarMoedaVendas(valor){
    return valor.toFixed(2).replace(".", ",");
}

/* GERAR OPTIONS DE CATEGORIA E PRODUTO */

function gerarOpcoesVendas(){

    if(!filtroVendasCategorias || !filtroVendasProdutos){
        return;
    }

    const categorias = [];

    vendas.forEach((venda) => {
        if(!categorias.includes(venda.categoria)){
            categorias.push(venda.categoria);
        }
    });

    categorias.forEach((categoria) => {
        filtroVendasCategorias.innerHTML += `
            <option value="${categoria}">${categoria}</option>
        `;
    });

    const produtos = [];

    vendas.forEach((venda) => {
        if(!produtos.includes(venda.produto)){
            produtos.push(venda.produto);
        }
    });

    produtos.forEach((produto) => {
        filtroVendasProdutos.innerHTML += `
            <option value="${produto}">${produto}</option>
        `;
    });
}

/* FILTRAR DADOS */

function filtrarVendas(){

    const inicio = dataInicioVendas.value;
    const fim = dataFimVendas.value;
    const categoriaSelecionada = filtroVendasCategorias.value;
    const produtoSelecionado = filtroVendasProdutos.value;

    const vendasFiltradas = vendas.filter((venda) => {

        const passouData =
            (!inicio || venda.data >= inicio) &&
            (!fim || venda.data <= fim);

        const passouCategoria =
            categoriaSelecionada === "todas" ||
            venda.categoria === categoriaSelecionada;

        const passouProduto =
            produtoSelecionado === "todos" ||
            venda.produto === produtoSelecionado;

        return passouData && passouCategoria && passouProduto;
    });

    const faturamentoFiltrado = faturamentoDiario.filter((item) => {

        const passouData =
            (!inicio || item.data >= inicio) &&
            (!fim || item.data <= fim);

        const passouCategoria =
            categoriaSelecionada === "todas" ||
            item.categoria === categoriaSelecionada;

        return passouData && passouCategoria;
    });

    atualizarPaginaVendas(vendasFiltradas, faturamentoFiltrado);
}

/* ATUALIZAR PÁGINA */

function atualizarPaginaVendas(dadosVendas, dadosFaturamento){

    atualizarDemonstrativosVendas(dadosVendas);
    atualizarTabelaVendas(dadosVendas);
    atualizarGraficoFaturamentoDiario(dadosFaturamento);
    atualizarGraficoFaturamentoCategoria(dadosFaturamento);
    atualizarGraficoFormaPagamento(dadosFaturamento);
}

/* DEMONSTRATIVOS */

function atualizarDemonstrativosVendas(dados){

    const vendasFinalizadas = dados.filter((venda) => venda.situacao === "finalizada");

    const faturamentoTotal = vendasFinalizadas.reduce((soma, venda) => {
        return soma + venda.valorTotal;
    }, 0);

    const totalPedidos = vendasFinalizadas.length;

    const ticketMedio = totalPedidos > 0
        ? faturamentoTotal / totalPedidos
        : 0;

    const produtosVendidos = {};

    vendasFinalizadas.forEach((venda) => {
        if(produtosVendidos[venda.produto]){
            produtosVendidos[venda.produto] += venda.quantidadeComprada;
        } else {
            produtosVendidos[venda.produto] = venda.quantidadeComprada;
        }
    });

    let produtoMaisVendido = "-";
    let maiorQuantidade = 0;

    Object.keys(produtosVendidos).forEach((produto) => {
        if(produtosVendidos[produto] > maiorQuantidade){
            maiorQuantidade = produtosVendidos[produto];
            produtoMaisVendido = produto;
        }
    });

    demonstracoesVenda.innerHTML = `
        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeDinheiroDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Faturamento total</span>
                <span class="demoTitulo">R$ ${formatarMoedaVendas(faturamentoTotal)}</span>
                <span class="demoTextoNormal">Do período selecionado</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeCertoDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Produto mais vendido</span>
                <span class="demoTitulo">${produtoMaisVendido}</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconeCaixaDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Ticket médio</span>
                <span class="demoTitulo">R$ ${formatarMoedaVendas(ticketMedio)}</span>
                <span class="demoTextoNormal">Do período</span>
            </div>
        </div>

        <div class="demo">
            <div class="iconeDemo">
                <span class="iconePranchetaDemo"></span>
            </div>
            <div class="textoDemo">
                <span class="demoSemiTitulo">Pedidos realizados</span>
                <span class="demoTitulo">${totalPedidos}</span>
                <span class="demoTextoNormal">Pedidos finalizados</span>
            </div>
        </div>
    `;
}

/* TABELA */

function atualizarTabelaVendas(dados){

    const tbodyAntigo = tabelaVendas.querySelector("tbody");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    const tbody = document.createElement("tbody");

    dados.forEach((venda) => {
        tbody.innerHTML += `
            <tr>
                <td>${venda.data.split("-").reverse().join("/")}</td>
                <td>${venda.categoria}</td>
                <td>
                    <div class="Produto">
                        <img src="${venda.imagem}" class="fotoProduto" alt="${venda.produto}">
                        <span>${venda.produto}</span>
                    </div>
                </td>
                <td>${venda.quantidadeComprada}</td>
                <td>R$ ${formatarMoedaVendas(venda.valorUnitario)}</td>
                <td>R$ ${formatarMoedaVendas(venda.valorTotal)}</td>
            </tr>
        `;
    });

    tabelaVendas.appendChild(tbody);
}

/* GRÁFICO 1 - FATURAMENTO DIÁRIO */

function atualizarGraficoFaturamentoDiario(dados){

    if(graficoFaturamentoDiario){
        graficoFaturamentoDiario.destroy();
    }

    const ctx = document.querySelector(".graficoFaturamentoDiario");

    graficoFaturamentoDiario = new Chart(ctx, {
        type: "line",

        data: {
            labels: dados.map((item) => {
                return item.data.split("-").reverse().slice(0, 2).join("/");
            }),

            datasets: [{
                label: "Faturamento diário",
                data: dados.map((item) => item.faturamentoDia),
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

/* GRÁFICO 2 - FATURAMENTO POR CATEGORIA */

function atualizarGraficoFaturamentoCategoria(dados){

    if(graficoFaturamentoCategoria){
        graficoFaturamentoCategoria.destroy();
    }

    const categorias = {};

    dados.forEach((item) => {
        if(categorias[item.categoria]){
            categorias[item.categoria] += item.faturamentoDia;
        } else {
            categorias[item.categoria] = item.faturamentoDia;
        }
    });

    const ctx = document.querySelector(".graficoFaturamentoCategoria");

    graficoFaturamentoCategoria = new Chart(ctx, {
        type: "pie",

        data: {
            labels: Object.keys(categorias),

            datasets: [{
                data: Object.values(categorias),
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
            maintainAspectRatio: false
        }
    });
}

/* GRÁFICO 3 - FORMA DE PAGAMENTO */

function atualizarGraficoFormaPagamento(dados){

    if(graficoVendasFormaPagamento){
        graficoVendasFormaPagamento.destroy();
    }

    const pagamentos = {};

    dados.forEach((item) => {
        if(pagamentos[item.formaPagamento]){
            pagamentos[item.formaPagamento] += item.faturamentoDia;
        } else {
            pagamentos[item.formaPagamento] = item.faturamentoDia;
        }
    });

    const ctx = document.querySelector(".graficoVendasFormaPagamento");

    graficoVendasFormaPagamento = new Chart(ctx, {
        type: "bar",

        data: {
            labels: Object.keys(pagamentos),

            datasets: [{
                label: "Faturamento",
                data: Object.values(pagamentos),
                backgroundColor: "#144621"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/* INICIAR */

if(tabelaVendas){

    gerarOpcoesVendas();
    atualizarPaginaVendas(vendas, faturamentoDiario);

    botaoFiltrarVendas.addEventListener("click", (event) => {
        event.preventDefault();
        filtrarVendas();
    });

    botaoLimparFiltroVendas.addEventListener("click", (event) => {
        event.preventDefault();

        dataInicioVendas.value = "";
        dataFimVendas.value = "";
        filtroVendasCategorias.value = "todas";
        filtroVendasProdutos.value = "todos";

        atualizarPaginaVendas(vendas, faturamentoDiario);
    });
}

/*===================================== PRIMEIRO GRAFICO ========================================*/


const tabelaDiario = document.querySelector("#tabelaDiario");
const dataInicioDiario = document.querySelector("#dataInicioDiario");
const dataFimDiario = document.querySelector("#dataFimDiario");
const botaoFiltrarDiario = document.querySelector("#botaoFiltrarDiario");
const botaoLimparFiltroDiario = document.querySelector("#botaoLimparFiltroDiario");
const buscarProdutoDiario = document.querySelector("#buscarProdutoDiario");
const ordenarDiario = document.querySelector("#ordenarDiario");
const botaoBaixarExcelDiario = document.querySelector("#botaoBaixarExcelDiario");
const botaoBaixarPdfDiario = document.querySelector("#botaoBaixarPdfDiario");

let dadosAtuaisDiario = [...faturamentoDiario];

function formatarMoedaDiario(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarTabelaDiario(dados){

    if(!tabelaDiario){
        return;
    }

    const tbodyAntigo = tabelaDiario.querySelector("tbody");
    const tfootAntigo = tabelaDiario.querySelector("tfoot");

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
                <td>${item.data.split("-").reverse().join("/")}</td>
                <td>R$ ${formatarMoedaDiario(item.faturamentoDia)}</td>
                <td>${item.pedidosRealizados}</td>
                <td>R$ ${formatarMoedaDiario(item.ticketMedio)}</td>
                <td>${item.clientesAtendidos}</td>
                <td>${item.itensVendidos}</td>
            </tr>
        `;
    });

    tabelaDiario.appendChild(tbody);

    const faturamentoTotal = dados.reduce((soma, item) => soma + item.faturamentoDia, 0);
    const pedidosTotal = dados.reduce((soma, item) => soma + item.pedidosRealizados, 0);
    const clientesTotal = dados.reduce((soma, item) => soma + item.clientesAtendidos, 0);
    const itensTotal = dados.reduce((soma, item) => soma + item.itensVendidos, 0);

    const ticketMedioPeriodo = pedidosTotal > 0
        ? faturamentoTotal / pedidosTotal
        : 0;

    const tfoot = document.createElement("tfoot");
    tfoot.classList.add("totais");

    tfoot.innerHTML = `
        <tr>
            <th>Totais</th>
            <th>R$ ${formatarMoedaDiario(faturamentoTotal)}</th>
            <th>${pedidosTotal}</th>
            <th>R$ ${formatarMoedaDiario(ticketMedioPeriodo)}</th>
            <th>${clientesTotal}</th>
            <th>${itensTotal}</th>
        </tr>
    `;

    tabelaDiario.appendChild(tfoot);
}

function aplicarBuscaEOrdenacaoDiario(){

    let resultado = [...dadosAtuaisDiario];

    if(buscarProdutoDiario){
        const textoBusca = buscarProdutoDiario.value.toLowerCase();

        if(textoBusca){
            resultado = resultado.filter((item) => {
                return item.categoria.toLowerCase().includes(textoBusca)
                    || item.formaPagamento.toLowerCase().includes(textoBusca)
                    || item.data.includes(textoBusca);
            });
        }
    }

    if(ordenarDiario){
        const tipoOrdenacao = ordenarDiario.value;

        if(tipoOrdenacao === "maiorFaturamento"){
            resultado.sort((a, b) => b.faturamentoDia - a.faturamentoDia);
        }

        if(tipoOrdenacao === "menorFaturamento"){
            resultado.sort((a, b) => a.faturamentoDia - b.faturamentoDia);
        }

        if(tipoOrdenacao === "dataRecente"){
            resultado.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

        if(tipoOrdenacao === "dataLonge"){
            resultado.sort((a, b) => new Date(a.data) - new Date(b.data));
        }

        if(tipoOrdenacao === "maiorTicket"){
            resultado.sort((a, b) => b.ticketMedio - a.ticketMedio);
        }

        if(tipoOrdenacao === "menorTicket"){
            resultado.sort((a, b) => a.ticketMedio - b.ticketMedio);
        }
    }

    atualizarTabelaDiario(resultado);
}

if(tabelaDiario){

    atualizarTabelaDiario(dadosAtuaisDiario);

    if(buscarProdutoDiario){
        buscarProdutoDiario.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoDiario();
        });
    }

    if(ordenarDiario){
        ordenarDiario.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoDiario();
        });
    }

    if(botaoFiltrarDiario){
        botaoFiltrarDiario.addEventListener("click", (event) => {
            event.preventDefault();

            const inicio = dataInicioDiario.value;
            const fim = dataFimDiario.value;

            dadosAtuaisDiario = faturamentoDiario.filter((item) => {

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

            aplicarBuscaEOrdenacaoDiario();
        });
    }

    if(botaoLimparFiltroDiario){
        botaoLimparFiltroDiario.addEventListener("click", (event) => {
            event.preventDefault();

            dataInicioDiario.value = "";
            dataFimDiario.value = "";

            if(buscarProdutoDiario){
                buscarProdutoDiario.value = "";
            }

            dadosAtuaisDiario = [];

            atualizarTabelaDiario([]);
        });
    }

    if(botaoBaixarExcelDiario){
        botaoBaixarExcelDiario.addEventListener("click", () => {
            const workbook = XLSX.utils.table_to_book(tabelaDiario, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-faturamento-diario.xlsx");
        });
    }

    if(botaoBaixarPdfDiario){
        botaoBaixarPdfDiario.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaDiario"
            });

            doc.save("relatorio-faturamento-diario.pdf");
        });
    }
}

/* ===================================== SEGUNDO GRAFICO ========================================== */

const tabelaCategoria = document.querySelector("#tabelaCategoria");
const dataInicioCategoria = document.querySelector("#dataInicioCategoria");
const dataFimCategoria = document.querySelector("#dataFimCategoria");
const botaoFiltrarCategoria = document.querySelector("#botaoFiltrarCategoria");
const botaoLimparFiltroCategoria = document.querySelector("#botaoLimparFiltroCategoria");
const buscarProdutoCategoria = document.querySelector("#buscarProdutoCategoria");
const ordenarCategoria = document.querySelector("#ordenarCategoria");
const botaoBaixarExcelCategoria = document.querySelector("#botaoBaixarExcelCategoria");
const botaoBaixarPdfCategoria = document.querySelector("#botaoBaixarPdfCategoria");

let dadosAtuaisCategoria = [...faturamentoDiario];

function formatarMoedaCategoria(valor){
    return valor.toFixed(2).replace(".", ",");
}

function atualizarTabelaCategoria(dados){

    if(!tabelaCategoria){
        return;
    }

    const tbodyAntigo = tabelaCategoria.querySelector("tbody");
    const tfootAntigo = tabelaCategoria.querySelector("tfoot");

    if(tbodyAntigo){
        tbodyAntigo.remove();
    }

    if(tfootAntigo){
        tfootAntigo.remove();
    }

    let dadosFiltrados = [...dados];

    if(buscarProdutoCategoria){

        const textoBusca = buscarProdutoCategoria.value.toLowerCase();

        if(textoBusca){
            dadosFiltrados = dadosFiltrados.filter((item) => {
                return item.cliente.toLowerCase().includes(textoBusca);
            });
        }
    }

    if(ordenarCategoria){

        const tipoOrdenacao = ordenarCategoria.value;

        if(tipoOrdenacao === "maiorFaturamento"){
            dadosFiltrados.sort((a, b) => b.faturamentoDia - a.faturamentoDia);
        }

        if(tipoOrdenacao === "menorFaturamento"){
            dadosFiltrados.sort((a, b) => a.faturamentoDia - b.faturamentoDia);
        }

        if(tipoOrdenacao === "dataRecente"){
            dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

        if(tipoOrdenacao === "dataLonge"){
            dadosFiltrados.sort((a, b) => new Date(a.data) - new Date(b.data));
        }

        if(tipoOrdenacao === "maiorTicket"){
            dadosFiltrados.sort((a, b) => b.ticketMedio - a.ticketMedio);
        }

        if(tipoOrdenacao === "menorTicket"){
            dadosFiltrados.sort((a, b) => a.ticketMedio - b.ticketMedio);
        }
    }

    const tbody = document.createElement("tbody");

    dadosFiltrados.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.data.split("-").reverse().join("/")}</td>
                <td>${item.cliente}</td>
                <td>R$ ${formatarMoedaCategoria(item.faturamentoDia)}</td>
                <td>${item.pedidosRealizados}</td>
                <td>R$ ${formatarMoedaCategoria(item.ticketMedio)}</td>
                <td>${formatarMoedaCategoria(item.percentualTodo)}%</td>
                <td>${item.itensVendidos}</td>
                <td>${item.clientesAtendidos}</td>
            </tr>
        `;
    });

    tabelaCategoria.appendChild(tbody);

    const faturamentoTotal = dadosFiltrados.reduce((soma, item) => soma + item.faturamentoDia, 0);
    const pedidosTotal = dadosFiltrados.reduce((soma, item) => soma + item.pedidosRealizados, 0);
    const itensTotal = dadosFiltrados.reduce((soma, item) => soma + item.itensVendidos, 0);
    const clientesTotal = dadosFiltrados.reduce((soma, item) => soma + item.clientesAtendidos, 0);

    const ticketMedioTotal = pedidosTotal > 0
        ? faturamentoTotal / pedidosTotal
        : 0;

    const percentualTotal = dadosFiltrados.reduce((soma, item) => soma + item.percentualTodo, 0);

    const tfoot = document.createElement("tfoot");
    tfoot.classList.add("totais");

    tfoot.innerHTML = `
        <tr>
            <th>Totais</th>
            <th>-</th>
            <th>R$ ${formatarMoedaCategoria(faturamentoTotal)}</th>
            <th>${pedidosTotal}</th>
            <th>R$ ${formatarMoedaCategoria(ticketMedioTotal)}</th>
            <th>${formatarMoedaCategoria(percentualTotal)}%</th>
            <th>${itensTotal}</th>
            <th>${clientesTotal}</th>
        </tr>
    `;

    tabelaCategoria.appendChild(tfoot);
}

function aplicarBuscaEOrdenacaoCategoria(){
    atualizarTabelaCategoria(dadosAtuaisCategoria);
}

if(tabelaCategoria){

    atualizarTabelaCategoria(dadosAtuaisCategoria);

    if(buscarProdutoCategoria){
        buscarProdutoCategoria.addEventListener("input", () => {
            aplicarBuscaEOrdenacaoCategoria();
        });
    }

    if(ordenarCategoria){
        ordenarCategoria.addEventListener("change", () => {
            aplicarBuscaEOrdenacaoCategoria();
        });
    }

    if(botaoFiltrarCategoria){
        botaoFiltrarCategoria.addEventListener("click", (event) => {
            event.preventDefault();

            const inicio = dataInicioCategoria.value;
            const fim = dataFimCategoria.value;

            dadosAtuaisCategoria = faturamentoDiario.filter((item) => {

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

            atualizarTabelaCategoria(dadosAtuaisCategoria);
        });
    }

    if(botaoLimparFiltroCategoria){
        botaoLimparFiltroCategoria.addEventListener("click", (event) => {
            event.preventDefault();

            dataInicioCategoria.value = "";
            dataFimCategoria.value = "";

            if(buscarProdutoCategoria){
                buscarProdutoCategoria.value = "";
            }

            if(ordenarCategoria){
                ordenarCategoria.value = "maiorFaturamento";
            }

            dadosAtuaisCategoria = [...faturamentoDiario];

            atualizarTabelaCategoria(dadosAtuaisCategoria);
        });
    }

    if(botaoBaixarExcelCategoria){
        botaoBaixarExcelCategoria.addEventListener("click", () => {
            const workbook = XLSX.utils.table_to_book(tabelaCategoria, {
                sheet: "Relatório"
            });

            XLSX.writeFile(workbook, "relatorio-faturamento-categoria.xlsx");
        });
    }

    if(botaoBaixarPdfCategoria){
        botaoBaixarPdfCategoria.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;

            const doc = new jsPDF();

            doc.autoTable({
                html: "#tabelaCategoria"
            });

            doc.save("relatorio-faturamento-categoria.pdf");
        });
    }
}



/* ======================================= TERCEIRO GRAFICO ====================================== */


