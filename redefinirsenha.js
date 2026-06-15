/* js/redefinirsenha.js — Redefinir senha */
document.addEventListener('DOMContentLoaded', function () {
    const form  = document.querySelector('form');
    const input = document.querySelector('input[type="email"]');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = input?.value.trim();
            if (!email) {
                mostrarMsg('Informe seu e-mail.', 'erro');
                return;
            }
            mostrarMsg('Instruções enviadas para ' + email + '. Verifique sua caixa de entrada.', 'ok');
            setTimeout(() => { window.location.href = 'login.html'; }, 3000);
        });
    }

    function mostrarMsg(msg, tipo) {
        let el = document.getElementById('msgRedefinir');
        if (!el) {
            el = document.createElement('p');
            el.id = 'msgRedefinir';
            el.style.cssText = `font-size:13px;margin-top:10px;padding:10px;border-radius:6px;`;
            form?.appendChild(el);
        }
        el.style.background = tipo === 'ok' ? '#e6f7ee' : '#fde';
        el.style.color = tipo === 'ok' ? '#0D5B2A' : '#c00';
        el.textContent = msg;
    }
});
