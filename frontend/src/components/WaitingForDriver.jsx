import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
         <h5 className='p-1 text-center w-[93%] absolute top-0'><i onClick={()=>{
                props.waitingForDriver(false)
            }} className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
            <div className='flex items-center justify-between'>
            <img className='h-16 ' src=" https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" />
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
    
            </div>
    </div>
  )
}

export default WaitingForDriver