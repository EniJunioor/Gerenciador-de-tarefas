import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location}>
                {/* Redireciona a rota inicial para /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Página de Login */}
                <Route
                    path="/login"
                    element={
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Login />
                        </motion.div>
                    }
                />

                {/* Página de Registro */}
                <Route
                    path="/register"
                    element={
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Register />
                        </motion.div>
                    }
                />

                {/* Rota para páginas não encontradas */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
};

export default App;
