import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const Captainlogin = () => {
    const [email, setEmail] = useState('')    //two way binding for email and password
     const [password, setPassword] = useState('')
    
  const {captain, setCaptain} =  React.useContext(CaptainDataContext) //to get and set captain data in context
  const Navigate = useNavigate()

     const submitHandler = async(e)=>{
      e.preventDefault();
      
      const captain ={
        email:email,
        password:password
      }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)  //send login request to backend
  
    if(response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
      
    }
      setEmail('')   //after submit clear the form
      setPassword('')
    }
  return (
   <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img className='w-20 mx-auto mb-2  ml-16' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber Logo" />
     
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
         placeholder='email@example.com'>
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
         
        <p className='text-center'>Join a fleet<Link to='/captain-signup' className='text-blue-600 '>
         Register as a Captain</Link></p> 

      </form>
       </div>

<div>
     <Link
     to='/login'
      className='bg-[orange] flex items-center justify-center text-white mb-5 font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base-content' 
  
     >
       Sign in as User
     </Link>
</div>
    </div>
  )
}

export default Captainlogin
