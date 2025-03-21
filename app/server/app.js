const express = require("express");
//ROTA DE USUARIO
const userRoutes = require('./src/routes/userRoutes');
//integrando as rotas no servidor
const boardRoutes = require("./src/routes/boardRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
// IMPORTANDO ROTA SWAGGER
const { swaggerUi, swaggerDocs } = require('./src/swagger/swaggerConfig.js');



const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);



module.exports=app;
