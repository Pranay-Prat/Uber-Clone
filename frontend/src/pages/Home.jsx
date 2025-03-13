import React, { useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
const Home = () => {
  const [pickup, setPickup] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef=useRef(null);
  const panelCloseRef=useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!pickup || !destination) {
      alert('Please enter both pickup location and destination');
      return;
    }
    console.log('Trip request submitted:', { pickup, destination });
    // Here you would typically send this data to a backend API
    // or dispatch a Redux action to handle the trip request
    // Reset form after submission (optional)
    setPickup('');
    setDestination('');
  };
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        opacity:1
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        opacity:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  
   },[panelOpen])
  return (
    <div>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt="Uber" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://media.istockphoto.com/id/1287419541/vector/city-map-vector-illustration.jpg?s=612x612&w=0&k=20&c=0VAHCECbPYP5Yiid8TTcIKKZgzS2rFnowlmIAtcFnOE=" alt="" />
      </div>
      <div className='h-screen flex flex-col justify-end absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(!panelOpen)
          }} className='text-2xl opacity-0 absolute top-6 right-6'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
        <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=>
          submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
          <input value={pickup} onClick={() => setPanelOpen(true)} onChange={(e)=>{
            setPickup(e.target.value)
          }} className='bg-[#eee] px-8 py-2 text-lg rounded-base w-full mt-5' type="text" placeholder='Add a pick up location'></input>
          <input value={destination} onClick={() => setPanelOpen(true)} onChange={(e)=>{
            setDestination(e.target.value)
          }} className='bg-[#eee] px-8 py-2 text-lg rounded-base w-full mt-3' type="text" placeholder='Enter your destination'></input>
        </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  )
}

export default Home