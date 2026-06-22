/* ================= NOVO LOGIN ================= */

const paginaNovoLogin = document.querySelector(".cardFormularioNovoLogin");

if(paginaNovoLogin){

    const inputNomeUsuario = document.querySelector("#novoNomeUsuario");
    const inputNomeCompleto = document.querySelector("#novoNomeCompleto");
    const inputEmail = document.querySelector("#novoEmail");
    const selectFuncao = document.querySelector("#novaFuncao");
    const inputSenha = document.querySelector("#novaSenha");
    const inputConfirmarSenha = document.querySelector("#confirmarNovaSenha");

    const botaoCriarUsuario = document.querySelector("#botaoCriarUsuario");

    const avatarNovoUsuario = document.querySelector("#avatarNovoUsuario");
    const nomeResumoNovoUsuario = document.querySelector("#nomeResumoNovoUsuario");
    const cargoResumoNovoUsuario = document.querySelector("#cargoResumoNovoUsuario");
    const emailResumoNovoUsuario = document.querySelector("#emailResumoNovoUsuario");
    const permissaoNovoUsuario = document.querySelector("#permissaoNovoUsuario");

    function pegarUsuarios(){
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function salvarUsuarios(usuarios){
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function pegarUsuarioLogado(){
        return JSON.parse(localStorage.getItem("usuarioLogado"));
    }

    function usuarioEhAdministrador(usuario){
        const usuarios = pegarUsuarios();

        if(!usuario || usuarios.length === 0){
            return false;
        }

        return String(usuario.id) === String(usuarios[0].id);
    }

    function gerarIniciais(nome){
        return String(nome || "NU")
            .trim()
            .split(" ")
            .map(parte => parte[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }

    function protegerPaginaNovoLogin(){
        const usuarioLogado = pegarUsuarioLogado();

        if(!usuarioLogado){
            window.location.replace("login.html");
            return;
        }

        if(!usuarioEhAdministrador(usuarioLogado)){
            alert("Apenas o administrador pode criar novos logins.");
            window.location.replace("paineldeinicio.html");
        }
    }

    function atualizarResumoNovoUsuario(){
        const nomeUsuario = inputNomeUsuario.value.trim() || "Novo usuário";
        const email = inputEmail.value.trim() || "email@exemplo.com";
        const funcao = selectFuncao.value || "Usuario";

        avatarNovoUsuario.textContent = gerarIniciais(nomeUsuario);
        nomeResumoNovoUsuario.textContent = nomeUsuario;
        cargoResumoNovoUsuario.textContent = funcao;
        emailResumoNovoUsuario.textContent = email;

        permissaoNovoUsuario.textContent = funcao === "Administrador"
            ? "Acesso total ao sistema"
            : "Acesso padrão ao sistema";
    }

    function limparFormulario(){
        inputNomeUsuario.value = "";
        inputNomeCompleto.value = "";
        inputEmail.value = "";
        selectFuncao.value = "Usuario";
        inputSenha.value = "";
        inputConfirmarSenha.value = "";

        atualizarResumoNovoUsuario();
    }

    function criarNovoUsuario(){
        const nomeUsuario = inputNomeUsuario.value.trim();
        const nomeCompleto = inputNomeCompleto.value.trim();
        const email = inputEmail.value.trim();
        const funcao = selectFuncao.value;
        const senha = inputSenha.value.trim();
        const confirmarSenha = inputConfirmarSenha.value.trim();

        if(!nomeUsuario || !nomeCompleto || !email || !senha || !confirmarSenha){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if(senha !== confirmarSenha){
            alert("As senhas não são iguais.");
            return;
        }

        const usuarios = pegarUsuarios();

        const emailExiste = usuarios.some(usuario =>
            String(usuario.email).toLowerCase() === email.toLowerCase()
        );

        if(emailExiste){
            alert("Esse e-mail já está cadastrado.");
            return;
        }

        const nomeUsuarioExiste = usuarios.some(usuario =>
            String(usuario.nomeUsuario || "").toLowerCase() === nomeUsuario.toLowerCase()
        );

        if(nomeUsuarioExiste){
            alert("Esse nome de usuário já está em uso.");
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            nomeUsuario: nomeUsuario,
            nome: nomeCompleto,
            email: email,
            senha: senha,
            funcao: funcao,
            administrador: funcao === "Administrador",
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);

        alert("Novo login criado com sucesso!");

        limparFormulario();
    }

    inputNomeUsuario.addEventListener("input", atualizarResumoNovoUsuario);
    inputEmail.addEventListener("input", atualizarResumoNovoUsuario);
    selectFuncao.addEventListener("change", atualizarResumoNovoUsuario);

    botaoCriarUsuario.addEventListener("click", event => {
        event.preventDefault();
        criarNovoUsuario();
    });

    protegerPaginaNovoLogin();
    atualizarResumoNovoUsuario();
}