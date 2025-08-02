import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardOverview() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'farmer') {
      navigate('/login');
      return;
    }
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [productsRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/farmer/products', config),
        axios.get('http://localhost:5000/api/farmer/orders', config)
      ]);
      const products = productsRes.data;
      const orders = ordersRes.data;
      setStats({
        totalProducts: products.length,
        pendingOrders: orders.filter(order => order.orderStatus === 'processing').length,
        totalEarnings: orders.filter(order => order.paymentStatus === 'paid').reduce((total, order) => total + order.totalAmount, 0)
      });
    } catch (error) {
      // fallback to 0s
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <button onClick={handleLogout} className="bg-green-700 px-4 py-2 rounded hover:bg-green-800">Logout</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back! 👋</h2>
          <p className="text-gray-600">Manage your products, track orders, and monitor your earnings.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 text-2xl">📦</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 text-2xl">🚚</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 text-2xl">💰</div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold">₹{stats.totalEarnings}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => navigate('/farmer/add-product')} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
            <div className="text-center">
              <div className="text-4xl mb-4">🧾</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Product</h3>
              <p className="text-gray-600 text-sm">Add new products to your inventory</p>
            </div>
          </div>
          <div onClick={() => navigate('/farmer/manage-products')} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Products</h3>
              <p className="text-gray-600 text-sm">View and manage your product listings</p>
            </div>
          </div>
          <div onClick={() => navigate('/farmer/view-orders')} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-yellow-500">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Orders</h3>
              <p className="text-gray-600 text-sm">Track and manage incoming orders</p>
            </div>
          </div>
          <div onClick={() => navigate('/farmer/earnings')} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earnings</h3>
              <p className="text-gray-600 text-sm">Monitor your earnings and analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview; 