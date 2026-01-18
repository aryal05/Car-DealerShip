import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  Image,
  LogOut,
  Plus,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    soldVehicles: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles/stats`);
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const statsCards = [
    {
      title: "Total Vehicles",
      value: stats.totalVehicles,
      icon: Car,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      title: "Available",
      value: stats.availableVehicles,
      icon: TrendingUp,
      color: "bg-green-500",
      trend: "+8%",
    },
    {
      title: "Sold",
      value: stats.soldVehicles,
      icon: DollarSign,
      color: "bg-purple-500",
      trend: "+23%",
    },
    {
      title: "Total Value",
      value: `$${(stats.totalValue / 1000000).toFixed(1)}M`,
      icon: Users,
      color: "bg-orange-500",
      trend: "+15%",
    },
  ];

  const quickActions = [
    {
      title: "Add Vehicle",
      description: "Add a new vehicle to inventory",
      icon: Plus,
      link: "/admin/vehicles/add",
      color: "bg-blue-600",
    },
    {
      title: "Bulk Upload",
      description: "Upload multiple vehicles at once",
      icon: Car,
      link: "/admin/vehicles/bulk",
      color: "bg-green-600",
    },
    {
      title: "Manage Banners",
      description: "Update banner images for routes",
      icon: Image,
      link: "/admin/banners",
      color: "bg-purple-600",
    },
    {
      title: "Test Drives",
      description: "Manage test drive requests",
      icon: Calendar,
      link: "/admin/test-drives",
      color: "bg-indigo-600",
    },
    {
      title: "Vehicle List",
      description: "View and manage all vehicles",
      icon: LayoutDashboard,
      link: "/admin/vehicles",
      color: "bg-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Dashboard Overview
              </h1>
              <p className="text-blue-100 text-lg">
                Welcome back,{" "}
                <span className="font-semibold">
                  {
                    JSON.parse(localStorage.getItem("adminUser") || "{}")
                      .username
                  }
                </span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-green-600 text-sm font-bold">
                    {stat.trend}
                  </span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-500">Click to get started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 cursor-pointer border border-gray-100 group"
                >
                  <div
                    className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {action.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              LIVE
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-shadow">
              <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">New vehicle added</p>
                <p className="text-sm text-gray-500">
                  Tesla Model 3 • 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-transparent rounded-xl border-l-4 border-green-500 hover:shadow-md transition-shadow">
              <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Banner updated</p>
                <p className="text-sm text-gray-500">
                  Home page banner • 5 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border-l-4 border-purple-500 hover:shadow-md transition-shadow">
              <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">System updated</p>
                <p className="text-sm text-gray-500">
                  File upload enabled • 1 day ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
