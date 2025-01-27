import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { API } from './constants/API'
import apiRequest from './utils/apiRequest'

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await apiRequest(API.login, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if(response.status === 200) {
        console.log('Login success:', response)
        alert('Login success')
      } else {
        console.error('Login failed:', response)
        alert('Login failed / may be logged in already')
      }

    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  
  return (
    <>
      <div className='flex flex-col gap-2 justify-center items-center w-screen h-screen'>
        <input className='border' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='border' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='bg-blue-500 text-white p-2 rounded' onClick={handleLogin}>Login</button>
      </div>
    </>
  )
}

export default App
