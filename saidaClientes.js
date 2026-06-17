// Lista simulada de clientes para alimentar os seletores
const listaClientes = [
    "Ana Silva",
    "Carlos Eduardo",
    "Fernanda Oliveira",
    "Mariana Costa",
    "Roberto Santos"
];

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector(".tabelaFormularioDinamica tbody");
    const btnAdicionarLinha = document.querySelector(".btnAdicionarLinha");
    const inputDesconto = document.getElementById("desconto");
    const tagTotalFinal = document.querySelector(".tagValorDestaqueVerde");
    const formulario = document.querySelector("form");

    // --- FUNÇÃO PARA INICIALIZAR OS SELETORES DE UMA LINHA ---
    function configurarLinha(linha) {
        const seletorProduto = linha.querySelector("td:nth-child(1) select");
        const inputQuantidade = linha.querySelector("td:nth-child(2) input");
        const seletorCliente = lineSelector = linha.querySelector("td:nth-child(3) select");
        const divValorUnitario = linha.querySelector("td:nth-child(4) .tagValorDesabilitado");
        const divValorTotalRow = linha.querySelector("td:nth-child(5) .tagValorDesabilitado");
        const btnDeletar = linha.querySelector(".btnDeletarLinha");

        // Popular Produtos (Evitando duplicar a opção padrão)
        seletorProduto.innerHTML = '<option disabled selected>Selecione o produto...</option>';
        produtos.forEach(prod => {
            const opt = document.createElement("option");
            opt.value = prod.nome;
            opt.textContent = `${prod.nome} (${prod.peso || prod.categoria})`;
            seletorProduto.appendChild(opt);
        });

        // Popular Clientes
        seletorCliente.innerHTML = '<option disabled selected>Selecione o cliente...</option>';
        listaClientes.forEach(cliente => {
            const opt = document.createElement("option");
            opt.value = cliente;
            opt.textContent = cliente;
            seletorCliente.appendChild(opt);
        });

        // Evento de mudança de Produto (Altera o valor unitário)
        seletorProduto.addEventListener("change", () => {
            const produtoSelecionado = produtos.find(p => p.nome === seletorProduto.value);
            if (produtoSelecionado) {
                divValorUnitario.textContent = formatarMoeda(produtoSelecionado.valor);
                // Reseta a quantidade para 1 caso esteja zerada para facilitar o uso
                if (parseInt(inputQuantidade.value) === 0 || isNaN(parseInt(inputQuantidade.value))) {
                    inputQuantidade.value = "1 un";
                }
                calcularValoresLinha(linha);
            }
        });

        // Eventos para campo de Quantidade
        inputQuantidade.addEventListener("focus", () => {
            // Remove o sufixo " un" para o usuário digitar apenas o número
            inputQuantidade.value = inputQuantidade.value.replace(" un", "");
        });

        inputQuantidade.addEventListener("blur", () => {
            let qtd = parseInt(inputQuantidade.value);
            if (isNaN(qtd) || qtd < 0) qtd = 0;
            inputQuantidade.value = `${qtd} un`;
            calcularValoresLinha(linha);
        });

        inputQuantidade.addEventListener("input", () => {
            calcularValoresLinha(linha);
        });

        // Evento para o botão de deletar linha
        if (btnDeletar) {
            btnDeletar.addEventListener("click", () => {
                // Mantém pelo menos uma linha ativa se desejado, ou remove livremente
                if (document.querySelectorAll(".tabelaFormularioDinamica tbody tr").length > 1) {
                    linha.remove();
                    calcularTotalGeral();
                } else {
                    alert("O formulário deve conter pelo menos um item.");
                }
            });
        }
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

    // --- FUNÇÃO DE CÁLCULO DA LINHA ESPECÍFICA ---
    function calcularValoresLinha(linha) {
        const seletorProduto = linha.querySelector("td:nth-child(1) select");
        const inputQuantidade = linha.querySelector("td:nth-child(2) input");
        const divValorTotalRow = linha.querySelector("td:nth-child(5) .tagValorDesabilitado");

        const produtoSelecionado = produtos.find(p => p.nome === seletorProduto.value);
        const quantidade = parseInt(inputQuantidade.value) || 0;

        if (produtoSelecionado) {
            const totalLinha = produtoSelecionado.valor * quantidade;
            divValorTotalRow.textContent = formatarMoeda(totalLinha);
        } else {
            divValorTotalRow.textContent = "R$ 0,00";
        }

        calcularTotalGeral();
    }

    // --- FUNÇÃO PARA CALCULAR O TOTAL GERAL COM DESCONTO ---
    function calcularTotalGeral() {
        let subtotal = 0;
        const linhas = document.querySelectorAll(".tabelaFormularioDinamica tbody tr");

        linhas.forEach(linha => {
            const seletorProduto = linha.querySelector("td:nth-child(1) select");
            const inputQuantidade = linha.querySelector("td:nth-child(2) input");
            
            const produtoSelecionado = produtos.find(p => p.nome === seletorProduto.value);
            const quantidade = parseInt(inputQuantidade.value) || 0;

            if (produtoSelecionado) {
                subtotal += produtoSelecionado.valor * quantidade;
            }
        });

        // Processamento do Desconto
        let porcentagemDesconto = parseFloat(inputDesconto.value.replace(",", ".")) || 0;
        if (porcentagemDesconto < 0) porcentagemDesconto = 0;
        if (porcentagemDesconto > 100) porcentagemDesconto = 100;

        const valorDesconto = subtotal * (porcentagemDesconto / 100);
        const totalFinal = subtotal - valorDesconto;

        // Atualiza a tag gráfica de total final
        tagTotalFinal.textContent = totalFinal.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // --- ADICIONAR NOVA LINHA DINAMICAMENTE ---
    btnAdicionarLinha.addEventListener("click", () => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>
                <select class="campoSeletor"></select>
            </td>
            <td><input type="text" class="campoTexto centro" value="0 un"></td>
            <td>
                <select class="campoSeletor"></select>
            </td>
            <td><div class="tagValorDesabilitado">R$ 0,00</div></td>
            <td><div class="tagValorDesabilitado">R$ 0,00</div></td>
            <td><button type="button" class="btnDeletarLinha" title="Remover item"></button></td>
        `;
        tbody.appendChild(novaLinha);
        configurarLinha(novaLinha);
    });

    // --- MONITORAMENTO DO CAMPO DE DESCONTO ---
    inputDesconto.addEventListener("input", () => {
        // Permite apenas números e uma vírgula/ponto decimal
        inputDesconto.value = inputDesconto.value.replace(/[^0-9.,]/g, "");
        calcularTotalGeral();
    });

    inputDesconto.addEventListener("blur", () => {
        let val = parseFloat(inputDesconto.value.replace(",", ".")) || 0;
        inputDesconto.value = val.toFixed(2).replace(".", ",");
    });

    // --- FUNÇÃO AUXILIAR DE FORMATAÇÃO ---
    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    // --- INICIALIZAÇÃO DAS LINHAS EXISTENTES ---
    const linhasIniciais = document.querySelectorAll(".tabelaFormularioDinamica tbody tr");
    linhasIniciais.forEach(linha => configurarLinha(linha));
    calcularTotalGeral();

    // --- ENVIO / CADASTRO DE SAÍDA ---
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const itensSaida = [];
        const linhas = document.querySelectorAll(".tabelaFormularioDinamica tbody tr");
        let validacaoOk = true;

        linhas.forEach((linha, indice) => {
            const produto = linha.querySelector("td:nth-child(1) select").value;
            const quantidade = parseInt(linha.querySelector("td:nth-child(2) input").value) || 0;
            const cliente = linha.querySelector("td:nth-child(3) select").value;

            if (produto.includes("Selecione") || cliente.includes("Selecione") || quantidade === 0) {
                validacaoOk = false;
                return;
            }

            itensSaida.push({ produto, quantidade, cliente });
        });

        if (!validacaoOk) {
            alert("Por favor, preencha corretamente o produto, cliente e quantidade em todas as linhas.");
            return;
        }

        console.log("Saída registrada com sucesso!", {
            itens: itensSaida,
            desconto: inputDesconto.value,
            totalFinal: tagTotalFinal.textContent
        });

        alert("Saída de estoque cadastrada com sucesso!");
        // Opcional: recarregar ou limpar o formulário aqui
    });
});