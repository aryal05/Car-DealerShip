import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Aryals Dealer</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner in finding the perfect vehicle. Premium quality cars with exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/inventory" className="hover:text-primary-500 transition-colors">Inventory</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="hover:text-primary-500 transition-colors cursor-pointer">Buy a Car</li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">Sell Your Car</li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">Financing</li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">Trade-In</li>
              <li className="hover:text-primary-500 transition-colors cursor-pointer">Service & Parts</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-sm">123 Auto Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm">info@aryalsdealer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Aryals Dealer. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
