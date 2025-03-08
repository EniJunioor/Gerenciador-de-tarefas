const express = require("express");
const axios = require("axios");
const haversine = require("haversine-distance");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());

// Local do restaurante
const restaurante = { lat: -20.5928, lon: -47.36752 };

/**
 * Rota para obter endereço pelo CEP (sem calcular frete)
 */
app.post("/obter-endereco", async (req, res) => {
    const { cep } = req.body;

    try {
        // Buscar informações do CEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) return res.status(400).json({ erro: "CEP inválido" });

// Retorna apenas os dados do endereço
        return res.json({
            logradouro: response.data.logradouro,
            bairro: response.data.bairro,
            localidade: response.data.localidade,
            uf: response.data.uf
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao buscar informações do CEP." });
    }
});

app.post("/calcular-frete", async (req, res) => {
    const { cep } = req.body;

    try {
        // Busca informações do CEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) return res.status(400).json({ erro: "CEP inválido" });

        const endereco = `${response.data.logradouro}, ${response.data.localidade}, ${response.data.uf}`;

        // Buscar coordenadas reais do endereço
        const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: endereco,
                format: "json",
                limit: 1
            }
        });

        if (!geoResponse.data.length) {
            return res.status(400).json({ erro: "Não foi possível obter a localização do CEP." });
        }

        const enderecoGeo = {
            lat: parseFloat(geoResponse.data[0].lat),
            lon: parseFloat(geoResponse.data[0].lon)
        };

        // Calcular a distância real em KM
        const distancia = haversine(restaurante, enderecoGeo) / 1000;
        const taxa = distancia > 2 ? 5.00 : 0; // R$5 se > 2KM

        return res.json({ distancia: distancia.toFixed(2), taxa });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao buscar informações do CEP." });
    }
});

// Rodar servidor na porta 3000
app.listen(3000, () => console.log("🚀 API rodando na porta 3000"));
