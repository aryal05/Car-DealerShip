import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Contact = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const heroImages = [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600",
    "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600",
    "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1600",
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1600",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/contact/messages`,
        formData,
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0 pb-16">
      {/* Hero Section with Image Slider */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Car"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Blue Overlay with Low Transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/70 to-primary-800/70"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Get in touch with our team - We're here to help
              </p>
            </motion.div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    rows="5"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Auto Street, New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@aryalsdealer.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hours</h3>
                    <p className="text-gray-600">
                      Mon - Fri: 9:00 AM - 8:00 PM
                      <br />
                      Sat - Sun: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Visit Our Showroom</h3>
              <p className="mb-6">
                Experience our vehicles in person. Schedule a visit today!
              </p>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Book Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
