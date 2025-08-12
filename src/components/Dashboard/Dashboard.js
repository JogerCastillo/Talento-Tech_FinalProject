import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Activity, Database, CheckCircle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getDashboardData } from '../../utils/dataManager';
import './Dashboard.css';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Error cargando datos: ' + err.message);
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section id="dashboard" className="dashboard section">
        <div className="container">
          <div className="loading-dashboard">
            <div className="spinner-large"></div>
            <p>Cargando datos de energía renovable...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="dashboard" className="dashboard section">
        <div className="container">
          <div className="error-dashboard">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </div>
      </section>
    );
  }
  // Configuraciones de gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#00ff88',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: { color: '#a0a0a0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: '#a0a0a0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          padding: 20,
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#00ff88',
        borderWidth: 1
      }
    }
  };

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
              a través de visualizaciones interactivas basadas en datos reales.
            </p>
            
            {dashboardData?.dataCount && (
              <div className="data-info">
                <CheckCircle size={16} />
                <span>Datos cargados: {dashboardData.dataCount.toLocaleString()} registros históricos</span>
              </div>
            )}
          </div>

          {/* Gráficos con datos reales */}
          <div className="charts-grid">
            {/* Gráfico de Barras - Producción por Fuente */}
            <div className="chart-card glass-card">
              <div className="chart-header">
                <BarChart3 className="chart-icon" />
                <h3>Producción por Fuente</h3>
              </div>
              <div className="chart-container">
                <Bar 
                  data={{
                    labels: dashboardData?.productionBySource.labels || [],
                    datasets: [{
                      label: 'Generación (TWh)',
                      data: dashboardData?.productionBySource.data || [],
                      backgroundColor: dashboardData?.productionBySource.colors || [],
                      borderWidth: 0,
                      borderRadius: 8
                    }]
                  }}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Gráfico de Torta - Participación Renovables */}
            <div className="chart-card glass-card">
              <div className="chart-header">
                <PieChart className="chart-icon" />
                <h3>Participación por Fuente</h3>
              </div>
              <div className="chart-container">
                <Pie 
                  data={{
                    labels: dashboardData?.renewableShare.labels || [],
                    datasets: [{
                      data: dashboardData?.renewableShare.data || [],
                      backgroundColor: dashboardData?.renewableShare.colors || [],
                      borderWidth: 2,
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }]
                  }}
                  options={pieOptions}
                />
              </div>
            </div>

            {/* Gráfico de Líneas - Tendencia Temporal */}
            <div className="chart-card glass-card">
              <div className="chart-header">
                <TrendingUp className="chart-icon" />
                <h3>Tendencia de Capacidad</h3>
              </div>
              <div className="chart-container">
                <Line 
                  data={{
                    labels: dashboardData?.capacityTrend.labels || [],
                    datasets: dashboardData?.capacityTrend.datasets?.map(dataset => ({
                      label: dataset.label,
                      data: dataset.data,
                      borderColor: dataset.color,
                      backgroundColor: dataset.color + '20',
                      borderWidth: 3,
                      fill: false,
                      tension: 0.4,
                      pointBackgroundColor: dataset.color,
                      pointBorderColor: '#ffffff',
                      pointBorderWidth: 2,
                      pointRadius: 5
                    })) || []
                  }}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Estadísticas Resumen */}
            <div className="chart-card glass-card">
              <div className="chart-header">
                <Activity className="chart-icon" />
                <h3>Resumen Global</h3>
              </div>
              <div className="stats-container">
                <div className="stat-item">
                  <h4 className="gradient-text">
                    {dashboardData?.totalRenewables?.toFixed(1) || '0'} TWh
                  </h4>
                  <p>Total Renovables</p>
                </div>
                <div className="stat-item">
                  <h4 className="gradient-text">
                    {dashboardData?.dataCount?.toLocaleString() || '0'}
                  </h4>
                  <p>Registros</p>
                </div>
                <div className="stat-item">
                  <h4 className="gradient-text">
                    {dashboardData?.capacityTrend?.labels?.length || '0'}
                  </h4>
                  <p>Años de Datos</p>
                </div>
                <div className="stat-item">
                  <h4 className="gradient-text">4</h4>
                  <p>Fuentes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información del dataset */}
          <div className="dataset-status glass-card">
            <div className="status-header">
              <Database className="status-icon" />
              <h4>Estado del Dataset</h4>
            </div>
            <div className="status-content">
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>Datos CSV cargados exitosamente</span>
              </div>
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>Gráficos funcionando con datos reales</span>
              </div>
              <div className="status-item">
                <CheckCircle className="check-icon" />
                <span>Calculadora integrada con información histórica</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
