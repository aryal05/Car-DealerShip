import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Car,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Loader
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const TestDriveRequests = () => {
  const navigate = useNavigate();
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchTestDrives();
    fetchStats();
  }, [navigate, filterStatus, sortBy]);

  const fetchTestDrives = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/test-drives`, {
        params: {
          status: filterStatus,
          sort: sortBy
        }
      });
      setTestDrives(response.data.data);
    } catch (error) {
      console.error('Error fetching test drives:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test-drives/stats`);
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/test-drives/${id}/status`, {
        status: newStatus
      });
      fetchTestDrives();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteRequest = async (id) => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/test-drives/${id}`);
      fetchTestDrives();
      fetchStats();
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Failed to delete request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle size={16} />;
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const filteredTestDrives = testDrives.filter((td) => {
    const matchesSearch =
      td.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Test Drive Requests</h1>
                <p className="text-gray-600 mt-1">Manage customer test drive appointments</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-800">{stats.pending}</div>
              <div className="text-sm text-yellow-600">Pending</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-800">{stats.confirmed}</div>
              <div className="text-sm text-blue-600">Confirmed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-800">{stats.completed}</div>
              <div className="text-sm text-green-600">Completed</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-800">{stats.cancelled}</div>
              <div className="text-sm text-red-600">Cancelled</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="date_asc">Date: Earliest</option>
              <option value="date_desc">Date: Latest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        ) : filteredTestDrives.length === 0 ? (
          <div className="text-center py-12">
            <Car className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No test drive requests found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search' : 'Requests will appear here when customers schedule test drives'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTestDrives.map((testDrive) => (
              <motion.div
                key={testDrive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Card Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(expandedId === testDrive.id ? null : testDrive.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{testDrive.full_name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(testDrive.status)}`}>
                          {getStatusIcon(testDrive.status)}
                          {testDrive.status.charAt(0).toUpperCase() + testDrive.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Car size={16} />
                        <span className="font-semibold">
                          {testDrive.model} {testDrive.variant}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      {expandedId === testDrive.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-blue-600" />
                      <span>{new Date(testDrive.preferred_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-blue-600" />
                      <span>{testDrive.preferred_time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} className="text-blue-600" />
                      <span className="truncate">{testDrive.email}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === testDrive.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t bg-gray-50"
                    >
                      <div className="p-6 space-y-6">
                        {/* Full Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <Mail className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                  <div className="text-sm text-gray-600">Email</div>
                                  <a href={`mailto:${testDrive.email}`} className="text-gray-900 hover:text-blue-600">
                                    {testDrive.email}
                                  </a>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Phone className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                  <div className="text-sm text-gray-600">Phone</div>
                                  <a href={`tel:${testDrive.phone}`} className="text-gray-900 hover:text-blue-600">
                                    {testDrive.phone}
                                  </a>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                  <div className="text-sm text-gray-600">Address</div>
                                  <div className="text-gray-900">{testDrive.address}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Vehicle & Schedule</h4>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <Car className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                  <div className="text-sm text-gray-600">Vehicle</div>
                                  <div className="text-gray-900 font-semibold">
                                    {testDrive.model} {testDrive.variant}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    ${testDrive.price?.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Calendar className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                  <div className="text-sm text-gray-600">Preferred Date & Time</div>
                                  <div className="text-gray-900">
                                    {new Date(testDrive.preferred_date).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </div>
                                  <div className="text-gray-900">{testDrive.preferred_time}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        {testDrive.message && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Additional Message</h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-gray-700">{testDrive.message}</p>
                            </div>
                          </div>
                        )}

                        {/* Request Details */}
                        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                          <div>
                            Submitted: {new Date(testDrive.created_at).toLocaleString()}
                          </div>
                          <div>
                            ID: #{testDrive.id}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t">
                          <button
                            onClick={() => updateStatus(testDrive.id, 'confirmed')}
                            disabled={testDrive.status === 'confirmed'}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(testDrive.id, 'completed')}
                            disabled={testDrive.status === 'completed'}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Complete
                          </button>
                          <button
                            onClick={() => updateStatus(testDrive.id, 'cancelled')}
                            disabled={testDrive.status === 'cancelled'}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Cancel
                          </button>
                          <button
                            onClick={() => deleteRequest(testDrive.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 ml-auto"
                          >
                            <XCircle size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDriveRequests;
