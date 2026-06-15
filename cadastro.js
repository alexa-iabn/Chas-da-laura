/* js/cadastro.js — Tela de cadastro de novo usuário */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const btn  = document.querySelector('.botaoCadastrar, form button');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputs  = form.querySelectorAll('input[type="text"], input[type="email"]');
            const senhas  = form.querySelectorAll('input[type="password"]');
            const nome    = inputs[0]?.value.trim();
            const email   = inputs[1]?.value.trim() || form.querySelector('input[type="email"]')?.value.trim();
            const senha   = senhas[0]?.value.trim();
            const confirm = senhas[1]?.value.trim();

            if (!nome || !email || !senha) {
                mostrarErro('Preencha todos os campos obrigatórios.');
                return;
            }
            if (senha !== confirm) {
                mostrarErro('As senhas não coincidem.');
                return;
            }
            if (senha.length < 6) {
                mostrarErro('A senha deve ter pelo menos 6 caracteres.');
                return;
            }

            localStorage.setItem('chl_logado', '1');
            localStorage.setItem('chl_usuario', nome);
            window.location.href = 'paineldeinicio.html';
        });
    }

    function mostrarErro(msg) {
        let el = document.getElementById('erroCadastro');
        if (!el) {
            el = document.createElement('p');
            el.id = 'erroCadastro';
            el.style.cssText = 'color:#e53e3e;font-size:13px;margin-top:8px;';
            form?.appendChild(el);
        }
        el.textContent = msg;
    }
});
