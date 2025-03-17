import React from 'react'

const ConfirmedRide = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'><i onClick={()=>{
                props.setVehiclePanel(false)
            }} className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-24 ' src=" https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
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
                <button onClick={()=>{
                    props.setVehicleFound(true)
                    props.setconfirmRidePanel(false)
                }} className='w-full mt-5 bg-green-500 text-white font-semibold rounded-lg p-2'>Confirm</button>
            </div>
    </div>
  )
}

export default ConfirmedRide