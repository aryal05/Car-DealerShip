import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Loader
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const BrandManager = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    display_order: 0,
    is_active: 1
  });
  const [uploadMethod, setUploadMethod] = useState("url"); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchBrands();
  }, [navigate]);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/brands`);
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        image_url: brand.image_url,
        display_order: brand.display_order,
        is_active: brand.is_active,
      });
      // Set image preview for existing brand
      const imageUrl = brand.image_url.startsWith("http")
        ? brand.image_url
        : `${API_BASE_URL}${brand.image_url}`;
      setImagePreview(imageUrl);
      setUploadMethod("url");
    } else {
      setEditingBrand(null);
      setFormData({
        name: "",
        image_url: "",
        display_order: brands.length,
        is_active: 1,
      });
      setImagePreview("");
      setUploadMethod("url");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBrand(null);
    setFormData({
      name: "",
      image_url: "",
      display_order: 0,
      is_active: 1,
    });
    setUploadMethod("url");
    setSelectedFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("display_order", formData.display_order);
      submitData.append("is_active", formData.is_active);

      // Handle image upload
      if (uploadMethod === "file" && selectedFile) {
        // New file uploaded
        submitData.append("image", selectedFile);
      } else if (uploadMethod === "url" && formData.image_url) {
        // URL provided
        submitData.append("image_url", formData.image_url);
      } else if (editingBrand && !selectedFile) {
        // Editing existing brand without changing image - keep existing image_url
        submitData.append("image_url", editingBrand.image_url);
      }

      if (editingBrand) {
        await axios.put(
          `${API_BASE_URL}/brands/${editingBrand.id}`,
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      } else {
        await axios.post(`${API_BASE_URL}/brands`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchBrands();
      closeModal();
    } catch (error) {
      console.error("Error saving brand:", error);
      alert(error.response?.data?.message || "Error saving brand");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBrand = async (id) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/brands/${id}`);
      fetchBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("Error deleting brand");
    }
  };

  const toggleActive = async (brand) => {
    try {
      await axios.put(`${API_BASE_URL}/brands/${brand.id}`, {
        is_active: brand.is_active ? 0 : 1,
      });
      fetchBrands();
    } catch (error) {
      console.error("Error toggling brand status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Brand Manager
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage premium brand showcase
                </p>
              </div>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Plus size={20} />
              Add Brand
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        ) : brands.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No brands yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first premium brand
            </p>
            <button
              onClick={() => openModal()}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Your First Brand
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Brand Image */}
                <div className="relative h-64">
                  <img
                    src={
                      brand.image_url.startsWith("http")
                        ? brand.image_url
                        : `${API_BASE_URL}${brand.image_url}`
                    }
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Brand Name Overlay */}
                  <div className="absolute top-4 left-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {brand.name}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        brand.is_active
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {brand.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Order: {brand.display_order}</span>
                    <span>ID: #{brand.id}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(brand)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                    >
                      {brand.is_active ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                      {brand.is_active ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => openModal(brand)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBrand(brand.id)}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingBrand ? "Edit Brand" : "Add New Brand"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Brand Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Mercedes-Benz"
                  />
                </div>

                {/* Image Upload/URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Image *
                  </label>

                  {/* Upload Method Tabs */}
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setUploadMethod("url")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        uploadMethod === "url"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod("file")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        uploadMethod === "file"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Upload File
                    </button>
                  </div>

                  {/* URL Input */}
                  {uploadMethod === "url" && (
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      required={uploadMethod === "url"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://images.unsplash.com/..."
                    />
                  )}

                  {/* File Upload */}
                  {uploadMethod === "file" && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setSelectedFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        required={uploadMethod === "file" && !editingBrand}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Max size: 5MB. Accepted formats: JPG, PNG, GIF, WEBP
                      </p>
                    </div>
                  )}

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23ddd' width='800' height='400'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EInvalid Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Lower numbers appear first
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active === 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked ? 1 : 0,
                        })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Show brand on homepage
                    </span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader className="animate-spin" size={20} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {editingBrand ? "Update Brand" : "Add Brand"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandManager;
