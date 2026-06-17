const produtosVendidos = [
    {
        id: 1,
        nomeProduto: "Calme Lata 30g",
        categoria: "Blend",
        quantidadeVendida: 25,
        valorUnitario: 35.00,
        valorTotalVendido: 875.00,
        data: "2026-06-01"
    },
    {
        id: 2,
        nomeProduto: "Felicitá Lata 80g",
        categoria: "Blend",
        quantidadeVendida: 18,
        valorUnitario: 42.00,
        valorTotalVendido: 756.00,
        data: "2026-06-02"
    },
    {
        id: 3,
        nomeProduto: "Ormoni Lata 40g",
        categoria: "Blend",
        quantidadeVendida: 12,
        valorUnitario: 38.00,
        valorTotalVendido: 456.00,
        data: "2026-06-03"
    },
    {
        id: 4,
        nomeProduto: "MaterniTea Lata 90g",
        categoria: "Blend",
        quantidadeVendida: 15,
        valorUnitario: 48.00,
        valorTotalVendido: 720.00,
        data: "2026-06-04"
    },
    {
        id: 5,
        nomeProduto: "Airmid Lata",
        categoria: "Blend",
        quantidadeVendida: 20,
        valorUnitario: 40.00,
        valorTotalVendido: 800.00,
        data: "2026-06-05"
    },
    {
        id: 6,
        nomeProduto: "Chai Masala",
        categoria: "Blend",
        quantidadeVendida: 30,
        valorUnitario: 32.00,
        valorTotalVendido: 960.00,
        data: "2026-06-06"
    },
    {
        id: 7,
        nomeProduto: "Home Spray Lavanda",
        categoria: "Home Spray",
        quantidadeVendida: 10,
        valorUnitario: 45.00,
        valorTotalVendido: 450.00,
        data: "2026-06-07"
    },
    {
        id: 8,
        nomeProduto: "Home Spray Capim Limão",
        categoria: "Home Spray",
        quantidadeVendida: 8,
        valorUnitario: 45.00,
        valorTotalVendido: 360.00,
        data: "2026-06-08"
    },
    {
        id: 9,
        nomeProduto: "Kit Relaxamento",
        categoria: "Kit",
        quantidadeVendida: 6,
        valorUnitario: 89.90,
        valorTotalVendido: 539.40,
        data: "2026-06-09"
    },
    {
        id: 10,
        nomeProduto: "Infusor Inox",
        categoria: "Acessório",
        quantidadeVendida: 14,
        valorUnitario: 24.90,
        valorTotalVendido: 348.60,
        data: "2026-06-10"
    }
];


const canvasProdutosMaisVendidos = document.querySelector('.graficoProdutosMaisVendidos');

const nomesProdutos = produtosVendidos.map(produto => produto.nomeProduto);
const quantidadesVendidas = produtosVendidos.map(produto => produto.quantidadeVendida);

new Chart(canvasProdutosMaisVendidos, {
    type: 'bar',
    data: {
        labels: nomesProdutos,
        datasets: [{
            label: 'Quantidade vendida',
            data: quantidadesVendidas,
            backgroundColor: '#0D5B2A',
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    }
});
