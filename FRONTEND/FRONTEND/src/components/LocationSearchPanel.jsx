import React from 'react'

const LocationSearchPanel = () => {

  //sample array for location
  // const locations =[]
  return (
    <div>
      {/* THIS IS JUST A SAMPLE DATA */}
      <div className='flex gap-4 p-3 border-2 my-4 active:border-black items-center rounded-xl border-gray-50 justify-start'>

        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full'><i className="ri-map-pin-fill "></i></h2>
        <h4 className='font-medium'>24B, near Kapoor's cafe,Bhopal</h4>

      
      </div>
    </div>
  )
}

export default LocationSearchPanel
