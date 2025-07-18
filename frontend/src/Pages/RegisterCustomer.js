import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function RegisterCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register-customer', formData);
      alert("Registered successfully!");
      navigate('/login');
    } catch (err) {
      alert("Error during registration");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Customer Registration</h2>
        <form onSubmit={handleRegister}>
          <input className="w-full p-2 mb-3 border" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="address" placeholder="Address" onChange={handleChange} required />
          <button className="w-full py-2 bg-green-600 text-white">Register</button>
        </form>
      </div>
    </div>
  );
}
}

export default RegisterCustomer;