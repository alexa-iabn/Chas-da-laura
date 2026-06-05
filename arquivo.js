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

    /* ALTERANAR ENTRE CONTEUDO DE LISTA E DE CARD */

    const botaoLista = document.querySelector(".botaoTabelaLista");
    const botaoCard = document.querySelector(".botaoTabelaCard");

    const conteinerTabela = document.querySelector(".conteinerTabela");
    const conteinerCartas = document.querySelector(".conteinerCartas");

    botaoCard.addEventListener("click", () => {
        conteinerTabela.style.display = "none";
        conteinerCartas.style.display = "flex";
    });

    botaoLista.addEventListener("click", () => {
        conteinerTabela.style.display = "block";
        conteinerCartas.style.display = "none";
    });

    /* ABRIR E FECHAR MODAL EXCLUIR PRODUTOS */

    const botoesAbrirModal = document.querySelectorAll(".abrirModalExcluir");
    const modalExcluir = document.querySelector(".modalExcluirProduto");
    const botaoCancelar = document.querySelector(".cancelar");

    botoesAbrirModal.forEach((botao) => {
        botao.addEventListener("click", () => {
            modalExcluir.classList.remove("escondido");
        });
    });

    botaoCancelar.addEventListener("click", () => {
        modalExcluir.classList.add("escondido");
    });