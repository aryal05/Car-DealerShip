import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AddVehicle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({
    model: '',
    variant: '',
    price: '',
    original_price: '',
    after_tax_credit: '',
    mileage: '',
    range_epa: '',
    top_speed: '',
    acceleration: '',
    exterior_color: '',
    interior_color: '',
    wheels: '',
    autopilot: '',
    seat_layout: '',
    additional_features: '',
    status: 'Available',
    location: 'Showroom'
  });
  const [images, setImages] = useState([{ url: '', is_primary: true, display_order: 0 }]);

  const handleAddImage = () => {
    setImages([...images, { url: '', is_primary: false, display_order: images.length }]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        handleImageChange(index, 'url', response.data.imageUrl);
      }
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create vehicle
      const vehicleResponse = await axios.post(`${API_BASE_URL}/vehicles`, vehicle);
      const vehicleId = vehicleResponse.data.data.id;

      // Add images
      if (images.some(img => img.url)) {
        await axios.post(`${API_BASE_URL}/admin/vehicles/images`, {
          vehicle_id: vehicleId,
          images: images.filter(img => img.url)
        });
      }

      alert('Vehicle added successfully!');
      navigate('/admin/vehicles');
    } catch (error) {
      alert('Error adding vehicle: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/dashboard')} className="text-white hover:bg-white/20 p-2 rounded-xl transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Add New Vehicle</h1>
              <p className="text-green-100">Fill in the details to add a vehicle to inventory</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Variant</label>
                <input
                  type="text"
                  value={vehicle.variant}
                  onChange={(e) => setVehicle({ ...vehicle, variant: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  value={vehicle.price}
                  onChange={(e) => setVehicle({ ...vehicle, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                <input
                  type="number"
                  value={vehicle.original_price}
                  onChange={(e) => setVehicle({ ...vehicle, original_price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">After Tax Credit ($)</label>
                <input
                  type="number"
                  value={vehicle.after_tax_credit}
                  onChange={(e) => setVehicle({ ...vehicle, after_tax_credit: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={vehicle.status}
                  onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  <option value="Available" className="bg-green-100 text-green-800">🟢 Available</option>
                  <option value="Used" className="bg-blue-100 text-blue-800">🔵 Used</option>
                  <option value="Sold Out" className="bg-red-100 text-red-800">🔴 Sold Out</option>
                  <option value="Reserved" className="bg-yellow-100 text-yellow-800">🟡 Reserved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Performance & Specifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mileage</label>
                <input
                  type="text"
                  value={vehicle.mileage}
                  onChange={(e) => setVehicle({ ...vehicle, mileage: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Range (EPA)</label>
                <input
                  type="text"
                  value={vehicle.range_epa}
                  onChange={(e) => setVehicle({ ...vehicle, range_epa: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Top Speed</label>
                <input
                  type="text"
                  value={vehicle.top_speed}
                  onChange={(e) => setVehicle({ ...vehicle, top_speed: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">0-60 mph</label>
                <input
                  type="text"
                  value={vehicle.acceleration}
                  onChange={(e) => setVehicle({ ...vehicle, acceleration: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Colors & Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Colors & Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Exterior Color</label>
                <input
                  type="text"
                  value={vehicle.exterior_color}
                  onChange={(e) => setVehicle({ ...vehicle, exterior_color: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interior Color</label>
                <input
                  type="text"
                  value={vehicle.interior_color}
                  onChange={(e) => setVehicle({ ...vehicle, interior_color: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Wheels</label>
                <input
                  type="text"
                  value={vehicle.wheels}
                  onChange={(e) => setVehicle({ ...vehicle, wheels: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Autopilot</label>
                <input
                  type="text"
                  value={vehicle.autopilot}
                  onChange={(e) => setVehicle({ ...vehicle, autopilot: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Seat Layout</label>
                <input
                  type="text"
                  value={vehicle.seat_layout}
                  onChange={(e) => setVehicle({ ...vehicle, seat_layout: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={vehicle.location}
                  onChange={(e) => setVehicle({ ...vehicle, location: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Additional Features</label>
              <textarea
                value={vehicle.additional_features}
                onChange={(e) => setVehicle({ ...vehicle, additional_features: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Vehicle Images</h2>
              </div>
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add Image
              </button>
            </div>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={image.url}
                        onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Image URL or upload file below"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={image.is_primary}
                          onChange={(e) => handleImageChange(index, 'is_primary', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Primary</span>
                      </label>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="flex-1">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                        <Upload className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Browse & Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(index, e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                    </label>
                    {image.url && (
                      <img
                        src={image.url}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 sticky bottom-0 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all border-2 border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Vehicle...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Vehicle to Inventory
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
