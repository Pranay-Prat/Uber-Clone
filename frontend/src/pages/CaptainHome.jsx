import React,{useEffect, useContext} from 'react'
import {useGSAP} from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import {SocketContext} from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'
const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = React.useState(false)
  const ridePopupPanelRef = React.useRef(null)
  const [confirmridePopupPanel,setconfirmridePopupPanel] = React.useState(false)
  const confirmridePopupPanelRef = React.useRef(null)
  const [ride, setRide] = React.useState(null)
  const {socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)
  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain.captain._id})
    const updateLocation=()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit("update-location-captain", {
            userId: captain.captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
          
      })
  }
}
const locationInterval = setInterval(updateLocation, 20000)
updateLocation()
  },[])
  socket.on('new-ride', (data) => {
    
    setRide(data)
    
    setridePopupPanel(true)
    
  }
  )
  async function confirmRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`, {
        rideId: ride._id,
        captainId: captain.captain._id
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      console.log("Ride confirmed response:", response.data);
      
      setridePopupPanel(false);
      setconfirmridePopupPanel(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }
  
  useGSAP(function () {
    if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  }, [ ridePopupPanel ])
  useGSAP(function () {
    if (confirmridePopupPanel) {
        gsap.to(confirmridePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmridePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  }, [ confirmridePopupPanel ])
  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt="Uber" />
          <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=' text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
        </div>
        <div className='h-3/5'>
        <LiveTracking/>
        </div>
        <div className='h-2/5 p-6'>
        <CaptainDetails/>
        </div>
        <div ref={ridePopupPanelRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <RidePopup confirmRide={confirmRide} ride={ride} setridePopupPanel={setridePopupPanel} setconfirmridePopupPanel={setconfirmridePopupPanel} />
      </div>
      <div ref={confirmridePopupPanelRef} className='fixed w-full h-screen translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopup ride={ride} setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome