import { useEffect } from 'react'
import { API } from '../constants/API'
import apiRequest from '../utils/apiRequest'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import { setBalance, setEmail, setId, setLevel, setName, setProfileUrl, setSurname, setLoading } from '../store/userSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const abortController = new AbortController()
      apiRequest(API.user, {
        signal: abortController.signal
      })
        .then(data => {
          if (data.id) {
            dispatch(setId(data.id))
            dispatch(setEmail(data.email))
            dispatch(setName(data.name))
            dispatch(setSurname(data.surname))
            dispatch(setProfileUrl(data.profile_url))
            dispatch(setLevel(data.level))
            dispatch(setBalance(data.balance))
          }
          dispatch(setLoading(false))
        })
        .catch(error => {

          //if error because aborting request, do nothing
          if (error.name === 'AbortError') return

          dispatch(setLoading(false))
        })

    return () => {
      abortController.abort()
    }
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
