import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Droplets, Zap, TrendingUp, Globe, Leaf, Battery } from 'lucide-react';
import './About.css';

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.1 });

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

  const features = [
    {
      icon: <Droplets />,
      title: "Energía Hidráulica",
      description: "Aprovechamos la fuerza del agua para generar electricidad limpia y renovable.",
      stat: "16%",
      statLabel: "De la energía mundial"
    },
    {
      icon: <Leaf />,
      title: "Cero Emisiones",
      description: "La hidroeléctrica no produce gases de efecto invernadero durante la operación.",
      stat: "0 CO₂",
      statLabel: "Emisiones directas"
    },
    {
      icon: <Battery />,
      title: "Almacenamiento",
      description: "Las represas pueden almacenar energía y liberarla cuando se necesite.",
      stat: "24/7",
      statLabel: "Disponibilidad"
    },
    {
      icon: <TrendingUp />,
      title: "Eficiencia",
      description: "Una de las fuentes de energía más eficientes disponibles actualmente.",
      stat: "90%+",
      statLabel: "Eficiencia"
    }
  ];

  const benefits = [
    "Fuente de energía renovable y sostenible",
    "Contribuye al control de inundaciones",
    "Proporciona agua para irrigación",
    "Crea oportunidades de recreación",
    "Tecnología madura y confiable",
    "Vida útil de más de 50 años"
  ];

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Header */}
          <div className="about-header">
            <motion.div 
              className="section-badge"
              variants={itemVariants}
            >
              <Droplets size={16} />
              <span>Energía Hidroeléctrica</span>
            </motion.div>

            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              El poder del agua para un
              <br />
              <span className="gradient-text">futuro sostenible</span>
            </motion.h2>

            <motion.p 
              className="section-description"
              variants={itemVariants}
            >
              La energía hidroeléctrica ha sido fundamental en la transición hacia 
              fuentes de energía limpias. Desde 1965, hemos sido testigos de un 
              crecimiento constante en su adopción mundial.
            </motion.p>
          </div>

          {/* Características principales */}
          <motion.div 
            className="features-grid"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card glass-card"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-stat">
                  <span className="stat-number gradient-text">{feature.stat}</span>
                  <span className="stat-label">{feature.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Información detallada */}
          <div className="about-content">
            <motion.div 
              className="content-text"
              variants={itemVariants}
            >
              <h3 className="content-title">
                Transformando el paisaje energético global
              </h3>
              
              <p className="content-paragraph">
                La energía hidroeléctrica representa una de las tecnologías más maduras 
                y confiables en el sector de energías renovables. Con más de un siglo 
                de desarrollo, ha demostrado ser una solución efectiva para la 
                generación de electricidad limpia a gran escala.
              </p>

              <p className="content-paragraph">
                En el contexto de la transición energética justa, la hidroeléctrica 
                juega un papel crucial al proporcionar energía estable y predecible, 
                complementando otras fuentes renovables como la solar y eólica.
              </p>

              {/* Lista de beneficios */}
              <div className="benefits-list">
                <h4 className="benefits-title">Beneficios clave:</h4>
                <ul className="benefits-items">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="benefit-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Zap size={16} className="benefit-icon" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="content-visual"
              variants={itemVariants}
            >
              {/* Visualización de datos */}
              <div className="data-visualization">
                <div className="viz-header">
                  <Globe className="viz-icon" />
                  <h4>Capacidad Global Instalada</h4>
                </div>
                
                <div className="progress-bars">
                  <div className="progress-item">
                    <span className="progress-label">Hidroeléctrica</span>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill hydro"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                    </div>
                    <span className="progress-value">1,380 GW</span>
                  </div>
                  
                  <div className="progress-item">
                    <span className="progress-label">Solar</span>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill solar"
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 2, delay: 1.2 }}
                      />
                    </div>
                    <span className="progress-value">940 GW</span>
                  </div>
                  
                  <div className="progress-item">
                    <span className="progress-label">Eólica</span>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill wind"
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 2, delay: 1.4 }}
                      />
                    </div>
                    <span className="progress-value">890 GW</span>
                  </div>
                </div>

                {/* Datos destacados */}
                <div className="highlight-stats">
                  <div className="highlight-stat">
                    <h5 className="gradient-text">190+</h5>
                    <p>Países con hidroeléctrica</p>
                  </div>
                  <div className="highlight-stat">
                    <h5 className="gradient-text">4,370 TWh</h5>
                    <p>Generación anual mundial</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Elementos decorativos */}
      <div className="about-decorations">
        <div className="water-drops">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="water-drop"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
