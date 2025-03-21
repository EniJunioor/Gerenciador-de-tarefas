const mongoose = require("mongoose"); // importa o Mongoose para interagir com o MongoDB

// define o esquema do quadro
const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true } // campo obrigatório para o título do quadro
}, { timestamps: true }); // add automaticamente os campos createdAt e updatedAt

// exporta o modelo "Board" baseado no esquema definido
module.exports = mongoose.model("Board", BoardSchema);