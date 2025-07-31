// dataManager.js - Archivo para manejar la carga y procesamiento de datos CSV

/**
 * INSTRUCCIONES PARA INTEGRAR LOS DATOS:
 * 
 * 1. Cuando recibas el archivo CSV de energía renovable:
 *    - Guárdalo en la carpeta src/data/ con el nombre 'renewable-energy-data.csv'
 * 
 * 2. Instala la librería para leer CSV:
 *    npm install papaparse
 * 
 * 3. Descomenta las funciones de abajo y ajusta los nombres de las columnas
 *    según el archivo CSV real que recibas
 * 
 * 4. Las funciones estarán listas para ser utilizadas en los componentes:
 *    - Calculator.js (para cálculos de energía renovable)
 *    - Dashboard.js (para los gráficos)
 *    - DataTable.js (para mostrar la tabla de datos)
 */

// import Papa from 'papaparse';

// Datos de ejemplo mientras llegan los datos reales
export const sampleRenewableData = {
  // Capacidad instalada por fuente (GW) - datos globales actuales
  globalCapacity: {
    hydro: 1380,
    solar: 940, 
    wind: 890,
    geothermal: 15,
    bioenergy: 130
  },
  
  // Datos históricos de ejemplo
  historicalData: [
    {
      year: 2022,
      country: 'World',
      hydroGeneration: 4370, // TWh
      solarGeneration: 1177,
      windGeneration: 2100,
      geothermalGeneration: 95,
      biofuelProduction: 1800,
      shareElectricityRenewables: 28.2,
      shareElectricityHydro: 15.8,
      shareElectricitySolar: 4.5,
      shareElectricityWind: 7.6
    }
    // Más datos se agregarán desde el CSV
  ]
};

/**
 * Función para cargar y procesar el CSV de datos de energía renovable
 * DESCOMENTA Y AJUSTA CUANDO TENGAS EL ARCHIVO CSV
 */
/*
export const loadRenewableEnergyData = async () => {
  try {
    const response = await fetch('/src/data/renewable-energy-data.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          // Procesar los datos según las columnas del CSV
          const processedData = results.data.map(row => ({
            // AJUSTA ESTOS NOMBRES DE COLUMNAS SEGÚN TU CSV:
            year: parseInt(row['Year']),
            country: row['Entity'] || row['Country'],
            
            // Generación por fuente (ajusta nombres de columnas)
            windGeneration: parseFloat(row['wind-generation']) || 0,
            solarConsumption: parseFloat(row['solar-energy-consumption']) || 0,
            hydropowerConsumption: parseFloat(row['hydropower-consumption']) || 0,
            biofuelProduction: parseFloat(row['biofuel-production']) || 0,
            geothermalCapacity: parseFloat(row['installed-geothermal-capacity']) || 0,
            
            // Participación en el mix eléctrico
            shareElectricityRenewables: parseFloat(row['share-electricity-renewables']) || 0,
            shareElectricityWind: parseFloat(row['share-electricity-wind']) || 0,
            shareElectricitySolar: parseFloat(row['share-electricity-solar']) || 0,
            shareElectricityHydro: parseFloat(row['share-electricity-hydro']) || 0,
            
            // Capacidad instalada
            windCapacity: parseFloat(row['cumulative-installed-wind-energy-capacity-gigawatts']) || 0,
            solarCapacity: parseFloat(row['installed-solar-PV-capacity']) || 0,
            modernRenewableConsumption: parseFloat(row['modern-renewable-energy-consumption']) || 0
          }));
          
          resolve(processedData);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return sampleRenewableData.historicalData;
  }
};
*/

/**
 * Función para filtrar datos por país
 * DESCOMENTA CUANDO TENGAS LOS DATOS REALES
 */
/*
export const getDataByCountry = (data, country) => {
  return data.filter(item => 
    item.country.toLowerCase().includes(country.toLowerCase())
  );
};
*/

/**
 * Función para obtener datos de un año específico
 * DESCOMENTA CUANDO TENGAS LOS DATOS REALES
 */
/*
export const getDataByYear = (data, year) => {
  return data.filter(item => item.year === year);
};
*/

/**
 * Función para calcular el porcentaje de energía renovable
 * Esta función usará los datos reales del CSV
 */
export const calculateRenewablePercentage = (consumptionKWh, householdType = 'medium') => {
  // Multiplicadores por tipo de hogar
  const typeMultipliers = {
    small: 0.7,
    medium: 1.0,
    large: 1.5,
    apartment: 0.8
  };
  
  const multiplier = typeMultipliers[householdType] || 1.0;
  const adjustedConsumption = consumptionKWh * multiplier;
  
  // Cálculo basado en capacidad global actual
  // ESTO SE ACTUALIZARÁ CON LOS DATOS REALES DEL CSV
  const totalRenewableCapacity = Object.values(sampleRenewableData.globalCapacity)
    .reduce((sum, capacity) => sum + capacity, 0);
  
  // Simulación de porcentaje renovable (se reemplazará con cálculo real)
  const renewablePercentage = Math.min(85, (totalRenewableCapacity / 50) + Math.random() * 15);
  
  return {
    renewablePercentage: renewablePercentage.toFixed(1),
    renewableConsumption: (adjustedConsumption * renewablePercentage / 100).toFixed(1),
    co2Saved: (adjustedConsumption * renewablePercentage / 100 * 0.5).toFixed(1), // kg CO2
    totalConsumption: adjustedConsumption.toFixed(1)
  };
};

/**
 * Función para obtener datos para los gráficos del dashboard
 * SE ACTUALIZARÁ CON LOS DATOS REALES DEL CSV
 */
export const getDashboardData = () => {
  // Datos de ejemplo para los gráficos
  return {
    productionBySource: {
      labels: ['Hidroeléctrica', 'Solar', 'Eólica', 'Geotérmica', 'Bioenergía'],
      data: [4370, 1177, 2100, 95, 1800], // TWh
      colors: ['#00b4db', '#ffd200', '#00ff88', '#ff6b35', '#8b5cf6']
    },
    
    renewableShare: {
      labels: ['Renovables', 'Convencional'],
      data: [28.2, 71.8], // Porcentaje
      colors: ['#00ff88', '#666666']
    },
    
    capacityTrend: {
      labels: ['2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'Hidroeléctrica',
          data: [1308, 1330, 1355, 1365, 1380],
          color: '#00b4db'
        },
        {
          label: 'Solar',
          data: [480, 580, 720, 840, 940],
          color: '#ffd200'
        },
        {
          label: 'Eólica',
          data: [590, 650, 730, 825, 890],
          color: '#00ff88'
        }
      ]
    }
  };
};

// Función utilitaria para formatear números
export const formatNumber = (num, decimals = 1) => {
  return parseFloat(num).toFixed(decimals);
};

// Función para convertir TWh a otras unidades
export const convertEnergy = (value, fromUnit, toUnit) => {
  const conversions = {
    'TWh': 1,
    'GWh': 1000,
    'MWh': 1000000,
    'kWh': 1000000000
  };
  
  return (value * conversions[fromUnit]) / conversions[toUnit];
};
