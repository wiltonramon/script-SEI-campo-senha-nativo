// ==UserScript==
// @name         SEI TRE-CE | Campo de senha nativo
// @namespace    https://sei.tre-ce.jus.br/
// @version      1.2.0
// @license      MIT
// @description  Restaura o campo de senha padrão para o gerenciador de senhas do navegador.
// @match        https://sei.tre-ce.jus.br/sip/login.php*
// @run-at       document-idle
// @noframes
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (location.pathname !== '/sip/login.php') {
        return;
    }

    const formulario = document.querySelector('form#frmLogin');
    const usuario = formulario?.querySelector('input#txtUsuario[name="txtUsuario"]');
    const campoMascarado = formulario?.querySelector('input#pwdSenha[type="text"].masked');
    const campoOculto = formulario?.querySelector('input[name="pwdSenha"][type="password"]');

    // Só altera a tela quando encontra a estrutura de máscara usada pelo SEI.
    if (!usuario || !campoMascarado || !campoOculto) {
        return;
    }

    if (!campoOculto.hidden && getComputedStyle(campoOculto).display !== 'none') {
        return;
    }

    // A cópia mantém o ID usado pela validação e a posição no formulário.
    // Os eventos da máscara ficam no elemento original e saem com ele.
    const senha = campoMascarado.cloneNode(false);
    senha.type = 'password';
    senha.name = campoOculto.name;
    senha.autocomplete = 'current-password';
    senha.classList.remove('masked');
    senha.removeAttribute('value');
    senha.value = '';

    usuario.autocomplete = 'username';

    const senhaEstavaEmFoco = document.activeElement === campoMascarado;
    campoMascarado.replaceWith(senha);
    campoOculto.remove();

    if (senhaEstavaEmFoco) {
        senha.focus();
    }
})();
