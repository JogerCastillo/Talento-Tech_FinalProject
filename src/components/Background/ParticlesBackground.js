import React from 'react';
import './ParticlesBackground.css';

const ParticlesBackground = () => {
  return (
    <div className="particles-container">
      {/* Partículas flotantes */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 25}s`
          }}
        />
      ))}
      
      {/* Ondas de energía */}
      <div className="energy-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
      
      {/* Gradiente de fondo */}
      <div className="background-gradient"></div>
    </div>
  );
};

export default ParticlesBackground;
