import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Download, FileText, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { loadRenewableEnergyData } from '../../utils/dataManager';
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const csvData = await loadRenewableEnergyData();
        setData(csvData);
        setFilteredData(csvData.slice(0, 100)); // Mostrar los primeros 100 registros inicialmente
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos del CSV');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtros y búsqueda
  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(item => item.country === selectedCountry);
    }

    if (selectedYear) {
      filtered = filtered.filter(item => item.year.toString() === selectedYear);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCountry, selectedYear, data]);

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Obtener países únicos para filtro
  const countries = [...new Set(data.map(item => item.country))].sort();
  const years = [...new Set(data.map(item => item.year))].sort((a, b) => b - a);

  // Estadísticas del dataset
  const stats = {
    totalRecords: data.length,
    countries: countries.length,
    yearRange: data.length > 0 ? `${Math.min(...years)} - ${Math.max(...years)}` : 'N/A',
    totalRenewables: data.reduce((sum, item) => sum + item.totalRenewables, 0).toFixed(1)
  };

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
                <strong>Período:</strong> {stats.yearRange}
              </div>
              <div className="info-item">
                <strong>Países:</strong> {stats.countries} países
              </div>
              <div className="info-item">
                <strong>Fuentes:</strong> Hidroeléctrica, Solar, Eólica, Geotérmica, Biocombustibles
              </div>
              <div className="info-item">
                <strong>Registros:</strong> {stats.totalRecords.toLocaleString()} registros históricos
              </div>
            </div>
          </div>

          {/* Controles de filtrado */}
          <div className="filters-container glass-card">
            <h3>
              <Filter size={20} />
              Filtros y Búsqueda
            </h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Buscar país:</label>
                <div className="search-input">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Ej: Colombia, Brazil..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="filter-group">
                <label>País:</label>
                <select 
                  value={selectedCountry} 
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Todos los países</option>
                  {countries.slice(0, 50).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Año:</label>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Todos los años</option>
                  {years.slice(0, 20).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCountry('');
                    setSelectedYear('');
                  }}
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Estado de carga */}
          {loading && (
            <div className="loading-state glass-card">
              <div className="spinner-large"></div>
              <p>Cargando datos del CSV...</p>
            </div>
          )}

          {/* Estado de error */}
          {error && (
            <div className="error-state glass-card">
              <p>{error}</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Tabla de datos */}
          {!loading && !error && (
            <div className="data-table-container glass-card">
              <div className="table-header">
                <h3>Vista de datos históricos</h3>
                <span className="table-note">
                  Mostrando {currentData.length} de {filteredData.length} registros
                </span>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>País</th>
                      <th>Código</th>
                      <th>Hidro (TWh)</th>
                      <th>Solar (TWh)</th>
                      <th>Eólica (TWh)</th>
                      <th>Geo/Bio (TWh)</th>
                      <th>Total Renovables</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row, index) => (
                      <tr key={`${row.country}-${row.year}-${index}`}>
                        <td>{row.year}</td>
                        <td className="country-cell">{row.country}</td>
                        <td className="code-cell">{row.code || 'N/A'}</td>
                        <td>{row.hydroGeneration?.toFixed(1) || '0.0'}</td>
                        <td>{row.solarGeneration?.toFixed(1) || '0.0'}</td>
                        <td>{row.windGeneration?.toFixed(1) || '0.0'}</td>
                        <td>{row.geoAndBiomass?.toFixed(1) || '0.0'}</td>
                        <td className="total-cell">
                          <strong>{row.totalRenewables?.toFixed(1) || '0.0'} TWh</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </button>
                  
                  <span className="pagination-info">
                    Página {currentPage} de {totalPages}
                  </span>
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Resumen de datos */}
          {!loading && !error && data.length > 0 && (
            <div className="data-summary glass-card">
              <h3>� Resumen del Dataset</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <strong>{stats.totalRecords.toLocaleString()}</strong>
                  <span>Registros totales</span>
                </div>
                <div className="summary-item">
                  <strong>{stats.countries}</strong>
                  <span>Países incluidos</span>
                </div>
                <div className="summary-item">
                  <strong>{stats.yearRange}</strong>
                  <span>Rango temporal</span>
                </div>
                <div className="summary-item">
                  <strong>{stats.totalRenewables} TWh</strong>
                  <span>Total renovables acumulado</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DataTable;
