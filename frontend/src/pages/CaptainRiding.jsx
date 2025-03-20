import React from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {
    const [finishRidePanel, setfinishRidePanel] = React.useState(false)
    const finishRidePanelRef = React.useRef(null)
    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
      }, [ finishRidePanel ])
  return (
    <div className='h-screen'>
        
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt="Uber" />
          <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=' text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
        </div>
        <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://media.istockphoto.com/id/1287419541/vector/city-map-vector-illustration.jpg?s=612x612&w=0&k=20&c=0VAHCECbPYP5Yiid8TTcIKKZgzS2rFnowlmIAtcFnOE=" alt="" />
        </div>
        <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400' onClick={()=>{
            setfinishRidePanel(!finishRidePanel)
        }}>
        <h5 className='p-1 text-center w-[93%] absolute top-0'><i className='text-3xl text-black ri-arrow-down-wide-line'></i></h5>
        <h4 className='text-xl font-semibold'>4 KM AWAY </h4>
        <button className='mt-2 px-6 text-lg py-2 bg-green-500 text-white font-semibold rounded-lg'>Complete Ride</button>
        </div>
        <div ref={finishRidePanelRef} className='fixed w-full h-screen translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <FinishRide setfinishRidePanel={setfinishRidePanel}  />
      </div>
    </div>
  )
}

export default CaptainRiding