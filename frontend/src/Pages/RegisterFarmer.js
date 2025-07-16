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
<<<<<<< HEAD
    farmImages: '', // comma-separated URLs
  });

=======
  });
  const [farmImages, setFarmImages] = useState([]);
>>>>>>> origin/b1
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

<<<<<<< HEAD
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
=======
  const handleFileChange = (e) => {
    setFarmImages([...e.target.files]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    farmImages.forEach((file) => {
      data.append('farmImages', file);
    });
    try {
      await axios.post('http://localhost:5000/api/farmer/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registration successful! Await admin approval.');
      navigate('/login');
    } catch (err) {
      alert('Error during registration');
>>>>>>> origin/b1
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Farmer Registration</h2>
<<<<<<< HEAD
        <form onSubmit={handleRegister}>
=======
        <form onSubmit={handleRegister} encType="multipart/form-data">
>>>>>>> origin/b1
          <input className="w-full p-2 mb-3 border" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input className="w-full p-2 mb-3 border" name="location" placeholder="Location" onChange={handleChange} required />
<<<<<<< HEAD
          <input className="w-full p-2 mb-3 border" name="farmImages" placeholder="Farm Image URLs (comma separated)" onChange={handleChange} />
=======
          <label className="block mb-2">Farm Images (you can select multiple):</label>
          <input className="w-full p-2 mb-3 border" type="file" name="farmImages" multiple onChange={handleFileChange} />
>>>>>>> origin/b1
          <button className="w-full py-2 bg-green-600 text-white">Register</button>
        </form>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default RegisterFarmer;
=======
export default RegisterFarmer; 
>>>>>>> origin/b1
