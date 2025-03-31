import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ltd: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => console.warn('Geolocation not available:', error),
      { enableHighAccuracy: true }
    );
  }, []);
console.log(location);

  const submitHandler = async (event) => {
    event.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
      location
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-6" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-2 mb-5">
            <input type="text" required placeholder="Firstname" className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" required placeholder="Lastname" className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input type="email" required placeholder="email@example.com" className="bg-[#eeeeee] mb-6 rounded w-full px-4 py-2 border text-lg placeholder:text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input type="password" required placeholder="Password" className="bg-[#eeeeee] mb-6 rounded w-full px-4 py-2 border text-lg placeholder:text-base" value={password} onChange={(e) => setPassword(e.target.value)} />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-3 mb-7'>
            <input type="text" required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
            <input type="text" required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
          </div>
          <div className='flex gap-3 mb-7'>
            <input className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="number" required placeholder='Vehicle Capacity' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
            <select required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm'>
              <option value="" disabled>Select Vehicle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">Sign Up</button>
        </form>
        <p className="text-center">Already have an account? <button onClick={() => navigate('/captain-login')} className="text-blue-600">Login</button></p>
      </div>
      <div>
        <p className="text-[12px] leading-tight">This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
      </div>
    </div>
  );
};

export default CaptainSignup;
