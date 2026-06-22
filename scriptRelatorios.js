/* ================= RELATÓRIO ESTOQUE ================= */

const tabelaEstoque = document.querySelector(".tabelaRelatorioEstoque");
const demonstracoesEstoque = document.querySelector(".demostracoes");

const dataInicioEstoque = document.querySelectorAll(".campoData")[0];
const dataFimEstoque = document.querySelectorAll(".campoData")[1];
const selectCategoriaEstoque = document.querySelector(".conteinerFiltros select");

const botaoFiltrarEstoque = document.querySelector(".botaoFiltrar");
const botaoLimparFiltroEstoque = document.querySelector(".botaoLimparFiltro");

const canvasValorEstoqueTipo = document.querySelector(".graficoValorEstoqueTipo");
const canvasSituacaoEstoque = document.querySelector(".graficoSituacaoEstoque");
const canvasEntradasSaidasEstoque = document.querySelector(".graficoEntradasSaidasEstoque");

let graficoValorEstoqueTipo;
let graficoSituacaoEstoque;
let graficoEntradasSaidasEstoque;

if(tabelaEstoque){

    function pegarProdutos(){
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function pegarInsumos(){
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function numero(valor){
        return Number(String(valor || 0).replace(",", ".")) || 0;
    }

    function moeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function montarEstoque(){
        const produtos = pegarProdutos().map(produto => {
            const quantidade = numero(produto.quantidade || produto.quantidadeEstoque);
            const valorUnitario = numero(produto.valorUnitario || produto.precoVenda || produto.valorUnidade);
            const minimo = numero(produto.estoqueMinimo);

            return {
                tipo: "Produto",
                item: produto.nome,
                estoqueAtual: quantidade,
                unidade: produto.unidadeEstoque || "un",
                estoqueMinimo: minimo,
                valorUnitario,
                valorTotal: quantidade * valorUnitario,
                data: produto.criadoEm || "",
                situacao: definirSituacao(quantidade, minimo)
            };
        });

        const insumos = pegarInsumos().map(insumo => {
            const quantidade = numero(insumo.quantidade);
            const valorUnitario = numero(insumo.valor);
            const minimo = numero(insumo.estoqueMinimo);

            return {
                tipo: "Insumo",
                item: insumo.nome,
                estoqueAtual: quantidade,
                unidade: insumo.unidade || "",
                estoqueMinimo: minimo,
                valorUnitario,
                valorTotal: quantidade * valorUnitario,
                data: insumo.criadoEm || "",
                situacao: definirSituacao(quantidade, minimo)
            };
        });

        return [...produtos, ...insumos];
    }

    function definirSituacao(quantidade, minimo){
        if(quantidade <= 0){
            return "Zerado";
        }

        if(quantidade <= minimo){
            return "Estoque baixo";
        }

        return "Normal";
    }

    function formatarData(data){
        if(!data) return "";

        if(data.includes("/")){
            return data;
        }

        return data;
    }

    function atualizarPaginaEstoque(dados){
        atualizarDemonstrativosEstoque(dados);
        atualizarTabelaEstoque(dados);
        atualizarGraficoValorEstoqueTipo(dados);
        atualizarGraficoSituacaoEstoque(dados);
        atualizarGraficoEntradasSaidasEstoque(dados);
    }

    function atualizarDemonstrativosEstoque(dados){
        const valorTotal = dados.reduce((soma, item) => soma + item.valorTotal, 0);

        const estoqueBaixo = dados.filter(item => item.situacao === "Estoque baixo").length;
        const zerados = dados.filter(item => item.situacao === "Zerado").length;
        const totalItens = dados.length;

        demonstracoesEstoque.innerHTML = `
            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeCaixaDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Valor total em estoque</span>
                    <span class="demoTitulo">${moeda(valorTotal)}</span>
                    <span class="demoTextoNormal">valor de custo</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeAvisoDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Itens com estoque baixo</span>
                    <span class="demoTitulo">${estoqueBaixo}</span>
                    <span class="demoTextoNormal">Itens</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeXDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Itens sem estoque</span>
                    <span class="demoTitulo">${zerados}</span>
                    <span class="demoTextoNormal">Itens</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeCaixaDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Total de itens</span>
                    <span class="demoTitulo">${totalItens}</span>
                    <span class="demoTextoNormal">Produtos e insumos</span>
                </div>
            </div>
        `;
    }

    function atualizarTabelaEstoque(dados){
        const tbodyAntigo = tabelaEstoque.querySelector("tbody");

        if(tbodyAntigo){
            tbodyAntigo.remove();
        }

        const tbody = document.createElement("tbody");

        dados.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td>${item.tipo}</td>
                    <td>${item.item}</td>
                    <td>${item.estoqueAtual} ${item.unidade}</td>
                    <td>${item.estoqueMinimo} ${item.unidade}</td>
                    <td>${moeda(item.valorUnitario)}</td>
                    <td>${moeda(item.valorTotal)}</td>
                    <td>${item.situacao}</td>
                </tr>
            `;
        });

        tabelaEstoque.appendChild(tbody);
    }

    function atualizarGraficoValorEstoqueTipo(dados){
        if(graficoValorEstoqueTipo){
            graficoValorEstoqueTipo.destroy();
        }

        const valorProdutos = dados
            .filter(item => item.tipo === "Produto")
            .reduce((soma, item) => soma + item.valorTotal, 0);

        const valorInsumos = dados
            .filter(item => item.tipo === "Insumo")
            .reduce((soma, item) => soma + item.valorTotal, 0);

        graficoValorEstoqueTipo = new Chart(canvasValorEstoqueTipo, {
            type: "pie",
            data: {
                labels: ["Produtos", "Insumos"],
                datasets: [{
                    data: [valorProdutos, valorInsumos],
                    backgroundColor: ["#144621", "#43A047"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function atualizarGraficoSituacaoEstoque(dados){
        if(graficoSituacaoEstoque){
            graficoSituacaoEstoque.destroy();
        }

        const normal = dados.filter(item => item.situacao === "Normal").length;
        const baixo = dados.filter(item => item.situacao === "Estoque baixo").length;
        const zerado = dados.filter(item => item.situacao === "Zerado").length;

        graficoSituacaoEstoque = new Chart(canvasSituacaoEstoque, {
            type: "doughnut",
            data: {
                labels: ["Normal", "Estoque baixo", "Zerado"],
                datasets: [{
                    data: [normal, baixo, zerado],
                    backgroundColor: ["#144621", "#F9A825", "#C62828"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function atualizarGraficoEntradasSaidasEstoque(dados){
        if(graficoEntradasSaidasEstoque){
            graficoEntradasSaidasEstoque.destroy();
        }

        const produtos = dados.filter(item => item.tipo === "Produto").length;
        const insumos = dados.filter(item => item.tipo === "Insumo").length;

        graficoEntradasSaidasEstoque = new Chart(canvasEntradasSaidasEstoque, {
            type: "bar",
            data: {
                labels: ["Produtos", "Insumos"],
                datasets: [{
                    label: "Quantidade de itens",
                    data: [produtos, insumos],
                    backgroundColor: "#144621"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function filtrarEstoque(){
        let dados = montarEstoque();

        const categoria = selectCategoriaEstoque.value.toLowerCase();

        if(categoria === "produtos"){
            dados = dados.filter(item => item.tipo === "Produto");
        }

        if(categoria === "insumos"){
            dados = dados.filter(item => item.tipo === "Insumo");
        }

        atualizarPaginaEstoque(dados);
    }

    botaoFiltrarEstoque.addEventListener("click", (event) => {
        event.preventDefault();
        filtrarEstoque();
    });

    botaoLimparFiltroEstoque.addEventListener("click", (event) => {
        event.preventDefault();

        if(dataInicioEstoque) dataInicioEstoque.value = "";
        if(dataFimEstoque) dataFimEstoque.value = "";
        if(selectCategoriaEstoque) selectCategoriaEstoque.selectedIndex = 0;

        atualizarPaginaEstoque(montarEstoque());
    });

    atualizarPaginaEstoque(montarEstoque());
}


/* ================= RELATÓRIO PRODUÇÃO ================= */

const tabelaProducao = document.querySelector(".tabelaRelatorioProducao");
const demonstracoesProducao = document.querySelector("#demostracoesProducao");

const dataInicioProducao = document.querySelector("#dataInicioProducao");
const dataFimProducao = document.querySelector("#dataFimProducao");
const filtroProdutoProducao = document.querySelector("#filtroProdutoProducao");
const filtroStatusProducao = document.querySelector("#filtroStatusProducao");

const botaoFiltrarProducao = document.querySelector("#botaoFiltrarProducao");
const botaoLimparFiltroProducao = document.querySelector("#botaoLimparFiltroProducao");

const canvasProducaoSemanal = document.querySelector(".graficoProducaoSemanal");
const canvasProdutosMaisProduzidos = document.querySelector(".graficoProdutosMaisProduzidos");
const canvasConsumoInsumos = document.querySelector(".graficoConsumoInsumos");

let graficoProducaoSemanal;
let graficoProdutosMaisProduzidos;
let graficoConsumoInsumos;

if(tabelaProducao){

    function pegarProducoes(){
        return JSON.parse(localStorage.getItem("producoes")) ||
               JSON.parse(localStorage.getItem("producao")) ||
               [];
    }

    function pegarProdutos(){
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function pegarReceitas(){
        return JSON.parse(localStorage.getItem("receitas")) || [];
    }

    function pegarInsumos(){
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function numero(valor){
        return Number(String(valor || 0).replace("R$", "").replace(",", ".").trim()) || 0;
    }

    function moeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function formatarData(data){
        if(!data) return "--/--/----";

        if(String(data).includes("/")){
            return data;
        }

        return String(data).split("-").reverse().join("/");
    }

    function carregarProdutosFiltro(){
        const produtos = pegarProdutos();

        filtroProdutoProducao.innerHTML = `<option>Todos os produtos</option>`;

        produtos.forEach(produto => {
            filtroProdutoProducao.innerHTML += `
                <option value="${produto.nome}">
                    ${produto.nome}
                </option>
            `;
        });
    }

    function buscarProdutoDaProducao(producao){
        const produtos = pegarProdutos();

        return produtos.find(produto =>
            String(produto.id) === String(producao.produto) ||
            String(produto.id) === String(producao.produtoId) ||
            String(produto.nome).toLowerCase() === String(producao.produto || producao.nomeProduto || "").toLowerCase()
        );
    }

    function buscarReceitaDaProducao(producao, produto){
        const receitas = pegarReceitas();

        return receitas.find(receita =>
            String(receita.id) === String(producao.receita) ||
            String(receita.id) === String(producao.receitaId) ||
            String(receita.id) === String(produto?.receita) ||
            String(receita.produto).toLowerCase() === String(produto?.nome || producao.produto || producao.nomeProduto || "").toLowerCase()
        );
    }

    function buscarInsumo(nome){
        return pegarInsumos().find(insumo =>
            String(insumo.nome || "").toLowerCase().trim() ===
            String(nome || "").toLowerCase().trim()
        );
    }

    function converterQuantidade(quantidade, unidadeReceita, unidadeInsumo){
        const qtd = numero(quantidade);
        const unidadeUso = String(unidadeReceita || "").toLowerCase();
        const unidadeBase = String(unidadeInsumo || "").toLowerCase();

        if(unidadeUso === unidadeBase) return qtd;

        if(unidadeUso === "g" && unidadeBase === "kg") return qtd / 1000;
        if(unidadeUso === "kg" && unidadeBase === "g") return qtd * 1000;

        if(unidadeUso === "ml" && unidadeBase === "l") return qtd / 1000;
        if(unidadeUso === "l" && unidadeBase === "ml") return qtd * 1000;

        return qtd;
    }

    function calcularCustoReceita(receita){
        if(!receita || !receita.insumos) return 0;

        if(numero(receita.custoTotalReceita) > 0){
            return numero(receita.custoTotalReceita);
        }

        let total = 0;

        receita.insumos.forEach(item => {
            const nomeInsumo = item.insumo || item.nome || item.nomeInsumo;
            const insumoCadastrado = buscarInsumo(nomeInsumo);

            if(!insumoCadastrado) return;

            const quantidadeConvertida = converterQuantidade(
                item.quantidade,
                item.unidade,
                insumoCadastrado.unidade
            );

            total += quantidadeConvertida * numero(insumoCadastrado.valor);
        });

        return total;
    }

    function calcularCustoUnitarioReceita(receita){
        if(!receita) return 0;

        if(numero(receita.custoUnitarioReceita) > 0){
            return numero(receita.custoUnitarioReceita);
        }

        const custoTotal = calcularCustoReceita(receita);
        const rendimento = numero(receita.rendimento) || 1;

        return custoTotal / rendimento;
    }

    function calcularInsumosConsumidos(receita, quantidadeProduzida){
        if(!receita || !receita.insumos) return [];

        const rendimento = numero(receita.rendimento) || 1;
        const fatorProducao = numero(quantidadeProduzida) / rendimento;

        return receita.insumos.map(item => {
            return {
                nome: item.insumo || item.nome || item.nomeInsumo || "Insumo",
                quantidade: numero(item.quantidade) * fatorProducao,
                unidade: item.unidade || ""
            };
        });
    }

    function montarDadosProducao(){
        return pegarProducoes().map(producao => {
            const produto = buscarProdutoDaProducao(producao);
            const receita = buscarReceitaDaProducao(producao, produto);

            const quantidadeProduzida = numero(
                producao.quantidadeProduzida ||
                producao.quantidade ||
                producao.totalProduzido
            );

            const custoUnitario = calcularCustoUnitarioReceita(receita);
            const custoTotal = custoUnitario * quantidadeProduzida;

            return {
                data: producao.dataProducao || producao.data || producao.criadoEm || "",
                produto: produto?.nome || producao.nomeProduto || producao.produto || "Produto não informado",
                quantidade: quantidadeProduzida,
                receita: receita?.produto || produto?.nomeReceita || producao.receita || "Receita não informada",
                custoTotal,
                responsavel: producao.responsavel || "Laura",
                status: producao.status || "Finalizada",
                insumosConsumidos: calcularInsumosConsumidos(receita, quantidadeProduzida)
            };
        });
    }

    function agruparInsumosConsumidos(dados){
        const consumo = {};

        dados.forEach(item => {
            item.insumosConsumidos.forEach(insumo => {
                const chave = `${insumo.nome} (${insumo.unidade})`;

                consumo[chave] = (consumo[chave] || 0) + numero(insumo.quantidade);
            });
        });

        return consumo;
    }

    function textoTotalInsumos(consumo){
        const nomes = Object.keys(consumo);

        if(nomes.length === 0){
            return "0";
        }

        return nomes.length;
    }

    function atualizarPaginaProducao(dados){
        atualizarDemonstrativosProducao(dados);
        atualizarTabelaProducao(dados);
        atualizarGraficoProducaoSemanal(dados);
        atualizarGraficoProdutosMaisProduzidos(dados);
        atualizarGraficoConsumoInsumos(dados);
    }

    function atualizarDemonstrativosProducao(dados){
        const producaoTotal = dados.reduce((soma, item) => soma + item.quantidade, 0);
        const produtosDiferentes = new Set(dados.map(item => item.produto)).size;
        const custoTotal = dados.reduce((soma, item) => soma + item.custoTotal, 0);
        const consumo = agruparInsumosConsumidos(dados);

        demonstracoesProducao.innerHTML = `
            <div class="demo">
                <div class="iconeDemo"><span class="iconeCaixaDemo"></span></div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Produção total</span>
                    <span class="demoTitulo">${producaoTotal}</span>
                    <span class="demoTextoNormal">unidades</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo"><span class="iconeCaixaDemo"></span></div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Produtos produzidos</span>
                    <span class="demoTitulo">${produtosDiferentes}</span>
                    <span class="demoTextoNormal">produtos diferentes</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo"><span class="iconeEstrelaDemo"></span></div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Custo total</span>
                    <span class="demoTitulo">${moeda(custoTotal)}</span>
                    <span class="demoTextoNormal">produção</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo"><span class="iconePilhaDemo"></span></div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Insumos utilizados</span>
                    <span class="demoTitulo">${textoTotalInsumos(consumo)}</span>
                    <span class="demoTextoNormal">tipos de insumos</span>
                </div>
            </div>
        `;
    }

    function atualizarTabelaProducao(dados){
        let tbody = tabelaProducao.querySelector("tbody");

        if(!tbody){
            tbody = document.createElement("tbody");
            tabelaProducao.appendChild(tbody);
        }

        tbody.innerHTML = "";

        dados.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td>${formatarData(item.data)}</td>
                    <td>${item.produto}</td>
                    <td>${item.quantidade} un</td>
                    <td>${item.receita}</td>
                    <td>${moeda(item.custoTotal)}</td>
                    <td>${item.responsavel}</td>
                    <td>${item.status}</td>
                </tr>
            `;
        });
    }

    function atualizarGraficoProducaoSemanal(dados){
        if(!canvasProducaoSemanal) return;

        if(graficoProducaoSemanal){
            graficoProducaoSemanal.destroy();
        }

        const agrupado = {};

        dados.forEach(item => {
            const data = formatarData(item.data);
            agrupado[data] = (agrupado[data] || 0) + item.quantidade;
        });

        graficoProducaoSemanal = new Chart(canvasProducaoSemanal, {
            type: "bar",
            data: {
                labels: Object.keys(agrupado),
                datasets: [{
                    label: "Quantidade produzida",
                    data: Object.values(agrupado),
                    backgroundColor: "#144621"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function atualizarGraficoProdutosMaisProduzidos(dados){
        if(!canvasProdutosMaisProduzidos) return;

        if(graficoProdutosMaisProduzidos){
            graficoProdutosMaisProduzidos.destroy();
        }

        const agrupado = {};

        dados.forEach(item => {
            agrupado[item.produto] = (agrupado[item.produto] || 0) + item.quantidade;
        });

        const totalProduzido = Object.values(agrupado).reduce((soma, valor) => {
            return soma + valor;
        }, 0);

        const labels = Object.keys(agrupado).map(produto => {
            const quantidade = agrupado[produto];
            const percentual = totalProduzido > 0
                ? (quantidade / totalProduzido) * 100
                : 0;

            return `${produto} - ${percentual.toFixed(1).replace(".", ",")}%`;
        });

        graficoProdutosMaisProduzidos = new Chart(canvasProdutosMaisProduzidos, {
            type: "pie",

            data: {
                labels: labels,

                datasets: [{
                    label: "Produtos mais produzidos",
                    data: Object.values(agrupado),
                    backgroundColor: [
                        "#144621",
                        "#2E7D32",
                        "#43A047",
                        "#66BB6A",
                        "#81C784",
                        "#A5D6A7",
                        "#C8E6C9"
                    ]
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context){
                                const quantidade = context.raw;
                                const percentual = totalProduzido > 0
                                    ? (quantidade / totalProduzido) * 100
                                    : 0;

                                return `${context.label}: ${quantidade} un (${percentual.toFixed(1).replace(".", ",")}%)`;
                            }
                        }
                    },

                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }

    function atualizarGraficoConsumoInsumos(dados){
        if(!canvasConsumoInsumos) return;

        if(graficoConsumoInsumos){
            graficoConsumoInsumos.destroy();
        }

        const consumo = agruparInsumosConsumidos(dados);

        graficoConsumoInsumos = new Chart(canvasConsumoInsumos, {
            type: "bar",
            data: {
                labels: Object.keys(consumo),
                datasets: [{
                    label: "Insumos utilizados",
                    data: Object.values(consumo),
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

    function filtrarProducao(){
        let dados = montarDadosProducao();

        const inicio = dataInicioProducao.value;
        const fim = dataFimProducao.value;
        const produto = filtroProdutoProducao.value;
        const status = filtroStatusProducao.value;

        if(inicio){
            dados = dados.filter(item => String(item.data).slice(0, 10) >= inicio);
        }

        if(fim){
            dados = dados.filter(item => String(item.data).slice(0, 10) <= fim);
        }

        if(produto && produto !== "Todos os produtos"){
            dados = dados.filter(item => item.produto === produto);
        }

        if(status && status !== "Todos"){
            dados = dados.filter(item => item.status === status);
        }

        atualizarPaginaProducao(dados);
    }

    carregarProdutosFiltro();

    botaoFiltrarProducao.addEventListener("click", event => {
        event.preventDefault();
        filtrarProducao();
    });

    botaoLimparFiltroProducao.addEventListener("click", event => {
        event.preventDefault();

        dataInicioProducao.value = "";
        dataFimProducao.value = "";
        filtroProdutoProducao.selectedIndex = 0;
        filtroStatusProducao.selectedIndex = 0;

        atualizarPaginaProducao(montarDadosProducao());
    });

    atualizarPaginaProducao(montarDadosProducao());
}



/* ================= RELATÓRIO FINANCEIRO ================= */

const tabelaFinanceiro = document.querySelector(".tabelaRelatorioFinanceiro");
const demonstracoesFinanceiro = document.querySelector("#demostracoesFinanceiro");

const dataInicioFinanceiro = document.querySelector("#dataInicioFinanceiro");
const dataFimFinanceiro = document.querySelector("#dataFimFinanceiro");
const filtroCategoriaFinanceiro = document.querySelector("#filtroCategoriaFinanceiro");

const botaoFiltrarFinanceiro = document.querySelector("#botaoFiltrarFinanceiro");
const botaoLimparFiltroFinanceiro = document.querySelector("#botaoLimparFiltroFinanceiro");

const canvasEntradasSaidas = document.querySelector(".graficoEntradasSaidasFinanceiro");
const canvasEvolucaoFaturamento = document.querySelector(".graficoEvolucaoFaturamentoFinanceiro");
const canvasDespesas = document.querySelector(".graficoDespesasFinanceiro");

let graficoEntradasSaidasFinanceiro;
let graficoEvolucaoFaturamentoFinanceiro;
let graficoDespesasFinanceiro;

if(tabelaFinanceiro){

    function pegarInsumos(){
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function pegarReceitas(){
        return JSON.parse(localStorage.getItem("receitas")) || [];
    }

    function pegarProducoes(){
        return JSON.parse(localStorage.getItem("producoes")) || [];
    }

    function pegarSaidasClientes(){
        return JSON.parse(localStorage.getItem("saidasClientes")) || [];
    }

    function pegarSaidasParceiros(){
        return JSON.parse(localStorage.getItem("saidasParceiros")) || [];
    }

    function numero(valor){
        return Number(
            String(valor || 0)
                .replace("R$", "")
                .replace(/\./g, "")
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

    function pegarData(item){
        return item.data ||
               item.dataSaida ||
               item.dataVenda ||
               item.dataProducao ||
               item.criadoEm ||
               "";
    }

    function pegarValorSaida(item){
        return numero(
            item.valorFinal ||
            item.totalFinal ||
            item.valorTotal ||
            item.total ||
            item.valorTotalVendido
        );
    }

    function buscarInsumo(nomeInsumo){
        return pegarInsumos().find(insumo =>
            String(insumo.nome || "").toLowerCase().trim() ===
            String(nomeInsumo || "").toLowerCase().trim()
        );
    }

    function montarDadosInsumos(){
        const dados = [];

        pegarInsumos().forEach(insumo => {
            const quantidade = numero(insumo.quantidade);
            const valorUnitario = numero(insumo.valor);

            dados.push({
                tipo: "Entrada",
                categoria: "Entrada de insumos",
                descricao: insumo.nome || "Insumo",
                data: pegarData(insumo),
                valor: quantidade * valorUnitario
            });
        });

        pegarReceitas().forEach(receita => {
            if(!receita.insumos) return;

            receita.insumos.forEach(item => {
                const insumoCadastrado = buscarInsumo(item.insumo);
                const valorUnitario = numero(insumoCadastrado?.valor);
                const quantidade = numero(item.quantidade);

                dados.push({
                    tipo: "Saída",
                    categoria: "Insumos usados em receitas",
                    descricao: item.insumo || "Insumo",
                    data: pegarData(receita),
                    valor: quantidade * valorUnitario
                });
            });
        });

        return dados;
    }

    function montarDadosProdutos(){
        const dados = [];

        pegarProducoes().forEach(producao => {
            dados.push({
                tipo: "Entrada",
                categoria: "Produção feita",
                descricao: producao.produto || producao.nomeProduto || "Produção",
                data: pegarData(producao),
                valor: numero(producao.custoTotalProducao || producao.valorTotalProducao)
            });
        });

        pegarSaidasClientes().forEach(saida => {
            dados.push({
                tipo: "Saída",
                categoria: "Saída para cliente",
                descricao: saida.cliente || saida.nomeCliente || "Cliente",
                data: pegarData(saida),
                valor: pegarValorSaida(saida)
            });
        });

        pegarSaidasParceiros().forEach(saida => {
            dados.push({
                tipo: "Saída",
                categoria: "Saída para parceiro",
                descricao: saida.parceiro || saida.nomeParceiro || "Parceiro",
                data: pegarData(saida),
                valor: pegarValorSaida(saida)
            });
        });

        return dados;
    }

    function montarDadosFinanceiros(){
        const categoria = filtroCategoriaFinanceiro.value.toLowerCase();

        if(categoria === "insumos"){
            return montarDadosInsumos();
        }

        if(categoria === "produtos"){
            return montarDadosProdutos();
        }

        return [
            ...montarDadosInsumos(),
            ...montarDadosProdutos()
        ];
    }

    function aplicarFiltroData(dados){
        const inicio = dataInicioFinanceiro.value;
        const fim = dataFimFinanceiro.value;

        if(inicio){
            dados = dados.filter(item => String(item.data).slice(0, 10) >= inicio);
        }

        if(fim){
            dados = dados.filter(item => String(item.data).slice(0, 10) <= fim);
        }

        return dados;
    }

    function atualizarPaginaFinanceiro(dados){
        atualizarDemonstrativosFinanceiro(dados);
        atualizarTabelaFinanceiro(dados);
        gerarGraficoEntradasSaidas(dados);
        gerarGraficoEvolucaoFinanceira(dados);
        gerarGraficoDistribuicao(dados);
    }

    function atualizarDemonstrativosFinanceiro(dados){
        const entradas = dados
            .filter(item => item.tipo === "Entrada")
            .reduce((soma, item) => soma + item.valor, 0);

        const saidas = dados
            .filter(item => item.tipo === "Saída")
            .reduce((soma, item) => soma + item.valor, 0);

        const saldo = entradas - saidas;
        const margem = entradas > 0 ? (saldo / entradas) * 100 : 0;

        demonstracoesFinanceiro.innerHTML = `
            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeSetaCimaDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Entradas totais</span>
                    <span class="demoTitulo">${moeda(entradas)}</span>
                    <span class="demoTextoNormal">entradas do período</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeSetaBaixoDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Saídas totais</span>
                    <span class="demoTitulo">${moeda(saidas)}</span>
                    <span class="demoTextoNormal">saídas do período</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeGraficoDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Saldo</span>
                    <span class="demoTitulo">${moeda(saldo)}</span>
                </div>
            </div>

            <div class="demo">
                <div class="iconeDemo">
                    <span class="iconeTicketDemo"></span>
                </div>
                <div class="textoDemo">
                    <span class="demoSemiTitulo">Margem</span>
                    <span class="demoTitulo">${margem.toFixed(1).replace(".", ",")}%</span>
                    <span class="demoTextoNormal">do período</span>
                </div>
            </div>
        `;
    }

    function atualizarTabelaFinanceiro(dados){
        let tbody = tabelaFinanceiro.querySelector("tbody");

        if(!tbody){
            tbody = document.createElement("tbody");
            tabelaFinanceiro.appendChild(tbody);
        }

        tbody.innerHTML = "";

        const totalEntradas = dados
            .filter(item => item.tipo === "Entrada")
            .reduce((soma, item) => soma + item.valor, 0);

        const totalSaidas = dados
            .filter(item => item.tipo === "Saída")
            .reduce((soma, item) => soma + item.valor, 0);

        const saldoTotal = totalEntradas - totalSaidas;

        const categorias = [...new Set(dados.map(item => item.categoria))];

        categorias.forEach(categoria => {
            const itens = dados.filter(item => item.categoria === categoria);

            const entradas = itens
                .filter(item => item.tipo === "Entrada")
                .reduce((soma, item) => soma + item.valor, 0);

            const saidas = itens
                .filter(item => item.tipo === "Saída")
                .reduce((soma, item) => soma + item.valor, 0);

            const saldo = entradas - saidas;

            tbody.innerHTML += `
                <tr>
                    <td>${categoria}</td>
                    <td>${entradas > 0 ? moeda(entradas) : "-"}</td>
                    <td>${totalEntradas > 0 && entradas > 0 ? ((entradas / totalEntradas) * 100).toFixed(1).replace(".", ",") + "%" : "-"}</td>
                    <td>${saidas > 0 ? moeda(saidas) : "-"}</td>
                    <td>${totalSaidas > 0 && saidas > 0 ? ((saidas / totalSaidas) * 100).toFixed(1).replace(".", ",") + "%" : "-"}</td>
                    <td>${moeda(saldo)}</td>
                    <td>${saldoTotal !== 0 ? ((saldo / saldoTotal) * 100).toFixed(1).replace(".", ",") + "%" : "0%"}</td>
                </tr>
            `;
        });

        tbody.innerHTML += `
            <tr class="linhaAzul">
                <td>Saldo do período</td>
                <td>${moeda(totalEntradas)}</td>
                <td>100%</td>
                <td>${moeda(totalSaidas)}</td>
                <td>100%</td>
                <td>${moeda(saldoTotal)}</td>
                <td>100%</td>
            </tr>
        `;
    }

    function gerarGraficoEntradasSaidas(dados){
        if(!canvasEntradasSaidas) return;

        if(graficoEntradasSaidasFinanceiro){
            graficoEntradasSaidasFinanceiro.destroy();
        }

        const entradas = dados
            .filter(item => item.tipo === "Entrada")
            .reduce((soma, item) => soma + item.valor, 0);

        const saidas = dados
            .filter(item => item.tipo === "Saída")
            .reduce((soma, item) => soma + item.valor, 0);

        graficoEntradasSaidasFinanceiro = new Chart(canvasEntradasSaidas, {
            type: "bar",
            data: {
                labels: ["Entradas", "Saídas"],
                datasets: [{
                    label: "Valor",
                    data: [entradas, saidas],
                    backgroundColor: ["#144621", "#C62828"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function gerarGraficoEvolucaoFinanceira(dados){
        if(!canvasEvolucaoFaturamento) return;

        if(graficoEvolucaoFaturamentoFinanceiro){
            graficoEvolucaoFaturamentoFinanceiro.destroy();
        }

        const agrupado = {};

        dados.forEach(item => {
            const data = String(item.data).slice(0, 10) || "Sem data";

            if(!agrupado[data]){
                agrupado[data] = {
                    entradas: 0,
                    saidas: 0
                };
            }

            if(item.tipo === "Entrada"){
                agrupado[data].entradas += item.valor;
            }else{
                agrupado[data].saidas += item.valor;
            }
        });

        graficoEvolucaoFaturamentoFinanceiro = new Chart(canvasEvolucaoFaturamento, {
            type: "line",
            data: {
                labels: Object.keys(agrupado),
                datasets: [
                    {
                        label: "Entradas",
                        data: Object.values(agrupado).map(item => item.entradas),
                        borderColor: "#144621",
                        backgroundColor: "#144621",
                        tension: 0.3
                    },
                    {
                        label: "Saídas",
                        data: Object.values(agrupado).map(item => item.saidas),
                        borderColor: "#C62828",
                        backgroundColor: "#C62828",
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function gerarGraficoDistribuicao(dados){
        if(!canvasDespesas) return;

        if(graficoDespesasFinanceiro){
            graficoDespesasFinanceiro.destroy();
        }

        const agrupado = {};

        dados.forEach(item => {
            agrupado[item.categoria] = (agrupado[item.categoria] || 0) + item.valor;
        });

        graficoDespesasFinanceiro = new Chart(canvasDespesas, {
            type: "pie",
            data: {
                labels: Object.keys(agrupado),
                datasets: [{
                    data: Object.values(agrupado),
                    backgroundColor: [
                        "#144621",
                        "#43A047",
                        "#C62828",
                        "#F57C00"
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function filtrarFinanceiro(){
        const dados = aplicarFiltroData(montarDadosFinanceiros());
        atualizarPaginaFinanceiro(dados);
    }

    botaoFiltrarFinanceiro.addEventListener("click", event => {
        event.preventDefault();
        filtrarFinanceiro();
    });

    botaoLimparFiltroFinanceiro.addEventListener("click", event => {
        event.preventDefault();

        dataInicioFinanceiro.value = "";
        dataFimFinanceiro.value = "";
        filtroCategoriaFinanceiro.selectedIndex = 0;

        atualizarPaginaFinanceiro(montarDadosFinanceiros());
    });

    atualizarPaginaFinanceiro(montarDadosFinanceiros());
}