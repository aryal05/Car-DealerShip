import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const BulkUpload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
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
      location: 'Showroom',
      images: [{ url: '' }]
    }
  ]);

  const handleAddVehicle = () => {
    setVehicles([...vehicles, {
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
      location: 'Showroom',
      images: [{ url: '' }]
    }]);
  };

  const handleRemoveVehicle = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleVehicleChange = (index, field, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index][field] = value;
    setVehicles(newVehicles);
  };

  const handleAddImage = (vehicleIndex) => {
    const newVehicles = [...vehicles];
    newVehicles[vehicleIndex].images.push({ url: '' });
    setVehicles(newVehicles);
  };

  const handleImageChange = (vehicleIndex, imageIndex, value) => {
    const newVehicles = [...vehicles];
    newVehicles[vehicleIndex].images[imageIndex].url = value;
    setVehicles(newVehicles);
  };

  const handleRemoveImage = (vehicleIndex, imageIndex) => {
    const newVehicles = [...vehicles];
    newVehicles[vehicleIndex].images.splice(imageIndex, 1);
    setVehicles(newVehicles);
  };

  const handleFileUpload = async (vehicleIndex, imageIndex, file) => {
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
        handleImageChange(vehicleIndex, imageIndex, response.data.imageUrl);
      }
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/admin/vehicles/bulk`, { vehicles });
      alert(`${vehicles.length} vehicles added successfully!`);
      navigate('/admin/vehicles');
    } catch (error) {
      alert('Error uploading vehicles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/admin/dashboard')} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bulk Upload</h1>
                <p className="text-gray-600">Add multiple vehicles at once</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddVehicle}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                Add Another Vehicle
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {vehicles.map((vehicle, vehicleIndex) => (
            <motion.div
              key={vehicleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Vehicle #{vehicleIndex + 1}</h3>
                {vehicles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVehicle(vehicleIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Model *"
                  value={vehicle.model}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'model', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Variant"
                  value={vehicle.variant}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'variant', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price *"
                  value={vehicle.price}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'price', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Original Price"
                  value={vehicle.original_price}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'original_price', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Mileage"
                  value={vehicle.mileage}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'mileage', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Range (EPA)"
                  value={vehicle.range_epa}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'range_epa', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Top Speed"
                  value={vehicle.top_speed}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'top_speed', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="0-60 mph"
                  value={vehicle.acceleration}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'acceleration', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Exterior Color"
                  value={vehicle.exterior_color}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'exterior_color', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Interior Color"
                  value={vehicle.interior_color}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'interior_color', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Wheels"
                  value={vehicle.wheels}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'wheels', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Seat Layout"
                  value={vehicle.seat_layout}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'seat_layout', e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <textarea
                  placeholder="Additional Features"
                  value={vehicle.additional_features}
                  onChange={(e) => handleVehicleChange(vehicleIndex, 'additional_features', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Images</label>
                  <button
                    type="button"
                    onClick={() => handleAddImage(vehicleIndex)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Image
                  </button>
                </div>
                <div className="space-y-3">
                  {vehicle.images.map((image, imageIndex) => (
                    <div key={imageIndex} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Image URL or upload file below"
                          value={image.url}
                          onChange={(e) => handleImageChange(vehicleIndex, imageIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {vehicle.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(vehicleIndex, imageIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="flex-1">
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm">
                            <Upload className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">Browse Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(vehicleIndex, imageIndex, e.target.files[0])}
                              className="hidden"
                            />
                          </div>
                        </label>
                        {image.url && (
                          <img
                            src={image.url}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded border"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <div className="flex gap-4 sticky bottom-0 bg-white p-4 shadow-lg rounded-xl">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Uploading...' : `Upload ${vehicles.length} Vehicle${vehicles.length > 1 ? 's' : ''}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkUpload;
