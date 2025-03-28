import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

  const handleSuggestionClick = (suggestion) => {
      if (activeField === 'pickup') {
          setPickup(suggestion)
      } else if (activeField === 'destination') {
          setDestination(suggestion)
      }

  }
  return(
    <div>
      {
        suggestions.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            handleSuggestionClick(elem.description)
          }} className='flex gap-2 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 mt-1 justify-start'>
            <h2 className='bg-[#eee] h-10 flex items-center justify-center w-10 rounded-full'><i className='ri-map-pin-fill'></i></h2>
            <h4 className='w-[70%] font-normal text-lg'>{elem.description}</h4>

          </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel