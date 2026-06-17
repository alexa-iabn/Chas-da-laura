 // relatorios.js

// Instâncias globais para controle dos gráficos do Chart.js (evita duplicações na tela 1)
let graficoValor = null;
let graficoSituacao = null;
let graficoMovimentacao = null;

document.addEventListener("DOMContentLoaded", () => {
    // Detecta qual página está aberta através do título principal (<h1>)
    const tituloPagina = document.querySelector(".tituloPagina")?.textContent.trim();

    // Executa a inicialização dos dados da página atual
    processarTelaAtiva(tituloPagina);

    // Configuração dos botões "Filtrar" e "Limpar Filtros"
    const btnFiltrar = document.querySelector(".botaoFiltrar");
    const btnLimpar = document.querySelector(".botaoLimpar");

    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", () => {
            processarTelaAtiva(tituloPagina);
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            // Reseta todos os selects da seção de filtros para a primeira opção (Todos)
            document.querySelectorAll(".filtroItem select").forEach(select => select.selectedIndex = 0);
            processarTelaAtiva(tituloPagina);
        });
    }
});

// Direciona o fluxo para a função correta dependendo do título da página
function processarTelaAtiva(titulo) {
    if (titulo === "Relatórios de Insumos") {
        inicializarRelatorioInsumos();
    } else if (titulo === "Valor de estoque por tipo") {
        inicializarValorPorTipo();
    } else if (titulo === "Produtos mais produzidos") {
        inicializarProdutosMaisProduzidos();
    }
}

