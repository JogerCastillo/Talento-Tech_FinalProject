import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowDown, Zap, Wind, Sun, Droplets } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Fondo animado */}
      <div className="hero-background">
        <div className="energy-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--delay': `${i * 0.2}s`,
                '--duration': `${3 + (i % 3)}s`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Círculos de energía */}
        <div className="energy-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>
      </div>

      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Iconos de energía flotantes */}
          <div className="floating-icons">
            <motion.div 
              className="icon-wrapper icon-1"
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sun className="energy-icon" />
            </motion.div>
            
            <motion.div 
              className="icon-wrapper icon-2"
              animate={{ 
                y: [10, -10, 10],
                rotate: [0, -15, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Wind className="energy-icon" />
            </motion.div>
            
            <motion.div 
              className="icon-wrapper icon-3"
              animate={{ 
                y: [-5, 15, -5],
                rotate: [0, 20, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Droplets className="energy-icon" />
            </motion.div>
            
            <motion.div 
              className="icon-wrapper icon-4"
              animate={{ 
                y: [15, -5, 15],
                rotate: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <Zap className="energy-icon" />
            </motion.div>
          </div>

          {/* Contenido principal */}
          <div className="hero-text">
            <motion.div 
              className="hero-badge"
              variants={itemVariants}
            >
              <Zap size={16} />
              <span>Transición Energética Justa</span>
            </motion.div>

            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Rompiendo esquemas
              <br />
              <span className="gradient-text">hacia el futuro</span>
            </motion.h1>

            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              Una mirada fresca a tus proyectos de diseño energético. 
              La creatividad exterior puede inspirar al resto de tu equipo 
              hacia un futuro más sostenible y justo.
            </motion.p>

            <motion.div 
              className="hero-stats"
              variants={itemVariants}
            >
              <div className="stat">
                <h3 className="gradient-text">1965-2022</h3>
                <p>Años de datos</p>
              </div>
              <div className="stat">
                <h3 className="gradient-text">5+</h3>
                <p>Fuentes renovables</p>
              </div>
              <div className="stat">
                <h3 className="gradient-text">Global</h3>
                <p>Cobertura mundial</p>
              </div>
            </motion.div>

            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <button 
                className="btn btn-primary"
                onClick={() => document.querySelector('#calculator').scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap size={20} />
                Calcular Energía
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => document.querySelector('#dashboard').scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Dashboard
              </button>
            </motion.div>
          </div>

          {/* Elemento visual principal */}
          <motion.div 
            className="hero-visual"
            variants={itemVariants}
          >
            <div className="energy-device">
              <div className="device-screen">
                <div className="screen-content">
                  <div className="energy-bar">
                    <div className="bar-fill"></div>
                  </div>
                  <div className="energy-waves">
                    <div className="wave wave-1"></div>
                    <div className="wave wave-2"></div>
                    <div className="wave wave-3"></div>
                  </div>
                </div>
              </div>
              <div className="device-glow"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          onClick={scrollToNext}
        >
          <span>Descubre más</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
