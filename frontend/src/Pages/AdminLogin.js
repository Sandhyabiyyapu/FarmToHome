import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', form);
      alert(res.data.message);
      // You can store token if needed: localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard');
    } catch (err) {
      alert("Login failed. Check email/password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-3 border" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-3 border" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
