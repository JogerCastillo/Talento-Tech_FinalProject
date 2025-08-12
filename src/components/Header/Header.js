import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Menu, X, Sun, Moon } from 'lucide-react';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Inicio', path: '/', hash: '#home' },
    { name: 'Acerca de', path: '/', hash: '#about' },
    { name: 'Datos', path: '/data' },
    { name: 'Calculadora', path: '/calculator' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const handleNavigation = (item) => {
    setIsMenuOpen(false);
    
    if (item.path === '/' && item.hash) {
      // Si el item tiene hash y estamos navegando a home
      if (location.pathname === '/') {
        // Ya estamos en home, solo hacer scroll
        scrollToSection(item.hash);
      } else {
        // Navegar a home primero, luego hacer scroll
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.hash);
        }, 100);
      }
    }
    // Para rutas normales (sin hash), React Router se encarga automáticamente a través del Link
  };

  const scrollToSection = (hash) => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <motion.div 
              className="logo-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Zap size={32} />
            </motion.div>
            <span className="logo-text gradient-text">EnergyTech</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="nav-desktop">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.path === '/' && item.hash ? (
                  <button 
                    onClick={() => handleNavigation(item)}
                    className="nav-link"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Controles */}
          <div className="header-controls">
            {/* Toggle Dark Mode */}
            <motion.button
              className="theme-toggle"
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Menú Mobile */}
            <motion.button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Navegación Mobile */}
        <motion.nav 
          className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}
          initial={false}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="nav-mobile-content">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.path === '/' && item.hash ? (
                  <button 
                    onClick={() => handleNavigation(item)}
                    className="nav-link-mobile"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className="nav-link-mobile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
