import React from 'react'

const RidePopup = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'><i onClick={()=>{
            props.setridePopupPanel(false)
            }} className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center gap-3 justify-between bg-yellow-400 rounded-lg mt-4 p-2'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfH4QOh9hhpvEpTq5x0uYOAE5pO-XVUOEz4w&s" alt="" />
                    <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h2 className='text-lg font-semibold'>2.2 KM</h2>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                    <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    props.setconfirmridePopupPanel(true)
                    props.confirmRide()
                }} className='w-full mt-2 bg-green-500 text-white font-semibold rounded-lg p-2'>Accept</button>
                <button onClick={()=>{
                    props.setridePopupPanel(false)
                }} className='w-full mt-2 bg-gray-300 text-gray-700 font-semibold rounded-lg p-2'>Ignore</button>
            </div>
    </div>
  )
}

export default RidePopup