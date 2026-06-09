import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
      });

      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      });

      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-10 absolute left-10 top-5 z-10'
        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
        alt='Uber Logo'
      />

      <div className='h-screen w-screen'>
        <img
          className='w-full h-full object-cover'
          src='https://therideshareguy.com/wp-content/uploads/2023/07/get-to-know-your-map-in-denver.jpg'
          alt='Uber Map'
        />
      </div>

      {/* FIXED: removed bg-white from here */}
      <div className='flex flex-col justify-end absolute h-screen top-0 w-full'>

        <div className='h-[30%] p-5 bg-white relative rounded-t-3xl'>

          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'
          >
            <i className='ri-arrow-down-wide-line'></i>
          </h5>

          <h4 className='text-2xl font-semibold mt-6'>
            Find a trip
          </h4>

          <form onSubmit={submitHandler}>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] text-base px-8 py-2 w-full mb-3 mt-2 rounded-lg'
              type='text'
              placeholder='Add a pickup location'
            />

            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] text-base px-8 py-2 w-full rounded-lg'
              type='text'
              placeholder='Enter your destination'
            />
          </form>
        </div>

        <div
          ref={panelRef}
          className='bg-white h-0 overflow-hidden'>
            <LocationSearchPanel></LocationSearchPanel>
        
        </div>

      </div>

      <div className='fixed z-10 w-full bg-white bottom-0 px-3 py-8 translate-y-full'>
        <h2 className='text-2xl font-semibold mb-5'> Choose a vehicle</h2>
        <div className='flex border-2 mb-2 active:border-black  w-full p-3 rounded-xl items-center justify-between'>
          <img className=' h-12 ' src='https://static.vecteezy.com/system/resources/previews/021/794/782/non_2x/isometric-car-icon-isolated-on-white-free-vector.jpg' alt='Car Icon' />
        <div className='ml-2 w-1/2'>
          <h4 className='text-sm font-medium'>UberGo <span><i className="ri-user-3-fill"></i>1</span></h4>
          <h5 className='text-sm font-medium'>2 mins away</h5>
          <p className='text-xs font-normal text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>Rs192.45</h2>
        </div>
  
     <div className='flex border-2 mb-2 active:border-black  w-full p-3 rounded-xl items-center justify-between'>
          <img className=' h-12 ' src='https://media.sketchfab.com/models/4c4339a5e56340789d7911671a86d8a5/thumbnails/35b3e31c936d449f9a51c46d04bc8061/b5db90b3803b4a22a8afda1bd9e9075f.jpeg' alt='Car Icon' />
        <div className='ml-2 w-1/2'>
          <h4 className='text-sm font-medium'> Moto <span><i className="ri-user-3-fill"></i>4</span></h4>
          <h5 className='text-sm font-medium'>3 mins away</h5>
          <p className='text-xs font-normal text-gray-600'>Affordable motorcycle rides</p>
        </div>
        <h2 className='text-lg font-semibold'>Rs65.34</h2>
        </div>


     <div className='flex border-2 mb-2 active:border-black  w-full p-3 rounded-xl items-center justify-between'>
          <img className=' h-12 ' src='https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png' alt='Car Icon' />
        <div className='ml-2 w-1/2'>
          <h4 className='text-sm font-medium'> UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
          <h5 className='text-sm font-medium'>2 mins away</h5>
          <p className='text-xs font-normal text-gray-600'>Affordable Auto rides</p>
        </div>
        <h2 className='text-lg font-semibold'>Rs118.12</h2>
        </div>


      </div>
    </div>
  );
};

export default Home;