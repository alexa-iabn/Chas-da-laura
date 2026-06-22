
const botaoPerfilUsuario = document.querySelector("#botaoPerfilUsuario");
const menuUsuario = document.querySelector("#menuUsuario");

const nomeUsuarioLogado = document.querySelector("#nomeUsuarioLogado");
const iniciaisUsuario = document.querySelector("#iniciaisUsuario");

const botaoIrPerfil = document.querySelector("#botaoIrPerfil");
const botaoCriarLogin = document.querySelector("#botaoCriarLogin");
const botaoSair = document.querySelector("#botaoSair");

function pegarUsuarioLogado(){
    return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function pegarUsuarios(){
    return JSON.parse(localStorage.getItem("usuarios")) || [];
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
        .substring(0,2)
        .toUpperCase();
}

function usuarioEhAdministrador(usuario){

    const usuarios = pegarUsuarios();

    if(!usuario || usuarios.length === 0){
        return false;
    }

    return String(usuario.id) === String(usuarios[0].id);
}

/* Atualiza o nome e avatar do topo */
function atualizarPerfilUsuario(){

    const usuario = pegarUsuarioLogado();

    if(!usuario){
        return;
    }

    const nomeExibido = usuario.nomeUsuario || primeiroNome(usuario.nome);

    if(nomeUsuarioLogado){
        nomeUsuarioLogado.textContent = nomeExibido;
    }

    if(iniciaisUsuario){
        iniciaisUsuario.textContent = gerarIniciais(nomeExibido);
    }

    if(botaoCriarLogin){

        if(usuarioEhAdministrador(usuario)){
            botaoCriarLogin.style.display = "block";
        }else{
            botaoCriarLogin.style.display = "none";
        }

    }

}

/* Protege as páginas */

function protegerPagina(){

    if(!localStorage.getItem("usuarioLogado")){
        window.location.replace("login.html");
    }

}

protegerPagina();
atualizarPerfilUsuario();

/* Abrir e fechar menu */

if(botaoPerfilUsuario){

    botaoPerfilUsuario.addEventListener("click",(event)=>{

        event.stopPropagation();

        menuUsuario.classList.toggle("ocultarMenuUsuario");

        botaoPerfilUsuario.classList.toggle("ativo");

    });

}

document.addEventListener("click",()=>{

    if(menuUsuario){
        menuUsuario.classList.add("ocultarMenuUsuario");
    }

    if(botaoPerfilUsuario){
        botaoPerfilUsuario.classList.remove("ativo");
    }

});

if(menuUsuario){

    menuUsuario.addEventListener("click",(event)=>{
        event.stopPropagation();
    });

}

/* Perfil */

if(botaoIrPerfil){

    botaoIrPerfil.addEventListener("click",()=>{

        window.location.href = "perfil.html";

    });

}

/* Novo Login */

if(botaoCriarLogin){

    botaoCriarLogin.addEventListener("click",()=>{

        window.location.href = "novoLogin.html";

    });

}

/* Sair */

if(botaoSair){

    botaoSair.addEventListener("click",()=>{

        localStorage.removeItem("usuarioLogado");

        history.pushState(null,null,"login.html");
        window.location.replace("login.html");

    });

}