import React, { useRef,useCallback,useEffect, useContext } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import debounce from 'lodash.debounce';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import WaitingForDriver from '../components/WaitingForDriver'
import LookingForDriver from '../components/LookingForDriver'
import {SocketContext} from '../context/SocketContext'
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
const Home = () => {
  const [pickup, setPickup] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef=useRef(null);
  const panelCloseRef=useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = React.useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = React.useState(false)
  const [vehicleFound, setVehicleFound] = React.useState(false)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [waitingForDriver, setwaitingForDriver] = React.useState(false)
  const [pickupSuggestions, setPickupSuggestions] = React.useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = React.useState([]);
  const [activeField, setActiveField] = React.useState('pickup');
  const [fare, setFare] = React.useState({});
  const [vehicleType,setVehicleType] = React.useState(null)
  const [ride, setRide] = React.useState(null)
  const {socket} = useContext(SocketContext)
  const {user} = useContext(UserDataContext)
  const navigate = useNavigate()
  useEffect(() => {    
    socket.emit("join", { userType: "user", userId: user.user._id})
}, [ user ])
  socket.on('ride-started',ride =>{
    setwaitingForDriver(false)
    navigate('/riding',{state:{ride}})
  })
    const fetchPickupSuggestions = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params:{ input: e.target.value },
        headers :{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data);
      
    } catch (error) {
      console.error(error);
      
    }}
    const debouncedFetchPickup = useCallback(debounce(fetchPickupSuggestions, 1000), []);

    const fetchDestinationSuggestions = async (e) => {
      setDestination(e.target.value)
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setDestinationSuggestions(response.data)
      } catch(error) {
          console.error(error)
      }
  }
  const debouncedFetchDestination = useCallback(debounce(fetchDestinationSuggestions, 1000), []);

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    debouncedFetchPickup(e);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    debouncedFetchDestination(e);
  }; 
  socket.on('ride-confirmed',(ride)=>{
    
    setwaitingForDriver(true)
    setVehicleFound(false)
    setRide(ride)
  })
  const submitHandler = (e) => {
    e.preventDefault();
    if (!pickup || !destination) {
      alert('Please enter both pickup location and destination');
      return;
    }
   
    setPickup('');
    setDestination('');
  };
  useGSAP(function () {
    if (panelOpen) {
        gsap.to(panelRef.current, {
            height: '65%',
            padding: 20,
            paddingTop: 0,
            marginTop: 0
            })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
            padding: 0
    
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
    }
}, [ panelOpen ])
useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehiclePanel ])
useGSAP(function () {
  if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ confirmRidePanel ])
useGSAP(function () {
  if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ vehicleFound ])
async function findTrip(){
  setVehiclePanel(true)
  setPanelOpen(false)
  
  
  try{
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
    params: { pickup: pickup, destination:destination },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  setFare(response.data)
  
}
  catch(error){
    console.error(error)
  }
  
}
useGSAP(function () {
  if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ waitingForDriver ])
async function createRide(){
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
    pickup, destination, vehicleType
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

  return (
    <div className='relative h-screen overflow-hidden'> 
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt="Uber" />
      <div className='h-screen w-screen' style={{pointerEvents: 'auto'}}>
       <LiveTracking/>
      </div>
      <div className='h-screen flex flex-col justify-end absolute top-0 w-full'>
        <div className='h-[35%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(!panelOpen)
          }} className='text-2xl opacity-0 absolute top-6 right-6'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
        <h4 className='text-2xl font-semibold mb-4'>Find a trip</h4>
        <form onSubmit={(e)=>
          submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full'></div>
            <input onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
         <input onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
        </form>
        <button onClick={findTrip} className='w-full text-white bg-black px-4 py-2 my-2 mt-3 rounded-xl'>Find Trip</button>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
        <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setconfirmRidePanel={setconfirmRidePanel}  setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-8'>
        <ConfirmedRide fare={fare} vehicleType={vehicleType} pickup={pickup} destination={destination} createRide={createRide} setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-8'>
        <LookingForDriver fare={fare} vehicleType={vehicleType} pickup={pickup} destination={destination} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0 bg-white px-3 py-6 pt-8'>
        <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound} waitingForDriver={waitingForDriver} setwaitingForDriver={setwaitingForDriver} />
      </div>
    </div>
  )
}

export default Home