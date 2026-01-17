import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, DollarSign, Clock, CheckCircle, TrendingDown, Shield } from 'lucide-react';

const Finance = () => {
  const [loanAmount, setLoanAmount] = useState(40000);
  const [downPayment, setDownPayment] = useState(8000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(60);
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

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment.toFixed(2);
  };

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Competitive Rates',
      description: 'We offer some of the lowest interest rates in the market'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Quick Approval',
      description: 'Get approved in as little as 24 hours'
    },
    {
      icon: <TrendingDown className="h-8 w-8" />,
      title: 'Flexible Terms',
      description: 'Choose loan terms from 12 to 84 months'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Bad Credit OK',
      description: 'We work with all credit scores and situations'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Apply Online',
      description: 'Fill out our simple online application form in minutes'
    },
    {
      number: '02',
      title: 'Get Approved',
      description: 'Receive approval decision within 24 hours'
    },
    {
      number: '03',
      title: 'Choose Your Car',
      description: 'Browse our inventory and pick your dream vehicle'
    },
    {
      number: '04',
      title: 'Drive Away',
      description: 'Complete paperwork and drive home in your new car'
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Auto Financing Made Easy</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Get pre-approved today and drive away in your dream car
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

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Calculator className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Payment Calculator</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vehicle Price: ${loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Down Payment: ${downPayment.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={loanAmount * 0.5}
                      step="500"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interest Rate: {interestRate}%
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Term: {loanTerm} months
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="84"
                      step="12"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Estimated Monthly Payment</p>
                    <p className="text-5xl font-bold text-primary-600">
                      ${calculateMonthlyPayment()}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Total Loan Amount: ${(loanAmount - downPayment).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply for Financing</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input type="text" className="input-field" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="input-field" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" className="input-field" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input type="tel" className="input-field" placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Social Security Number</label>
                  <input type="text" className="input-field" placeholder="XXX-XX-XXXX" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income</label>
                  <input type="number" className="input-field" placeholder="50000" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Status</label>
                  <select className="input-field">
                    <option>Full-time Employed</option>
                    <option>Part-time Employed</option>
                    <option>Self-employed</option>
                    <option>Retired</option>
                    <option>Other</option>
                  </select>
                </div>

                <button type="submit" className="w-full btn-primary mt-6">
                  Submit Application
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Finance With Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make car financing simple, fast, and affordable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get approved and drive away in 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 h-full">
                  <div className="text-6xl font-bold text-primary-200 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-primary-300"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'What credit score do I need?',
                a: 'We work with all credit scores. While a higher credit score may get you better rates, we have financing options for everyone, including those with bad or no credit.'
              },
              {
                q: 'How long does approval take?',
                a: 'Most applications are reviewed within 24 hours. In many cases, you can get approval same day.'
              },
              {
                q: 'What documents do I need?',
                a: 'Typically, you\'ll need proof of income, proof of residence, valid driver\'s license, and proof of insurance.'
              },
              {
                q: 'Can I pay off my loan early?',
                a: 'Yes! We have no prepayment penalties. You can pay off your loan at any time without additional fees.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="text-primary-600 mr-3" size={24} />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-9">{faq.a}</p>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Get Pre-Approved?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your financing application today and get behind the wheel faster
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl">
                Apply Now
              </button>
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

export default Finance;
