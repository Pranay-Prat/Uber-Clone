import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState(null);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setCaptainData({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-6"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-7 rounded w-full px-4 py-2 border text-lg placeholder:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            required
            placeholder="Password"
            className="bg-[#eeeeee] mb-7 rounded w-full px-4 py-2 border text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          Join us?{' '}
          <button onClick={() => navigate('/captain-signup')} className="text-blue-600">
            Register as a Captain
          </button>
        </p>
      </div>
      <div>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#4F359B] text-white flex items-center justify-center font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </button>
      </div>
    </div>
  );
};

export default CaptainLogin;
