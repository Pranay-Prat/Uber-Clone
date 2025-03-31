import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext)
  const Captain=captain.captain
  
  
  const randomEarnings = (Math.random() * (500 - 100) + 100).toFixed(2);
  return (
    <div>
                <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 justify-start'>
            <img className='h-16 w-16 rounded-full object-cover' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            <h4 className='text-lg font-medium capitalize'>{Captain.fullname.firstname + " " + Captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-lg font-semibold uppercase'>
              {Captain.vehicle.plate}
            </h4>
            <p className='text-sm text-gray-600'>
              Vehicle Number
            </p>
          </div>
        </div>
          <div className='flex p-3 mt-6 bg-[#EAFF47] rounded-xl justify-evenly gap-4 items-start'>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
              <h5 className='text-lg font-medium' >10</h5>
              <p className='text-sm text-gray-600'>Rides Completed</p>
            </div>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours online</p>
            </div>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
              <h5 className='text-lg font-medium'>₹{randomEarnings}</h5>
              <p className='text-sm text-gray-600'>Earned</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails