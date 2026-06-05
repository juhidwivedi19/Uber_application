import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const UserLogin = () => {
   const [email, setEmail] = useState('')    //two way binding for email and password
   const [password, setPassword] = useState('')
   const [userData, setUserData] = useState({}) //to store user data after login


   const {user,setUser} = useContext(UserDataContext)  //to get and set user data in context
   const navigate = useNavigate()   //to navigate to home page after login


   const submitHandler = async (e)=>{
    e.preventDefault();
   
    const userData= {
      email:email,
      password:password
    }
  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)  //send login request to backend

    if( response.status == 200){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')  //navigate to home page after successful login
    }
   

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
