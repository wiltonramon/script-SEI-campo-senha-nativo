// ==UserScript==
// @name         SEI TRE-CE | Campo de senha nativo
// @namespace    https://sei.tre-ce.jus.br/
// @version      1.3.0
// @license      MIT
// @description  Restaura o campo de senha padrão no login e na assinatura de documentos no SEI do TRE-CE.
// @match        https://sei.tre-ce.jus.br/sip/login.php*
// @match        https://sei.tre-ce.jus.br/sei/controlador.php*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const noLogin = location.pathname === '/sip/login.php' && window.top === window.self;
    const naAssinatura = location.pathname === '/sei/controlador.php'
        && new URLSearchParams(location.search).get('acao') === 'documento_assinar';

    if (!noLogin && !naAssinatura) {
        return;
    }

    const seletorSenha = 'input#pwdSenha[type="text"].masked';
    const campoMascarado = document.querySelector(noLogin ? `form#frmLogin ${seletorSenha}` : seletorSenha);
    const formulario = campoMascarado?.form;
    const usuario = formulario?.querySelector('input#txtUsuario[name="txtUsuario"]');
    const campoOculto = formulario?.querySelector('input[name="pwdSenha"][type="password"]');

    // Só altera o campo quando a máscara e a senha original pertencem ao mesmo formulário.
    if (!campoOculto || (noLogin && !usuario)) {
        return;
    }

    if (!campoOculto.hidden && getComputedStyle(campoOculto).display !== 'none') {
        return;
    }

    // A cópia mantém o ID usado pela validação e a posição no formulário.
    // A cópia preserva atributos do SEI, como o onkeypress da assinatura.
    // Os ouvintes que a biblioteca da máscara adicionou ficam no elemento original.
    const senha = campoMascarado.cloneNode(false);
    senha.type = 'password';
    senha.name = campoOculto.name;
    senha.autocomplete = 'current-password';
    senha.classList.remove('masked');
    senha.removeAttribute('value');
    senha.value = '';

    if (usuario) {
        usuario.autocomplete = 'username';
    }

    const senhaEstavaEmFoco = document.activeElement === campoMascarado;
    campoMascarado.replaceWith(senha);
    campoOculto.remove();

    if (senhaEstavaEmFoco) {
        senha.focus();
    }
})();
