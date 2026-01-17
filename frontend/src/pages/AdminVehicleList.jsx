import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Eye, Search } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AdminVehicleList = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles`);
      setVehicles(response.data.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await axios.delete(`${API_BASE_URL}/vehicles/${id}`);
        fetchVehicles();
      } catch (error) {
        alert('Error deleting vehicle: ' + error.message);
      }
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.model?.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.variant?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/admin/dashboard')} className="text-white hover:bg-white/20 p-2 rounded-xl transition-all">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Vehicle Inventory</h1>
                <p className="text-indigo-100">{filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} in catalog</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-6 py-3 w-80 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-white shadow-lg font-medium placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vehicle List */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={vehicle.image_url || 'https://via.placeholder.com/100'}
                          alt={vehicle.model}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow-md"
                        />
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{vehicle.model}</div>
                          <div className="text-gray-600 font-medium">{vehicle.variant}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-indigo-600 text-xl">${vehicle.price?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${
                        vehicle.status === 'Available' ? 'bg-green-100 text-green-700 border border-green-200' :
                        vehicle.status === 'Sold Out' ? 'bg-red-100 text-red-700 border border-red-200' :
                        vehicle.status === 'Used' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-700 font-medium">{vehicle.location}</td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                          className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl font-medium transition-all hover:scale-110 border-2 border-transparent hover:border-blue-300"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)}
                          className="p-3 text-amber-600 hover:bg-amber-100 rounded-xl font-medium transition-all hover:scale-110 border-2 border-transparent hover:border-amber-300"
                          title="Edit Vehicle"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="p-3 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-all hover:scale-110 border-2 border-transparent hover:border-red-300"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVehicleList;
