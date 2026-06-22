const formularioPerfil = document.querySelector(".formularioPerfil");

if(formularioPerfil){

    const avatarPerfilGrande = document.querySelector("#avatarPerfilGrande");
    const nomePerfilResumo = document.querySelector("#nomePerfilResumo");
    const cargoPerfil = document.querySelector("#cargoPerfil");
    const emailPerfilResumo = document.querySelector("#emailPerfilResumo");
    const dataCriacaoPerfil = document.querySelector("#dataCriacaoPerfil");

    const inputNomeUsuario = document.querySelector("#nomeUsuarioPerfil");
    const inputNomeCompleto = document.querySelector("#nomeCompletoPerfil");
    const inputEmail = document.querySelector("#emailPerfil");
    const inputFuncao = document.querySelector("#funcaoPerfil");

    const inputSenhaAtual = document.querySelector("#senhaAtualPerfil");
    const inputNovaSenha = document.querySelector("#novaSenhaPerfil");
    const inputConfirmarSenha = document.querySelector("#confirmarSenhaPerfil");
    const inputStatus = document.querySelector("#statusPerfil");

    const botaoSalvarPerfil = document.querySelector("#botaoSalvarPerfil");

    function pegarUsuarios(){
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function salvarUsuarios(usuarios){
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    }

    function salvarUsuarioLogado(usuario){
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }

    function primeiroNome(nome){
        return String(nome || "Usuário").trim().split(" ")[0];
    }

    function gerarIniciais(nome){
        return String(nome || "U")
            .trim()
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function ehAdministrador(usuario){
        const usuarios = pegarUsuarios();

        if(!usuario || usuarios.length === 0){
            return false;
        }

        return String(usuario.id) === String(usuarios[0].id);
    }

    function carregarPerfil(){
        const usuario = pegarUsuarioLogado();

        if(!usuario){
            window.location.replace("login.html");
            return;
        }

        const nomeExibido = usuario.nomeUsuario || primeiroNome(usuario.nome);

        avatarPerfilGrande.textContent = gerarIniciais(nomeExibido);
        nomePerfilResumo.textContent = nomeExibido;
        emailPerfilResumo.textContent = usuario.email || "E-mail não informado";
        dataCriacaoPerfil.textContent = usuario.criadoEm || "--/--/----";

        inputNomeUsuario.value = nomeExibido;
        inputNomeCompleto.value = usuario.nome || "";
        inputEmail.value = usuario.email || "";
        inputFuncao.value = ehAdministrador(usuario) ? "Administrador" : "Usuário";
        inputStatus.value = "Ativa";

        cargoPerfil.textContent = ehAdministrador(usuario)
            ? "Administrador"
            : "Usuário do Sistema";
    }

    function salvarPerfil(){
        const usuarioLogado = pegarUsuarioLogado();

        if(!usuarioLogado){
            window.location.replace("login.html");
            return;
        }

        const usuarios = pegarUsuarios();

        const usuario = usuarios.find(item =>
            String(item.id) === String(usuarioLogado.id)
        );

        if(!usuario){
            alert("Usuário não encontrado.");
            return;
        }

        const nomeUsuario = inputNomeUsuario.value.trim();
        const nomeCompleto = inputNomeCompleto.value.trim();
        const email = inputEmail.value.trim();

        if(nomeUsuario === "" || nomeCompleto === "" || email === ""){
            alert("Preencha todos os campos.");
            return;
        }

        const senhaAtual = inputSenhaAtual.value.trim();
        const novaSenha = inputNovaSenha.value.trim();
        const confirmarSenha = inputConfirmarSenha.value.trim();

        if(senhaAtual || novaSenha || confirmarSenha){

            if(senhaAtual !== usuario.senha){
                alert("Senha atual incorreta.");
                return;
            }

            if(novaSenha === ""){
                alert("Digite a nova senha.");
                return;
            }

            if(novaSenha !== confirmarSenha){
                alert("As senhas não conferem.");
                return;
            }

            usuario.senha = novaSenha;
        }

        usuario.nomeUsuario = nomeUsuario;
        usuario.nome = nomeCompleto;
        usuario.email = email;
        usuario.atualizadoEm = new Date().toLocaleString("pt-BR");

        salvarUsuarios(usuarios);
        salvarUsuarioLogado(usuario);

        inputSenhaAtual.value = "";
        inputNovaSenha.value = "";
        inputConfirmarSenha.value = "";

        carregarPerfil();

        if(typeof atualizarPerfilUsuario === "function"){
            atualizarPerfilUsuario();
        }

        alert("Perfil atualizado com sucesso!");
    }

    botaoSalvarPerfil.addEventListener("click", event => {
        event.preventDefault();
        salvarPerfil();
    });

    carregarPerfil();
}