import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Mail, Phone, Calendar, ChevronDown, ChevronUp, Trash2, Check, Eye, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const ContactMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState({ total: 0, new_count: 0, read_count: 0, replied_count: 0 });
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchMessages();
  }, [filters]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await axios.get(`${API_BASE_URL}/contact/admin/messages?${params}`);
      setMessages(response.data.data);
      setCounts(response.data.counts);
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/contact/admin/messages/${id}/status`, { status });
      fetchMessages();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/contact/admin/messages/${id}`);
      fetchMessages();
    } catch (error) {
      alert('Failed to delete message');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'replied':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-white hover:bg-white/20 p-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Contact Messages</h1>
              <p className="text-purple-100">Manage customer inquiries and messages</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900">{counts.total}</p>
              </div>
              <MessageSquare className="text-blue-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">New Messages</p>
                <p className="text-3xl font-bold text-gray-900">{counts.new_count}</p>
              </div>
              <Mail className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Read</p>
                <p className="text-3xl font-bold text-gray-900">{counts.read_count}</p>
              </div>
              <Eye className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Replied</p>
                <p className="text-3xl font-bold text-gray-900">{counts.replied_count}</p>
              </div>
              <Check className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{message.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(message.status)}`}>
                          {message.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Mail size={16} />
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={16} />
                            {message.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {formatDate(message.created_at)}
                        </div>
                      </div>

                      {expandedId !== message.id && (
                        <p className="text-gray-700 line-clamp-2">{message.message}</p>
                      )}
                    </div>

                    <button
                      onClick={() => setExpandedId(expandedId === message.id ? null : message.id)}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedId === message.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === message.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-semibold text-gray-900 mb-2">Message:</h4>
                          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                          
                          <div className="mt-6 flex gap-3">
                            {message.status !== 'read' && (
                              <button
                                onClick={() => updateStatus(message.id, 'read')}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                              >
                                <Eye size={18} />
                                Mark as Read
                              </button>
                            )}
                            {message.status !== 'replied' && (
                              <button
                                onClick={() => updateStatus(message.id, 'replied')}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                              >
                                <Check size={18} />
                                Mark as Replied
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                            >
                              <Trash2 size={18} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
