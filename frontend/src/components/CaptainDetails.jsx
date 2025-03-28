import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext)
  const Captain=captain.captain
  
  return (
    <div>
                <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 justify-start'>
            <img className='h-16 w-16 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfH4QOh9hhpvEpTq5x0uYOAE5pO-XVUOEz4w&s" alt="" />
            <h4 className='text-lg font-medium capitalize'>{Captain.fullname.firstname + " " + Captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>
              ₹290
            </h4>
            <p className='text-sm text-gray-600'>
              Earned
            </p>
          </div>
        </div>
          <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
              <h5 className='text-lg font-medium' >10.2</h5>
              <p className='text-sm text-gray-600'>Hours online</p>
            </div>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours online</p>
            </div>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours online</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails