# Estudos - Node.js fundamentals

Este projeto é um estudo sobre fundamentos do Node.js: criação de um servidor HTTP puro, roteamento manual, leitura e escrita em arquivos para persistência simples, middlewares básicos e extração de parâmetros de rota e query string.

## O que este projeto demonstra

- Uso do módulo `http` do Node.js para criar um servidor sem frameworks.
- Definição de rotas como objetos (`method`, `path`, `handler`) e uso de expressões regulares para rotas dinâmicas.
- Implementação de um middleware `json` para ler e parsear o corpo da requisição.
- Manipulação de um banco de dados simples em arquivo (`src/db.json`) através da classe `Database` (métodos: select, insert, update, delete).
- Extração e parsing de query string (`utils/extract-query-params.js`).
- Construção dinâmica de regex para rotas com parâmetros (`utils/build-route-path.js`).

## Como executar

Requisitos: Node.js v20+

1. Instale dependências (se houver). Neste projeto não existem dependências externas.
2. Execute em modo de desenvolvimento (watch):

```powershell
npm run dev
```

O servidor ficará escutando em `http://localhost:3333`.

## Endpoints

- GET /users
  - Query option: `?search=texto` — faz filtro simples por `name` ou `email`.

- POST /users
  - Body JSON: `{ "name": "Nome", "email": "email@exemplo.com" }`
  - Cria um usuário e salva em `src/db.json`.

- PUT /users/:id
  - Body JSON: `{ "name": "Novo Nome", "email": "novo@exemplo.com" }`
  - Atualiza o usuário com o id informado.

- DELETE /users/:id
  - Remove o usuário com o id informado.

## O que aprendi com este projeto

- Como funciona o roteamento básico sem frameworks: capturar `method` e `url`, construir expressões regulares para rotas dinâmicas e chamar handlers.
- Como ler o corpo da requisição manualmente e como tratar erros de JSON inválido.
- Como persistir dados em arquivo usando `fs/promises` e por que é importante tratar operações assíncronas no startup (carregar db antes de aceitar requisições).
- Como lidar com query strings e como separar `pathname` de `query` para evitar problemas de matching com regex.
- Limitações de trabalhar com regex (grupos nomeados duplicados) e estratégias para normalizar parâmetros.

## Competências adquiridas

Ao completar este projeto, você desenvolve/fortalece as seguintes habilidades:

- Conhecimento prático do módulo `http` do Node.js.
- Habilidade de criar middlewares simples e manipular o fluxo de requisição/resposta.
- Competência em manipulação de arquivos e persistência simples com `fs/promises`.
- Raciocínio para construir e debugar expressões regulares aplicadas ao roteamento.
- Boas práticas: validação de entrada, tratamento de erros, e pensar sobre estado assíncrono (carregamento de DB).

## Observações e recomendações

- Evite depender de regex para capturar query string — separe `pathname` e `query` antes do match.
- Ao gerar grupos nomeados dinamicamente, evite nomes duplicados (ex.: `id`) ou normalize os nomes depois do match.
- Considere adicionar testes automatizados e mais validações.
- Para produção, substitua a persistência em arquivo por um banco real e use frameworks como Express para produtividade.

## Próximos exercícios sugeridos

- Implementar paginação e ordenação em `GET /users`.
- Adicionar autenticação básica.
- Substituir a persistência por SQLite ou outro DB leve.
- Implementar testes unitários para `Database` e testes de integração para as rotas.

---

Projeto criado como estudo dos fundamentos do Node.js.
