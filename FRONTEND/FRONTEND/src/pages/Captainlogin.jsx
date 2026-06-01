import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Captainlogin = () => {
    const [email, setEmail] = useState('')    //two way binding for email and password
     const [password, setPassword] = useState('')
     const [captainData, setCaptainData] = useState({}) //to store user data after login
  
     const submitHandler = (e)=>{
      e.preventDefault();
      setCaptainData({
        email:email,
        password:password
      })
    
      console.log(captainData) //after submit print the user data in console
  
      setEmail('')   //after submit clear the form
      setPassword('')
    }
  return (
   <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img className='w-16 mx-auto mb-7  ml-16' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber Logo" />
     
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>

        <h3 className='text-xl mb-2'>
         What's your email 
        </h3>

        <input
         required 
         value={email}
         onChange={(e)=>{
          setEmail(e.target.value)
         }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base-content'
         type="email" 
         placeholder='email@gmail.com'>
         </input>

        <h3 className='text-xl mb-2'> Enter Password</h3>

        <input
         required
         value={password}
         onChange={(e)=>{
          setPassword(e.target.value)
         }}
         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base-content'
         type="password"
          placeholder='password'>
          </input>

        <button
        className='bg-[#111] text-white mb-3 font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base-content' 
        >
          login
        </button>
         
        <p className='text-center'>Join a fleet<Link to='/signup' className='text-blue-600 '>
         Register as a Captain</Link></p> 

      </form>
       </div>

<div>
     <Link
     to='/captain-login'
      className='bg-[orange] flex items-center justify-center text-white mb-5 font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base-content' 
  
     >
       Sign in as User
     </Link>
</div>
    </div>
  )
}

export default Captainlogin
