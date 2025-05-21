
# 🧪 Cypress Trello API Tests

Este projeto contém testes automatizados com **Cypress** para a API pública do **Trello**, com foco nos principais fluxos de manipulação de **boards** e **cards**. O framework está estruturado para facilitar manutenção, extensão e geração de relatórios em HTML via **Mochawesome**.

---

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── trello_api_board.cy.js    # Testes de criação, listagem e deleção de boards
│   └── trello_api_card.cy.js     # Testes de criação, listagem e deleção de cards
├── reports/
│   ├── assets/                   # Arquivos auxiliares do relatório HTML
│   └── index.html                # Relatório final dos testes (gerado via script)
├── support/
│   └── commands.js               # Central de comandos customizados e requisições API
├── cypress.config.js             # Configuração principal do Cypress
├── package.json                  # Dependências e scripts npm
```

📌 **Importante**: As requisições para a API do Trello são centralizadas no arquivo  
`cypress/support/commands.js` através de comandos customizados do Cypress (`Cypress.Commands.add()`), garantindo reuso e clareza.

---

## 🚀 Como executar os testes

### 1. Instalar as dependências

```bash
npm install
```

### 2. Executar os testes via CLI

```bash
npx cypress run
```

> Isso gerará arquivos `.json` com os resultados no diretório `cypress/reports/`.

> O relatório estará disponível em: `cypress/reports/index.html`.

---

## 📊 Scripts disponíveis

Os seguintes scripts estão definidos no `package.json` para automação dos relatórios:

```json
"scripts": {
  "test": "npx cypress open" # Executa os testes na interface do cypress 
   "cli": "npx cypress run"  # Excuta em modo headless e gera o report html ao final da execução
}
```

---

## 🔐 Variáveis Sensíveis

Este projeto consome a API do Trello via `key` e `token`. **Não exponha estas informações diretamente nos arquivos de teste.**
substitua as variaveis no arquivo **cypress.config.js**

- Variáveis: `API_KEY`, `API_TOKEN`.

---

## 📘 Observações

- Este projeto foi testado com **Cypress 10+**.
- A autenticação da API é obrigatória em todos os testes.
- Arquivo `commands.js` implementa todos os comandos reutilizáveis (como `createBoard`, `deleteCard`, etc.).

---

## 👨‍💻 Autor

Desenvolvido por **@Deamgaudencioramos**  
Analista de Qualidade de Software Sênior • Certificado ISTQB • Pós-graduado em Engenharia de Software