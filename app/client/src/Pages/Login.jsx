import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Imagegit from "../assets/github.svg";
import Imagegoogle from "../assets/google.svg";
import api from "../services/api";

const FloatingInput = ({ type, placeholder }) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");

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
                    value || focus ? "text-blue-500 align-text-top top-2" : "text-gray-400 text-sm top-1/2 -translate-y-6"
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
                className="w-full pt-5 pb-2 px-2 bg-gray-200 rounded-lg  focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
        </div>
    );
};


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("http://localhost:3000/api/users/login", {
                email,
                password,
            });

            const { token } = response.data;
            
            localStorage.setItem("token", token); // Salva o token no localStorage
            navigate("/dashboard"); // Redireciona para o painel

        } catch (err) {
            console.error("Erro no login:", err);
            setError("Invalid email or password");
        }
    };


    return (
        <motion.div
            className="flex h-screen bg-gray-50 overflow-hidden relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
        >
            <div className="hidden lg:flex w-1/2 items-center justify-center relative animate-fade-in overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br rounded-tr-full from-blue-500 to-blue-600"></div>
                <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320">
                    <path
                        fill="#a3c5f7"
                        d="M0,160L60,170C120,180,240,200,360,213.3C480,227,600,233,720,213.3C840,193,960,147,1080,138.7C1200,130,1320,160,1380,176L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
                    ></path>
                </svg>
            </div>
            
            <div className="flex items-center justify-center w-full lg:w-1/2">
                <div className="w-96 p-8 bg-white shadow-2xl rounded-3xl">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">𝐓𝐚𝐬𝐤 𝐇𝐮𝐛</h1>
                    <h2 className="text-2xl font-light text-center mb-6 text-gray-700">Sign in</h2>
                    
                    <div className="flex flex-col space-y-4 mb-6">
                        <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-100 transform transition-all hover:scale-105 active:scale-100">
                            <img src={Imagegoogle} className="w-6 h-6 mr-3" alt="Google" />
                            <span className="text-gray-700 font-medium">Continue with Google</span>
                        </button>

                        <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-100 transform transition-all hover:scale-105 active:scale-100">
                            <img src={Imagegit} className="w-6 h-6 mr-3" alt="GitHub" />
                            <span className="text-gray-700 font-medium">Continue with GitHub</span>
                        </button>
                    </div>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-500">Or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <form className="mt-4">
                    <FloatingInput type="email" placeholder="Email" value={email} setValue={setEmail} />
                    <FloatingInput type="password" placeholder="Password" value={password} setValue={setPassword} />
                        
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <p className="text-gray-700">Remember your password</p>
                        </label>

                        <a href="#" className="text-blue-500 text-sm block mt-2 hover:underline">Forgot Password?</a>

                        <button type="submit" className="w-full bg-blue-500 text-white p-3 mt-4 rounded-lg hover:bg-blue-700 transform transition hover:scale-105">
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        Don't have an account yet?
                        <button
                            onClick={() => navigate("/register")}
                            className="text-blue-500 hover:underline ml-1"
                        >
                            Register
                        </button>
                    </p>

                    <p className="text-center text-gray-400 text-xs mt-2">
                        By signing up, you acknowledge that you agree to our{" "}
                        <a href="#" className="text-blue-400 hover:underline">Cloud Terms of Service</a> and{" "}
                        <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;