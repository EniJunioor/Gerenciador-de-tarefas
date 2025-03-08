const express = require("express");



app.use(express.json());
app.use(cors());



// Rodar servidor na porta 3000
app.listen(3000, () => console.log("🚀 API rodando na porta 3000"));
