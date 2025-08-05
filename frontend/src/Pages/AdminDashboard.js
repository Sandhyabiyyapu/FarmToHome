import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [allFarmers, setAllFarmers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const [pendingRes, allRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/pending-farmers'),
        axios.get('http://localhost:5000/api/admin/all-farmers')
      ]);
      setPendingFarmers(pendingRes.data);
      setAllFarmers(allRes.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
      alert('Error loading farmers data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (farmerId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-farmer/${farmerId}`);
      alert('Farmer approved successfully!');
      fetchFarmers();
    } catch (error) {
      console.error('Error approving farmer:', error);
      alert('Error approving farmer');
    }
  };

  const handleReject = async (farmerId) => {
    if (window.confirm('Are you sure you want to reject this farmer?')) {
      try {
        await axios.put(`http://localhost:5000/api/admin/reject-farmer/${farmerId}`);
        alert('Farmer rejected successfully!');
        fetchFarmers();
      } catch (error) {
        console.error('Error rejecting farmer:', error);
        alert('Error rejecting farmer');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                Pending Approvals ({pendingFarmers.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                All Farmers ({allFarmers.length})
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'pending' ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Farmer Approvals</h2>
            {pendingFarmers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No pending approvals</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingFarmers.map((farmer) => (
                  <div key={farmer._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{farmer.name}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Pending
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Email:</strong> {farmer.email}</p>
                      <p><strong>Phone:</strong> {farmer.phone}</p>
                      <p><strong>Location:</strong> {farmer.location}</p>
                      <p><strong>Registered:</strong> {new Date(farmer.createdAt).toLocaleDateString()}</p>
                    </div>

                    {farmer.farmImages && farmer.farmImages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Farm Images:</p>
                        <div className="flex space-x-2 overflow-x-auto">
                          {farmer.farmImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Farm ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleApprove(farmer._id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(farmer._id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Farmers</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {allFarmers.map((farmer) => (
                  <li key={farmer._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                          <div className="text-sm text-gray-500">{farmer.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          farmer.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {farmer.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        <span className="text-sm text-gray-500">{farmer.location}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard; 