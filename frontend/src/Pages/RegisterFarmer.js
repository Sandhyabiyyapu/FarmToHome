import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterFarmer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    farmImages: '', // comma-separated URLs
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
      // Convert farmImages from comma-separated string to array
      const dataToSend = {
        ...formData,
        farmImages: formData.farmImages.split(',').map(url => url.trim()).filter(Boolean)
      };
      await axios.post('http://localhost:5000/api/auth/register-farmer', dataToSend);
      alert("Registered successfully! Awaiting admin approval.");
      navigate('/login');
    } catch (err) {
      alert("Error during registration");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Farmer Registration</h2>
        <form onSubmit={handleRegister}>
          <input className="w-full p-2 mb-3 border" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="location" placeholder="Location" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="farmImages" placeholder="Farm Image URLs (comma separated)" onChange={handleChange} />
          <button className="w-full py-2 bg-green-600 text-white">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterFarmer;