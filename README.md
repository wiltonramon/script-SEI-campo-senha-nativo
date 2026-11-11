# SEI TRE-CE | Campo de senha nativo

Script de usuário para o login e a assinatura de documentos no Sistema Eletrônico de Informações (SEI) do Tribunal Regional Eleitoral do Ceará. Restaura o campo de senha nativo para que o gerenciador de senhas do navegador possa reconhecer, salvar e preencher a credencial.

## Como funciona

O SEI usa um campo de texto mascarado por JavaScript e mantém o campo de senha original oculto. O script identifica essa estrutura e coloca um campo de senha padrão no lugar do campo mascarado, preservando o formulário e o envio ao SEI.

O script atua no login e na ação `documento_assinar` do SEI do TRE-CE. O armazenamento e o preenchimento da credencial ficam a cargo do navegador. A assinatura continua dependendo da sua confirmação no SEI.

## Instalação no Tampermonkey

1. Abra [sei-tre-ce-senha-nativa.user.js](sei-tre-ce-senha-nativa.user.js) e copie o código completo, incluindo o bloco `UserScript`.
2. No Tampermonkey, escolha **Criar um novo script**, substitua o conteúdo do editor pelo código copiado e salve com `Ctrl+S`. Se você já usa uma versão anterior, atualize o script instalado.
3. Recarregue a [tela de login do SEI do TRE-CE](https://sei.tre-ce.jus.br/sei/) e entre normalmente. Se o navegador oferecer **Salvar senha**, aceite para usar o preenchimento automático nos próximos acessos.
4. Ao abrir a janela de assinatura, verifique se o navegador oferece a senha salva. Confira o documento e confirme a assinatura no SEI.

## Espelho para o Greasy Fork

Este repositório mantém o código-fonte do script. Para publicar uma versão no [Greasy Fork](https://greasyfork.org/pt-BR), copie o conteúdo do arquivo `.user.js` para o formulário de publicação. A versão está no campo `@version` do cabeçalho.

## Versão 1.3.0

Adiciona o campo de senha nativo ao formulário de assinatura de documentos, incluindo quando o SEI o abre em um quadro interno.

## Versão 1.2.0

O script passou a reconhecer o campo de senha original quando ele é ocultado por uma regra CSS ou pelo atributo HTML `hidden`. A classe `.masked` continua identificando o campo de texto que será substituído.

## Licença

[MIT](LICENSE).
