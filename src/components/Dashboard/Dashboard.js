import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <section id="dashboard" className="dashboard section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="dashboard-header">
            <div className="section-badge">
              <BarChart3 size={16} />
              <span>Dashboard Energético</span>
            </div>

            <h2 className="section-title">
              Visualización integral de
              <br />
              <span className="gradient-text">datos energéticos</span>
            </h2>

            <p className="section-description">
              Explora tendencias y patrones en la producción y consumo de energía renovable 
              a través de visualizaciones interactivas y dinámicas.
            </p>
          </div>

          {/* Placeholder para gráficos */}
          <div className="charts-grid">
            <div className="chart-card glass-card">
              <div className="chart-header">
                <BarChart3 className="chart-icon" />
                <h3>Producción por Fuente</h3>
              </div>
              <div className="chart-placeholder">
                <div className="placeholder-content">
                  <p>Gráfico de Barras</p>
                  <span>Datos se cargarán aquí</span>
                </div>
              </div>
            </div>

            <div className="chart-card glass-card">
              <div className="chart-header">
                <PieChart className="chart-icon" />
                <h3>Participación Renovables</h3>
              </div>
              <div className="chart-placeholder">
                <div className="placeholder-content">
                  <p>Gráfico de Torta</p>
                  <span>Datos se cargarán aquí</span>
                </div>
              </div>
            </div>

            <div className="chart-card glass-card">
              <div className="chart-header">
                <TrendingUp className="chart-icon" />
                <h3>Capacidad Instalada</h3>
              </div>
              <div className="chart-placeholder">
                <div className="placeholder-content">
                  <p>Gráfico de Líneas</p>
                  <span>Datos se cargarán aquí</span>
                </div>
              </div>
            </div>

            <div className="chart-card glass-card">
              <div className="chart-header">
                <Activity className="chart-icon" />
                <h3>Consumo vs Convencional</h3>
              </div>
              <div className="chart-placeholder">
                <div className="placeholder-content">
                  <p>Gráfico de Área</p>
                  <span>Datos se cargarán aquí</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="data-note">
            <div className="note-content glass-card">
              <h4>📊 Datos en Preparación</h4>
              <p>
                Los gráficos se poblarán automáticamente una vez que se integren 
                los datos del conjunto histórico de energía renovable (1965-2022).
              </p>
              <p>
                <strong>Fuentes incluirán:</strong> Hidroeléctrica, Solar, Eólica, 
                Geotérmica, Biocombustibles y datos de capacidad instalada.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
