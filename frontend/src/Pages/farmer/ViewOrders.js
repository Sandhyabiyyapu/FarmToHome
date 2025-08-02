import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get('http://localhost:5000/api/farmer/orders', config);
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/farmer/orders/${orderId}`, 
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadOrders();
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'ready-for-pickup': return 'bg-blue-100 text-blue-800';
      case 'in-transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.orderStatus === filter;
  });

  const calculateTotalEarnings = () => {
    return orders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Orders Received</h1>
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                📦
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-xl font-bold">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                ⏳
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-xl font-bold">
                  {orders.filter(o => o.orderStatus === 'processing').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                ✅
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-xl font-bold">
                  {orders.filter(o => o.orderStatus === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                💰
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-xl font-bold">₹{calculateTotalEarnings()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="processing">Processing ({orders.filter(o => o.orderStatus === 'processing').length})</option>
                  <option value="ready-for-pickup">Ready for Pickup ({orders.filter(o => o.orderStatus === 'ready-for-pickup').length})</option>
                  <option value="in-transit">In Transit ({orders.filter(o => o.orderStatus === 'in-transit').length})</option>
                  <option value="delivered">Delivered ({orders.filter(o => o.orderStatus === 'delivered').length})</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚚</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? "You haven't received any orders yet." 
                    : `No orders with status "${filter}" found.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()} at{' '}
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">₹{order.totalAmount}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="font-medium">{order.productId?.name || 'Product Name'}</p>
                          <p className="text-sm text-gray-600">
                            Quantity: {order.quantity} | Price: ₹{order.productId?.price || 0}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="font-medium">{order.customerId?.name || 'Customer Name'}</p>
                          <p className="text-sm text-gray-600">{order.customerId?.email || 'customer@email.com'}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Address:</strong> {order.deliveryAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">Update Status:</span>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                        >
                          <option value="processing">Processing</option>
                          <option value="ready-for-pickup">Ready for Pickup</option>
                          <option value="in-transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                      
                      {order.deliveryAgentId && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Delivery Agent:</span> {order.deliveryAgentId.name}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders; 