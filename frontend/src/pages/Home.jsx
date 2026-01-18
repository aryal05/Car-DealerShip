import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Award,
  ArrowUpRight,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [brands, setBrands] = useState([]);

  const heroImages = [
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80",
    "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1920&q=80",
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1920&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/brands?active_only=true`,
      );
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Certified Quality",
      description: "All vehicles undergo rigorous inspection and certification",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Quick and efficient delivery to your doorstep",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Service",
      description: "24/7 customer support and lifetime assistance",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Images */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImages[currentImageIndex]})`,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-dark-800/70 to-primary-900/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Looking for a vehicle?
              <br />
              <span className="text-primary-400">
                You're in the perfect spot.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover premium vehicles with exceptional quality and service
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/inventory"
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Explore Inventory</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
              <Link
                to="/contact"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "500+", label: "Vehicles" },
              { value: "98%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentImageIndex
                  ? "bg-white w-10 h-2"
                  : "bg-white/40 hover:bg-white/60 w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Why Choose Aryals Dealer?</h2>
            <p className="section-subtitle">
              Experience the difference with our premium services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="card p-8 text-center"
              >
                <div className="inline-block bg-primary-100 text-primary-600 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Brands */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Premium Brands</h2>
            <p className="section-subtitle">
              Discover our finest selection of high-end vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <Link
                key={brand.id}
                to={`/inventory?brand=${encodeURIComponent(brand.name)}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative h-80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                >
                  {/* Brand Image with Overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={
                        brand.image_url.startsWith("http")
                          ? brand.image_url
                          : `${API_BASE_URL}${brand.image_url}`
                      }
                      alt={brand.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>

                  {/* Brand Name */}
                  <div className="absolute top-6 left-6 z-10">
                    <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                      {brand.name}
                    </h3>
                  </div>

                  {/* Arrow Button */}
                  <motion.div
                    className="absolute bottom-6 right-6 z-10 bg-white rounded-full p-4 shadow-lg group-hover:bg-primary-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                  >
                    <ArrowUpRight
                      className="text-gray-900 group-hover:text-white transition-colors"
                      size={24}
                    />
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-all duration-300"></div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* View All Brands Link */}
          {brands.length > 8 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/inventory"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group"
              >
                <span>View All Brands</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse our extensive inventory of premium vehicles and find the
              perfect match for you
            </p>
            <Link
              to="/inventory"
              className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <span>View All Vehicles</span>
              <ArrowRight
                className="group-hover:translate-x-2 transition-transform"
                size={20}
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
