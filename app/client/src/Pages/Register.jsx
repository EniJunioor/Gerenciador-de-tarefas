import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const FloatingInput = ({ type, placeholder, value, setValue }) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="relative w-full mb-4">
            <motion.label
                initial={{ y: "50%", scale: 1.1, opacity: 0.9 }}
                animate={{ 
                    y: value || focus ? "-10px" : "50%", 
                    scale: value || focus ? 0.85 : 1.2, 
                    opacity: 1
                }}
                transition={{ duration: 0.1 }}
                className={`absolute left-3 transition-all ${
                    value || focus ? "text-purple-700 align-text-top top-2" : "text-gray-400 text-sm top-1/2 -translate-y-6"
                }`}
            >
                {placeholder}
            </motion.label>
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="w-full pt-5 pb-2 px-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all"
            />
        </div>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Validação no frontend
        if (!name || !email || !password || !confirmPassword) {
            console.error("❌ Preencha todos os campos!");
            return;
        }
    
        if (name === password) {
            console.error("❌ O nome e a senha não podem ser iguais!");
            return;
        }

        if (password !== confirmPassword) {
            console.error("As senhas não são iguais!")
        }
    
        console.log("📌 Enviando dados:", { name, email, password, confirmPassword });
    
        try {
            const response = await api.post("/users/register", { name, email, password, confirmPassword });
            console.log("✅ Registro bem-sucedido:", response.data);
            navigate("/login")
        } catch (err) {
            console.error("❌ Erro no registro:", err);
            if (err.response) {
                console.error("❌ Resposta do servidor:", err.response.data);
                console.error("❌ Status HTTP:", err.response.status);
            }
        }
    };
    

    return (
        <motion.div 
            className="flex h-screen bg-gray-50 overflow-hidden relative"
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            {/* Lado esquerdo com formulário */}
            <div className="flex items-center justify-center w-full lg:w-1/2">
                <div className="w-96 p-8 rounded-3xl bg-white shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-6 text-purple-500">𝐓𝐚𝐬𝐤 𝐇𝐮𝐛</h1>
                    <h2 className="text-2xl font-light text-center mb-6 text-gray-700">Register Here</h2>

                    {/* Exibir erro, se houver */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Formulário de cadastro */}
                    <form className="mt-4" onSubmit={handleRegister}>
                        <FloatingInput type="text" placeholder="Name" value={name} setValue={setName} />
                        <FloatingInput type="email" placeholder="Email" value={email} setValue={setEmail} />
                        <FloatingInput type="password" placeholder="Password" value={password} setValue={setPassword} />
                        <FloatingInput type="password" placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />

                        <button 
                            type="submit"
                            className="w-full bg-purple-500 text-white p-2 mt-4 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Voltar para login */}
                    <p className="text-center text-gray-500 text-sm mt-4">
                        Already have an account? 
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-purple-500 hover:underline ml-1"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>

            {/* Lado direito com animação */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center rounded-tl-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600"></div>
            </div>
        </motion.div>
    );
};

export default Register;
