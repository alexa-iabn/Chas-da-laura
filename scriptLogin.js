const formCadastro = document.querySelector(".cardCadastro form");

if(formCadastro){

    const inputsCadastro = formCadastro.querySelectorAll("input");
    const inputNome = inputsCadastro[0];
    const inputEmail = inputsCadastro[1];
    const inputSenha = inputsCadastro[2];
    const inputConfirmarSenha = inputsCadastro[3];
    const inputCodigo = inputsCadastro[4];

    const botaoSolicitar = document.querySelector(".botaoSolicitar");
    const modalCodigo = document.querySelector(".fundoModalCadastro");
    const fecharModal = document.querySelector(".fecharModal");

    const inputsModal = modalCodigo.querySelectorAll("input");
    const inputNomeSolicitante = inputsModal[0];
    const inputEmailSolicitante = inputsModal[1];
    const observacaoSolicitante = modalCodigo.querySelector("textarea");
    const botaoEnviarSolicitacao = modalCodigo.querySelector(".modalCodigo .botaoCadastrar");

    function gerarCodigo(){
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    function pegarUsuarios(){
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function salvarUsuarios(usuarios){
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function pegarCodigos(){
        return JSON.parse(localStorage.getItem("codigosAcesso")) || [];
    }

    function salvarCodigos(codigos){
        localStorage.setItem("codigosAcesso", JSON.stringify(codigos));
    }

    function codigoValido(codigo){
        const usuarios = pegarUsuarios();

        if(codigo === "1234" && usuarios.length === 0){
            return true;
        }

        const codigos = pegarCodigos();

        return codigos.some(item => item.codigo === codigo && item.usado === false);
    }

    function marcarCodigoComoUsado(codigo){
        if(codigo === "1234"){
            localStorage.setItem("codigoInicialUsado", "true");
            return;
        }

        const codigos = pegarCodigos();
        const codigoEncontrado = codigos.find(item => item.codigo === codigo);

        if(codigoEncontrado){
            codigoEncontrado.usado = true;
        }

        salvarCodigos(codigos);
    }

    formCadastro.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value;
        const confirmarSenha = inputConfirmarSenha.value;
        const codigo = inputCodigo.value.trim();

        if(!nome || !email || !senha || !confirmarSenha || !codigo){
            alert("Preencha todos os campos.");
            return;
        }

        if(senha !== confirmarSenha){
            alert("As senhas não são iguais.");
            return;
        }

        if(!codigoValido(codigo)){
            alert("Código de acesso inválido ou já utilizado.");
            return;
        }

        const usuarios = pegarUsuarios();
        const emailJaExiste = usuarios.some(usuario => usuario.email === email);

        if(emailJaExiste){
            alert("Esse e-mail já está cadastrado.");
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            criadoEm: new Date().toLocaleString("pt-BR")
        };

        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);
        marcarCodigoComoUsado(codigo);

        alert("Cadastro realizado com sucesso!");

        formCadastro.reset();
        window.location.href = "login.html";
    });

    botaoSolicitar.addEventListener("click", () => {
        modalCodigo.showModal();
    });

    fecharModal.addEventListener("click", () => {
        modalCodigo.close();
    });

    botaoEnviarSolicitacao.addEventListener("click", () => {
        const nomeSolicitante = inputNomeSolicitante.value.trim();
        const emailSolicitante = inputEmailSolicitante.value.trim();
        const observacao = observacaoSolicitante.value.trim();

        if(!nomeSolicitante || !emailSolicitante){
            alert("Preencha nome e e-mail.");
            return;
        }

        const usuarios = pegarUsuarios();

        if(usuarios.length === 0){
            alert("Ainda não existe administrador cadastrado. Use o código inicial 1234.");
            return;
        }

        const administrador = usuarios[0];
        const novoCodigo = gerarCodigo();

        const codigos = pegarCodigos();

        codigos.push({
            codigo: novoCodigo,
            usado: false,
            solicitadoPor: nomeSolicitante,
            emailSolicitante,
            observacao,
            criadoEm: new Date().toLocaleString("pt-BR")
        });

        salvarCodigos(codigos);

        alert(
            `Simulação de e-mail:\n\n` +
            `Para administrador: ${administrador.email}\n` +
            `${nomeSolicitante} solicitou um código de acesso.\n\n` +
            `Para solicitante: ${emailSolicitante}\n` +
            `Seu código de acesso é: ${novoCodigo}`
        );

        modalCodigo.close();
        inputNomeSolicitante.value = "";
        inputEmailSolicitante.value = "";
        observacaoSolicitante.value = "";
    });
}

const formLogin = document.querySelector("#formLogin");

if (formLogin) {

    const inputEmail = document.querySelector("#email");
    const inputSenha = document.querySelector("#senha");

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(usuario =>
            usuario.email === inputEmail.value.trim() &&
            usuario.senha === inputSenha.value.trim()
        );

        if(usuario){
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            window.location.href = "paineldeinicio.html";
        }else{
            alert("E-mail ou senha incorretos.");
        }
    });

}



