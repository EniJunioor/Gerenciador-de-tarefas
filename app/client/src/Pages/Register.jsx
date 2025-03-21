import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

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

                    {/* Formulário de cadastro */}
                    <form className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                        <input type="text" placeholder="Digite seu nome completo" className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105" />

                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" placeholder="Digite seu e-mail" className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105" />

                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" placeholder="Digite sua senha" className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105" />

                        <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                        <input type="password" placeholder="Confirme sua senha" className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105" />

                        <button className="w-full bg-purple-500 text-white p-2 mt-4 rounded-lg hover:bg-purple-700 transition transform hover:scale-105">
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
            <div className="hidden lg:flex w-1/2 relative items-center justify-center animate-fade-in rounded-tl-full overflow-hidden order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600"></div>
                <div className="absolute bottom-0 w-full">
                    <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320">
                        <path fill="#c7a3f7" d="M0,160L60,170C120,180,240,200,360,213.3C480,227,600,233,720,213.3C840,193,960,147,1080,138.7C1200,130,1320,160,1380,176L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"></path>
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;
