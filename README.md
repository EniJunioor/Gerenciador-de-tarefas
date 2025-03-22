Gerenciador de Tarefas



📌 Sobre o Projeto

O Gerenciador de Tarefas é uma API desenvolvida para facilitar a organização e gestão de tarefas dentro de quadros. Com ele, é possível criar, listar, editar e excluir tarefas de forma simples e eficiente.

🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

Node.js - Ambiente de execução JavaScript

Express - Framework para construção de APIs

MongoDB - Banco de dados NoSQL

Mongoose - ODM para interagir com o MongoDB

JWT - Autenticação segura

Swagger - Documentação interativa da API

📂 Estrutura do Projeto

Gerenciador-de-tarefas/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── package.json
├── README.md
└── swagger.json

📜 Instalação e Configuração

1. Clonar o repositório

git clone https://github.com/EniJunioor/Gerenciador-de-tarefas.git

2. Instalar dependências

cd Gerenciador-de-tarefas
cd app -> cd client
        or
cd app - cd server
npm install

3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione suas credenciais:

MONGO_URI=seu_banco_de_dados
JWT_SECRET=sua_******

4. Iniciar o servidor

node server.js

O servidor rodará em http://localhost:5000

📌 Endpoints Principais

Autenticação

POST /api/auth/login - Autentica o usuário e retorna um token JWT

POST /api/auth/verify-mfa - Verifica a autenticação multifator (MFA)

Tarefas

POST /api/tasks - Cria uma nova tarefa

GET /api/tasks/:boardId - Lista todas as tarefas de um quadro

PUT /api/tasks/:id - Edita uma tarefa

DELETE /api/tasks/:id - Exclui uma tarefa

📖 Documentação da API

O projeto utiliza Swagger para documentar seus endpoints. Acesse:

http://localhost:3000/api-docs

🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

Fork o repositório

Crie uma branch para sua feature (git checkout -b minha-feature)

Commit suas alterações (git commit -m 'Minha feature')

Push para a branch (git push origin minha-feature)

Abra um Pull Request

📝 Licença

Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo LICENSE.

💡 Desenvolvido por Enivander (Junior) 🚀

💡 Desenvolvido por Laysa Camille 🚀

