import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Calculator as CalcIcon, Zap, TrendingUp, Home, Building, Info } from 'lucide-react';
import './Calculator.css';

const Calculator = () => {
  const [consumption, setConsumption] = useState('');
  const [householdType, setHouseholdType] = useState('small');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Datos simulados de capacidad instalada (se reemplazarán con datos reales)
  const renewableCapacity = {
    hydro: 1380, // GW
    solar: 940,
    wind: 890,
    geothermal: 15,
    bioenergy: 130
  };

  const householdTypes = {
    small: { name: 'Casa Pequeña', multiplier: 1, icon: <Home size={20} /> },
    medium: { name: 'Casa Mediana', multiplier: 1.5, icon: <Home size={20} /> },
    large: { name: 'Casa Grande', multiplier: 2.2, icon: <Building size={20} /> },
    apartment: { name: 'Apartamento', multiplier: 0.7, icon: <Building size={20} /> }
  };

  const calculateRenewablePercentage = () => {
    if (!consumption || consumption <= 0) return;

    setLoading(true);
    
    // Simulamos cálculo (se reemplazará con lógica real basada en datos)
    setTimeout(() => {
      const totalRenewableCapacity = Object.values(renewableCapacity).reduce((sum, cap) => sum + cap, 0);
      const userConsumption = parseFloat(consumption);
      const typeMultiplier = householdTypes[householdType].multiplier;
      const adjustedConsumption = userConsumption * typeMultiplier;
      
      // Cálculos simulados
      const renewablePercentage = Math.min(85, (totalRenewableCapacity / 50) + Math.random() * 20);
      const monthlyConsumption = adjustedConsumption;
      const renewableConsumption = (monthlyConsumption * renewablePercentage) / 100;
      const co2Saved = renewableConsumption * 0.5; // kg CO2 ahorrado por kWh renovable
      const treesEquivalent = Math.round(co2Saved / 22); // Un árbol absorbe ~22kg CO2/año
      
      const breakdown = {
        hydro: (renewableCapacity.hydro / totalRenewableCapacity) * renewablePercentage,
        solar: (renewableCapacity.solar / totalRenewableCapacity) * renewablePercentage,
        wind: (renewableCapacity.wind / totalRenewableCapacity) * renewablePercentage,
        geothermal: (renewableCapacity.geothermal / totalRenewableCapacity) * renewablePercentage,
        bioenergy: (renewableCapacity.bioenergy / totalRenewableCapacity) * renewablePercentage
      };

      setResults({
        renewablePercentage: renewablePercentage.toFixed(1),
        monthlyConsumption: monthlyConsumption.toFixed(1),
        renewableConsumption: renewableConsumption.toFixed(1),
        co2Saved: co2Saved.toFixed(1),
        treesEquivalent,
        breakdown,
        householdType: householdTypes[householdType].name
      });
      
      setLoading(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setConsumption('');
    setResults(null);
  };

  return (
    <section id="calculator" className="calculator section" ref={ref}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Header */}
          <div className="calculator-header">
            <motion.div 
              className="section-badge"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
              }}
            >
              <CalcIcon size={16} />
              <span>Calculadora de Energía</span>
            </motion.div>

            <motion.h2 
              className="section-title"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
              }}
            >
              Calcula tu <span className="gradient-text">huella energética</span>
            </motion.h2>

            <motion.p 
              className="section-description"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
              }}
            >
              Descubre qué porcentaje de tu consumo eléctrico puede ser cubierto 
              por energías renovables y conoce tu impacto ambiental.
            </motion.p>
          </div>

          <div className="calculator-content">
            {/* Formulario */}
            <motion.div 
              className="calculator-form glass-card"
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
              }}
            >
              <div className="form-header">
                <Zap className="form-icon" />
                <h3>Ingresa tus datos</h3>
              </div>

              <div className="form-group">
                <label htmlFor="household-type">Tipo de vivienda</label>
                <div className="household-types">
                  {Object.entries(householdTypes).map(([key, type]) => (
                    <button
                      key={key}
                      type="button"
                      className={`household-btn ${householdType === key ? 'active' : ''}`}
                      onClick={() => setHouseholdType(key)}
                    >
                      {type.icon}
                      <span>{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="consumption">Consumo mensual (kWh)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="consumption"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="Ej: 300"
                    min="0"
                    step="0.1"
                  />
                  <span className="input-unit">kWh</span>
                </div>
                <div className="input-help">
                  <Info size={14} />
                  <span>Promedio residencial: 150-400 kWh/mes</span>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={calculateRenewablePercentage}
                  disabled={!consumption || loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      <CalcIcon size={20} />
                      Calcular
                    </>
                  )}
                </button>
                
                {results && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetCalculator}
                  >
                    Nuevo Cálculo
                  </button>
                )}
              </div>
            </motion.div>

            {/* Resultados */}
            {results && (
              <motion.div 
                className="calculator-results"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Resultado principal */}
                <div className="main-result glass-card">
                  <div className="result-header">
                    <TrendingUp className="result-icon" />
                    <h3>Tu perfil energético</h3>
                  </div>
                  
                  <div className="result-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className="circle"
                        strokeDasharray={`${results.renewablePercentage}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${results.renewablePercentage}, 100` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                      <text x="18" y="20.35" className="percentage">
                        {results.renewablePercentage}%
                      </text>
                    </svg>
                  </div>
                  
                  <div className="result-info">
                    <h4>Energía Renovable</h4>
                    <p>{results.householdType}</p>
                  </div>
                </div>

                {/* Detalles */}
                <div className="result-details">
                  <div className="detail-card">
                    <h4>Consumo Mensual</h4>
                    <p className="detail-value">{results.monthlyConsumption} <span>kWh</span></p>
                  </div>
                  
                  <div className="detail-card">
                    <h4>Energía Renovable</h4>
                    <p className="detail-value renewable">{results.renewableConsumption} <span>kWh</span></p>
                  </div>
                  
                  <div className="detail-card">
                    <h4>CO₂ Ahorrado</h4>
                    <p className="detail-value co2">{results.co2Saved} <span>kg/mes</span></p>
                  </div>
                  
                  <div className="detail-card">
                    <h4>Equivale a</h4>
                    <p className="detail-value trees">{results.treesEquivalent} <span>árboles</span></p>
                  </div>
                </div>

                {/* Desglose por fuente */}
                <div className="energy-breakdown glass-card">
                  <h4>Desglose por fuente renovable</h4>
                  <div className="breakdown-bars">
                    {Object.entries(results.breakdown).map(([source, percentage]) => (
                      <div key={source} className="breakdown-item">
                        <span className="breakdown-label">
                          {source === 'hydro' && 'Hidroeléctrica'}
                          {source === 'solar' && 'Solar'}
                          {source === 'wind' && 'Eólica'}
                          {source === 'geothermal' && 'Geotérmica'}
                          {source === 'bioenergy' && 'Bioenergía'}
                        </span>
                        <div className="breakdown-bar">
                          <motion.div
                            className={`breakdown-fill ${source}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(percentage / results.renewablePercentage) * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <span className="breakdown-value">{percentage.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
