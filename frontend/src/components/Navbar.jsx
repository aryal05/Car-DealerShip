import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Finance', path: '/finance' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const shouldBeTransparent = isHomePage && !isScrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        shouldBeTransparent ? 'bg-transparent py-6' : 'bg-white shadow-lg py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-primary-600 p-2 rounded-lg"
            >
              <Car className="h-6 w-6 text-white" />
            </motion.div>
            <span className={`text-2xl font-bold ${shouldBeTransparent ? 'text-white' : 'text-gray-900'}`}>
              Aryals Dealer
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold transition-colors duration-200 hover:text-primary-600 ${
                  shouldBeTransparent ? 'text-white' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/inventory"
              className="btn-primary"
            >
              Browse Cars
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              shouldBeTransparent ? 'text-white' : 'text-gray-900'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/inventory"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block btn-primary text-center"
                >
                  Browse Cars
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
