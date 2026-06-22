const formularioClientes = document.querySelector(".formularioClientes");
let tabelaClientesBody = document.querySelector("#tbodyClientes");

if(formularioClientes){

    const tabelaClientes = document.querySelector(".tabelaClientes table");

    if(!tabelaClientesBody && tabelaClientes){
        tabelaClientesBody = document.createElement("tbody");
        tabelaClientesBody.id = "tbodyClientes";
        tabelaClientes.appendChild(tabelaClientesBody);
    }

    const inputs = formularioClientes.querySelectorAll("input");

    const inputNome = inputs[0];
    const inputCpf = inputs[1];
    const inputTelefone = inputs[2];
    const inputEmail = inputs[3];
    const inputEndereco = inputs[4];

    const textareaObservacao = formularioClientes.querySelector("textarea");

    const botaoSalvarCliente = formularioClientes.querySelector(".botaoSalvar");
    const botaoCancelarCliente = formularioClientes.querySelector(".botaoCancelar");

    function pegarClientes(){
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    function salvarClientes(clientes){
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    function limparFormularioCliente(){
        inputNome.value = "";
        inputCpf.value = "";
        inputTelefone.value = "";
        inputEmail.value = "";
        inputEndereco.value = "";
        textareaObservacao.value = "";
    }

    function renderizarTabelaClientes(){
        const clientes = pegarClientes();
        const ultimosCinco = clientes.slice(-5).reverse();

        tabelaClientesBody.innerHTML = "";

        ultimosCinco.forEach(cliente => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.email}</td>
                <td>${cliente.endereco}</td>
            `;

            tabelaClientesBody.appendChild(tr);
        });
    }

    botaoSalvarCliente.addEventListener("click", (event) => {
        event.preventDefault();

        const novoCliente = {
            id: Date.now(),
            nome: inputNome.value.trim(),
            cpf: inputCpf.value.trim(),
            telefone: inputTelefone.value.trim(),
            email: inputEmail.value.trim(),
            endereco: inputEndereco.value.trim(),
            observacao: textareaObservacao.value.trim(),
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        if(!novoCliente.nome || !novoCliente.cpf || !novoCliente.telefone || !novoCliente.email || !novoCliente.endereco){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const clientes = pegarClientes();
        clientes.push(novoCliente);

        salvarClientes(clientes);

        limparFormularioCliente();
        renderizarTabelaClientes();

        alert("Cliente salvo com sucesso!");
    });

    botaoCancelarCliente.addEventListener("click", (event) => {
        event.preventDefault();
        limparFormularioCliente();
    });

    renderizarTabelaClientes();
}


/* CADASTRO FORNECEDORES */

const formularioFornecedor = document.querySelector(".formularioFornecedor");

if(formularioFornecedor){

    const campos = formularioFornecedor.querySelectorAll("input, select, textarea");

    const inputNome = campos[0];
    const inputCnpj = campos[1];
    const inputTelefone = campos[2];
    const inputEmail = campos[3];
    const inputRazaoSocial = campos[4];

    const selectEstado = campos[5];
    const selectCidade = campos[6];
    const inputEndereco = campos[7];
    const inputNumero = campos[8];

    const selectCategoria = campos[9];
    const inputPagamento = campos[10];
    const textareaObservacao = campos[11];

    const botaoSalvar = formularioFornecedor.querySelector(".botaoSalvar");
    const botaoCancelar = formularioFornecedor.querySelector(".botaoCancelar");

    function pegarFornecedores(){
        return JSON.parse(localStorage.getItem("fornecedores")) || [];
    }

    function salvarFornecedores(fornecedores){
        localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    }

    function limparFormulario(){
        campos.forEach(campo => {
            campo.value = "";
        });
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();

        const novoFornecedor = {
            id: Date.now(),
            nomeCompleto: inputNome.value.trim(),
            cnpj: inputCnpj.value.trim(),
            telefone: inputTelefone.value.trim(),
            email: inputEmail.value.trim(),
            razaoSocial: inputRazaoSocial.value.trim(),
            estado: selectEstado.value,
            cidade: selectCidade.value,
            endereco: inputEndereco.value.trim(),
            numero: inputNumero.value.trim(),
            categoriaFornecimento: selectCategoria.value,
            condicoesPagamento: inputPagamento.value.trim(),
            observacao: textareaObservacao.value.trim(),
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        if(
            !novoFornecedor.nomeCompleto ||
            !novoFornecedor.cnpj ||
            !novoFornecedor.telefone ||
            !novoFornecedor.email ||
            !novoFornecedor.razaoSocial ||
            !novoFornecedor.estado ||
            novoFornecedor.estado === "Selecione..." ||
            !novoFornecedor.cidade ||
            novoFornecedor.cidade === "Selecione..." ||
            !novoFornecedor.endereco ||
            !novoFornecedor.numero
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const fornecedores = pegarFornecedores();

        fornecedores.push(novoFornecedor);

        salvarFornecedores(fornecedores);

        limparFormulario();

        alert("Fornecedor salvo com sucesso!");
    });

    botaoCancelar.addEventListener("click", (event) => {
        event.preventDefault();
        limparFormulario();
    });
}

/* CADASTRAR INSUMOS */

const formularioInsumo = document.querySelector(".formularioInsumo");

if(formularioInsumo){

    const inputNome = document.querySelector("#nomeInsumo");
    const inputValor = document.querySelector("#valorInsumo");
    const inputQuantidade = document.querySelector("#quantidadeInsumo");
    const selectUnidade = document.querySelector("#unidadeInsumo");
    const selectFornecedor = document.querySelector("#fornecedorInsumo");
    const inputValidade = document.querySelector("#validadeInsumo");
    const inputEstoqueMinimo = document.querySelector("#estoqueMinimo");
    const textareaDescricao = document.querySelector("#descricaoInsumo");

    const botaoSalvar = formularioInsumo.querySelector(".botaoSalvar");
    const botaoCancelar = formularioInsumo.querySelector(".botaoCancelar");

    const tbodyInsumos = document.querySelector("#tbodyInsumos");
    const campoBusca = document.querySelector("#buscarInsumo");

    function pegarFornecedores(){
        return JSON.parse(localStorage.getItem("fornecedores")) || [];
    }

    function pegarInsumos(){
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function salvarInsumos(insumos){
        localStorage.setItem("insumos", JSON.stringify(insumos));
    }

    function carregarFornecedores(){
        const fornecedores = pegarFornecedores();

        selectFornecedor.innerHTML = `<option value="">Selecione o fornecedor</option>`;

        fornecedores.forEach(fornecedor => {
            selectFornecedor.innerHTML += `
                <option value="${fornecedor.nomeCompleto}">
                    ${fornecedor.nomeCompleto}
                </option>
            `;
        });
    }

    function definirCategoria(nome){
        const nomeMinusculo = nome.toLowerCase();

        if(
            nomeMinusculo.includes("camomila") ||
            nomeMinusculo.includes("hortelã") ||
            nomeMinusculo.includes("erva") ||
            nomeMinusculo.includes("capim")
        ){
            return "Ervas";
        }

        if(
            nomeMinusculo.includes("flor") ||
            nomeMinusculo.includes("calêndula") ||
            nomeMinusculo.includes("liz")
        ){
            return "Flores";
        }

        if(
            nomeMinusculo.includes("canela") ||
            nomeMinusculo.includes("gengibre") ||
            nomeMinusculo.includes("cravo")
        ){
            return "Especiarias";
        }

        if(
            nomeMinusculo.includes("lata") ||
            nomeMinusculo.includes("caixa") ||
            nomeMinusculo.includes("embalagem")
        ){
            return "Embalagem";
        }

        return "Outros";
    }

    function formatarMoeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function limparFormulario(){
        inputNome.value = "";
        inputValor.value = "";
        inputQuantidade.value = "";
        selectUnidade.selectedIndex = 0;
        selectFornecedor.selectedIndex = 0;
        inputValidade.value = "";
        inputEstoqueMinimo.value = "";
        textareaDescricao.value = "";
    }

    function renderizarTabelaInsumos(lista = null){
        const insumos = lista || pegarInsumos();

        tbodyInsumos.innerHTML = "";

        insumos.forEach(insumo => {
            tbodyInsumos.innerHTML += `
                <tr>
                    <td>${insumo.nome}</td>
                    <td>${insumo.categoria}</td>
                    <td>${insumo.quantidade} ${insumo.unidade}</td>
                    <td>${insumo.fornecedor}</td>
                    <td>${formatarMoeda(insumo.valor)}</td>
                </tr>
            `;
        });
    }

    function salvarNovoInsumo(){
        const novoInsumo = {
            id: Date.now(),
            nome: inputNome.value.trim(),
            categoria: definirCategoria(inputNome.value.trim()),
            valor: inputValor.value,
            quantidade: inputQuantidade.value,
            unidade: selectUnidade.value,
            fornecedor: selectFornecedor.value,
            validade: inputValidade.value,
            estoqueMinimo: inputEstoqueMinimo.value,
            descricao: textareaDescricao.value.trim(),
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        if(
            !novoInsumo.nome ||
            !novoInsumo.valor ||
            !novoInsumo.quantidade ||
            !novoInsumo.fornecedor ||
            !novoInsumo.validade ||
            !novoInsumo.estoqueMinimo
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const insumos = pegarInsumos();

        insumos.push(novoInsumo);

        salvarInsumos(insumos);

        limparFormulario();
        renderizarTabelaInsumos();

        alert("Insumo salvo com sucesso!");
    }

    function buscarInsumos(){
        const textoBusca = campoBusca.value.toLowerCase();

        const insumosFiltrados = pegarInsumos().filter(insumo => {
            return (
                insumo.nome.toLowerCase().includes(textoBusca) ||
                insumo.categoria.toLowerCase().includes(textoBusca)
            );
        });

        renderizarTabelaInsumos(insumosFiltrados);
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarNovoInsumo();
    });

    botaoCancelar.addEventListener("click", (event) => {
        event.preventDefault();
        limparFormulario();
    });

    campoBusca.addEventListener("input", buscarInsumos);

    carregarFornecedores();
    renderizarTabelaInsumos();
}


/*CADASTRO PARCEIROS */

const formularioParceiros = document.querySelector(".formularioParceiros");

if(formularioParceiros){

    const inputNomeParceiro = document.querySelector("#nomeParceiro");
    const inputCpfParceiro = document.querySelector("#cpfParceiro");
    const inputTelefoneParceiro = document.querySelector("#telefoneParceiro");
    const inputEmailParceiro = document.querySelector("#emailParceiro");
    const inputEnderecoParceiro = document.querySelector("#enderecoParceiro");
    const textareaObservacaoParceiro = document.querySelector("#observacaoParceiro");

    const botaoSalvarParceiro = formularioParceiros.querySelector(".botaoSalvar");
    const botaoCancelarParceiro = formularioParceiros.querySelector(".botaoCancelar");

    const tbodyParceiros = document.querySelector("#tbodyParceiros");
    const inputBuscarParceiro = document.querySelector("#buscarParceiro");

    const modalExcluirParceiro = document.querySelector(".fundoModalParceiro");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    let idParceiroParaExcluir = null;

    function pegarParceiros(){
        return JSON.parse(localStorage.getItem("parceiros")) || [];
    }

    function salvarParceiros(parceiros){
        localStorage.setItem("parceiros", JSON.stringify(parceiros));
    }

    function limparFormularioParceiro(){
        inputNomeParceiro.value = "";
        inputCpfParceiro.value = "";
        inputTelefoneParceiro.value = "";
        inputEmailParceiro.value = "";
        inputEnderecoParceiro.value = "";
        textareaObservacaoParceiro.value = "";
    }

    function renderizarParceiros(lista = null){
        const parceiros = lista || pegarParceiros();

        tbodyParceiros.innerHTML = "";

        parceiros.forEach(parceiro => {
            tbodyParceiros.innerHTML += `
                <tr>
                    <td>${parceiro.nome}</td>
                    <td>${parceiro.cpfCnpj}</td>
                    <td>${parceiro.telefone}</td>
                    <td>${parceiro.endereco}</td>
                    <td>${parceiro.email}</td>
                    <td>
                        <div class="iconesTabela">
                            <i class="iconeEditar"></i>
                            <i class="iconeExcluir" data-id="${parceiro.id}"></i>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    function salvarNovoParceiro(){
        const novoParceiro = {
            id: Date.now(),
            nome: inputNomeParceiro.value.trim(),
            cpfCnpj: inputCpfParceiro.value.trim(),
            telefone: inputTelefoneParceiro.value.trim(),
            email: inputEmailParceiro.value.trim(),
            endereco: inputEnderecoParceiro.value.trim(),
            observacao: textareaObservacaoParceiro.value.trim(),
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        if(
            !novoParceiro.nome ||
            !novoParceiro.cpfCnpj ||
            !novoParceiro.telefone ||
            !novoParceiro.email ||
            !novoParceiro.endereco
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const parceiros = pegarParceiros();

        parceiros.push(novoParceiro);
        salvarParceiros(parceiros);

        limparFormularioParceiro();
        renderizarParceiros();

        alert("Parceiro salvo com sucesso!");
    }

    function buscarParceiros(){
        const texto = inputBuscarParceiro.value.toLowerCase();

        const parceirosFiltrados = pegarParceiros().filter(parceiro => {
            return (
                parceiro.nome.toLowerCase().includes(texto) ||
                parceiro.cpfCnpj.toLowerCase().includes(texto)
            );
        });

        renderizarParceiros(parceirosFiltrados);
    }

    function abrirModalExcluir(id){
        const parceiro = pegarParceiros().find(parceiro => parceiro.id === id);

        if(!parceiro){
            return;
        }

        idParceiroParaExcluir = id;

        document.querySelector("#iniciaisParceiroModal").textContent =
            parceiro.nome.charAt(0).toUpperCase();

        document.querySelector("#nomeParceiroModal").textContent =
            parceiro.nome;

        document.querySelector("#cpfParceiroModal").textContent =
            parceiro.cpfCnpj;

        document.querySelector("#telefoneParceiroModal").textContent =
            parceiro.telefone;

        document.querySelector("#emailParceiroModal").textContent =
            parceiro.email;

        modalExcluirParceiro.showModal();
    }

    function excluirParceiro(){
        let parceiros = pegarParceiros();

        parceiros = parceiros.filter(parceiro => parceiro.id !== idParceiroParaExcluir);

        salvarParceiros(parceiros);

        modalExcluirParceiro.close();

        idParceiroParaExcluir = null;

        renderizarParceiros();
    }

    botaoSalvarParceiro.addEventListener("click", (event) => {
        event.preventDefault();
        salvarNovoParceiro();
    });

    botaoCancelarParceiro.addEventListener("click", (event) => {
        event.preventDefault();
        limparFormularioParceiro();
    });

    inputBuscarParceiro.addEventListener("input", buscarParceiros);

    tbodyParceiros.addEventListener("click", (event) => {
        if(event.target.classList.contains("iconeExcluir")){
            const id = Number(event.target.dataset.id);
            abrirModalExcluir(id);
        }
    });

    botaoCancelarModal.addEventListener("click", () => {
        modalExcluirParceiro.close();
    });

    botaoConfirmarExcluir.addEventListener("click", () => {
        excluirParceiro();
    });

    renderizarParceiros();
}


/* CADASTRO PRODUTOS */

const formularioProdutos = document.querySelector(".formularioProdutos");

if(formularioProdutos){

    const inputNomeProduto = document.querySelector("#nomeProduto");
    const selectReceitaProduto = document.querySelector("#receitaProduto");
    const inputQuantidadeProduto = document.querySelector("#quantidadeProduto");
    const inputMargemLucroProduto = document.querySelector("#margemLucroProduto");
    const inputValidadeProduto = document.querySelector("#validadeProduto");
    const inputEstoqueMinimoProduto = document.querySelector("#estoqueMinimoProduto");
    const textareaDescricaoProduto = document.querySelector("#descricaoProduto");

    const botaoSalvarProduto = formularioProdutos.querySelector(".botaoSalvar");
    const botaoCancelarProduto = formularioProdutos.querySelector(".botaoCancelar");

    const tbodyProdutos = document.querySelector("#tbodyProdutos");
    const inputBuscarProduto = document.querySelector("#buscarProduto");

    const modalProduto = document.querySelector(".fundoModalProduto");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    let idProdutoParaExcluir = null;

    function pegarProdutos(){
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function salvarProdutos(produtos){
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function pegarReceitas(){
        return JSON.parse(localStorage.getItem("receitas")) || [];
    }

    function carregarReceitas(){
        const receitas = pegarReceitas();

        selectReceitaProduto.innerHTML = `<option value="">Selecione uma receita</option>`;

        receitas.forEach(receita => {
            selectReceitaProduto.innerHTML += `
                <option value="${receita.id}">
                    ${receita.produto}
                </option>
            `;
        });
    }

    function nomeReceitaPorId(idReceita){
        const receitas = pegarReceitas();

        const receita = receitas.find(receita => String(receita.id) === String(idReceita));

        return receita ? receita.produto : "Sem receita";
    }

    function limparFormularioProduto(){
        inputNomeProduto.value = "";
        selectReceitaProduto.value = "";
        inputQuantidadeProduto.value = "";
        inputMargemLucroProduto.value = "";
        inputValidadeProduto.value = "";
        inputEstoqueMinimoProduto.value = "";
        textareaDescricaoProduto.value = "";
    }

    function renderizarProdutos(lista = null){
        const produtos = lista || pegarProdutos();

        tbodyProdutos.innerHTML = "";

        produtos.forEach(produto => {
            tbodyProdutos.innerHTML += `
                <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.nomeReceita}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.margemLucro}%</td>
                    <td>${produto.validade}</td>
                    <td>
                        <div class="iconesTabela">
                            <i class="iconeEditar"></i>
                            <i class="iconeExcluir" data-id="${produto.id}"></i>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    function salvarNovoProduto(){
        const novoProduto = {
            id: Date.now(),
            nome: inputNomeProduto.value.trim(),
            receita: selectReceitaProduto.value,
            nomeReceita: nomeReceitaPorId(selectReceitaProduto.value),
            quantidade: inputQuantidadeProduto.value.trim(),
            margemLucro: inputMargemLucroProduto.value.trim(),
            validade: inputValidadeProduto.value.trim(),
            estoqueMinimo: inputEstoqueMinimoProduto.value.trim(),
            descricao: textareaDescricaoProduto.value.trim(),
            valorUnitario: 0,
            precoVenda: 0,
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        if(
            !novoProduto.nome ||
            !novoProduto.receita ||
            !novoProduto.quantidade ||
            !novoProduto.margemLucro ||
            !novoProduto.validade ||
            !novoProduto.estoqueMinimo
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const produtos = pegarProdutos();

        produtos.push(novoProduto);

        salvarProdutos(produtos);

        limparFormularioProduto();
        renderizarProdutos();

        alert("Produto salvo com sucesso!");
    }

    function buscarProdutos(){
        const texto = inputBuscarProduto.value.toLowerCase();

        const filtrados = pegarProdutos().filter(produto => {
            return (
                produto.nome.toLowerCase().includes(texto) ||
                produto.nomeReceita.toLowerCase().includes(texto)
            );
        });

        renderizarProdutos(filtrados);
    }

    function abrirModalExcluir(id){
        const produto = pegarProdutos().find(produto => produto.id === id);

        if(!produto){
            return;
        }

        idProdutoParaExcluir = id;

        document.querySelector("#iniciaisProdutoModal").textContent =
            produto.nome.charAt(0).toUpperCase();

        document.querySelector("#nomeProdutoModal").textContent =
            produto.nome;

        document.querySelector("#receitaProdutoModal").textContent =
            produto.nomeReceita;

        document.querySelector("#quantidadeProdutoModal").textContent =
            `${produto.quantidade} unidades`;

        document.querySelector("#margemProdutoModal").textContent =
            `${produto.margemLucro}%`;

        modalProduto.showModal();
    }

    function excluirProduto(){
        let produtos = pegarProdutos();

        produtos = produtos.filter(produto => produto.id !== idProdutoParaExcluir);

        salvarProdutos(produtos);

        modalProduto.close();
        idProdutoParaExcluir = null;

        renderizarProdutos();
    }

    botaoSalvarProduto.addEventListener("click", (event) => {
        event.preventDefault();
        salvarNovoProduto();
    });

    botaoCancelarProduto.addEventListener("click", (event) => {
        event.preventDefault();
        limparFormularioProduto();
    });

    inputBuscarProduto.addEventListener("input", buscarProdutos);

    tbodyProdutos.addEventListener("click", (event) => {
        if(event.target.classList.contains("iconeExcluir")){
            const id = Number(event.target.dataset.id);
            abrirModalExcluir(id);
        }
    });

    botaoCancelarModal.addEventListener("click", () => {
        modalProduto.close();
    });

    botaoConfirmarExcluir.addEventListener("click", excluirProduto);

    carregarReceitas();
    renderizarProdutos();
}

/* CALCULAR PREÇO */

const paginaCalculoPreco = document.querySelector(".areaCalculoPreco");

if(paginaCalculoPreco){

    const selectProduto = document.querySelector("#produtoCalculo");
    const inputMargem = document.querySelector("#margemCalculo");
    const botaoDefinirPreco = document.querySelector(".botaoDefinirPreco");

    const avisoTitulo = document.querySelector(".avisoCalculo strong");
    const avisoTexto = document.querySelector(".avisoCalculo p");

    const precoSugerido = document.querySelector(".resultadoPrincipal h1");
    const resumoValores = document.querySelectorAll(".resumoMargem strong");
    const detalhes = document.querySelectorAll(".detalhesResultado strong");

    const graficoPizza = document.querySelector(".graficoPizza");
    const legendaGrafico = document.querySelector(".legendaGrafico");

    function pegarProdutos(){
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function salvarProdutos(produtos){
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function pegarReceitas(){
        return JSON.parse(localStorage.getItem("receitas")) || [];
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

    function carregarProdutosNoSelect(){
        const produtos = pegarProdutos();

        selectProduto.innerHTML = `<option value="">Selecione um produto...</option>`;

        produtos.forEach(produto => {
            selectProduto.innerHTML += `
                <option value="${produto.id}">
                    ${produto.nome}
                </option>
            `;
        });
    }

    function buscarProdutoSelecionado(){
        return pegarProdutos().find(produto =>
            String(produto.id) === String(selectProduto.value)
        );
    }

    function buscarReceitaDoProduto(produto){
        if(!produto){
            return null;
        }

        return pegarReceitas().find(receita =>
            String(receita.id) === String(produto.receita)
        );
    }

    function atualizarInfoProduto(){
        const produto = buscarProdutoSelecionado();
        const receita = buscarReceitaDoProduto(produto);

        if(!produto){
            return;
        }

        inputMargem.value = produto.margemLucro || 0;

        if(!receita){
            avisoTitulo.textContent = "Produto sem receita.";
            avisoTexto.textContent = "Esse produto não tem receita vinculada.";
            return;
        }

        const quantidadeInsumos = receita.insumos ? receita.insumos.length : 0;

        avisoTitulo.textContent = `Produto possui ${quantidadeInsumos} insumos.`;
        avisoTexto.textContent = `Custo unitário da receita: ${moeda(receita.custoUnitarioReceita)}.`;
    }

    function calcularPreco(){
        const produto = buscarProdutoSelecionado();
        const receita = buscarReceitaDoProduto(produto);

        if(!produto){
            alert("Selecione um produto.");
            return;
        }

        if(!receita){
            alert("Esse produto não tem receita vinculada.");
            return;
        }

        const margem = numero(inputMargem.value || produto.margemLucro);

        const custoUnitario = numero(receita.custoUnitarioReceita);
        const custoTotalReceita = numero(receita.custoTotalReceita);

        if(custoUnitario === 0){
            alert("O custo unitário da receita está R$ 0,00. Volte no cadastro de receitas e salve a receita novamente.");
            return;
        }

        const lucroUnidade = custoUnitario * (margem / 100);
        const precoVenda = custoUnitario + lucroUnidade;

        const porcentagemCusto = precoVenda > 0 ? (custoUnitario / precoVenda) * 100 : 0;
        const porcentagemLucro = precoVenda > 0 ? (lucroUnidade / precoVenda) * 100 : 0;
        const markup = custoUnitario > 0 ? (lucroUnidade / custoUnitario) * 100 : 0;

        precoSugerido.textContent = moeda(precoVenda);

        resumoValores[0].textContent = `${margem}%`;
        resumoValores[1].textContent = moeda(lucroUnidade);

        detalhes[0].textContent = moeda(custoUnitario);
        detalhes[1].textContent = `${margem}%`;
        detalhes[2].textContent = moeda(precoVenda);
        detalhes[3].textContent = `${markup.toFixed(2).replace(".", ",")}%`;

        graficoPizza.style.background = `
            conic-gradient(
                #ffffff 0% ${porcentagemCusto}%,
                #144621 ${porcentagemCusto}% 100%
            )
        `;

        legendaGrafico.innerHTML = `
            <div><span class="corCusto"></span>Custo ${porcentagemCusto.toFixed(0)}%</div>
            <div><span class="corLucro"></span>Lucro ${porcentagemLucro.toFixed(0)}%</div>
        `;

        const produtos = pegarProdutos();

        const produtoAtualizado = produtos.find(item =>
            String(item.id) === String(produto.id)
        );

        produtoAtualizado.valorUnitario = Number(precoVenda.toFixed(2));
        produtoAtualizado.precoVenda = Number(precoVenda.toFixed(2));
        produtoAtualizado.custoTotalReceita = Number(custoTotalReceita.toFixed(2));
        produtoAtualizado.custoPorUnidade = Number(custoUnitario.toFixed(2));
        produtoAtualizado.lucroPorUnidade = Number(lucroUnidade.toFixed(2));
        produtoAtualizado.markup = Number(markup.toFixed(2));
        produtoAtualizado.margemLucro = Number(margem);

        salvarProdutos(produtos);

        alert("Preço calculado e salvo!");
    }

    selectProduto.addEventListener("change", atualizarInfoProduto);

    botaoDefinirPreco.addEventListener("click", (event) => {
        event.preventDefault();
        calcularPreco();
    });

    carregarProdutosNoSelect();
}


/* CLIENTES CADASTRADOS */

const paginaClientes = document.querySelector(".clientesCadastrados");

if (paginaClientes) {
    const tbody = document.querySelector("#tbodyClientesCadastrados");
    const grade = document.querySelector(".gradeClientes");
    const tabela = document.querySelector(".clientesCadastrados");
    const buscar = document.querySelector("#buscarCliente");

    const botaoLista = document.querySelector(".botaoLista");
    const botaoCards = document.querySelector(".botaoCards");

    const modal = document.querySelector(".fundoModalCliente");
    const botaoCancelar = document.querySelector(".botaoCancelarModal");
    const botaoConfirmar = document.querySelector(".botaoConfirmarExcluir");

    let idClienteExcluir = null;

    function pegarClientes() {
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    function salvarClientes(clientes) {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    function iniciais(nome) {
        return nome
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function renderizarClientes(lista = pegarClientes()) {
        tbody.innerHTML = "";
        grade.innerHTML = "";

        lista.forEach(cliente => {
            tbody.innerHTML += `
                <tr>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <div class="acoes">
                            <a href="EditarCliente.html?id=${cliente.id}" class="iconeLapisTabela"></a>
                            <button type="button" class="iconeLixeiraTabela" data-id="${cliente.id}"></button>
                        </div>
                    </td>
                </tr>
            `;

            grade.innerHTML += `
                <article class="cardCliente">
                    <div class="topoCardCliente">
                        <div class="avatarGrande">${iniciais(cliente.nome)}</div>

                        <div>
                            <h3>${cliente.nome}</h3>
                            <p>${cliente.cpf}</p>
                        </div>
                    </div>

                    <div class="infosCardCliente">
                        <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                        <p><strong>E-mail:</strong> ${cliente.email}</p>
                        <p><strong>Endereço:</strong> ${cliente.endereco}</p>
                    </div>

                    <div class="acoesCard">
                        <a href="EditarCliente.html?id=${cliente.id}" class="iconeLapisTabela"></a>
                        <button type="button" class="iconeLixeiraTabela" data-id="${cliente.id}"></button>
                    </div>
                </article>
            `;
        });
    }

    function buscarClientes() {
        const texto = buscar.value.toLowerCase();

        const filtrados = pegarClientes().filter(cliente =>
            cliente.nome.toLowerCase().includes(texto) ||
            cliente.cpf.toLowerCase().includes(texto) ||
            cliente.email.toLowerCase().includes(texto)
        );

        renderizarClientes(filtrados);
    }

    function abrirModal(id) {
        const cliente = pegarClientes().find(cliente => cliente.id === id);

        if (!cliente) return;

        idClienteExcluir = id;

        document.querySelector("#iniciaisClienteModal").textContent = iniciais(cliente.nome);
        document.querySelector("#nomeClienteModal").textContent = cliente.nome;
        document.querySelector("#cpfClienteModal").textContent = cliente.cpf;
        document.querySelector("#telefoneClienteModal").textContent = cliente.telefone;
        document.querySelector("#emailClienteModal").textContent = cliente.email;

        modal.showModal();
    }

    function excluirCliente() {
        let clientes = pegarClientes();

        clientes = clientes.filter(cliente => cliente.id !== idClienteExcluir);

        salvarClientes(clientes);
        renderizarClientes();

        modal.close();
        idClienteExcluir = null;
    }

    buscar.addEventListener("input", buscarClientes);

    botaoLista.addEventListener("click", () => {
        tabela.style.display = "block";
        grade.style.display = "none";
    });

    botaoCards.addEventListener("click", () => {
        tabela.style.display = "none";
        grade.style.display = "grid";
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("iconeLixeiraTabela")) {
            const id = Number(event.target.dataset.id);
            abrirModal(id);
        }
    });

    botaoCancelar.addEventListener("click", () => {
        modal.close();
    });

    botaoConfirmar.addEventListener("click", excluirCliente);

    renderizarClientes();
}


/* FORNECEDORES CADASTRADOS */

const paginaFornecedores = document.querySelector(".fornecedoresCadastrados");

if(paginaFornecedores){

    const tbody = document.querySelector("#tbodyFornecedoresCadastrados");
    const grade = document.querySelector(".gradeFornecedores");
    const tabela = document.querySelector(".fornecedoresCadastrados");
    const buscar = document.querySelector("#buscarFornecedor");

    const botaoLista = document.querySelector(".botaoLista");
    const botaoCards = document.querySelector(".botaoCards");

    const modal = document.querySelector(".fundoModalFornecedor");
    const botaoCancelar = document.querySelector(".botaoCancelarModal");
    const botaoConfirmar = document.querySelector(".botaoConfirmarExcluir");

    let idFornecedorExcluir = null;

    function pegarFornecedores(){
        return JSON.parse(localStorage.getItem("fornecedores")) || [];
    }

    function salvarFornecedores(fornecedores){
        localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    }

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function renderizarFornecedores(lista = pegarFornecedores()){
        tbody.innerHTML = "";
        grade.innerHTML = "";

        lista.forEach(fornecedor => {
            tbody.innerHTML += `
                <tr>
                    <td>${fornecedor.nomeCompleto}</td>
                    <td>${fornecedor.cnpj}</td>
                    <td>${fornecedor.telefone}</td>
                    <td>${fornecedor.email}</td>
                    <td>${fornecedor.endereco}, ${fornecedor.numero}</td>
                    <td>
                        <div class="acoes">
                            <a href="EditarFornecedor.html?id=${fornecedor.id}" class="iconeLapisTabela"></a>
                            <button type="button" class="iconeLixeiraTabela" data-id="${fornecedor.id}"></button>
                        </div>
                    </td>
                </tr>
            `;

            grade.innerHTML += `
                <article class="cardFornecedor">
                    <div class="topoCardFornecedor">
                        <div class="avatarGrande">${iniciais(fornecedor.nomeCompleto)}</div>

                        <div class="infoPrincipalFornecedor">
                            <h3>${fornecedor.nomeCompleto}</h3>
                            <p>${fornecedor.cnpj}</p>
                        </div>
                    </div>

                    <div class="infosCardFornecedor">
                        <p><strong>Telefone:</strong> ${fornecedor.telefone}</p>
                        <p><strong>E-mail:</strong> ${fornecedor.email}</p>
                        <p><strong>Endereço:</strong> ${fornecedor.endereco}, ${fornecedor.numero}</p>
                        <p><strong>Categoria:</strong> ${fornecedor.categoriaFornecimento || "Não informado"}</p>
                    </div>

                    <div class="acoesCardFornecedor">
                        <a href="EditarFornecedor.html?id=${fornecedor.id}" class="iconeLapisTabela"></a>
                        <button type="button" class="iconeLixeiraTabela" data-id="${fornecedor.id}"></button>
                    </div>
                </article>
            `;
        });
    }

    function buscarFornecedores(){
        const texto = buscar.value.toLowerCase();

        const filtrados = pegarFornecedores().filter(fornecedor =>
            String(fornecedor.nomeCompleto).toLowerCase().includes(texto) ||
            String(fornecedor.cnpj).toLowerCase().includes(texto) ||
            String(fornecedor.email).toLowerCase().includes(texto) ||
            String(fornecedor.telefone).toLowerCase().includes(texto)
        );

        renderizarFornecedores(filtrados);
    }

    function abrirModal(id){
        const fornecedor = pegarFornecedores().find(fornecedor => fornecedor.id === id);

        if(!fornecedor){
            return;
        }

        idFornecedorExcluir = id;

        document.querySelector("#iniciaisFornecedorModal").textContent = iniciais(fornecedor.nomeCompleto);
        document.querySelector("#nomeFornecedorModal").textContent = fornecedor.nomeCompleto;
        document.querySelector("#cnpjFornecedorModal").textContent = fornecedor.cnpj;
        document.querySelector("#telefoneFornecedorModal").textContent = fornecedor.telefone;
        document.querySelector("#emailFornecedorModal").textContent = fornecedor.email;

        modal.showModal();
    }

    function excluirFornecedor(){
        let fornecedores = pegarFornecedores();

        fornecedores = fornecedores.filter(fornecedor => fornecedor.id !== idFornecedorExcluir);

        salvarFornecedores(fornecedores);
        renderizarFornecedores();

        modal.close();
        idFornecedorExcluir = null;
    }

    buscar.addEventListener("input", buscarFornecedores);

    botaoLista.addEventListener("click", () => {
        tabela.style.display = "block";
        grade.style.display = "none";

        botaoLista.classList.add("botaoAtivo");
        botaoCards.classList.remove("botaoAtivo");
    });

    botaoCards.addEventListener("click", () => {
        tabela.style.display = "none";
        grade.style.display = "grid";

        botaoCards.classList.add("botaoAtivo");
        botaoLista.classList.remove("botaoAtivo");
    });

    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("iconeLixeiraTabela")){
            const id = Number(event.target.dataset.id);
            abrirModal(id);
        }
    });

    botaoCancelar.addEventListener("click", () => {
        modal.close();
    });

    botaoConfirmar.addEventListener("click", excluirFornecedor);

    renderizarFornecedores();
}



/* ================= INSUMOS CADASTRADOS ================= */

const paginaInsumos = document.querySelector(".insumosCadastrados");

if (paginaInsumos) {

    const tbody = document.querySelector("#tbodyInsumosCadastrados");
    const grade = document.querySelector(".gradeInsumos");
    const tabela = document.querySelector(".insumosCadastrados");
    const buscar = document.querySelector("#buscarInsumoCadastrado");

    const botaoLista = document.querySelector(".botaoLista");
    const botaoCards = document.querySelector(".botaoCards");

    const modal = document.querySelector(".fundoModalInsumo");
    const botaoCancelar = document.querySelector(".botaoCancelarModal");
    const botaoConfirmar = document.querySelector(".botaoConfirmarExcluir");

    let idInsumoExcluir = null;

    function pegarInsumos() {
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function salvarInsumos(insumos) {
        localStorage.setItem("insumos", JSON.stringify(insumos));
    }

    function iniciais(nome) {
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function renderizarInsumos(lista = pegarInsumos()) {

        tbody.innerHTML = "";
        grade.innerHTML = "";

        lista.forEach(insumo => {

            tbody.innerHTML += `
                <tr>
                    <td>${insumo.nome}</td>
                    <td>${insumo.categoria}</td>
                    <td>${insumo.quantidade} ${insumo.unidade}</td>
                    <td>${insumo.fornecedor}</td>
                    <td>
                        <div class="acoes">
                            <a href="editarinsumos.html?id=${insumo.id}" class="iconeLapisTabela"></a>

                            <button
                                type="button"
                                class="iconeLixeiraTabela"
                                data-id="${insumo.id}">
                            </button>
                        </div>
                    </td>
                </tr>
            `;

            grade.innerHTML += `
                <article class="cardInsumo">

                    <div class="topoCardInsumo">

                        <div class="avatarGrande">
                            ${iniciais(insumo.nome)}
                        </div>

                        <div class="infoPrincipalInsumo">
                            <h3>${insumo.nome}</h3>
                            <p>${insumo.categoria}</p>
                        </div>

                    </div>

                    <div class="informacoesCardInsumo">

                        <p><strong>Quantidade:</strong> ${insumo.quantidade} ${insumo.unidade}</p>

                        <p><strong>Fornecedor:</strong> ${insumo.fornecedor}</p>

                        <p><strong>Valor:</strong> R$ ${Number(insumo.valor).toFixed(2).replace(".", ",")}</p>

                        <p><strong>Validade:</strong> ${insumo.validade}</p>

                    </div>

                    <div class="acoesCardInsumo">

                        <a href="editarinsumos.html?id=${insumo.id}" class="iconeLapisTabela"></a>

                        <button
                            type="button"
                            class="iconeLixeiraTabela"
                            data-id="${insumo.id}">
                        </button>

                    </div>

                </article>
            `;
        });

    }

    function buscarInsumos() {

        const texto = buscar.value.toLowerCase();

        const filtrados = pegarInsumos().filter(insumo =>

            String(insumo.nome).toLowerCase().includes(texto) ||
            String(insumo.categoria).toLowerCase().includes(texto) ||
            String(insumo.fornecedor).toLowerCase().includes(texto)

        );

        renderizarInsumos(filtrados);

    }

    function abrirModal(id) {

        const insumo = pegarInsumos().find(insumo => insumo.id === id);

        if (!insumo) return;

        idInsumoExcluir = id;

        document.querySelector("#iniciaisInsumoModal").textContent = iniciais(insumo.nome);

        document.querySelector("#nomeInsumoModal").textContent = insumo.nome;

        document.querySelector("#categoriaInsumoModal").textContent = insumo.categoria;

        document.querySelector("#quantidadeInsumoModal").textContent =
            `${insumo.quantidade} ${insumo.unidade}`;

        document.querySelector("#fornecedorInsumoModal").textContent =
            insumo.fornecedor;

        modal.showModal();

    }

    function excluirInsumo() {

        let insumos = pegarInsumos();

        insumos = insumos.filter(insumo => insumo.id !== idInsumoExcluir);

        salvarInsumos(insumos);

        renderizarInsumos();

        modal.close();

        idInsumoExcluir = null;

    }

    buscar.addEventListener("input", buscarInsumos);

    botaoLista.addEventListener("click", () => {

        tabela.style.display = "block";
        grade.style.display = "none";

        botaoLista.classList.add("botaoAtivo");
        botaoCards.classList.remove("botaoAtivo");

    });

    botaoCards.addEventListener("click", () => {

        tabela.style.display = "none";
        grade.style.display = "grid";

        botaoCards.classList.add("botaoAtivo");
        botaoLista.classList.remove("botaoAtivo");

    });

    document.addEventListener("click", (event) => {

        if (event.target.classList.contains("iconeLixeiraTabela")) {

            const id = Number(event.target.dataset.id);

            abrirModal(id);

        }

    });

    botaoCancelar.addEventListener("click", () => {
        modal.close();
    });

    botaoConfirmar.addEventListener("click", excluirInsumo);

    renderizarInsumos();

}


/* ================= PARCEIROS CADASTRADOS ================= */

const paginaParceiros = document.querySelector(".parceirosCadastrados");

if (paginaParceiros) {

    const tbody = document.querySelector("#tbodyParceirosCadastrados");
    const grade = document.querySelector(".gradeParceiros");
    const tabela = document.querySelector(".parceirosCadastrados");
    const buscar = document.querySelector("#buscarParceiroCadastrado");

    const botaoLista = document.querySelector(".botaoLista");
    const botaoCards = document.querySelector(".botaoCards");

    const modal = document.querySelector(".fundoModalParceiroCadastrado");
    const botaoCancelar = document.querySelector(".botaoCancelarModal");
    const botaoConfirmar = document.querySelector(".botaoConfirmarExcluir");

    let idParceiroExcluir = null;

    function pegarParceiros() {
        return JSON.parse(localStorage.getItem("parceiros")) || [];
    }

    function salvarParceiros(parceiros) {
        localStorage.setItem("parceiros", JSON.stringify(parceiros));
    }

    function iniciais(nome) {
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function pegarEndereco(parceiro) {
        return parceiro.endereco ||
               parceiro.endereço ||
               parceiro.logradouro ||
               parceiro.rua ||
               "Não informado";
    }

    function renderizarParceiros(lista = pegarParceiros()) {

        tbody.innerHTML = "";
        grade.innerHTML = "";

        lista.forEach(parceiro => {

            tbody.innerHTML += `
                <tr>
                    <td>${parceiro.nome || "Não informado"}</td>
                    <td>${parceiro.cpfCnpj || "Não informado"}</td>
                    <td>${parceiro.telefone || "Não informado"}</td>
                    <td>${parceiro.email || "Não informado"}</td>
                    <td>${pegarEndereco(parceiro)}</td>
                    <td>
                        <div class="acoes">
                            <a href="editarparceiro.html?id=${parceiro.id}" class="iconeLapisTabela"></a>

                            <button
                                type="button"
                                class="iconeLixeiraTabela"
                                data-id="${parceiro.id}">
                            </button>
                        </div>
                    </td>
                </tr>
            `;

            grade.innerHTML += `
                <article class="cardParceiro">

                    <div class="topoCardParceiro">

                        <div class="avatarGrande">
                            ${iniciais(parceiro.nome)}
                        </div>

                        <div class="infoPrincipalParceiro">
                            <h3>${parceiro.nome || "Não informado"}</h3>
                            <p>${parceiro.cpfCnpj || "Não informado"}</p>
                        </div>

                    </div>

                    <div class="informacoesCardParceiro">

                        <p><strong>Telefone:</strong> ${parceiro.telefone || "Não informado"}</p>

                        <p><strong>E-mail:</strong> ${parceiro.email || "Não informado"}</p>

                        <p><strong>Endereço:</strong> ${pegarEndereco(parceiro)}</p>

                    </div>

                    <div class="acoesCardParceiro">

                        <a href="editarparceiro.html?id=${parceiro.id}" class="iconeLapisTabela"></a>

                        <button
                            type="button"
                            class="iconeLixeiraTabela"
                            data-id="${parceiro.id}">
                        </button>

                    </div>

                </article>
            `;
        });

    }

    function buscarParceiros() {

        const texto = buscar.value.toLowerCase();

        const filtrados = pegarParceiros().filter(parceiro =>
            String(parceiro.nome || "").toLowerCase().includes(texto) ||
            String(parceiro.cpfCnpj || "").toLowerCase().includes(texto) ||
            String(parceiro.email || "").toLowerCase().includes(texto) ||
            String(pegarEndereco(parceiro)).toLowerCase().includes(texto)
        );

        renderizarParceiros(filtrados);

    }

    function abrirModal(id) {

        const parceiro = pegarParceiros().find(parceiro => parceiro.id === id);

        if (!parceiro) return;

        idParceiroExcluir = id;

        document.querySelector("#iniciaisParceiroCadastradoModal").textContent =
            iniciais(parceiro.nome);

        document.querySelector("#nomeParceiroCadastradoModal").textContent =
            parceiro.nome || "Não informado";

        document.querySelector("#cpfParceiroCadastradoModal").textContent =
            parceiro.cpfCnpj || "Não informado";

        document.querySelector("#telefoneParceiroCadastradoModal").textContent =
            parceiro.telefone || "Não informado";

        document.querySelector("#emailParceiroCadastradoModal").textContent =
            parceiro.email || "Não informado";

        modal.showModal();

    }

    function excluirParceiro() {

        let parceiros = pegarParceiros();

        parceiros = parceiros.filter(parceiro => parceiro.id !== idParceiroExcluir);

        salvarParceiros(parceiros);

        renderizarParceiros();

        modal.close();

        idParceiroExcluir = null;

    }

    buscar.addEventListener("input", buscarParceiros);

    botaoLista.addEventListener("click", () => {

        tabela.style.display = "block";
        grade.style.display = "none";

        botaoLista.classList.add("botaoAtivo");
        botaoCards.classList.remove("botaoAtivo");

    });

    botaoCards.addEventListener("click", () => {

        tabela.style.display = "none";
        grade.style.display = "grid";

        botaoCards.classList.add("botaoAtivo");
        botaoLista.classList.remove("botaoAtivo");

    });

    document.addEventListener("click", (event) => {

        if (event.target.classList.contains("iconeLixeiraTabela")) {

            const id = Number(event.target.dataset.id);

            abrirModal(id);

        }

    });

    botaoCancelar.addEventListener("click", () => {
        modal.close();
    });

    botaoConfirmar.addEventListener("click", excluirParceiro);

    renderizarParceiros();

}

/* ================= PRODUTOS CADASTRADOS ================= */

const paginaProdutos = document.querySelector(".produtosCadastrados");

if (paginaProdutos) {

    const tbody = document.querySelector("#tbodyProdutosCadastrados");
    const grade = document.querySelector(".gradeProdutos");
    const tabela = document.querySelector(".produtosCadastrados");
    const buscar = document.querySelector("#buscarProdutoCadastrado");

    const botaoLista = document.querySelector(".botaoLista");
    const botaoCards = document.querySelector(".botaoCards");

    const modal = document.querySelector(".fundoModalProdutoCadastrado");
    const botaoCancelar = document.querySelector(".botaoCancelarModal");
    const botaoConfirmar = document.querySelector(".botaoConfirmarExcluir");

    let idProdutoExcluir = null;

    function pegarProdutos() {
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function salvarProdutos(produtos) {
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function iniciais(nome) {
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function moeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function abrirModalProduto(produto) {

        const campoIniciais = document.querySelector("#iniciaisProdutoCadastradoModal");
        const campoNome = document.querySelector("#nomeProdutoCadastradoModal");
        const campoReceita = document.querySelector("#receitaProdutoCadastradoModal");
        const campoQuantidade = document.querySelector("#quantidadeProdutoCadastradoModal");
        const campoValor = document.querySelector("#valorProdutoCadastradoModal");

        if (campoIniciais) {
            campoIniciais.textContent = iniciais(produto.nome);
        }

        if (campoNome) {
            campoNome.textContent = produto.nome || "Não informado";
        }

        if (campoReceita) {
            campoReceita.textContent = produto.nomeReceita || "Sem receita";
        }

        if (campoQuantidade) {
            campoQuantidade.textContent = `${produto.quantidade || 0} unidades`;
        }

        if (campoValor) {
            campoValor.textContent = moeda(produto.valorUnitario || produto.precoVenda);
        }

        if (modal && typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            alert("Modal de produto não encontrado. Verifique se no HTML está como: <dialog class='fundoModal fundoModalProdutoCadastrado'>");
        }
    }

    function renderizarProdutos(lista = pegarProdutos()) {

        tbody.innerHTML = "";
        grade.innerHTML = "";

        lista.forEach(produto => {

            tbody.innerHTML += `
                <tr>
                    <td>${produto.nome || "Não informado"}</td>
                    <td>${produto.nomeReceita || "Sem receita"}</td>
                    <td>${produto.quantidade || "0"}</td>
                    <td>${moeda(produto.valorUnitario || produto.precoVenda)}</td>
                    <td>${produto.margemLucro || 0}%</td>
                    <td>
                        <div class="acoes">
                            <a href="editarproduto.html?id=${produto.id}" class="iconeLapisTabela"></a>

                            <button
                                type="button"
                                class="iconeLixeiraTabela"
                                data-id="${produto.id}">
                            </button>
                        </div>
                    </td>
                </tr>
            `;

            grade.innerHTML += `
                <article class="cardProduto">

                    <div class="topoCardProduto">

                        <div class="avatarGrande">
                            ${iniciais(produto.nome)}
                        </div>

                        <div class="infoPrincipalProduto">
                            <h3>${produto.nome || "Não informado"}</h3>
                            <p>${produto.nomeReceita || "Sem receita"}</p>
                        </div>

                    </div>

                    <div class="informacoesCardProduto">

                        <p><strong>Quantidade:</strong> ${produto.quantidade || "0"}</p>

                        <p><strong>Valor unitário:</strong> ${moeda(produto.valorUnitario || produto.precoVenda)}</p>

                        <p><strong>Margem de lucro:</strong> ${produto.margemLucro || 0}%</p>

                        <p><strong>Validade:</strong> ${produto.validade || "Não informado"}</p>

                    </div>

                    <div class="acoesCardProduto">

                        <a href="editarproduto.html?id=${produto.id}" class="iconeLapisTabela"></a>

                        <button
                            type="button"
                            class="iconeLixeiraTabela"
                            data-id="${produto.id}">
                        </button>

                    </div>

                </article>
            `;
        });

    }

    function buscarProdutos() {

        const texto = buscar.value.toLowerCase();

        const filtrados = pegarProdutos().filter(produto =>
            String(produto.nome || "").toLowerCase().includes(texto) ||
            String(produto.nomeReceita || "").toLowerCase().includes(texto) ||
            String(produto.validade || "").toLowerCase().includes(texto)
        );

        renderizarProdutos(filtrados);
    }

    function abrirModal(id) {

        const produto = pegarProdutos().find(produto => produto.id === id);

        if (!produto) {
            alert("Produto não encontrado.");
            return;
        }

        idProdutoExcluir = id;

        abrirModalProduto(produto);
    }

    function excluirProduto() {

        let produtos = pegarProdutos();

        produtos = produtos.filter(produto => produto.id !== idProdutoExcluir);

        salvarProdutos(produtos);

        renderizarProdutos();

        if (modal) {
            modal.close();
        }

        idProdutoExcluir = null;
    }

    if (buscar) {
        buscar.addEventListener("input", buscarProdutos);
    }

    if (botaoLista) {
        botaoLista.addEventListener("click", () => {

            tabela.style.display = "block";
            grade.style.display = "none";

            botaoLista.classList.add("botaoAtivo");
            botaoCards.classList.remove("botaoAtivo");

        });
    }

    if (botaoCards) {
        botaoCards.addEventListener("click", () => {

            tabela.style.display = "none";
            grade.style.display = "grid";

            botaoCards.classList.add("botaoAtivo");
            botaoLista.classList.remove("botaoAtivo");

        });
    }

    document.addEventListener("click", (event) => {

        if (event.target.classList.contains("iconeLixeiraTabela")) {

            const id = Number(event.target.dataset.id);

            abrirModal(id);
        }

    });

    if (botaoCancelar) {
        botaoCancelar.addEventListener("click", () => {
            modal.close();
        });
    }

    if (botaoConfirmar) {
        botaoConfirmar.addEventListener("click", excluirProduto);
    }

    renderizarProdutos();
}


/* ================= EDITAR CLIENTE ================= */

const paginaEditarCliente = document.querySelector(".formularioEditarCliente");

if(paginaEditarCliente){

    const parametros = new URLSearchParams(window.location.search);
    const idCliente = Number(parametros.get("id"));

    const inputNome = document.querySelector("#editarNomeCliente");
    const inputCpf = document.querySelector("#editarCpfCliente");
    const inputTelefone = document.querySelector("#editarTelefoneCliente");
    const inputEmail = document.querySelector("#editarEmailCliente");
    const inputEndereco = document.querySelector("#editarEnderecoCliente");
    const textareaObservacao = document.querySelector("#editarObservacaoCliente");

    const botaoSalvar = paginaEditarCliente.querySelector(".botaoSalvar");
    const botaoCancelar = paginaEditarCliente.querySelector(".botaoCancelar");

    const avatarCliente = document.querySelector("#avatarEditarCliente");
    const nomeResumoCliente = document.querySelector("#nomeResumoCliente");
    const telefoneResumoCliente = document.querySelector("#telefoneResumoCliente");
    const emailResumoCliente = document.querySelector("#emailResumoCliente");
    const enderecoResumoCliente = document.querySelector("#enderecoResumoCliente");
    const dataCadastroCliente = document.querySelector("#dataCadastroCliente");

    const tbodyHistorico = document.querySelector("#tbodyHistoricoCliente");

    const totalPedidosCliente = document.querySelector("#totalPedidosCliente");
    const valorTotalCliente = document.querySelector("#valorTotalCliente");
    const ultimoPedidoCliente = document.querySelector("#ultimoPedidoCliente");

    function pegarClientes(){
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    function salvarClientes(clientes){
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Laura" };
    }

    function pegarSaidasClientes(){
        return JSON.parse(localStorage.getItem("saidasClientes")) || [];
    }

    function formatarMoeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function buscarCliente(){
        return pegarClientes().find(cliente => Number(cliente.id) === idCliente);
    }

    function preencherFormulario(cliente){
        inputNome.value = cliente.nome || "";
        inputCpf.value = cliente.cpf || "";
        inputTelefone.value = cliente.telefone || "";
        inputEmail.value = cliente.email || "";
        inputEndereco.value = cliente.endereco || "";
        textareaObservacao.value = cliente.observacao || "";
    }

    function preencherPerfil(cliente){
        avatarCliente.textContent = iniciais(cliente.nome);
        nomeResumoCliente.textContent = cliente.nome || "Cliente";

        telefoneResumoCliente.innerHTML = `<i class="iconeTelefone"></i> ${cliente.telefone || "Telefone não informado"}`;
        emailResumoCliente.innerHTML = `<i class="iconeCarta"></i> ${cliente.email || "E-mail não informado"}`;
        enderecoResumoCliente.innerHTML = `<i class="iconeCasa"></i> ${cliente.endereco || "Endereço não informado"}`;

        dataCadastroCliente.textContent = cliente.criadoEm || "Não informado";
    }

    function preencherHistorico(cliente){
        tbodyHistorico.innerHTML = "";

        if(!cliente.historico){
            cliente.historico = [
                {
                    data: cliente.criadoEm || "Não informado",
                    tipo: "Cadastro",
                    descricao: cliente.observacao || "Cliente cadastrado no sistema.",
                    usuario: "Laura"
                }
            ];
        }

        cliente.historico.forEach(item => {
            tbodyHistorico.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.descricao}</td>
                    <td>${item.usuario}</td>
                </tr>
            `;
        });
    }

    function preencherResumo(cliente){
        const saidas = pegarSaidasClientes();

        const saidasDoCliente = saidas.filter(saida =>
            String(saida.cliente || saida.nomeCliente || "").toLowerCase() ===
            String(cliente.nome || "").toLowerCase()
        );

        const totalPedidos = saidasDoCliente.length;

        const valorTotal = saidasDoCliente.reduce((soma, saida) => {
            return soma + Number(saida.valorTotal || saida.total || saida.valorFinal || 0);
        }, 0);

        const ultimoPedido = saidasDoCliente.length > 0
            ? saidasDoCliente[saidasDoCliente.length - 1].data || saidasDoCliente[saidasDoCliente.length - 1].criadoEm
            : "--/--/----";

        totalPedidosCliente.textContent = totalPedidos;
        valorTotalCliente.textContent = formatarMoeda(valorTotal);
        ultimoPedidoCliente.textContent = ultimoPedido || "--/--/----";
    }

    function carregarPagina(){
        const cliente = buscarCliente();

        if(!cliente){
            alert("Cliente não encontrado.");
            window.location.href = "clientescadastrados.html";
            return;
        }

        preencherFormulario(cliente);
        preencherPerfil(cliente);
        preencherHistorico(cliente);
        preencherResumo(cliente);
    }

    function salvarAlteracoes(){
        const clientes = pegarClientes();
        const cliente = clientes.find(cliente => Number(cliente.id) === idCliente);

        if(!cliente){
            alert("Cliente não encontrado.");
            return;
        }

        const usuarioLogado = pegarUsuarioLogado();

        cliente.nome = inputNome.value.trim();
        cliente.cpf = inputCpf.value.trim();
        cliente.telefone = inputTelefone.value.trim();
        cliente.email = inputEmail.value.trim();
        cliente.endereco = inputEndereco.value.trim();
        cliente.observacao = textareaObservacao.value.trim();

        if(!cliente.nome || !cliente.cpf || !cliente.telefone || !cliente.email || !cliente.endereco){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if(!cliente.historico){
            cliente.historico = [];
        }

        cliente.historico.push({
            data: new Date().toLocaleString("pt-BR"),
            tipo: "Atualização",
            descricao: cliente.observacao || "Dados do cliente atualizados.",
            usuario: usuarioLogado.nome || "Laura"
        });

        salvarClientes(clientes);

        preencherPerfil(cliente);
        preencherHistorico(cliente);
        preencherResumo(cliente);

        alert("Cliente atualizado com sucesso!");
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarAlteracoes();
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "clientescadastrados.html";
    });

    carregarPagina();
}

/* ================= EDITAR FORNECEDOR ================= */

const paginaEditarFornecedor = document.querySelector(".formularioEditarFornecedor");

if(paginaEditarFornecedor){

    const parametros = new URLSearchParams(window.location.search);
    const idFornecedor = Number(parametros.get("id"));

    const inputNome = document.querySelector("#editarNomeFornecedor");
    const inputCnpj = document.querySelector("#editarCnpjFornecedor");
    const inputTelefone = document.querySelector("#editarTelefoneFornecedor");
    const inputEmail = document.querySelector("#editarEmailFornecedor");
    const inputRazaoSocial = document.querySelector("#editarRazaoSocialFornecedor");

    const selectEstado = document.querySelector("#editarEstadoFornecedor");
    const selectCidade = document.querySelector("#editarCidadeFornecedor");
    const inputEndereco = document.querySelector("#editarEnderecoFornecedor");
    const inputNumero = document.querySelector("#editarNumeroFornecedor");

    const selectCategoria = document.querySelector("#editarCategoriaFornecedor");
    const inputPagamento = document.querySelector("#editarPagamentoFornecedor");
    const textareaObservacao = document.querySelector("#editarObservacaoFornecedor");

    const botaoSalvar = paginaEditarFornecedor.querySelector(".botaoSalvar");
    const botaoCancelar = paginaEditarFornecedor.querySelector(".botaoCancelar");

    const avatarFornecedor = document.querySelector("#avatarEditarFornecedor");
    const nomeResumoFornecedor = document.querySelector("#nomeResumoFornecedor");
    const telefoneResumoFornecedor = document.querySelector("#telefoneResumoFornecedor");
    const emailResumoFornecedor = document.querySelector("#emailResumoFornecedor");
    const enderecoResumoFornecedor = document.querySelector("#enderecoResumoFornecedor");
    const categoriaResumoFornecedor = document.querySelector("#categoriaResumoFornecedor");
    const dataCadastroFornecedor = document.querySelector("#dataCadastroFornecedor");

    const tbodyHistorico = document.querySelector("#tbodyHistoricoFornecedor");

    const totalPedidosFornecedor = document.querySelector("#totalPedidosFornecedor");
    const valorTotalFornecedor = document.querySelector("#valorTotalFornecedor");
    const ultimoPedidoFornecedor = document.querySelector("#ultimoPedidoFornecedor");

    const botaoExcluir = document.querySelector(".perfilFornecedor .botaoExcluir");
    const modalExcluir = document.querySelector(".fundoModalEditarFornecedor");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    function pegarFornecedores(){
        return JSON.parse(localStorage.getItem("fornecedores")) || [];
    }

    function salvarFornecedores(fornecedores){
        localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Laura" };
    }

    function pegarSaidasFornecedores(){
        return JSON.parse(localStorage.getItem("saidasFornecedores")) || [];
    }

    function formatarMoeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function enderecoCompleto(fornecedor){
        const endereco = fornecedor.endereco || "";
        const numero = fornecedor.numero || "";
        const cidade = fornecedor.cidade || "";
        const estado = fornecedor.estado || "";

        return `${endereco}, ${numero} - ${cidade} - ${estado}`;
    }

    function buscarFornecedor(){
        return pegarFornecedores().find(fornecedor =>
            Number(fornecedor.id) === idFornecedor
        );
    }

    function preencherFormulario(fornecedor){
        inputNome.value = fornecedor.nomeCompleto || "";
        inputCnpj.value = fornecedor.cnpj || "";
        inputTelefone.value = fornecedor.telefone || "";
        inputEmail.value = fornecedor.email || "";
        inputRazaoSocial.value = fornecedor.razaoSocial || "";

        selectEstado.value = fornecedor.estado || "";
        selectCidade.value = fornecedor.cidade || "";
        inputEndereco.value = fornecedor.endereco || "";
        inputNumero.value = fornecedor.numero || "";

        selectCategoria.value = fornecedor.categoriaFornecimento || "";
        inputPagamento.value = fornecedor.condicoesPagamento || "";
        textareaObservacao.value = fornecedor.observacao || "";
    }

    function preencherPerfil(fornecedor){
        avatarFornecedor.textContent = iniciais(fornecedor.nomeCompleto);

        nomeResumoFornecedor.textContent =
            fornecedor.nomeCompleto || "Fornecedor";

        telefoneResumoFornecedor.innerHTML =
            `<i class="iconeTelefone"></i> ${fornecedor.telefone || "Telefone não informado"}`;

        emailResumoFornecedor.innerHTML =
            `<i class="iconeCarta"></i> ${fornecedor.email || "E-mail não informado"}`;

        enderecoResumoFornecedor.innerHTML =
            `<i class="iconeCasa"></i> ${enderecoCompleto(fornecedor) || "Endereço não informado"}`;

        categoriaResumoFornecedor.innerHTML =
            `<i class="iconeTag"></i> ${fornecedor.categoriaFornecimento || "Categoria não informada"}`;

        dataCadastroFornecedor.textContent =
            fornecedor.criadoEm || "Não informado";
    }

    function preencherHistorico(fornecedor){
        tbodyHistorico.innerHTML = "";

        if(!fornecedor.historico){
            fornecedor.historico = [
                {
                    data: fornecedor.criadoEm || "Não informado",
                    tipo: "Cadastro",
                    descricao: fornecedor.observacao || "Fornecedor cadastrado no sistema.",
                    usuario: "Laura"
                }
            ];
        }

        fornecedor.historico.forEach(item => {
            tbodyHistorico.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.descricao}</td>
                    <td>${item.usuario}</td>
                </tr>
            `;
        });
    }

    function preencherResumo(fornecedor){
        const saidas = pegarSaidasFornecedores();

        const saidasDoFornecedor = saidas.filter(saida =>
            String(saida.fornecedor || saida.nomeFornecedor || "").toLowerCase() ===
            String(fornecedor.nomeCompleto || "").toLowerCase()
        );

        const totalPedidos = saidasDoFornecedor.length;

        const valorTotal = saidasDoFornecedor.reduce((soma, saida) => {
            return soma + Number(saida.valorTotal || saida.total || saida.valorFinal || 0);
        }, 0);

        const ultimoPedido = saidasDoFornecedor.length > 0
            ? saidasDoFornecedor[saidasDoFornecedor.length - 1].data ||
              saidasDoFornecedor[saidasDoFornecedor.length - 1].criadoEm
            : "--/--/----";

        totalPedidosFornecedor.textContent = totalPedidos;
        valorTotalFornecedor.textContent = formatarMoeda(valorTotal);
        ultimoPedidoFornecedor.textContent = ultimoPedido || "--/--/----";
    }

    function carregarPagina(){
        if(!idFornecedor){
            alert("Nenhum fornecedor foi selecionado.");
            window.location.href = "fornecedorescadastrados.html";
            return;
        }

        const fornecedor = buscarFornecedor();

        if(!fornecedor){
            alert("Fornecedor não encontrado.");
            window.location.href = "fornecedorescadastrados.html";
            return;
        }

        preencherFormulario(fornecedor);
        preencherPerfil(fornecedor);
        preencherHistorico(fornecedor);
        preencherResumo(fornecedor);
    }

    function salvarAlteracoes(){
        const fornecedores = pegarFornecedores();

        const fornecedor = fornecedores.find(fornecedor =>
            Number(fornecedor.id) === idFornecedor
        );

        if(!fornecedor){
            alert("Fornecedor não encontrado.");
            return;
        }

        fornecedor.nomeCompleto = inputNome.value.trim();
        fornecedor.cnpj = inputCnpj.value.trim();
        fornecedor.telefone = inputTelefone.value.trim();
        fornecedor.email = inputEmail.value.trim();
        fornecedor.razaoSocial = inputRazaoSocial.value.trim();

        fornecedor.estado = selectEstado.value;
        fornecedor.cidade = selectCidade.value;
        fornecedor.endereco = inputEndereco.value.trim();
        fornecedor.numero = inputNumero.value.trim();

        fornecedor.categoriaFornecimento = selectCategoria.value;
        fornecedor.condicoesPagamento = inputPagamento.value.trim();
        fornecedor.observacao = textareaObservacao.value.trim();

        if(
            !fornecedor.nomeCompleto ||
            !fornecedor.cnpj ||
            !fornecedor.telefone ||
            !fornecedor.email ||
            !fornecedor.razaoSocial ||
            !fornecedor.estado ||
            !fornecedor.cidade ||
            !fornecedor.endereco ||
            !fornecedor.numero
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const usuarioLogado = pegarUsuarioLogado();

        if(!fornecedor.historico){
            fornecedor.historico = [];
        }

        fornecedor.historico.push({
            data: new Date().toLocaleString("pt-BR"),
            tipo: "Atualização",
            descricao: fornecedor.observacao || "Dados do fornecedor atualizados.",
            usuario: usuarioLogado.nome || "Laura"
        });

        salvarFornecedores(fornecedores);

        preencherPerfil(fornecedor);
        preencherHistorico(fornecedor);
        preencherResumo(fornecedor);

        alert("Fornecedor atualizado com sucesso!");
    }

    function abrirModalExcluir(){
        const fornecedor = buscarFornecedor();

        if(!fornecedor){
            return;
        }

        document.querySelector("#iniciaisFornecedorEditarModal").textContent =
            iniciais(fornecedor.nomeCompleto);

        document.querySelector("#nomeFornecedorEditarModal").textContent =
            fornecedor.nomeCompleto || "Fornecedor";

        document.querySelector("#cnpjFornecedorEditarModal").textContent =
            fornecedor.cnpj || "CNPJ não informado";

        document.querySelector("#telefoneFornecedorEditarModal").textContent =
            fornecedor.telefone || "Telefone não informado";

        document.querySelector("#emailFornecedorEditarModal").textContent =
            fornecedor.email || "E-mail não informado";

        modalExcluir.showModal();
    }

    function excluirFornecedor(){
        let fornecedores = pegarFornecedores();

        fornecedores = fornecedores.filter(fornecedor =>
            Number(fornecedor.id) !== idFornecedor
        );

        salvarFornecedores(fornecedores);

        modalExcluir.close();

        alert("Fornecedor excluído com sucesso!");

        window.location.href = "fornecedorescadastrados.html";
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarAlteracoes();
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "fornecedorescadastrados.html";
    });

    botaoExcluir.addEventListener("click", abrirModalExcluir);

    botaoCancelarModal.addEventListener("click", () => {
        modalExcluir.close();
    });

    botaoConfirmarExcluir.addEventListener("click", excluirFornecedor);

    carregarPagina();
}


/* ================= EDITAR INSUMO ================= */

const paginaEditarInsumo = document.querySelector(".formularioEditarInsumo");

if(paginaEditarInsumo){

    const parametros = new URLSearchParams(window.location.search);
    const idInsumo = Number(parametros.get("id"));

    const inputNome = document.querySelector("#editarNomeInsumo");
    const inputValor = document.querySelector("#editarValorInsumo");
    const inputQuantidade = document.querySelector("#editarQuantidadeInsumo");
    const selectUnidade = document.querySelector("#editarUnidadeInsumo");
    const selectFornecedor = document.querySelector("#editarFornecedorInsumo");
    const inputValidade = document.querySelector("#editarValidadeInsumo");
    const inputEstoqueMinimo = document.querySelector("#editarEstoqueMinimoInsumo");
    const inputCategoria = document.querySelector("#editarCategoriaInsumo");
    const textareaDescricao = document.querySelector("#editarDescricaoInsumo");

    const botaoSalvar = paginaEditarInsumo.querySelector(".botaoSalvar");
    const botaoCancelar = paginaEditarInsumo.querySelector(".botaoCancelar");

    const avatarInsumo = document.querySelector("#avatarEditarInsumo");
    const nomeResumoInsumo = document.querySelector("#nomeResumoInsumo");
    const categoriaResumoInsumo = document.querySelector("#categoriaResumoInsumo");
    const quantidadeResumoInsumo = document.querySelector("#quantidadeResumoInsumo");
    const fornecedorResumoInsumo = document.querySelector("#fornecedorResumoInsumo");
    const valorResumoInsumo = document.querySelector("#valorResumoInsumo");
    const dataCadastroInsumo = document.querySelector("#dataCadastroInsumo");

    const tbodyHistorico = document.querySelector("#tbodyHistoricoInsumo");

    const totalEstoqueInsumo = document.querySelector("#totalEstoqueInsumo");
    const estoqueMinimoResumoInsumo = document.querySelector("#estoqueMinimoResumoInsumo");
    const validadeResumoInsumo = document.querySelector("#validadeResumoInsumo");
    const statusResumoInsumo = document.querySelector("#statusResumoInsumo");

    const botaoExcluir = document.querySelector(".perfilInsumo .botaoExcluir");
    const modalExcluir = document.querySelector(".fundoModalEditarInsumo");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    function pegarInsumos(){
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function salvarInsumos(insumos){
        localStorage.setItem("insumos", JSON.stringify(insumos));
    }

    function pegarFornecedores(){
        return JSON.parse(localStorage.getItem("fornecedores")) || [];
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Laura" };
    }

    function formatarMoeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function buscarInsumo(){
        return pegarInsumos().find(insumo =>
            Number(insumo.id) === idInsumo
        );
    }

    function carregarFornecedores(){
        const fornecedores = pegarFornecedores();

        selectFornecedor.innerHTML = `<option value="">Selecione o fornecedor</option>`;

        fornecedores.forEach(fornecedor => {
            selectFornecedor.innerHTML += `
                <option value="${fornecedor.nomeCompleto}">
                    ${fornecedor.nomeCompleto}
                </option>
            `;
        });
    }

    function statusDoInsumo(insumo){
        const quantidade = Number(insumo.quantidade || 0);
        const minimo = Number(insumo.estoqueMinimo || 0);

        if(quantidade <= 0){
            return "Esgotado";
        }

        if(quantidade <= minimo){
            return "Estoque baixo";
        }

        return "Disponível";
    }

    function preencherFormulario(insumo){
        inputNome.value = insumo.nome || "";
        inputValor.value = insumo.valor || "";
        inputQuantidade.value = insumo.quantidade || "";
        selectUnidade.value = insumo.unidade || "";
        selectFornecedor.value = insumo.fornecedor || "";
        inputValidade.value = insumo.validade || "";
        inputEstoqueMinimo.value = insumo.estoqueMinimo || "";
        inputCategoria.value = insumo.categoria || "";
        textareaDescricao.value = insumo.descricao || "";
    }

    function preencherPerfil(insumo){
        avatarInsumo.textContent = iniciais(insumo.nome);
        nomeResumoInsumo.textContent = insumo.nome || "Insumo";

        categoriaResumoInsumo.innerHTML =
            `<i class="iconeTag"></i> ${insumo.categoria || "Categoria não informada"}`;

        quantidadeResumoInsumo.innerHTML =
            `<i class="iconeBalaca"></i> ${insumo.quantidade || 0} ${insumo.unidade || ""}`;

        fornecedorResumoInsumo.innerHTML =
            `<i class="iconePrancheta"></i> ${insumo.fornecedor || "Fornecedor não informado"}`;

        valorResumoInsumo.innerHTML =
            `<i class="iconemoeda"></i> ${formatarMoeda(insumo.valor)}`;

        dataCadastroInsumo.textContent =
            insumo.criadoEm || "Não informado";
    }

    function preencherHistorico(insumo){
        tbodyHistorico.innerHTML = "";

        if(!insumo.historico){
            insumo.historico = [
                {
                    data: insumo.criadoEm || "Não informado",
                    tipo: "Cadastro",
                    descricao: insumo.descricao || "Insumo cadastrado no sistema.",
                    usuario: "Laura"
                }
            ];
        }

        insumo.historico.forEach(item => {
            tbodyHistorico.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.descricao}</td>
                    <td>${item.usuario}</td>
                </tr>
            `;
        });
    }

    function preencherResumo(insumo){
        const status = statusDoInsumo(insumo);

        totalEstoqueInsumo.textContent =
            `${insumo.quantidade || 0} ${insumo.unidade || ""}`;

        estoqueMinimoResumoInsumo.textContent =
            `${insumo.estoqueMinimo || 0} ${insumo.unidade || ""}`;

        validadeResumoInsumo.textContent =
            insumo.validade || "--/--/----";

        statusResumoInsumo.textContent = status;
    }

    function carregarPagina(){
        if(!idInsumo){
            alert("Nenhum insumo foi selecionado.");
            window.location.href = "InsumosCadastrados.html";
            return;
        }

        carregarFornecedores();

        const insumo = buscarInsumo();

        if(!insumo){
            alert("Insumo não encontrado.");
            window.location.href = "InsumosCadastrados.html";
            return;
        }

        preencherFormulario(insumo);
        preencherPerfil(insumo);
        preencherHistorico(insumo);
        preencherResumo(insumo);
    }

    function salvarAlteracoes(){
        const insumos = pegarInsumos();

        const insumo = insumos.find(insumo =>
            Number(insumo.id) === idInsumo
        );

        if(!insumo){
            alert("Insumo não encontrado.");
            return;
        }

        insumo.nome = inputNome.value.trim();
        insumo.valor = inputValor.value.trim();
        insumo.quantidade = inputQuantidade.value.trim();
        insumo.unidade = selectUnidade.value;
        insumo.fornecedor = selectFornecedor.value;
        insumo.validade = inputValidade.value;
        insumo.estoqueMinimo = inputEstoqueMinimo.value.trim();
        insumo.categoria = inputCategoria.value.trim();
        insumo.descricao = textareaDescricao.value.trim();

        if(
            !insumo.nome ||
            !insumo.valor ||
            !insumo.quantidade ||
            !insumo.unidade ||
            !insumo.fornecedor ||
            !insumo.validade ||
            !insumo.estoqueMinimo ||
            !insumo.categoria
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const usuarioLogado = pegarUsuarioLogado();

        if(!insumo.historico){
            insumo.historico = [];
        }

        insumo.historico.push({
            data: new Date().toLocaleString("pt-BR"),
            tipo: "Atualização",
            descricao: insumo.descricao || "Dados do insumo atualizados.",
            usuario: usuarioLogado.nome || "Laura"
        });

        salvarInsumos(insumos);

        preencherPerfil(insumo);
        preencherHistorico(insumo);
        preencherResumo(insumo);

        alert("Insumo atualizado com sucesso!");
    }

    function abrirModalExcluir(){
        const insumo = buscarInsumo();

        if(!insumo){
            return;
        }

        document.querySelector("#iniciaisInsumoEditarModal").textContent =
            iniciais(insumo.nome);

        document.querySelector("#nomeInsumoEditarModal").textContent =
            insumo.nome || "Insumo";

        document.querySelector("#categoriaInsumoEditarModal").textContent =
            insumo.categoria || "Categoria não informada";

        document.querySelector("#quantidadeInsumoEditarModal").textContent =
            `${insumo.quantidade || 0} ${insumo.unidade || ""}`;

        document.querySelector("#fornecedorInsumoEditarModal").textContent =
            insumo.fornecedor || "Fornecedor não informado";

        modalExcluir.showModal();
    }

    function excluirInsumo(){
        let insumos = pegarInsumos();

        insumos = insumos.filter(insumo =>
            Number(insumo.id) !== idInsumo
        );

        salvarInsumos(insumos);

        modalExcluir.close();

        alert("Insumo excluído com sucesso!");

        window.location.href = "InsumosCadastrados.html";
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarAlteracoes();
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "InsumosCadastrados.html";
    });

    botaoExcluir.addEventListener("click", abrirModalExcluir);

    botaoCancelarModal.addEventListener("click", () => {
        modalExcluir.close();
    });

    botaoConfirmarExcluir.addEventListener("click", excluirInsumo);

    carregarPagina();
}

/* ================= EDITAR PARCEIRO ================= */

const paginaEditarParceiro = document.querySelector(".formularioEditarParceiro");

if(paginaEditarParceiro){

    const parametros = new URLSearchParams(window.location.search);
    const idParceiro = Number(parametros.get("id"));

    const inputNome = document.querySelector("#editarNomeParceiro");
    const inputCpf = document.querySelector("#editarCpfParceiro");
    const inputTelefone = document.querySelector("#editarTelefoneParceiro");
    const inputEmail = document.querySelector("#editarEmailParceiro");
    const inputEndereco = document.querySelector("#editarEnderecoParceiro");
    const textareaObservacao = document.querySelector("#editarObservacaoParceiro");

    const botaoSalvar = paginaEditarParceiro.querySelector(".botaoSalvar");
    const botaoCancelar = paginaEditarParceiro.querySelector(".botaoCancelar");

    const avatarParceiro = document.querySelector("#avatarEditarParceiro");
    const nomeResumoParceiro = document.querySelector("#nomeResumoParceiro");
    const telefoneResumoParceiro = document.querySelector("#telefoneResumoParceiro");
    const emailResumoParceiro = document.querySelector("#emailResumoParceiro");
    const enderecoResumoParceiro = document.querySelector("#enderecoResumoParceiro");
    const dataCadastroParceiro = document.querySelector("#dataCadastroParceiro");

    const tbodyHistorico = document.querySelector("#tbodyHistoricoParceiro");

    const totalPedidosParceiro = document.querySelector("#totalPedidosParceiro");
    const valorTotalParceiro = document.querySelector("#valorTotalParceiro");
    const ultimoPedidoParceiro = document.querySelector("#ultimoPedidoParceiro");
    const statusResumoParceiro = document.querySelector("#statusResumoParceiro");

    const botaoExcluir = document.querySelector(".perfilParceiro .botaoExcluir");
    const modalExcluir = document.querySelector(".fundoModalEditarParceiro");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    function pegarParceiros(){
        return JSON.parse(localStorage.getItem("parceiros")) || [];
    }

    function salvarParceiros(parceiros){
        localStorage.setItem("parceiros", JSON.stringify(parceiros));
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Laura" };
    }

    function pegarSaidasParceiros(){
        return JSON.parse(localStorage.getItem("saidasParceiros")) || [];
    }

    function formatarMoeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function buscarParceiro(){
        return pegarParceiros().find(parceiro =>
            Number(parceiro.id) === idParceiro
        );
    }

    function preencherFormulario(parceiro){
        inputNome.value = parceiro.nome || "";
        inputCpf.value = parceiro.cpfCnpj || "";
        inputTelefone.value = parceiro.telefone || "";
        inputEmail.value = parceiro.email || "";
        inputEndereco.value = parceiro.endereco || "";
        textareaObservacao.value = parceiro.observacao || "";
    }

    function preencherPerfil(parceiro){
        avatarParceiro.textContent = iniciais(parceiro.nome);
        nomeResumoParceiro.textContent = parceiro.nome || "Parceiro";

        telefoneResumoParceiro.innerHTML =
            `<i class="iconeTelefone"></i> ${parceiro.telefone || "Telefone não informado"}`;

        emailResumoParceiro.innerHTML =
            `<i class="iconeCarta"></i> ${parceiro.email || "E-mail não informado"}`;

        enderecoResumoParceiro.innerHTML =
            `<i class="iconeCasa"></i> ${parceiro.endereco || "Endereço não informado"}`;

        dataCadastroParceiro.textContent =
            parceiro.criadoEm || "Não informado";
    }

    function preencherHistorico(parceiro){
        tbodyHistorico.innerHTML = "";

        if(!parceiro.historico){
            parceiro.historico = [
                {
                    data: parceiro.criadoEm || "Não informado",
                    tipo: "Cadastro",
                    descricao: parceiro.observacao || "Parceiro cadastrado no sistema.",
                    usuario: "Laura"
                }
            ];
        }

        parceiro.historico.forEach(item => {
            tbodyHistorico.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.descricao}</td>
                    <td>${item.usuario}</td>
                </tr>
            `;
        });
    }

    function preencherResumo(parceiro){
        const saidas = pegarSaidasParceiros();

        const saidasDoParceiro = saidas.filter(saida =>
            String(saida.parceiro || saida.nomeParceiro || "").toLowerCase() ===
            String(parceiro.nome || "").toLowerCase()
        );

        const totalPedidos = saidasDoParceiro.length;

        const valorTotal = saidasDoParceiro.reduce((soma, saida) => {
            return soma + Number(saida.valorTotal || saida.total || saida.valorFinal || 0);
        }, 0);

        const ultimoPedido = saidasDoParceiro.length > 0
            ? saidasDoParceiro[saidasDoParceiro.length - 1].data ||
              saidasDoParceiro[saidasDoParceiro.length - 1].criadoEm
            : "--/--/----";

        totalPedidosParceiro.textContent = totalPedidos;
        valorTotalParceiro.textContent = formatarMoeda(valorTotal);
        ultimoPedidoParceiro.textContent = ultimoPedido || "--/--/----";
        statusResumoParceiro.textContent = "Ativo";
    }

    function carregarPagina(){
        if(!idParceiro){
            alert("Nenhum parceiro foi selecionado.");
            window.location.href = "parceiroscadastrados.html";
            return;
        }

        const parceiro = buscarParceiro();

        if(!parceiro){
            alert("Parceiro não encontrado.");
            window.location.href = "parceiroscadastrados.html";
            return;
        }

        preencherFormulario(parceiro);
        preencherPerfil(parceiro);
        preencherHistorico(parceiro);
        preencherResumo(parceiro);
    }

    function salvarAlteracoes(){
        const parceiros = pegarParceiros();

        const parceiro = parceiros.find(parceiro =>
            Number(parceiro.id) === idParceiro
        );

        if(!parceiro){
            alert("Parceiro não encontrado.");
            return;
        }

        parceiro.nome = inputNome.value.trim();
        parceiro.cpfCnpj = inputCpf.value.trim();
        parceiro.telefone = inputTelefone.value.trim();
        parceiro.email = inputEmail.value.trim();
        parceiro.endereco = inputEndereco.value.trim();
        parceiro.observacao = textareaObservacao.value.trim();

        if(
            !parceiro.nome ||
            !parceiro.cpfCnpj ||
            !parceiro.telefone ||
            !parceiro.email ||
            !parceiro.endereco
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const usuarioLogado = pegarUsuarioLogado();

        if(!parceiro.historico){
            parceiro.historico = [];
        }

        parceiro.historico.push({
            data: new Date().toLocaleString("pt-BR"),
            tipo: "Atualização",
            descricao: parceiro.observacao || "Dados do parceiro atualizados.",
            usuario: usuarioLogado.nome || "Laura"
        });

        salvarParceiros(parceiros);

        preencherPerfil(parceiro);
        preencherHistorico(parceiro);
        preencherResumo(parceiro);

        alert("Parceiro atualizado com sucesso!");
    }

    function abrirModalExcluir(){
        const parceiro = buscarParceiro();

        if(!parceiro){
            return;
        }

        document.querySelector("#iniciaisParceiroEditarModal").textContent =
            iniciais(parceiro.nome);

        document.querySelector("#nomeParceiroEditarModal").textContent =
            parceiro.nome || "Parceiro";

        document.querySelector("#cpfParceiroEditarModal").textContent =
            parceiro.cpfCnpj || "CPF/CNPJ não informado";

        document.querySelector("#telefoneParceiroEditarModal").textContent =
            parceiro.telefone || "Telefone não informado";

        document.querySelector("#emailParceiroEditarModal").textContent =
            parceiro.email || "E-mail não informado";

        modalExcluir.showModal();
    }

    function excluirParceiro(){
        let parceiros = pegarParceiros();

        parceiros = parceiros.filter(parceiro =>
            Number(parceiro.id) !== idParceiro
        );

        salvarParceiros(parceiros);

        modalExcluir.close();

        alert("Parceiro excluído com sucesso!");

        window.location.href = "parceiroscadastrados.html";
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarAlteracoes();
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "parceiroscadastrados.html";
    });

    botaoExcluir.addEventListener("click", abrirModalExcluir);

    botaoCancelarModal.addEventListener("click", () => {
        modalExcluir.close();
    });

    botaoConfirmarExcluir.addEventListener("click", excluirParceiro);

    carregarPagina();
}


/* ================= EDITAR PRODUTO ================= */

const paginaEditarProduto = document.querySelector(".formularioEditarProduto");

if(paginaEditarProduto){

    const parametros = new URLSearchParams(window.location.search);
    const idProduto = Number(parametros.get("id"));

    const inputNome = document.querySelector("#editarNomeProduto");
    const selectReceita = document.querySelector("#editarReceitaProduto");
    const inputQuantidade = document.querySelector("#editarQuantidadeProduto");
    const inputMargem = document.querySelector("#editarMargemProduto");
    const inputValidade = document.querySelector("#editarValidadeProduto");
    const inputEstoqueMinimo = document.querySelector("#editarEstoqueMinimoProduto");
    const textareaDescricao = document.querySelector("#editarDescricaoProduto");

    const botaoSalvar = paginaEditarProduto.querySelector(".botaoSalvar");
    const botaoCancelar = paginaEditarProduto.querySelector(".botaoCancelar");

    const avatarProduto = document.querySelector("#avatarEditarProduto");
    const nomeResumoProduto = document.querySelector("#nomeResumoProduto");
    const receitaResumoProduto = document.querySelector("#receitaResumoProduto");
    const quantidadeResumoProduto = document.querySelector("#quantidadeResumoProduto");
    const precoResumoProduto = document.querySelector("#precoResumoProduto");
    const validadeResumoProduto = document.querySelector("#validadeResumoProduto");
    const dataCadastroProduto = document.querySelector("#dataCadastroProduto");

    const tbodyHistorico = document.querySelector("#tbodyHistoricoProduto");

    const custoResumoProduto = document.querySelector("#custoResumoProduto");
    const precoVendaResumoProduto = document.querySelector("#precoVendaResumoProduto");
    const margemResumoProduto = document.querySelector("#margemResumoProduto");
    const lucroResumoProduto = document.querySelector("#lucroResumoProduto");

    const botaoExcluir = document.querySelector(".perfilProduto .botaoExcluir");
    const modalExcluir = document.querySelector(".fundoModalEditarProduto");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    function pegarProdutos(){
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function salvarProdutos(produtos){
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function pegarReceitas(){
        return JSON.parse(localStorage.getItem("receitas")) || [];
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Laura" };
    }

    function moeda(valor){
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function buscarProduto(){
        return pegarProdutos().find(produto =>
            Number(produto.id) === idProduto
        );
    }

    function buscarReceita(idReceita){
        return pegarReceitas().find(receita =>
            String(receita.id) === String(idReceita)
        );
    }

    function carregarReceitas(){
        const receitas = pegarReceitas();

        selectReceita.innerHTML = `<option value="">Selecione uma receita</option>`;

        receitas.forEach(receita => {
            selectReceita.innerHTML += `
                <option value="${receita.id}">
                    ${receita.produto}
                </option>
            `;
        });
    }

    function nomeReceitaPorId(idReceita){
        const receita = buscarReceita(idReceita);
        return receita ? receita.produto : "Sem receita";
    }

    function preencherFormulario(produto){
        inputNome.value = produto.nome || "";
        selectReceita.value = produto.receita || "";
        inputQuantidade.value = produto.quantidade || "";
        inputMargem.value = produto.margemLucro || "";
        inputValidade.value = produto.validade || "";
        inputEstoqueMinimo.value = produto.estoqueMinimo || "";
        textareaDescricao.value = produto.descricao || "";
    }

    function preencherPerfil(produto){
        avatarProduto.textContent = iniciais(produto.nome);
        nomeResumoProduto.textContent = produto.nome || "Produto";

        receitaResumoProduto.innerHTML =
            `<i class="iconePrancheta"></i> ${produto.nomeReceita || nomeReceitaPorId(produto.receita)}`;

        quantidadeResumoProduto.innerHTML =
            `<i class="iconeBalaca"></i> ${produto.quantidade || 0} unidades`;

        precoResumoProduto.innerHTML =
            `<i class="iconeMoedas"></i> ${moeda(produto.valorUnitario || produto.precoVenda)}`;

        validadeResumoProduto.innerHTML =
            `<i class="iconeCalendario"></i> ${produto.validade || "Não informado"} dias`;

        dataCadastroProduto.textContent =
            produto.criadoEm || "Não informado";
    }

    function preencherHistorico(produto){
        tbodyHistorico.innerHTML = "";

        if(!produto.historico){
            produto.historico = [
                {
                    data: produto.criadoEm || "Não informado",
                    tipo: "Cadastro",
                    descricao: produto.descricao || "Produto cadastrado no sistema.",
                    usuario: "Laura"
                }
            ];
        }

        produto.historico.forEach(item => {
            tbodyHistorico.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.descricao}</td>
                    <td>${item.usuario}</td>
                </tr>
            `;
        });
    }

    function preencherResumo(produto){
        custoResumoProduto.textContent = moeda(produto.custoPorUnidade || 0);
        precoVendaResumoProduto.textContent = moeda(produto.valorUnitario || produto.precoVenda || 0);
        margemResumoProduto.textContent = `${produto.margemLucro || 0}%`;
        lucroResumoProduto.textContent = moeda(produto.lucroPorUnidade || 0);
    }

    function carregarPagina(){
        if(!idProduto){
            alert("Nenhum produto foi selecionado.");
            window.location.href = "produtoscadastrados.html";
            return;
        }

        carregarReceitas();

        const produto = buscarProduto();

        if(!produto){
            alert("Produto não encontrado.");
            window.location.href = "produtoscadastrados.html";
            return;
        }

        preencherFormulario(produto);
        preencherPerfil(produto);
        preencherHistorico(produto);
        preencherResumo(produto);
    }

    function salvarAlteracoes(){
        const produtos = pegarProdutos();

        const produto = produtos.find(produto =>
            Number(produto.id) === idProduto
        );

        if(!produto){
            alert("Produto não encontrado.");
            return;
        }

        produto.nome = inputNome.value.trim();
        produto.receita = selectReceita.value;
        produto.nomeReceita = nomeReceitaPorId(selectReceita.value);
        produto.quantidade = inputQuantidade.value.trim();
        produto.margemLucro = inputMargem.value.trim();
        produto.validade = inputValidade.value.trim();
        produto.estoqueMinimo = inputEstoqueMinimo.value.trim();
        produto.descricao = textareaDescricao.value.trim();

        if(
            !produto.nome ||
            !produto.receita ||
            !produto.quantidade ||
            !produto.margemLucro ||
            !produto.validade ||
            !produto.estoqueMinimo
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const usuarioLogado = pegarUsuarioLogado();

        if(!produto.historico){
            produto.historico = [];
        }

        produto.historico.push({
            data: new Date().toLocaleString("pt-BR"),
            tipo: "Atualização",
            descricao: produto.descricao || "Dados do produto atualizados.",
            usuario: usuarioLogado.nome || "Laura"
        });

        salvarProdutos(produtos);

        preencherPerfil(produto);
        preencherHistorico(produto);
        preencherResumo(produto);

        alert("Produto atualizado com sucesso!");
    }

    function abrirModalExcluir(){
        const produto = buscarProduto();

        if(!produto){
            return;
        }

        document.querySelector("#iniciaisProdutoEditarModal").textContent =
            iniciais(produto.nome);

        document.querySelector("#nomeProdutoEditarModal").textContent =
            produto.nome || "Produto";

        document.querySelector("#receitaProdutoEditarModal").textContent =
            produto.nomeReceita || nomeReceitaPorId(produto.receita);

        document.querySelector("#quantidadeProdutoEditarModal").textContent =
            `${produto.quantidade || 0} unidades`;

        document.querySelector("#precoProdutoEditarModal").textContent =
            moeda(produto.valorUnitario || produto.precoVenda);

        modalExcluir.showModal();
    }

    function excluirProduto(){
        let produtos = pegarProdutos();

        produtos = produtos.filter(produto =>
            Number(produto.id) !== idProduto
        );

        salvarProdutos(produtos);

        modalExcluir.close();

        alert("Produto excluído com sucesso!");

        window.location.href = "produtoscadastrados.html";
    }

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarAlteracoes();
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "produtoscadastrados.html";
    });

    botaoExcluir.addEventListener("click", abrirModalExcluir);

    botaoCancelarModal.addEventListener("click", () => {
        modalExcluir.close();
    });

    botaoConfirmarExcluir.addEventListener("click", excluirProduto);

    carregarPagina();
}



/* ================= EDITAR RECEITA ================= */

const paginaEditarReceita = document.querySelector(".formularioEditarReceita");

if(paginaEditarReceita){

    const parametros = new URLSearchParams(window.location.search);
    const idReceita = Number(parametros.get("id"));

    const selectProduto = document.querySelector("#editarProdutoReceita");
    const inputRendimento = document.querySelector("#editarRendimentoReceita");
    const selectUnidade = document.querySelector("#editarUnidadeReceita");
    const inputValidade = document.querySelector("#editarValidadeReceita");
    const textareaDescricao = document.querySelector("#editarDescricaoReceita");

    const listaInsumosReceita = document.querySelector("#listaInsumosReceita");
    const botaoAdicionarInsumo = document.querySelector("#botaoAdicionarInsumoReceita");

    const botaoSalvar = paginaEditarReceita.querySelector(".botaoSalvar");
    const botaoCancelar = paginaEditarReceita.querySelector(".botaoCancelar");

    const avatarReceita = document.querySelector("#avatarEditarReceita");
    const nomeResumoReceita = document.querySelector("#nomeResumoReceita");
    const produtoResumoReceita = document.querySelector("#produtoResumoReceita");
    const rendimentoResumoReceita = document.querySelector("#rendimentoResumoReceita");
    const custoUnidadeResumoReceita = document.querySelector("#custoUnidadeResumoReceita");
    const custoTotalResumoReceita = document.querySelector("#custoTotalResumoReceita");
    const dataCadastroReceita = document.querySelector("#dataCadastroReceita");

    const totalInsumosReceita = document.querySelector("#totalInsumosReceita");
    const valorTotalReceita = document.querySelector("#valorTotalReceita");
    const ultimaAtualizacaoReceita = document.querySelector("#ultimaAtualizacaoReceita");
    const statusResumoReceita = document.querySelector("#statusResumoReceita");

    const tbodyHistorico = document.querySelector("#tbodyHistoricoReceita");

    const botaoExcluir = document.querySelector(".perfilReceita .botaoExcluir");
    const modalExcluir = document.querySelector(".fundoModalEditarReceita");
    const botaoCancelarModal = document.querySelector(".botaoCancelarModal");
    const botaoConfirmarExcluir = document.querySelector(".botaoConfirmarExcluir");

    function pegarReceitas(){
        return JSON.parse(localStorage.getItem("receitas")) || [];
    }

    function salvarReceitas(receitas){
        localStorage.setItem("receitas", JSON.stringify(receitas));
    }

    function pegarProdutos(){
        return JSON.parse(localStorage.getItem("produtos")) || [];
    }

    function pegarInsumos(){
        return JSON.parse(localStorage.getItem("insumos")) || [];
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Laura" };
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

    function iniciais(nome){
        return String(nome || "")
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function buscarReceita(){
        return pegarReceitas().find(receita =>
            Number(receita.id) === idReceita
        );
    }

    function carregarProdutos(){
        const produtos = pegarProdutos();

        selectProduto.innerHTML = `<option value="">Selecione um produto</option>`;

        produtos.forEach(produto => {
            selectProduto.innerHTML += `
                <option value="${produto.nome}">
                    ${produto.nome}
                </option>
            `;
        });
    }

    function gerarOptionsInsumos(insumoSelecionado = ""){
        const insumos = pegarInsumos();

        return `
            <option value="">Selecione um insumo</option>
            ${insumos.map(insumo => `
                <option value="${insumo.nome}" ${insumo.nome === insumoSelecionado ? "selected" : ""}>
                    ${insumo.nome}
                </option>
            `).join("")}
        `;
    }

    function criarBlocoInsumo(item = {}){
        const bloco = document.createElement("div");
        bloco.className = "blocoInsumoReceita";

        bloco.innerHTML = `
            <div class="campoFormulario">
                <label>Insumo</label>
                <select class="selectInsumoReceita">
                    ${gerarOptionsInsumos(item.insumo)}
                </select>
            </div>

            <div class="campoFormulario">
                <label>Quantidade</label>
                <input type="number" class="quantidadeInsumoReceita" value="${item.quantidade || ""}">
            </div>

            <div class="campoFormulario">
                <label>Unidade</label>
                <select class="unidadeInsumoReceita">
                    <option value="g" ${item.unidade === "g" ? "selected" : ""}>g</option>
                    <option value="kg" ${item.unidade === "kg" ? "selected" : ""}>kg</option>
                    <option value="ml" ${item.unidade === "ml" ? "selected" : ""}>ml</option>
                    <option value="l" ${item.unidade === "l" ? "selected" : ""}>l</option>
                    <option value="un" ${item.unidade === "un" ? "selected" : ""}>un</option>
                </select>
            </div>

            <button type="button" class="botaoRemoverInsumo">Remover</button>
        `;

        listaInsumosReceita.appendChild(bloco);
    }

    function converterQuantidade(quantidade, unidadeReceita, unidadeEstoque){
        const qtd = numero(quantidade);
        const unidadeUso = String(unidadeReceita || "").toLowerCase();
        const unidadeBase = String(unidadeEstoque || "").toLowerCase();

        if(unidadeUso === unidadeBase){
            return qtd;
        }

        if(unidadeUso === "g" && unidadeBase === "kg"){
            return qtd / 1000;
        }

        if(unidadeUso === "kg" && unidadeBase === "g"){
            return qtd * 1000;
        }

        if(unidadeUso === "ml" && unidadeBase === "l"){
            return qtd / 1000;
        }

        if(unidadeUso === "l" && unidadeBase === "ml"){
            return qtd * 1000;
        }

        return qtd;
    }

    function buscarInsumo(nome){
        return pegarInsumos().find(insumo =>
            String(insumo.nome || "").toLowerCase().trim() ===
            String(nome || "").toLowerCase().trim()
        );
    }

    function pegarInsumosDaTela(){
        const blocos = document.querySelectorAll(".blocoInsumoReceita");
        const lista = [];

        blocos.forEach(bloco => {
            const insumo = bloco.querySelector(".selectInsumoReceita").value;
            const quantidade = bloco.querySelector(".quantidadeInsumoReceita").value;
            const unidade = bloco.querySelector(".unidadeInsumoReceita").value;

            if(insumo && quantidade){
                lista.push({
                    insumo,
                    quantidade,
                    unidade
                });
            }
        });

        return lista;
    }

    function calcularCustoTotal(listaInsumos){
        let total = 0;

        listaInsumos.forEach(item => {
            const insumoCadastrado = buscarInsumo(item.insumo);

            if(!insumoCadastrado){
                return;
            }

            const quantidadeConvertida = converterQuantidade(
                item.quantidade,
                item.unidade,
                insumoCadastrado.unidade
            );

            total += quantidadeConvertida * numero(insumoCadastrado.valor);
        });

        return total;
    }

    function preencherFormulario(receita){
        selectProduto.value = receita.produto || "";
        inputRendimento.value = receita.rendimento || "";
        selectUnidade.value = receita.unidadeRendimento || "";
        inputValidade.value = receita.validade || "";
        textareaDescricao.value = receita.descricao || "";

        listaInsumosReceita.innerHTML = "";

        if(receita.insumos && receita.insumos.length > 0){
            receita.insumos.forEach(item => criarBlocoInsumo(item));
        }else{
            criarBlocoInsumo();
        }
    }

    function preencherPerfil(receita){
        avatarReceita.textContent = iniciais(receita.produto);
        nomeResumoReceita.textContent = receita.produto || "Receita";

        produtoResumoReceita.innerHTML =
            `<i class="iconePrancheta"></i> ${receita.produto || "Produto não informado"}`;

        rendimentoResumoReceita.innerHTML =
            `<i class="iconeBalaca"></i> ${receita.rendimento || 0} ${receita.unidadeRendimento || ""}`;

        custoUnidadeResumoReceita.innerHTML =
            `<i class="iconeMoedas"></i> ${moeda(receita.custoUnitarioReceita || 0)}`;

        custoTotalResumoReceita.innerHTML =
            `<i class="iconeMoedas"></i> ${moeda(receita.custoTotalReceita || 0)}`;

        dataCadastroReceita.textContent = receita.criadoEm || "Não informado";
    }

    function preencherResumo(receita){
        totalInsumosReceita.textContent = receita.insumos ? receita.insumos.length : 0;
        valorTotalReceita.textContent = moeda(receita.custoTotalReceita || 0);
        ultimaAtualizacaoReceita.textContent = receita.atualizadoEm || receita.criadoEm || "--/--/----";
        statusResumoReceita.textContent = "Disponível";
    }

    function preencherHistorico(receita){
        tbodyHistorico.innerHTML = "";

        if(!receita.historico){
            receita.historico = [
                {
                    data: receita.criadoEm || "Não informado",
                    tipo: "Cadastro",
                    descricao: receita.descricao || "Receita cadastrada no sistema.",
                    usuario: "Laura"
                }
            ];
        }

        receita.historico.forEach(item => {
            tbodyHistorico.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.descricao}</td>
                    <td>${item.usuario}</td>
                </tr>
            `;
        });
    }

    function carregarPagina(){
        if(!idReceita){
            alert("Nenhuma receita foi selecionada.");
            window.location.href = "receitascadastradas.html";
            return;
        }

        carregarProdutos();

        const receita = buscarReceita();

        if(!receita){
            alert("Receita não encontrada.");
            window.location.href = "receitascadastradas.html";
            return;
        }

        preencherFormulario(receita);
        preencherPerfil(receita);
        preencherResumo(receita);
        preencherHistorico(receita);
    }

    function salvarAlteracoes(){
        const receitas = pegarReceitas();

        const receita = receitas.find(receita =>
            Number(receita.id) === idReceita
        );

        if(!receita){
            alert("Receita não encontrada.");
            return;
        }

        const listaInsumos = pegarInsumosDaTela();
        const custoTotalReceita = calcularCustoTotal(listaInsumos);
        const rendimentoReceita = numero(inputRendimento.value) || 1;
        const custoUnitarioReceita = custoTotalReceita / rendimentoReceita;

        receita.produto = selectProduto.value;
        receita.rendimento = inputRendimento.value.trim();
        receita.unidadeRendimento = selectUnidade.value;
        receita.validade = inputValidade.value.trim();
        receita.descricao = textareaDescricao.value.trim();
        receita.insumos = listaInsumos;

        receita.custoTotalReceita = Number(custoTotalReceita.toFixed(2));
        receita.custoUnitarioReceita = Number(custoUnitarioReceita.toFixed(2));
        receita.atualizadoEm = new Date().toLocaleString("pt-BR");

        if(
            !receita.produto ||
            !receita.rendimento ||
            !receita.unidadeRendimento ||
            listaInsumos.length === 0
        ){
            alert("Preencha produto, rendimento, unidade e pelo menos um insumo.");
            return;
        }

        const usuarioLogado = pegarUsuarioLogado();

        if(!receita.historico){
            receita.historico = [];
        }

        receita.historico.push({
            data: new Date().toLocaleString("pt-BR"),
            tipo: "Atualização",
            descricao: receita.descricao || "Dados da receita atualizados.",
            usuario: usuarioLogado.nome || "Laura"
        });

        salvarReceitas(receitas);

        preencherPerfil(receita);
        preencherResumo(receita);
        preencherHistorico(receita);

        alert("Receita atualizada com sucesso!");
    }

    function abrirModalExcluir(){
        const receita = buscarReceita();

        if(!receita){
            return;
        }

        document.querySelector("#iniciaisReceitaEditarModal").textContent =
            iniciais(receita.produto);

        document.querySelector("#nomeReceitaEditarModal").textContent =
            receita.produto || "Receita";

        document.querySelector("#produtoReceitaEditarModal").textContent =
            receita.produto || "Produto não informado";

        document.querySelector("#rendimentoReceitaEditarModal").textContent =
            `${receita.rendimento || 0} ${receita.unidadeRendimento || ""}`;

        document.querySelector("#custoReceitaEditarModal").textContent =
            moeda(receita.custoTotalReceita || 0);

        modalExcluir.showModal();
    }

    function excluirReceita(){
        let receitas = pegarReceitas();

        receitas = receitas.filter(receita =>
            Number(receita.id) !== idReceita
        );

        salvarReceitas(receitas);

        modalExcluir.close();

        alert("Receita excluída com sucesso!");

        window.location.href = "receitascadastradas.html";
    }

    botaoAdicionarInsumo.addEventListener("click", () => {
        criarBlocoInsumo();
    });

    listaInsumosReceita.addEventListener("click", (event) => {
        if(event.target.classList.contains("botaoRemoverInsumo")){
            event.target.closest(".blocoInsumoReceita").remove();
        }
    });

    botaoSalvar.addEventListener("click", (event) => {
        event.preventDefault();
        salvarAlteracoes();
    });

    botaoCancelar.addEventListener("click", () => {
        window.location.href = "receitascadastradas.html";
    });

    botaoExcluir.addEventListener("click", abrirModalExcluir);

    botaoCancelarModal.addEventListener("click", () => {
        modalExcluir.close();
    });

    botaoConfirmarExcluir.addEventListener("click", excluirReceita);

    carregarPagina();
}