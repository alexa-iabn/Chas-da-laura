/* js/login.js — Tela de login */
document.addEventListener('DOMContentLoaded', function () {
    const form    = document.querySelector('form');
    const btnEntrar = document.querySelector('.botaoCadastrar, button[type="submit"], form button');
    const inputEmail = document.querySelector('input[type="email"]');
    const inputSenha = document.querySelector('input[type="password"]');

    /* Preencher e-mail salvo se "Lembrar-me" estava marcado */
    const emailSalvo = localStorage.getItem('chl_lembrar_email');
    if (emailSalvo && inputEmail) {
        inputEmail.value = emailSalvo;
        const checkbox = document.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = true;
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = inputEmail?.value.trim();
            const senha = inputSenha?.value.trim();

            if (!email || !senha) {
                mostrarErro('Preencha e-mail e senha.');
                return;
            }

            /* Lembrar e-mail */
            const lembrar = document.querySelector('input[type="checkbox"]');
            if (lembrar?.checked) {
                localStorage.setItem('chl_lembrar_email', email);
            } else {
                localStorage.removeItem('chl_lembrar_email');
            }

            /* Credenciais aceitas: qualquer e-mail + senha com 4+ chars */
            if (senha.length < 4) {
                mostrarErro('Senha incorreta.');
                return;
            }

            localStorage.setItem('chl_logado', '1');
            localStorage.setItem('chl_usuario', email.split('@')[0]);
            window.location.href = 'paineldeinicio.html';
        });
    }

    function mostrarErro(msg) {
        let el = document.getElementById('erroLogin');
        if (!el) {
            el = document.createElement('p');
            el.id = 'erroLogin';
            el.style.cssText = 'color:#e53e3e;font-size:13px;margin-top:8px;';
            form?.appendChild(el);
        }
        el.textContent = msg;
    }
});
