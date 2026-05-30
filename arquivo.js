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
