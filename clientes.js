// ==========================================
// 1. GERENCIAMENTO DO "BANCO DE DADOS" (localStorage)
// ==========================================

// Carrega os clientes do localStorage ou inicia com dados de teste se estiver vazio
function obterClientes() {
    const clientes = localStorage.getItem('db_clientes');
    if (!clientes) {
        const dadosIniciais = [
            { id: "1", nome: "Maria Silva", documento: "123.456.789-00", telefone: "(11) 98765-4321", email: "maria@email.com", endereco: "Rua das Flores, 123", observacao: "Cliente frequente e interessado em novos lançamentos.", dataCadastro: "12/05/2025" },
            { id: "2", nome: "João Souza", documento: "987.654.321-00", telefone: "(45) 99999-9999", email: "joao@email.com", endereco: "Rua Y, 456", observacao: "", dataCadastro: "15/05/2025" }
        ];
        localStorage.setItem('db_clientes', JSON.stringify(dadosIniciais));
        return dadosIniciais;
    }
    return JSON.parse(clientes);
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
// Salva a lista atualizada de clientes no localStorage
function salvarClientes(lista) {
    localStorage.setItem('db_clientes', JSON.stringify(lista));
}

// ==========================================
// 2. EXECUÇÃO AO CARREGAR A PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('cadastroclientes.html')) {
        inicializarCadastro();
    } else if (path.includes('clientescadastrados.html')) {
        inicializarListagem();
    } else if (path.includes('EditarCliente.html')) {
        inicializarEdicao();
    }
});

// ==========================================
// 3. TELA DE CADASTRO (cadastroclientes.html)
// ==========================================
function inicializarCadastro() {
    const btnSalvar = document.querySelector('.botaoSalvar');
    const btnCancelar = document.querySelector('.botaoCancelar');
    const inputs = document.querySelectorAll('.formularioClientes input, .formularioClientes textarea');

    btnSalvar.addEventListener('click', () => {
        const novoCliente = {
            id: Date.now().toString(), // Gera um ID único baseado no tempo
            nome: inputs[0].value,
            documento: inputs[1].value,
            telefone: inputs[2].value,
            email: inputs[3].value,
            endereco: inputs[4].value,
            observacao: inputs[5].value,
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        };

        if (!novoCliente.nome || !novoCliente.documento) {
            alert('Por favor, preencha pelo menos Nome e CPF/CNPJ.');
            return;
        }

        const lista = obterClientes();
        lista.push(novoCliente);
        salvarClientes(lista);

        alert('Cliente cadastrado com sucesso!');
        window.location.href = 'clientescadastrados.html';
    });

    btnCancelar.addEventListener('click', () => {
        window.location.href = 'clientescadastrados.html';
    });
}

// ==========================================
// 4. TELA DE LISTAGEM (clientescadastrados.html)
// ==========================================
let clienteIdParaExcluir = null;

function inicializarListagem() {
    const listaClientes = obterClientes();
    const tabelaBody = document.querySelector('table tbody');
    const gradeClientes = document.querySelector('.gradeClientes');
    const inputBusca = document.querySelector('input[type="search"]');
    
    // Elementos do Modal
    const modal = document.querySelector('.modalExcluir');
    const btnCancelarModal = modal.querySelector('.botaoCancelar');
    const btnExcluirModal = modal.querySelector('.botaoExcluir');
    const modalNome = modal.querySelector('.clienteExcluir h4');
    const modalTel = modal.querySelector('.clienteExcluir p:nth-of-type(1)');
    const modalEmail = modal.querySelector('.clienteExcluir p:nth-of-type(2)');

    // Botões de Alternar Visualização
    const btnsAlternador = document.querySelectorAll('.alternadorVisualizacao button');

    function renderizar(dados) {
        // 1. Renderizar Tabela
        tabelaBody.innerHTML = '';
        dados.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.nome}</td>
                <td>${c.documento}</td>
                <td>${c.telefone}</td>
                <td>${c.email}</td>
                <td>
                    <button class="btn-editar-acao" data-id="${c.id}">✏️</button>
                    <button class="btn-excluir-acao" data-id="${c.id}">🗑️</button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });

        // 2. Renderizar Cards
        gradeClientes.innerHTML = '';
        dados.forEach(c => {
            const iniciais = c.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const article = document.createElement('article');
            article.className = 'cardCliente';
            article.innerHTML = `
                <div class="avatarGrande">${iniciais}</div>
                <h3>${c.nome}</h3>
                <p>${c.telefone}</p>
                <p>${c.email}</p>
                <p>${c.endereco}</p>
                <p>${c.dataCadastro}</p>
                <div class="acoesCard">
                    <button class="btn-editar-acao" data-id="${c.id}">✏️</button>
                    <button class="btn-excluir-acao" data-id="${c.id}">🗑️</button>
                </div>
            `;
            gradeClientes.appendChild(article);
        });

        adicionarEventosBotoes();
    }

    function adicionarEventosBotoes() {
        // Clique no Botão Editar (Salva o ID escolhido e vai para a tela de edição)
        document.querySelectorAll('.btn-editar-acao').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                localStorage.setItem('cliente_edicao_id', id);
                window.location.href = 'EditarCliente.html';
            });
        });

        // Clique no Botão Deletar (Abre o Modal e joga os dados do cliente lá dentro)
        document.querySelectorAll('.btn-excluir-acao').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const cliente = obterClientes().find(c => c.id === id);
                if (cliente) {
                    clienteIdParaExcluir = id;
                    modalNome.textContent = cliente.nome;
                    modalTel.textContent = cliente.telefone;
                    modalEmail.textContent = cliente.email;
                    modal.style.display = 'flex'; // Abre o modal
                }
            });
        });
    }

    // Input de busca por Nome ou CPF/CNPJ
    inputBusca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const filtrados = listaClientes.filter(c => 
            c.nome.toLowerCase().includes(termo) || 
            c.documento.includes(termo)
        );
        renderizar(filtrados);
    });

    // Alternador entre lista (tabela) e cards
    btnsAlternador[0].addEventListener('click', () => { // Botão Lista
        document.querySelector('.conteinerTabela table').style.display = 'table';
        gradeClientes.style.display = 'none';
    });
    btnsAlternador[1].addEventListener('click', () => { // Botão Cards
        document.querySelector('.conteinerTabela table').style.display = 'none';
        gradeClientes.style.display = 'flex';
    });

    // Fechar Modal
    btnCancelarModal.addEventListener('click', () => {
        modal.style.display = 'none';
        clienteIdParaExcluir = null;
    });

    // Confirmar Exclusão no Modal
    btnExcluirModal.addEventListener('click', () => {
        if (clienteIdParaExcluir) {
            let lista = obterClientes();
            lista = lista.filter(c => c.id !== clienteIdParaExcluir);
            salvarClientes(lista);
            
            modal.style.display = 'none';
            clienteIdParaExcluir = null;
            window.location.reload(); // Recarrega para atualizar tudo
        }
    });

    // Inicializa renderizando a lista completa
    renderizar(listaClientes);
}