// =========================================================================
// TELA 1: RELATÓRIOS DE INSUMOS
// =========================================================================
function inicializarRelatorioInsumos() {
    const filtroCategoria = document.getElementById("categoria")?.value || "Todos os tipos";
    const filtroTipo = document.getElementById("tipoItem")?.value || "Todos os tipos";

    let prods = [...produtos];
    let insms = [...insumos];

    if (filtroTipo === "produto") insms = [];
    if (filtroTipo === "insumo") prods = [];

    if (filtroCategoria !== "Todas as categorias" && filtroCategoria !== "todos" && filtroCategoria !== "Todos os tipos") {
        prods = prods.filter(p => p.categoria.toLowerCase() === filtroCategoria.toLowerCase());
        insms = insms.filter(i => i.categoria.toLowerCase() === filtroCategoria.toLowerCase());
    }

    // Cálculos dos Cards
    const valorProd = prods.reduce((acc, p) => acc + (p.valor * p.estoque), 0);
    const valorInsu = insms.reduce((acc, i) => acc + (i.estoque * (i.categoria === "chá" ? 20 : 5)), 0);
    const valorTotalGeral = valorProd + valorInsu;

    const totalBaixo = prods.filter(p => p.estoque > 0 && p.estoque < 10).length + insms.filter(i => i.estoque > 0 && i.estoque <= i.estoqueMinimo).length;
    const totalZerado = prods.filter(p => p.estoque === 0).length + insms.filter(i => i.estoque === 0).length;
    const totalItensVariedade = prods.length + insms.length;

    // Renderiza nos Cards de KPI
    const cards = document.querySelectorAll(".cardKpi");
    if (cards.length >= 4) {
        cards[0].querySelector(".valorKpi").textContent = `R$ ${valorTotalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        cards[1].querySelector(".valorKpi").textContent = totalBaixo;
        cards[2].querySelector(".valorKpiBox, .critico").textContent = totalZerado;
        cards[3].querySelector(".valorKpi").textContent = totalItensVariedade;
    }

    // Tabela Detalhada
    const tbody = document.querySelector(".tabelaDados tbody");
    if (tbody) {
        tbody.innerHTML = "";
        
        prods.forEach(p => {
            let sit = p.estoque === 0 ? "zerado" : (p.estoque < 10 ? "baixo" : "normal");
            let txtSit = p.estoque === 0 ? "Zerado" : (p.estoque < 10 ? "Estoque baixo" : "Normal");
            tbody.innerHTML += `
                <tr>
                    <td><span class="tag tipoProduto">Produto</span></td>
                    <td>${p.nome} ${p.peso ? `- ${p.peso}` : ''}</td>
                    <td>${p.estoque} UN</td>
                    <td>10 UN</td>
                    <td>R$ ${p.valor.toFixed(2).replace('.', ',')} UN</td>
                    <td>R$ ${(p.valor * p.estoque).toFixed(2).replace('.', ',')}</td>
                    <td><span class="status ${sit}">${txtSit}</span></td>
                </tr>`;
        });

        insms.forEach(i => {
            let sit = i.estoque === 0 ? "zerado" : (i.estoque <= i.estoqueMinimo ? "baixo" : "normal");
            let txtSit = i.estoque === 0 ? "Zerado" : (i.estoque <= i.estoqueMinimo ? "Estoque baixo" : "Normal");
            let vUnit = i.categoria === "chá" ? 20.00 : 5.00;
            tbody.innerHTML += `
                <tr>
                    <td><span class="tag tipoInsumo">Insumo</span></td>
                    <td>${i.nome}</td>
                    <td>${i.estoque} ${i.unidadeMedida === 'unidades' ? 'UN' : i.unidadeMedida}</td>
                    <td>${i.estoqueMinimo} ${i.unidadeMedida === 'unidades' ? 'UN' : i.unidadeMedida}</td>
                    <td>R$ ${vUnit.toFixed(2).replace('.', ',')} ${i.unidadeMedida === 'unidades' ? 'UN' : 'Kg'}</td>
                    <td>R$ ${(vUnit * i.estoque).toFixed(2).replace('.', ',')}</td>
                    <td><span class="status ${sit}">${txtSit}</span></td>
                </tr>`;
        });
    }

    renderizarGraficosTelaInsumos(valorProd, valorInsu, totalBaixo, totalZerado, totalItensVariedade);
}

// =========================================================================
// TELA 2: VALOR DE ESTOQUE POR TIPO
// =========================================================================
function inicializarValorPorTipo() {
    // Elementos capturados com base no HTML da imagem
    const filtroTipoEstoque = document.getElementById("tipoEstoque")?.value || "Todos os estoques";
    const filtroStatus = document.getElementById("status")?.value || "Todos";

    let prods = [...produtos];
    let insms = [...insumos];

    // Tratamento de tipos (Seletor central)
    if (filtroTipoEstoque === "Produtos") insms = [];
    if (filtroTipoEstoque === "Insumos") prods = [];

    // Calcula a base de 100% dinâmica sobre a lista atual ativa
    const totalProdDinheiro = prods.reduce((acc, p) => acc + (p.valor * p.estoque), 0);
    const totalInsuDinheiro = insms.reduce((acc, i) => acc + (i.estoque * (i.categoria === "chá" ? 20 : 5)), 0);
    const totalGeralDinheiro = totalProdDinheiro + totalInsuDinheiro;

    const tbody = document.querySelector(".tabelaDados tbody, table tbody");
    if (tbody) {
        tbody.innerHTML = "";
        let somaTotalExibido = 0;

        // Renderização - Produtos
        prods.forEach(p => {
            let sit = p.estoque === 0 ? "zerado" : (p.estoque < 10 ? "baixo" : "normal");
            let txtSit = p.estoque === 0 ? "Zerado" : (p.estoque < 10 ? "Estoque baixo" : "Normal");

            // Filtragem por Status (Seletor da direita)
            if (filtroStatus !== "Todos" && txtSit.toLowerCase() !== filtroStatus.toLowerCase() && sit !== filtroStatus.toLowerCase()) return;

            let vTotal = p.valor * p.estoque;
            somaTotalExibido += vTotal;
            let percentual = totalGeralDinheiro > 0 ? ((vTotal / totalGeralDinheiro) * 100).toFixed(0) : 0;

            tbody.innerHTML += `
                <tr>
                    <td><span class="tag tipoProduto">Produto</span></td>
                    <td>${p.nome} ${p.peso ? `- ${p.peso}` : ''}</td>
                    <td>${p.estoque} UN</td>
                    <td>R$ ${vTotal.toFixed(2).replace('.', ',')}</td>
                    <td>${percentual}%</td>
                    <td>R$ ${p.valor.toFixed(2).replace('.', ',')}</td>
                    <td><span class="status ${sit}">${txtSit}</span></td>
                </tr>`;
        });

        // Renderização - Insumos
        insms.forEach(i => {
            let sit = i.estoque === 0 ? "zerado" : (i.estoque <= i.estoqueMinimo ? "baixo" : "normal");
            let txtSit = i.estoque === 0 ? "Zerado" : (i.estoque <= i.estoqueMinimo ? "Estoque baixo" : "Normal");

            if (filtroStatus !== "Todos" && txtSit.toLowerCase() !== filtroStatus.toLowerCase() && sit !== filtroStatus.toLowerCase()) return;

            let vUnit = i.categoria === "chá" ? 20.00 : 5.00;
            let vTotal = vUnit * i.estoque;
            somaTotalExibido += vTotal;
            let percentual = totalGeralDinheiro > 0 ? ((vTotal / totalGeralDinheiro) * 100).toFixed(1) : 0;

            tbody.innerHTML += `
                <tr>
                    <td><span class="tag tipoInsumo">Insumo</span></td>
                    <td>${i.nome}</td>
                    <td>${i.estoque} ${i.unidadeMedida === 'unidades' ? 'UN' : i.unidadeMedida}</td>
                    <td>R$ ${vTotal.toFixed(2).replace('.', ',')}</td>
                    <td>${parseFloat(percentual)}%</td>
                    <td>R$ ${vUnit.toFixed(2).replace('.', ',')}</td>
                    <td><span class="status ${sit}">${txtSit}</span></td>
                </tr>`;
        });

        // Atualização da Linha de TOTAL GERAL no rodapé
        const tfoot = document.querySelector("table tfoot");
        if (tfoot) {
            tfoot.innerHTML = `
                <tr style="font-weight: bold; background-color: #E8F5E9;">
                    <td colspan="3">TOTAL GERAL</td>
                    <td>R$ ${somaTotalExibido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>${somaTotalExibido > 0 ? '100%' : '0%'}</td>
                    <td></td>
                    <td></td>
                </tr>`;
        }
    }
}

// =========================================================================
// TELA 3: PRODUTOS MAIS PRODUZIDOS
// =========================================================================
function inicializarProdutosMaisProduzidos() {
    const filtroProduto = document.getElementById("produto")?.value || "Todos os produtos";
    const tbody = document.querySelector("table tbody");

    if (tbody) {
        tbody.innerHTML = "";
        
        // Mapeia os dados simulando lotes de produção (multiplicados por um fator histórico semanal estável)
        let totalUnidadesProduzidas = 0;
        let custoTotalProducao = 0;

        let produtosOrdenados = [...produtos].sort((a, b) => b.estoque - a.estoque);

        produtosOrdenados.forEach(p => {
            // Aplica filtro específico por nome se não for "Todos"
            if (filtroProduto !== "Todos os produtos" && filtroProduto !== "Todos" && p.nome !== filtroProduto) return;

            let qtdSemanasFicticia = p.estoque * 4; // Simulação de produção mensal acumulada
            let valorMedioCusto = (p.valor * 0.4); // Custo de insumo estimado em 40% do preço de venda
            let valorTotalLote = qtdSemanasFicticia * valorMedioCusto;

            totalUnidadesProduzidas += qtdSemanasFicticia;
            custoTotalProducao += valorTotalLote;

            tbody.innerHTML += `
                <tr>
                    <td>01/05 - 31/05</td>
                    <td>${p.nome}</td>
                    <td>${qtdSemanasFicticia} un</td>
                    <td>5,2%</td>
                    <td>R$ ${valorTotalLote.toFixed(2).replace('.', ',')}</td>
                    <td>R$ ${valorMedioCusto.toFixed(2).replace('.', ',')}</td>
                </tr>`;
        });

        // Atualização do totalizador final da tabela de Produção
        const tfoot = document.querySelector("table tfoot");
        if (tfoot) {
            tfoot.innerHTML = `
                <tr style="font-weight: bold; background-color: #E8F5E9;">
                    <td>TOTAL GERAL</td>
                    <td></td>
                    <td>${totalUnidadesProduzidas} UN</td>
                    <td>100%</td>
                    <td>R$ ${custoTotalProducao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>R$ ${(totalUnidadesProduzidas > 0 ? (custoTotalProducao / totalUnidadesProduzidas) : 0).toFixed(2).replace('.', ',')}</td>
                </tr>`;
        }
    }
}

// =========================================================================
// MOTOR DOS GRÁFICOS (CHART.JS) - TELA 1
// =========================================================================
function renderizarGraficosTelaInsumos(vProd, vInsu, baixo, zerado, total) {
    const ctxValor = document.getElementById('graficoValorTipo');
    if (ctxValor) {
        if (graficoValor) graficoValor.destroy();
        graficoValor = new Chart(ctxValor, {
            type: 'doughnut',
            data: {
                labels: ['Produtos', 'Insumos'],
                datasets: [{ data: [vProd, vInsu], backgroundColor: ['#1E4620', '#A3C9A8'] }]
            },
            options: { responsive: true, plugins: { legend: { position: 'right' } } }
        });
    }

    const ctxSituacao = document.getElementById('graficoSituacaoEstoque');
    if (ctxSituacao) {
        if (graficoSituacao) graficoSituacao.destroy();
        let normal = total - (baixo + zerado);
        graficoSituacao = new Chart(ctxSituacao, {
            type: 'doughnut',
            data: {
                labels: ['Em estoque', 'Estoque baixo', 'Sem estoque'],
                datasets: [{ data: [normal < 0 ? 0 : normal, baixo, zerado], backgroundColor: ['#2E7D32', '#FBC02D', '#D32F2F'] }]
            },
            options: { responsive: true, plugins: { legend: { position: 'right' } } }
        });
    }

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

    const ctxMov = document.getElementById('graficoEntradasSaidas');
    if (ctxMov) {
        if (graficoMovimentacao) graficoMovimentacao.destroy();
        graficoMovimentacao = new Chart(ctxMov, {
            type: 'line',
            data: {
                labels: ['01/05', '08/05', '15/05', '22/05', '31/05'],
                datasets: [
                    { label: 'Entradas', data: [600, 780, 710, 930, 1200], borderColor: '#2E7D32', backgroundColor: 'transparent', tension: 0.3 },
                    { label: 'Saídas', data: [420, 510, 580, 740, 890], borderColor: '#D32F2F', backgroundColor: 'transparent', tension: 0.3 }
                ]
            },
            options: { responsive: true }
        });
    }
}