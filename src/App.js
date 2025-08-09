import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import DataTable from './components/DataTable/DataTable';
import Calculator from './components/Calculator/Calculator';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import ParticlesBackground from './components/Background/ParticlesBackground';
import LoadingScreen from './components/Loading/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  //const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Simulamos carga inicial
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /*const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };*/

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <ParticlesBackground />
      
      <AnimatePresence mode="wait">
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header  />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Calculator />
                <Dashboard />
              </>
            } />
            <Route path="/data" element={<DataTable />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
