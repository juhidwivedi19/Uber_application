import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const UserLogin = () => {
   const [email, setEmail] = useState('')    //two way binding for email and password
   const [password, setPassword] = useState('')
   const [userData, setUserData] = useState({}) //to store user data after login

   const submitHandler = (e)=>{
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    })
  
    console.log(userData) //after submit print the user data in console

    setEmail('')   //after submit clear the form
    setPassword('')

   }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img className='w-16 mx-auto mb-7  ml-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
     
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
         
        <p className='text-center'>New Here?<Link to='/signup' className='text-blue-600 '>
         Create new Account</Link></p> 

      </form>
       </div>

<div>
     <Link
     to='/captain-login'
      className='bg-[orange] flex items-center justify-center text-white mb-5 font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base-content' 
  
     >
       Sign in as Captain
     </Link>
</div>
    </div>
        
  )
}

export default UserLogin
