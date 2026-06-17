const clientes = [
    {
        id: 1,
        nome: "Mariana Oliveira",
        telefone: "(45) 99911-2233",
        cpf: "123.456.789-01",
        email: "mariana.oliveira@email.com",
        endereco: "Rua das Flores, 125 - Centro, Foz do Iguaçu - PR",
        observacao: "Prefere blends relaxantes."
    },
    {
        id: 2,
        nome: "Carlos Henrique",
        telefone: "(45) 99822-3344",
        cpf: "234.567.890-12",
        email: "carlos.henrique@email.com",
        endereco: "Av. Paraná, 980 - Vila A, Foz do Iguaçu - PR",
        observacao: "Compra para revenda."
    },
    {
        id: 3,
        nome: "Fernanda Souza",
        telefone: "(45) 99733-4455",
        cpf: "345.678.901-23",
        email: "fernanda.souza@email.com",
        endereco: "Rua das Acácias, 310 - Jardim América, Foz do Iguaçu - PR",
        observacao: "Cliente frequente."
    }
];

const produtos = [
    {
        id: 1,
        nome: "Calme Lata 30g",
        estoque: 45,
        valorUnitario: 35.00
    },
    {
        id: 2,
        nome: "Felicitá Lata 80g",
        estoque: 32,
        valorUnitario: 42.00
    },
    {
        id: 3,
        nome: "Ormoni Lata 40g",
        estoque: 28,
        valorUnitario: 38.00
    }
];

const tbody = document.querySelector(".tabelaFormularioDinamica tbody");
const botaoAdicionar = document.querySelector(".btnAdicionarLinha");
const inputDesconto = document.querySelector("#desconto");
const totalFinal = document.querySelector(".tagValorDestaqueVerde");

function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function criarOptionsProdutos(){
    return `
        <option disabled selected value="">Selecione o produto...</option>
        ${produtos.map(produto => `
            <option value="${produto.id}">
                ${produto.nome}
            </option>
        `).join("")}
    `;
}

function criarOptionsClientes(){
    return `
        <option disabled selected value="">Selecione o cliente...</option>
        ${clientes.map(cliente => `
            <option value="${cliente.id}">
                ${cliente.nome}
            </option>
        `).join("")}
    `;
}

function criarLinha(){
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>
            <select class="campoSeletor produtoSelecionado">
                ${criarOptionsProdutos()}
            </select>
        </td>

        <td>
            <input type="number" class="campoTexto centro quantidadeProduto" value="0" min="0">
        </td>

        <td>
            <select class="campoSeletor clienteSelecionado">
                ${criarOptionsClientes()}
            </select>
        </td>

        <td>
            <div class="tagValorDesabilitado valorUnitario">R$ 0,00</div>
        </td>

        <td>
            <div class="tagValorDesabilitado valorTotal">R$ 0,00</div>
        </td>

        <td>
            <button type="button" class="btnDeletarLinha" title="Remover item">X</button>
        </td>
    `;

    tbody.appendChild(tr);
}

function atualizarLinha(linha){
    const selectProduto = linha.querySelector(".produtoSelecionado");
    const inputQuantidade = linha.querySelector(".quantidadeProduto");
    const campoValorUnitario = linha.querySelector(".valorUnitario");
    const campoValorTotal = linha.querySelector(".valorTotal");

    const produtoId = Number(selectProduto.value);
    const quantidade = Number(inputQuantidade.value) || 0;

    const produtoEncontrado = produtos.find(produto => produto.id === produtoId);

    if(!produtoEncontrado){
        campoValorUnitario.textContent = "R$ 0,00";
        campoValorTotal.textContent = "R$ 0,00";
        atualizarTotalFinal();
        return;
    }

    const valorUnitario = produtoEncontrado.valorUnitario;
    const valorTotal = quantidade * valorUnitario;

    campoValorUnitario.textContent = formatarMoeda(valorUnitario);
    campoValorTotal.textContent = formatarMoeda(valorTotal);

    atualizarTotalFinal();
}

function pegarValorTotalDaLinha(linha){
    const selectProduto = linha.querySelector(".produtoSelecionado");
    const inputQuantidade = linha.querySelector(".quantidadeProduto");

    const produtoId = Number(selectProduto.value);
    const quantidade = Number(inputQuantidade.value) || 0;

    const produtoEncontrado = produtos.find(produto => produto.id === produtoId);

    if(!produtoEncontrado){
        return 0;
    }

    return produtoEncontrado.valorUnitario * quantidade;
}

function atualizarTotalFinal(){
    const linhas = tbody.querySelectorAll("tr");

    let soma = 0;

    linhas.forEach(linha => {
        soma += pegarValorTotalDaLinha(linha);
    });

    let desconto = Number(inputDesconto.value.replace(",", ".")) || 0;

    let valorComDesconto = soma - (soma * desconto / 100);

    totalFinal.textContent = formatarMoeda(valorComDesconto);
}

botaoAdicionar.addEventListener("click", () => {
    criarLinha();
});

tbody.addEventListener("change", (event) => {
    const linha = event.target.closest("tr");

    if(event.target.classList.contains("produtoSelecionado")){
        atualizarLinha(linha);
    }
});

tbody.addEventListener("input", (event) => {
    const linha = event.target.closest("tr");

    if(event.target.classList.contains("quantidadeProduto")){
        atualizarLinha(linha);
    }
});

tbody.addEventListener("click", (event) => {
    if(event.target.classList.contains("btnDeletarLinha")){
        event.target.closest("tr").remove();
        atualizarTotalFinal();
    }
});

inputDesconto.addEventListener("input", atualizarTotalFinal);

tbody.innerHTML = "";
criarLinha();



