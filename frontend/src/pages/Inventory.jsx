import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { vehicleAPI } from '../services/api';
import { Search, SlidersHorizontal, X, ChevronDown, Zap, Gauge, MapPin } from 'lucide-react';

const Inventory = () => {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    model: searchParams.get("model") || searchParams.get("brand") || "",
    status: "",
    color: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    autopilot: "",
    sort: "created_at",
    order: "DESC",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    models: [],
    statuses: [],
    colors: [],
    years: [],
  });

  useEffect(() => {
    fetchVehicles();
    fetchFilterOptions();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const brandFromUrl = searchParams.get("brand");
      const response = await vehicleAPI.getAll(filters);

      // If filtering by brand from URL and no results, fetch all vehicles
      if (brandFromUrl && response.data.data.length === 0) {
        const allVehiclesResponse = await vehicleAPI.getAll({
          ...filters,
          model: "",
        });
        setVehicles(allVehiclesResponse.data.data);
      } else {
        setVehicles(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await vehicleAPI.getFilters();
      setFilterOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      model: "",
      color: "",
      year: "",
      status: "",
      minPrice: "",
      maxPrice: "",
      autopilot: "",
      sort: "created_at",
      order: "DESC",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vehicle Inventory
          </h1>
          <p className="text-lg text-gray-600">
            Browse our collection of {vehicles.length} premium vehicles
          </p>
        </motion.div>

        {/* Search Bar and Filter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filter Button - Left */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                showFilters
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filters</span>
            </button>

            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by model, color, location..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Sort */}
            <select
              value={`${filters.sort}-${filters.order}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split("-");
                setFilters((prev) => ({ ...prev, sort, order }));
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="created_at-DESC">Newest First</option>
              <option value="price-ASC">Price: Low to High</option>
              <option value="price-DESC">Price: High to Low</option>
              <option value="mileage-ASC">Mileage: Low to High</option>
            </select>
          </div>
        </motion.div>

        {/* Main Content Area with Sidebar */}
        <div className="flex gap-8">
          {/* Left Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <div className="w-64 bg-white rounded-xl shadow-lg sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between p-6 pb-4 border-b">
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="px-6 pt-4 pb-3 border-b">
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <X size={18} />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {/* Scrollable filter content */}
                  <div className="overflow-y-auto px-6 pb-6 space-y-6 flex-1">
                    {/* Model Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Model
                      </label>
                      <select
                        value={filters.model}
                        onChange={(e) =>
                          handleFilterChange("model", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All Models</option>
                        {filterOptions.models?.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Year
                      </label>
                      <select
                        value={filters.year}
                        onChange={(e) =>
                          handleFilterChange("year", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All Years</option>
                        {filterOptions.years?.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Color Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Color
                      </label>
                      <select
                        value={filters.color}
                        onChange={(e) =>
                          handleFilterChange("color", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All Colors</option>
                        {filterOptions.colors?.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All Status</option>
                        {filterOptions.statuses?.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price Range
                      </label>
                      <div className="space-y-2">
                        <input
                          type="number"
                          placeholder="Min Price"
                          value={filters.minPrice}
                          onChange={(e) =>
                            handleFilterChange("minPrice", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          type="number"
                          placeholder="Max Price"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            handleFilterChange("maxPrice", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    {/* Autopilot Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Autopilot
                      </label>
                      <select
                        value={filters.autopilot}
                        onChange={(e) =>
                          handleFilterChange("autopilot", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Any</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  {/* End scrollable content */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vehicles Grid */}
          <div className="flex-1">
            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-64 bg-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-8 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No vehicles found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="card group"
                  >
                    <Link to={`/vehicle/${vehicle.id}`}>
                      <div className="relative overflow-hidden h-64 bg-gray-100">
                        <img
                          src={
                            vehicle.image_url ||
                            "https://via.placeholder.com/400x300?text=No+Image"
                          }
                          alt={`${vehicle.model} ${vehicle.variant}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              vehicle.status === "Available"
                                ? "bg-green-500 text-white"
                                : vehicle.status === "Used"
                                  ? "bg-blue-500 text-white"
                                  : vehicle.status === "Sold Out"
                                    ? "bg-red-500 text-white"
                                    : vehicle.status === "Reserved"
                                      ? "bg-yellow-500 text-white"
                                      : "bg-purple-500 text-white"
                            }`}
                          >
                            {vehicle.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {vehicle.year} {vehicle.model}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {vehicle.variant}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center text-gray-600">
                              <Zap size={16} className="mr-1" />
                              {vehicle.range_epa} mi EPA
                            </span>
                            <span className="flex items-center text-gray-600">
                              <Gauge size={16} className="mr-1" />
                              {vehicle.acceleration}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin size={16} className="mr-1" />
                            {vehicle.location}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">
                                {formatPrice(vehicle.price)}
                              </span>
                              {vehicle.original_price && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {formatPrice(vehicle.original_price)}
                                </span>
                              )}
                            </div>
                          </div>
                          {vehicle.after_tax_credit && (
                            <p className="text-sm text-green-600 mt-1">
                              {formatPrice(vehicle.after_tax_credit)} After Tax
                              Credit
                            </p>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-4 btn-primary"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
