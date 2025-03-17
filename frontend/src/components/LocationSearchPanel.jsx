import React from 'react'

const LocationSearchPanel = (props)=>{
  const Locations = [
    "1600 Amphitheatre Parkway, Mountain View, CA",
    "1 Infinite Loop, Cupertino, CA",
    "350 Fifth Avenue, New York, NY"
  ]
  return(
    <div>
      {
        Locations.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full'><i className='ri-map-pin-fill'></i></h2>
            <h4 className='fomt-medium'>{elem}</h4>
          </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel