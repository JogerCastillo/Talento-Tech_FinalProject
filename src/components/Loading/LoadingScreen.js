import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap size={48} />
        </motion.div>
        
        <motion.h2
          className="loading-title gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          EnergyTech
        </motion.h2>
        
        <motion.p
          className="loading-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Cargando el futuro energético...
        </motion.p>
        
        <div className="loading-bar">
          <motion.div
            className="loading-progress"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      {/* Partículas de fondo */}
      <div className="loading-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="loading-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
