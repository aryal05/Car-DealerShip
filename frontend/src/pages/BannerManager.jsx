import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, Upload, GripVertical, Edit, Link as LinkIcon, Image } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL, UPLOAD_URL } from '../config/api';

const BannerManager = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({ route: 'home', image_url: '', display_order: 0 });
  const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editUploadMode, setEditUploadMode] = useState('url');
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  const routes = ['home', 'about', 'finance', 'contact'];

  useEffect(() => {
    fetchBanners();
  }, [selectedRoute]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/banners?route=${selectedRoute}`);
      setBanners(response.data.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBanner = async () => {
    try {
      setUploading(true);
      let imageUrl = newBanner.image_url;

      // If file upload mode, upload the file first
      if (uploadMode === 'file' && selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        imageUrl = uploadResponse.data.url;
      }

      await axios.post(`${API_BASE_URL}/admin/banners`, {
        route: selectedRoute,
        image_url: imageUrl,
        display_order: newBanner.display_order
      });
      
      setShowAddModal(false);
      setNewBanner({ route: selectedRoute, image_url: '', display_order: 0 });
      setSelectedFile(null);
      setUploadMode('url');
      fetchBanners();
    } catch (error) {
      console.error('Error adding banner:', error);
      alert('Failed to add banner: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setShowEditModal(true);
  };

  const handleUpdateBanner = async () => {
    try {
      setUploading(true);
      let imageUrl = editingBanner.image_url;

      // If file upload mode, upload the file first
      if (editUploadMode === 'file' && editSelectedFile) {
        const formData = new FormData();
        formData.append('image', editSelectedFile);
        
        const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        imageUrl = uploadResponse.data.url;
      }

      await axios.put(`${API_BASE_URL}/admin/banners/${editingBanner.id}`, {
        image_url: imageUrl,
        display_order: editingBanner.display_order
      });
      
      setShowEditModal(false);
      setEditingBanner(null);
      setEditSelectedFile(null);
      setEditUploadMode('url');
      fetchBanners();
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Failed to update banner: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBanner = async (id) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/banners/${id}`);
        fetchBanners();
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleReorder = async (draggedIndex, targetIndex) => {
    const reorderedBanners = [...banners];
    const [draggedItem] = reorderedBanners.splice(draggedIndex, 1);
    reorderedBanners.splice(targetIndex, 0, draggedItem);

    const updatedBanners = reorderedBanners.map((banner, index) => ({
      id: banner.id,
      display_order: index
    }));

    try {
      await axios.put(`${API_BASE_URL}/admin/banners/order`, { images: updatedBanners });
      setBanners(reorderedBanners);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/admin/dashboard')} className="text-white hover:bg-white/20 p-2 rounded-xl transition-all">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Banner Manager</h1>
                <p className="text-purple-100">Manage banner images for different routes</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-3 bg-white text-purple-700 rounded-xl hover:bg-purple-50 font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Banner
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Route Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Route</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {routes.map((route) => (
              <button
                key={route}
                onClick={() => setSelectedRoute(route)}
                className={`p-4 rounded-xl font-semibold transition-all border-2 ${
                  selectedRoute === route
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105 border-purple-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-400 hover:shadow-md'
                }`}
              >
                <div className="capitalize text-lg">{route}</div>
                <div className="text-xs mt-1 opacity-80">
                  {banners.length} banner{banners.length !== 1 ? 's' : ''}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Banners Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('index', index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedIndex = parseInt(e.dataTransfer.getData('index'));
                  handleReorder(draggedIndex, index);
                }}
              >
                <div className="relative group">
                  <img
                    src={banner.image_url}
                    alt="Banner"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEditBanner(banner)}
                      className="opacity-0 group-hover:opacity-100 bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 font-semibold shadow-lg transform hover:scale-110 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Edit className="w-5 h-5" />
                        Edit
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 font-semibold shadow-lg transform hover:scale-110 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <X className="w-5 h-5" />
                        Delete
                      </div>
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                    Order: {banner.display_order}
                  </div>
                  <div className="absolute top-3 right-3 bg-white p-3 rounded-full cursor-move shadow-lg hover:shadow-xl transition-shadow">
                    <GripVertical className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-r from-gray-50 to-transparent">
                  <p className="text-sm text-gray-600 truncate font-medium">{banner.image_url}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Banner</h2>
              <button onClick={() => {
                setShowAddModal(false);
                setSelectedFile(null);
                setUploadMode('url');
              }} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-5">
              {/* Upload Mode Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setUploadMode('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                    uploadMode === 'url'
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  URL
                </button>
                <button
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                    uploadMode === 'file'
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              {uploadMode === 'url' ? (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={newBanner.image_url}
                    onChange={(e) => setNewBanner({ ...newBanner, image_url: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {newBanner.image_url && (
                    <div className="mt-3">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Preview</label>
                      <img
                        src={newBanner.image_url}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="hidden"
                      id="banner-file-upload"
                    />
                    <label htmlFor="banner-file-upload" className="cursor-pointer">
                      <Image className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-700">
                        {selectedFile ? selectedFile.name : 'Click to upload image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Display Order</label>
                <input
                  type="number"
                  value={newBanner.display_order}
                  onChange={(e) => setNewBanner({ ...newBanner, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <button
                onClick={handleAddBanner}
                disabled={uploading || (uploadMode === 'url' && !newBanner.image_url) || (uploadMode === 'file' && !selectedFile)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Banner
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showEditModal && editingBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Banner</h2>
              <button onClick={() => {
                setShowEditModal(false);
                setEditSelectedFile(null);
                setEditUploadMode('url');
              }} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-5">
              {/* Upload Mode Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setEditUploadMode('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                    editUploadMode === 'url'
                      ? 'bg-white text-amber-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  URL
                </button>
                <button
                  onClick={() => setEditUploadMode('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                    editUploadMode === 'file'
                      ? 'bg-white text-amber-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              {editUploadMode === 'url' ? (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={editingBanner.image_url}
                    onChange={(e) => setEditingBanner({ ...editingBanner, image_url: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {editingBanner.image_url && (
                    <div className="mt-3">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Current Image</label>
                      <img
                        src={editingBanner.image_url}
                        alt="Current"
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Upload New Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-500 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditSelectedFile(e.target.files[0])}
                      className="hidden"
                      id="edit-banner-file-upload"
                    />
                    <label htmlFor="edit-banner-file-upload" className="cursor-pointer">
                      <Image className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-700">
                        {editSelectedFile ? editSelectedFile.name : 'Click to upload new image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                  {editSelectedFile ? (
                    <div className="mt-3">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">New Image Preview</label>
                      <img
                        src={URL.createObjectURL(editSelectedFile)}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                      />
                    </div>
                  ) : editingBanner.image_url && (
                    <div className="mt-3">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Current Image</label>
                      <img
                        src={editingBanner.image_url}
                        alt="Current"
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Display Order</label>
                <input
                  type="number"
                  value={editingBanner.display_order}
                  onChange={(e) => setEditingBanner({ ...editingBanner, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <button
                onClick={handleUpdateBanner}
                disabled={uploading || (editUploadMode === 'url' && !editingBanner.image_url)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="w-5 h-5" />
                      Update Banner
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;
