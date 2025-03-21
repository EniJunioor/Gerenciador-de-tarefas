require("dotenv").config();
const connectDB = require  ('./src/config/db')
const app = require("./app");

const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados antes de iniciar o servidor
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
}).catch((err) => {
  console.error("Erro ao conectar ao banco de dados:", err);
});
