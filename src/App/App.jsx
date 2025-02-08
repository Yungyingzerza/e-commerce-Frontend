import { useEffect, useState } from 'react'
import { API } from '../constants/API'
import apiRequest from '../utils/apiRequest'
import { useSelector } from 'react-redux'
import Home from '../pages/Home/Home'

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    console.log('User:', user)
  }, [])

  const handleLogin = async () => {
    try {
      const response = await apiRequest(API.login, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (response.status === 200) {
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
      {
        user.id ? (
          <>
            <h1>Welcome {user.email}</h1>
            <button onClick={() => alert('Logout')}>Logout</button>
          </>
        ) : (
          <>
            <Home />
          </>
        )
      }
    </>
  )
}

export default App
