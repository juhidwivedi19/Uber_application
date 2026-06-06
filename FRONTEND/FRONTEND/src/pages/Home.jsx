import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [ panelOpen, setPanelOpen ] = useState(false)
  const vehiclePanelRef = useRef(null)

   const submitHandler = (e) => {
   e.preventDefault()

   }

   useGSAP (function(){
      gsap.to(panelRef.current,{
        
      })
   })
  return (
    <div className='h-screen relative'>
      <img className=' w-10 absolute  left-10 justify-content top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo"  />

      <div className='h-screen w-screen'>
        <img className='w-full h-full object-cover' src="https://therideshareguy.com/wp-content/uploads/2023/07/get-to-know-your-map-in-denver.jpg" alt="Uber Map" />
      </div>

      <div className='bg-white flex flex-col justify-end absolute h-screen top-0 w-full '>
        <div className='h-[30%] p-5 bg-white relative'>
        <h4 className='text-2xl font-semibold'> Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <div className="line absolute h-16 w-[45%] left-10top-0 bg-gray-900 rounded-full"></div>
        
          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}
          value={pickup}
          onChange={(e)=>{
            setPickup(e.target.value)
          }}
          className='bg-[#eee] text-base px-8 py-2 w-full mb-3 mt-2 rounded-lg'type="text" placeholder='Add a pickup location' >
          </input>

          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}
          value={destination}
          onChange={(e)=>{
            setDestination(e.target.value)
          }}
          className='bg-[#eee] text-base px-8 py-2   w-full rounded-lg' type="text" placeholder='Enter your destination' >
          </input>

          </form>
          </div>
          <div ref={panelRef} className='h-[70%] bg-red-500 p-5 h-0'>

          </div>
      </div>
    </div>
  )
}

export default Home