// ==========================================
// 5. TELA DE EDIÇÃO (EditarCliente.html)
// ==========================================
function inicializarEdicao() {
    const idEdicao = localStorage.getItem('cliente_edicao_id');
    if (!idEdicao) {
        alert('Nenhum cliente selecionado para edição.');
        window.location.href = 'clientescadastrados.html';
        return;
    }

    const lista = obterClientes();
    const cliente = lista.find(c => c.id === idEdicao);

    if (!cliente) {
        alert('Cliente não encontrado.');
        window.location.href = 'clientescadastrados.html';
        return;
    }

    // Capturando os inputs da esquerda (Formulário)
    const formInputs = document.querySelectorAll('.conteudoPrincipal input, .conteudoPrincipal textarea');
    formInputs[0].value = cliente.nome;
    formInputs[1].value = cliente.documento;
    formInputs[2].value = cliente.telefone;
    formInputs[3].value = cliente.email;
    formInputs[4].value = cliente.endereco;
    formInputs[5].value = cliente.observacao;

    // Atualizando os dados estáticos do painel direito (Barra Lateral)
    const iniciais = cliente.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.querySelector('.barraLateralCliente .avatarGrande').textContent = iniciais;
    document.querySelector('.barraLateralCliente h2').textContent = cliente.nome;
    document.querySelector('.barraLateralCliente p:nth-of-type(1)').textContent = `📞 ${cliente.telefone}`;
    document.querySelector('.barraLateralCliente p:nth-of-type(2)').textContent = `✉️ ${cliente.email}`;
    document.querySelector('.barraLateralCliente p:nth-of-type(3)').textContent = `📍 ${cliente.endereco}`;
    document.querySelector('.barraLateralCliente strong').textContent = cliente.dataCadastro;

    // Botões Salvar e Cancelar
    const btnSalvar = document.querySelector('.botaoSalvar');
    const btnCancelar = document.querySelector('.botaoCancelar');
    const btnExcluirLateral = document.querySelector('.barraLateralCliente .botaoExcluir');

    btnSalvar.addEventListener('click', () => {
        cliente.nome = formInputs[0].value;
        cliente.documento = formInputs[1].value;
        cliente.telefone = formInputs[2].value;
        cliente.email = formInputs[3].value;
        cliente.endereco = formInputs[4].value;
        cliente.observacao = formInputs[5].value;

        salvarClientes(lista);
        alert('Alterações salvas com sucesso!');
        window.location.href = 'clientescadastrados.html';
    });

    btnCancelar.addEventListener('click', () => {
        window.location.href = 'clientescadastrados.html';
    });

    // Excluir direto pela página de edição
    btnExcluirLateral.addEventListener('click', () => {
        if (confirm(`Tem certeza que deseja excluir o perfil de ${cliente.nome}?`)) {
            let novaLista = obterClientes().filter(c => c.id !== idEdicao);
            salvarClientes(novaLista);
            window.location.href = 'clientescadastrados.html';
        }
    });
} 