import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault()
  
      setUserData({
        username:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
  
     
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  return (
      <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 ml-16 mb-7'
        src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
          alt='Uber Logo'
        />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2'>What's your name?</h3>

          <div className='flex gap-4 mb-7'>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
              type='text'
              placeholder='First Name'
            />

            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
              type='text'
              placeholder='Last Name'
            />
          </div>

          <h3 className=' text-lg mb-2'>What's your email?</h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg'
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='text-xl text-lg mb-2'>Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg'
            type='password'
            placeholder='Password'
          />

          <button
            type='submit'
            className='bg-black text-white mb-3 font-semibold rounded px-4 py-2 w-full text-lg'
          >
            Signup
          </button>

          <p className='text-center'>
            Already have an account?
            <Link to='/captain-login' className='text-blue-600 ml-1'>
              Login Here
            </Link>
          </p>
        </form>
      </div>

      <div>
       <p className='text-xs leading-tight '> 
        This site is protected by reCAPTCHA and the  <span className='underline'>Google Privacy Policy</span> and<span className='underline'>Terms of Service apply.</span> 
       </p>
      </div>
    </div>
  )
}

export default CaptainSignup
