import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo y descripción */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Zap size={28} />
              <span className="gradient-text">EnergyTech</span>
            </Link>
            <p className="footer-description">
              Transformando el futuro energético a través de la innovación 
              y la democratización del conocimiento tecnológico.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-section">
            <h4>Navegación</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><a href="#about">Acerca de</a></li>
              <li><Link to="/data">Datos</Link></li>
              <li><a href="#calculator">Calculadora</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li><a href="https://www.kaggle.com/datasets/belayethossainds/renewable-energy-world-wide-19652022" target="_blank" rel="noopener noreferrer">Dataset Kaggle</a></li>
              <li><a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">W3Schools</a></li>
              <li><a href="https://desarrolloweb.com/manuales/css3.html" target="_blank" rel="noopener noreferrer">CSS3 Manual</a></li>
              <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

          {/* Información del proyecto */}
          <div className="footer-section">
            <h4>Proyecto</h4>
            <ul>
              <li>TalentoTECH Final</li>
              <li>Energía Renovable</li>
              <li>Transición Energética</li>
              <li>React & JavaScript</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              Hecho con <Heart size={16} className="heart" /> para TalentoTECH 2024
            </p>
          </div>
          <div className="footer-tech">
            <span>Construido con React, Framer Motion & Chart.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
