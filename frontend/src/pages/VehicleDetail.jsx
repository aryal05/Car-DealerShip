import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { vehicleAPI } from '../services/api';
import TestDriveForm from "../components/TestDriveForm";
import {
  ArrowLeft,
  Zap,
  Gauge,
  MapPin,
  Calendar,
  Palette,
  Settings,
  CheckCircle,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTestDriveForm, setShowTestDriveForm] = useState(false);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const response = await vehicleAPI.getOne(id);
      setVehicle(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vehicle Not Found
          </h2>
          <button
            onClick={() => navigate("/inventory")}
            className="btn-primary"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/inventory")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Inventory</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={
                      vehicle.images && vehicle.images.length > 0
                        ? vehicle.images[currentImageIndex].image_url
                        : vehicle.image_url ||
                          "https://via.placeholder.com/800x600?text=No+Image"
                    }
                    alt={`${vehicle.model} ${vehicle.variant}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      vehicle.status === "Available"
                        ? "bg-green-500 text-white"
                        : vehicle.status === "Sold Out"
                          ? "bg-red-500 text-white"
                          : vehicle.status === "Used"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500 text-white"
                    }`}
                  >
                    {vehicle.status.toUpperCase()}
                  </span>
                </div>

                {/* Navigation Arrows */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? vehicle.images.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === vehicle.images.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {vehicle.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {vehicle.images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        currentImageIndex === index
                          ? "ring-4 ring-blue-500"
                          : "ring-2 ring-gray-200 hover:ring-gray-400"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image.image_url}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 bg-blue-500/20" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {vehicle.model}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{vehicle.variant}</p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Zap className="mx-auto mb-2 text-primary-600" size={24} />
                  <div className="text-2xl font-bold text-gray-900">
                    {vehicle.range_epa}
                  </div>
                  <div className="text-sm text-gray-600">Range (EPA)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Gauge className="mx-auto mb-2 text-primary-600" size={24} />
                  <div className="text-2xl font-bold text-gray-900">
                    {vehicle.top_speed}
                  </div>
                  <div className="text-sm text-gray-600">Top Speed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Gauge className="mx-auto mb-2 text-primary-600" size={24} />
                  <div className="text-2xl font-bold text-gray-900">
                    {vehicle.acceleration}
                  </div>
                  <div className="text-sm text-gray-600">0-60 mph</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="mx-auto mb-2 text-primary-600" size={24} />
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {vehicle.location}
                  </div>
                  <div className="text-sm text-gray-600">Location</div>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Features & Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Palette
                      className="text-primary-600 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Exterior Color
                      </div>
                      <div className="text-gray-600">
                        {vehicle.exterior_color}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Palette
                      className="text-primary-600 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Interior Color
                      </div>
                      <div className="text-gray-600">
                        {vehicle.interior_color}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings
                      className="text-primary-600 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Wheels</div>
                      <div className="text-gray-600">{vehicle.wheels}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-primary-600 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Seat Layout
                      </div>
                      <div className="text-gray-600">{vehicle.seat_layout}</div>
                    </div>
                  </div>
                  {vehicle.autopilot && (
                    <div className="flex items-start space-x-3">
                      <CheckCircle
                        className="text-green-600 flex-shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Autopilot
                        </div>
                        <div className="text-gray-600">Included</div>
                      </div>
                    </div>
                  )}
                  {vehicle.mileage > 0 && (
                    <div className="flex items-start space-x-3">
                      <Calendar
                        className="text-primary-600 flex-shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Mileage
                        </div>
                        <div className="text-gray-600">
                          {vehicle.mileage.toLocaleString()} miles
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {vehicle.additional_features && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Additional Features
                    </h4>
                    <p className="text-gray-600">
                      {vehicle.additional_features}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 sticky top-24"
            >
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatPrice(vehicle.price)}
                </div>
                {vehicle.original_price && (
                  <div className="text-lg text-gray-500 line-through mb-2">
                    {formatPrice(vehicle.original_price)}
                  </div>
                )}
                {vehicle.after_tax_credit && (
                  <div className="text-lg text-green-600 font-semibold">
                    {formatPrice(vehicle.after_tax_credit)} After Tax Credit
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTestDriveForm(true)}
                  className="w-full btn-primary"
                >
                  Schedule Test Drive
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/finance")}
                  className="w-full btn-secondary"
                >
                  Get Financing
                </motion.button>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
                <a
                  href="tel:+15551234567"
                  className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Phone size={20} />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a
                  href="mailto:info@aryalsdealer.com"
                  className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Mail size={20} />
                  <span>info@aryalsdealer.com</span>
                </a>
                <button className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors w-full">
                  <Share2 size={20} />
                  <span>Share This Vehicle</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Test Drive Form Modal */}
      <TestDriveForm
        vehicle={vehicle}
        isOpen={showTestDriveForm}
        onClose={() => setShowTestDriveForm(false)}
      />
    </div>
  );
};

export default VehicleDetail;
