require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Timeout de 10 segundos
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

//integrando as rotas no servidor
const boardRoutes = require("./src/routes/boardRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

app.use("/boards", boardRoutes);
app.use("/tasks", taskRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});