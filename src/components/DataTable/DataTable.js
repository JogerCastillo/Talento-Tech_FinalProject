import React from 'react';
import { motion } from 'framer-motion';
import { Database, Download, FileText } from 'lucide-react';
import './DataTable.css';

const DataTable = () => {
  // Datos de ejemplo - se reemplazarán con datos reales
  const sampleData = [
    {
      year: 2022,
      country: 'Colombia',
      hydro: 45.2,
      solar: 2.1,
      wind: 0.8,
      total: 48.1
    },
    {
      year: 2021,
      country: 'Colombia',
      hydro: 44.8,
      solar: 1.9,
      wind: 0.7,
      total: 47.4
    },
    // Más datos se agregarán desde el CSV
  ];

  return (
    <div className="data-table-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="page-header">
            <div className="section-badge">
              <Database size={16} />
              <span>Datos Históricos</span>
            </div>

            <h1 className="page-title">
              Conjunto de datos de
              <br />
              <span className="gradient-text">energía renovable</span>
            </h1>

            <p className="page-description">
              Explora el conjunto completo de datos históricos globales sobre 
              energía renovable que cubre el periodo de 1965 a 2022.
            </p>

            <div className="page-actions">
              <button className="btn btn-primary">
                <Download size={20} />
                Descargar CSV
              </button>
              <button className="btn btn-secondary">
                <FileText size={20} />
                Documentación
              </button>
            </div>
          </div>

          {/* Información del dataset */}
          <div className="dataset-info glass-card">
            <h3>Información del Dataset</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Período:</strong> 1965 - 2022
              </div>
              <div className="info-item">
                <strong>Países:</strong> 190+ países
              </div>
              <div className="info-item">
                <strong>Fuentes:</strong> Hidroeléctrica, Solar, Eólica, Geotérmica, Biocombustibles
              </div>
              <div className="info-item">
                <strong>Variables:</strong> Producción, Capacidad, Consumo, Participación
              </div>
            </div>
          </div>

          {/* Tabla de datos */}
          <div className="data-table-container glass-card">
            <div className="table-header">
              <h3>Vista previa de datos</h3>
              <span className="table-note">Los datos completos se cargarán desde el archivo CSV</span>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Año</th>
                    <th>País</th>
                    <th>Hidroeléctrica (%)</th>
                    <th>Solar (%)</th>
                    <th>Eólica (%)</th>
                    <th>Total Renovable (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.year}</td>
                      <td>{row.country}</td>
                      <td>{row.hydro}</td>
                      <td>{row.solar}</td>
                      <td>{row.wind}</td>
                      <td className="total-cell">{row.total}</td>
                    </tr>
                  ))}
                  <tr className="placeholder-row">
                    <td colSpan="6">
                      <div className="placeholder-content">
                        <Database size={24} />
                        <p>Los datos históricos completos (1965-2022) aparecerán aquí una vez cargado el CSV</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="instructions glass-card">
            <h3>📋 Instrucciones para cargar datos</h3>
            <ol>
              <li>Una vez tengas el archivo CSV del dataset de energía renovable</li>
              <li>Colócalo en la carpeta <code>src/data/</code> con el nombre <code>renewable-energy-data.csv</code></li>
              <li>Los datos se cargarán automáticamente y poplarán esta tabla</li>
              <li>También se integrarán con el calculadora y los gráficos del dashboard</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataTable;
