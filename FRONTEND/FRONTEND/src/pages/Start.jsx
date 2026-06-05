import React from 'react'
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
    <div className='bg-cover bg-center bg-no-repeat bg-[url(https://images.stockcake.com/public/b/e/2/be2f0d93-19dc-456e-a1ef-b89efef23d85_large/urban-traffic-lights-stockcake.jpg)] h-screen  pt-8  flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16    ml-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <div className = 'bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'> Get Started With Uber</h2>
            <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>
        </div>
   </div>
    </div>
  )
}

export default Start

