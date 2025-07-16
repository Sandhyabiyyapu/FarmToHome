import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      const { token, role } = res.data;

      // Store token and role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'customer') navigate('/customer/home');
      else if (role === 'farmer') navigate('/farmer/dashboard');
    } catch (err) {
      alert("Invalid credentials or not authorized");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="block mb-1 text-sm">Login as</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          >
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>
          <button type="submit" className="w-full py-2 bg-green-600 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
