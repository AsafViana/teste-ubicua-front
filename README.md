
# Teste Ubicua Front-end

Segunda parte do teste para a vaga de front-end da Ubicua.

## Índice

- [Sobre](#sobre)
- [Começando](#começando)
- [Instalação](#instalação)
- [Uso](#uso)

## Sobre

Esse sistema tem a função de utilizar a API criada também para o teste, em Asp.NET, para que seja possível utilizar das funcionalidades de cadastro e listagem de usuários.

## Começando

O projeto utiliza do Redux para o gerenciamento de estados globais. O projeto possui apenas uma tela e alguns modais por cima para as telas de edição e adição de novos usuários.

## Instalação

Para instalar o site, siga os passos abaixo:

1. Clone o repositório para sua máquina local.
2. Execute o comando `npm install` para instalar as dependências.
3. Execute o comando `npm start` para iniciar o servidor de desenvolvimento.

## Uso

O código está concentrado, em sua maioria, no arquivo `App.tsx`, possui uma pasta de componentes junto do arquivo que cria todo o background da aplicação chamado `Modelo.tsx`. Possui também uma pasta `redux` que é onde fica toda a parte de gerenciamento de estados.

A aplicação utiliza do Tailwind para a estilização em conjunto do `Shadcn/ui` para a criação dos componentes.
