import React from 'react'
import { Link } from 'react-router-dom'
import UberLogo from '../assets/Uber_Logo.png';

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1652468901252-49eca84ea887?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHRyYWZmaWMlMjBsaWdodHxlbnwwfDF8MHx8fDA%3D)] h-screen w-full pt-4 flex justify-between flex-col'>
            <img className='w-24 ml-7' src={UberLogo} alt="" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home