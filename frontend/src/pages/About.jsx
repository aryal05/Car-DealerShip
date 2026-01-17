import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, CheckCircle, Heart } from 'lucide-react';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600',
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1600',
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1600'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Trust & Transparency',
      description: 'We believe in honest dealings and transparent pricing with no hidden fees.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality First',
      description: 'Every vehicle undergoes rigorous inspection to meet our high standards.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We go the extra mile for every customer.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion for Excellence',
      description: 'We are passionate about cars and committed to excellence in everything we do.'
    }
  ];

  const stats = [
    { value: '15+', label: 'Years in Business' },
    { value: '10,000+', label: 'Happy Customers' },
    { value: '500+', label: 'Vehicles Sold' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  const team = [
    {
      name: 'John Aryal',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
    },
    {
      name: 'Sarah Johnson',
      role: 'Sales Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    },
    {
      name: 'Michael Chen',
      role: 'Service Manager',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400'
    }
  ];

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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Aryals Dealer</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Your trusted partner in finding the perfect vehicle for over 15 years
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
                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2011, Aryals Dealer started with a simple mission: to provide 
                high-quality vehicles with exceptional customer service. What began as a 
                small family-owned dealership has grown into one of the most trusted names 
                in the automotive industry.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Over the years, we've helped thousands of customers find their dream vehicles. 
                Our commitment to quality, transparency, and customer satisfaction has earned 
                us a reputation that we're proud of.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to evolve and adapt, embracing new technologies and 
                expanding our inventory to meet the changing needs of our customers. But 
                our core values remain the same: integrity, quality, and exceptional service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800"
                alt="Dealership"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Vehicle?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our experienced team help you discover the car of your dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/inventory"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Browse Inventory
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
