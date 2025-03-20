import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        alert('OTP submitted');
      }
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'><i onClick={()=>{
            props.setridePopupPanel(false)
            }} className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            <div className='flex items-center gap-3 justify-between bg-yellow-400 rounded-lg mt-4 p-2'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfH4QOh9hhpvEpTq5x0uYOAE5pO-XVUOEz4w&s" alt="" />
                    <h2 className='text-xl font-medium'>Jasnoor Pannu</h2>
                </div>
                <h2 className='text-lg font-semibold'>2.2 KM</h2>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Knakariya Talab, Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Knakariya Talab, Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                    <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full'>
               <form onSubmit={(e)=>{submitHandler(e)}}>
                <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="number" className='bg-[#eee] font-mono px-8 py-2 text-lg rounded-base w-full my-3' placeholder='Enter OTP'/>
               <Link to='/captain-riding' onClick={()=>{
                
            }} className='w-full mt-2 bg-green-500 text-lg flex justify-center text-white font-semibold rounded-lg p-3'>Confirm</Link>
            <button onClick={()=>{
                props.setconfirmridePopupPanel(false)
                
            }} className='w-full mt-2 text-white text-lg bg-red-500 font-semibold rounded-lg p-3'>Cancel</button>
               </form>
               </div>
            </div>
    </div>
  )
}

export default ConfirmRidePopup