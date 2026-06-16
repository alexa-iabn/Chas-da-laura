// relatorios-producao.js

// 1. Criação do histórico de produção baseando-se nos nomes exatos do seu array 'produtos'
const historicoProducao = [
    { semana: "04/05 - 10/05", nome: "Blend Calme Lata", quantidade: 30, receita: "Receita Calme v1", custoUn: 5.80, insumoKg: 0.90, status: "concluido" },
    { semana: "11/05 - 17/05", nome: "Blend Felicitá Lata", quantidade: 25, receita: "Receita Felicitá v2", custoUn: 6.20, insumoKg: 2.00, status: "concluido" },
    { semana: "11/05 - 17/05", nome: "Home Spray Ormoni", quantidade: 15, receita: "Receita Spray Aromas", custoUn: 12.50, insumoKg: 0.00, status: "concluido" },
    { semana: "18/05 - 24/05", nome: "Blend Ormoni Lata", quantidade: 40, receita: "Receita Ormoni v1", custoUn: 5.90, insumoKg: 1.60, status: "em-producao" },
    { semana: "18/05 - 24/05", nome: "Blend MaterniTea Lata", quantidade: 20, receita: "Receita Materni v3", custoUn: 6.50, insumoKg: 1.80, status: "concluido" },
    { semana: "25/05 - 31/05", nome: "Blend Airmid Lata", quantidade: 35, receita: "Receita Airmid v1", custoUn: 5.80, insumoKg: 1.40, status: "concluido" },
    { semana: "25/05 - 31/05", nome: "Home Spray Maternitea", quantidade: 10, receita: "Receita Spray Base", custoUn: 12.50, insumoKg: 0.00, status: "pendente" },
    { semana: "25/05 - 31/05", nome: "Blend Chai Masala Lata", quantidade: 50, receita: "Receita Chai Especial", custoUn: 7.10, insumoKg: 4.00, status: "concluido" }
];

// 2. Mapeamento dos elementos de filtro do HTML pelo índice
const selectProduto = document.querySelectorAll('.filtroItem select')[1];
const selectStatus = document.querySelectorAll('.filtroItem select')[2];
const botaoFiltrar = document.querySelector('.botaoFiltrar');
const botaoLimpar = document.querySelector('.botaoLimpar');
const tabelaCorpo = document.querySelector('.conteinerTabela tbody');

// Instâncias globais dos gráficos para evitar erros de renderização/sobreposição
let chartSemanal = null;
let chartMaisProduzidos = null;
let chartInsumos = null;

// 3. Função Principal de Filtro e Atualização da Tela
function renderizarPainel() {
    const produtoSelecionado = selectProduto.value;
    const statusSelecionado = selectStatus.value;

    // Filtra o histórico de produção com base no que foi escolhido na tela
    const dadosFiltrados = historicoProducao.filter(item => {
        // Mapeia o value do select para bater com o campo 'nome' do item
        let bateProduto = true;
        if (produtoSelecionado !== 'todos') {
            const valorTratado = item.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
            bateProduto = valorTratado.includes(produtoSelecionado);
        }
        
        const bateStatus = statusSelecionado === 'todos' || item.status === statusSelecionado;
        return bateProduto && bateStatus;
    });

    atualizarCardsKPI(dadosFiltrados);
    atualizarTabela(dadosFiltrados);
    construirGraficos(dadosFiltrados);
}

// 4. Atualização dos Cards de Valores Superiores
function atualizarCardsKPI(dados) {
    const totalUnidades = dados.reduce((acc, curr) => acc + curr.quantidade, 0);
    const custoTotal = dados.reduce((acc, curr) => acc + (curr.custoUn * curr.quantidade), 0);
    const totalInsumos = dados.reduce((acc, curr) => acc + curr.insumoKg, 0);
    
    // Conta quantos produtos únicos foram produzidos nesse filtro
    const produtosUnicos = [...new Set(dados.map(item => item.nome))].length;

    // Injeta os dados nos elementos HTML correspondentes
    document.querySelectorAll('.valorKpi')[0].innerText = totalUnidades.toLocaleString('pt-BR');
    document.querySelectorAll('.valorKpi')[1].innerText = produtosUnicos;
    document.querySelectorAll('.valorKpi')[2].innerText = `R$ ${custoTotal.toFixed(2).replace('.', ',')}`;
    document.querySelectorAll('.valorKpi')[3].innerText = `${totalInsumos.toFixed(2).replace('.', ',')} kg`;

    // Calcula e atualiza o custo médio por unidade
    const custoMedio = totalUnidades > 0 ? (custoTotal / totalUnidades) : 0;
    document.querySelectorAll('.subtextKpi')[2].innerText = `Custo médio: R$ ${custoMedio.toFixed(2).replace('.', ',')}/ un`;
}

// 5. Renderização Dinâmica das Linhas da Tabela
function atualizarTabela(dados) {
    tabelaCorpo.innerHTML = "";

    if (dados.length === 0) {
        tabelaCorpo.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px;">Nenhum registro encontrado para este filtro.</td></tr>`;
        return;
    }

    dados.forEach((item, index) => {
        const custoTotalItem = item.custoUn * item.quantidade;
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${item.semana}</td>
            <td><span class="indicadorCor b${(index % 4) + 1}"></span> ${item.nome}</td>
            <td>${item.quantidade} un</td>
            <td>${item.receita}</td>
            <td>R$ ${custoTotalItem.toFixed(2).replace('.', ',')}</td>
            <td>Laura</td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

// 6. Construção e Atualização dos Gráficos com Chart.js
function construirGraficos(dados) {
    // Destrói os gráficos anteriores para liberar o canvas e evitar bugs visuais
    if (chartSemanal) chartSemanal.destroy();
    if (chartMaisProduzidos) chartMaisProduzidos.destroy();
    if (chartInsumos) chartInsumos.destroy();

    // Agrupamento de dados para as estruturas dos gráficos
    const dadosSemana = {};
    const dadosInsumosSemana = {};
    const dadosProdutos = {};

    dados.forEach(item => {
        dadosSemana[item.semana] = (dadosSemana[item.semana] || 0) + item.quantidade;
        dadosInsumosSemana[item.semana] = (dadosInsumosSemana[item.semana] || 0) + item.insumoKg;
        dadosProdutos[item.nome] = (dadosProdutos[item.nome] || 0) + item.quantidade;
    });

    // --- Gráfico 1: Produção Semanal (Linha) ---
    const ctxSemanal = document.getElementById('graficoProducaoSemanal').getContext('2d');
    chartSemanal = new Chart(ctxSemanal, {
        type: 'line',
        data: {
            labels: Object.keys(dadosSemana),
            datasets: [{
                label: 'Unidades',
                data: Object.values(dadosSemana),
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.2,
                fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // --- Gráfico 2: Produtos mais Produzidos (Barras Horizontais) ---
    const ctxProdutos = document.getElementById('graficoMaisProduzidos').getContext('2d');
    chartMaisProduzidos = new Chart(ctxProdutos, {
        type: 'bar',
        data: {
            labels: Object.keys(dadosProdutos),
            datasets: [{
                label: 'Quantidade',
                data: Object.values(dadosProdutos),
                backgroundColor: '#81c784'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // --- Gráfico 3: Consumo de Insumos (Barras Verticais) ---
    const ctxInsumos = document.getElementById('graficoConsumoInsumos').getContext('2d');
    chartInsumos = new Chart(ctxInsumos, {
        type: 'bar',
        data: {
            labels: Object.keys(dadosInsumosSemana),
            datasets: [{
                label: 'Quilos (kg)',
                data: Object.values(dadosInsumosSemana),
                backgroundColor: '#a5d6a7'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
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

// 7. Eventos de Clique nos Filtros
botaoFiltrar.addEventListener('click', (e) => {
    e.preventDefault();
    renderizarPainel();
});

botaoLimpar.addEventListener('click', (e) => {
    e.preventDefault();
    selectProduto.value = 'todos';
    selectStatus.value = 'todos';
    renderizarPainel();
});

// Inicialização automática ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    renderizarPainel();
});