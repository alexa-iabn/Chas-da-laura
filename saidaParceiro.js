// Lista simulada de parceiros para alimentar os seletores da página
const listaParceiros = [
    "Empório Natureza",
    "Espaço Saúde & Bem-Estar",
    "Cafeteria Grão Gourmet",
    "Hotel Villa Verde",
    "Distribuidora Erva Viva"
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
        const seletorParceiro = linha.querySelector("td:nth-child(3) select");
        const divValorUnitario = linha.querySelector("td:nth-child(4) .tagValorDesabilitado");
        const btnDeletar = linha.querySelector(".btnDeletarLinha");

        // Popular os Produtos no Seletor
        seletorProduto.innerHTML = '<option disabled selected>Selecione o produto...</option>';
        produtos.forEach(prod => {
            const opt = document.createElement("option");
            opt.value = prod.nome;
            opt.textContent = `${prod.nome} (${prod.peso || prod.categoria})`;
            seletorProduto.appendChild(opt);
        });

        // Popular os Parceiros no Seletor
        seletorParceiro.innerHTML = '<option disabled selected>Selecione o parceiro...</option>';
        listaParceiros.forEach(parceiro => {
            const opt = document.createElement("option");
            opt.value = parceiro;
            opt.textContent = parceiro;
            seletorParceiro.appendChild(opt);
        });

        // Evento ao mudar o Produto selecionado (atualiza o valor unitário)
        seletorProduto.addEventListener("change", () => {
            const produtoSelecionado = produtos.find(p => p.nome === seletorProduto.value);
            if (produtoSelecionado) {
                divValorUnitario.textContent = formatarMoeda(produtoSelecionado.valor);
                // Se a quantidade estiver zerada, joga para 1 para facilitar o fluxo do usuário
                if (parseInt(inputQuantidade.value) === 0 || isNaN(parseInt(inputQuantidade.value))) {
                    inputQuantidade.value = "1 un";
                }
                calcularValoresLinha(linha);
            }
        });

        // Controle do campo de Quantidade ao focar/desfocar
        inputQuantidade.addEventListener("focus", () => {
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

        // Evento para remover a linha da tabela
        if (btnDeletar) {
            btnDeletar.addEventListener("click", () => {
                const totalLinhas = document.querySelectorAll(".tabelaFormularioDinamica tbody tr").length;
                if (totalLinhas > 1) {
                    linha.remove();
                    calcularTotalGeral();
                } else {
                    alert("A tabela deve conter pelo menos um produto para cadastro.");
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

    // --- FUNÇÃO DE CÁLCULO DE CADA LINHA ---
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

    // --- FUNÇÃO PARA CALCULAR O TOTAL GERAL DO FORMULÁRIO ---
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

        // Cálculo e validação do desconto inserido
        let porcentagemDesconto = parseFloat(inputDesconto.value.replace(",", ".")) || 0;
        if (porcentagemDesconto < 0) porcentagemDesconto = 0;
        if (porcentagemDesconto > 100) porcentagemDesconto = 100;

        const valorDesconto = subtotal * (porcentagemDesconto / 100);
        const totalFinal = subtotal - valorDesconto;

        // Atualiza o display gráfico do Total Final
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

    // --- COMPORTAMENTO DO CAMPO DE DESCONTO ---
    inputDesconto.addEventListener("input", () => {
        // Remove caracteres não numéricos exceto ponto e vírgula
        inputDesconto.value = inputDesconto.value.replace(/[^0-9.,]/g, "");
        calcularTotalGeral();
    });

    inputDesconto.addEventListener("blur", () => {
        let val = parseFloat(inputDesconto.value.replace(",", ".")) || 0;
        inputDesconto.value = val.toFixed(2).replace(".", ",");
    });

    // --- AUXILIAR DE FORMATAÇÃO MONETÁRIA BRASILEIRA ---
    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    // --- INICIALIZAÇÃO DA PRIMEIRA LINHA ---
    const linhasIniciais = document.querySelectorAll(".tabelaFormularioDinamica tbody tr");
    linhasIniciais.forEach(linha => configurarLinha(linha));
    calcularTotalGeral();

    // --- SUBMISSÃO E VALIDAÇÃO DOS DADOS DO FORMULÁRIO ---
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const itensSaida = [];
        const linhas = document.querySelectorAll(".tabelaFormularioDinamica tbody tr");
        let formularioValido = true;

        linhas.forEach((linha) => {
            const produto = linha.querySelector("td:nth-child(1) select").value;
            const quantidade = parseInt(linha.querySelector("td:nth-child(2) input").value) || 0;
            const parceiro = linha.querySelector("td:nth-child(3) select").value;

            // Valida se os seletores padrões ainda estão ativos ou quantidade zerada
            if (produto.includes("Selecione") || parceiro.includes("Selecione") || quantidade === 0) {
                formularioValido = false;
                return;
            }

            itensSaida.push({ produto, quantidade, parceiro });
        });

        if (!formularioValido) {
            alert("Por favor, selecione o produto, parceiro e defina uma quantidade válida em todas as linhas.");
            return;
        }

        // Simulação do envio bem-sucedido
        console.log("Saída registrada com sucesso!", {
            tipoSaida: "Parceiro",
            itens: itensSaida,
            descontoAplicado: inputDesconto.value + "%",
            valorTotalFinal: tagTotalFinal.textContent
        });

        alert("Saída para parceiro cadastrada com sucesso!");
    });
});