import React from 'react'
import { Link } from 'react-router-dom'
const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=' text-lg font-medium ri-home-5-line'></i>
        </Link>
        <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://media.istockphoto.com/id/1287419541/vector/city-map-vector-illustration.jpg?s=612x612&w=0&k=20&c=0VAHCECbPYP5Yiid8TTcIKKZgzS2rFnowlmIAtcFnOE=" alt="" />
        </div>
        <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
            <img className='h-20 ' src=" https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
            <div className='text-right'>
              <h3 className='text-lg font-semibold'>
                Pranay
              </h3>
              <h4 className='text-xl font-semibold -mt-1 -mb-1'>
                UK 08 AL 3203
              </h4>
              <p className='text-sm text-gray-600'>Honda Amaze</p>
            </div>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
              
                <div className='w-full mt-4'>
                    
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
    
            </div>
            <button className='w-full mt-5 bg-green-500 text-white text-xl font-semibold rounded-lg p-2'>Make a payment</button>
        </div>
    </div>
  )
}

export default Riding