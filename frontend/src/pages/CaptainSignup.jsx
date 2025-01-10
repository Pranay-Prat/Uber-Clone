import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState(null);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setCaptainData({ fullName: {
      firstName: firstName,
      lastName: lastName,
    }, email, password });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
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
