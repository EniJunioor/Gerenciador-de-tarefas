import axios from "axios";

console.log("📌 Base URL configurada para:", "http://localhost:3000/api");

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export default api;
