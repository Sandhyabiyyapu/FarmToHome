import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    quantity: '',
    availableUntil: ''
  });

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(`http://localhost:5000/api/farmer/products/${productId}`, config);
      setProduct(response.data);
      setFormData({
        quantity: response.data.quantity.toString(),
        availableUntil: new Date(response.data.availableUntil).toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error loading product:', error);
      alert('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/farmer/products/${productId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Product updated successfully!');
      navigate('/farmer/manage-products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
          <button
            onClick={() => navigate('/farmer/manage-products')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            <button
              onClick={() => navigate('/farmer/manage-products')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Products
            </button>
          </div>

          {/* Product Info (Read-only) */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Product Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={product.name}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={product.category}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="text"
                  value={`₹${product.price}/${product.unit}`}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={product.description}
                  disabled
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-semibold">Update Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="1"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Current unit: {product.unit}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Until *
                </label>
                <input
                  type="date"
                  value={formData.availableUntil}
                  onChange={(e) => setFormData({...formData, availableUntil: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {saving ? 'Updating Product...' : 'Update Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/farmer/manage-products')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct; 