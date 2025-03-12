import React, { useState, useEffect ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserDataContext);

  const submitHandler = async(event) => {
    event.preventDefault();
    const userData ={ email:email, password:password };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
    if(response.status === 200){
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-6"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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
          New User?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-600">
            Sign Up
          </button>
        </p>
      </div>
      <div>
        <button
          onClick={() => navigate('/captain-login')}
          className="bg-[#4F359B] text-white flex items-center justify-center font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
