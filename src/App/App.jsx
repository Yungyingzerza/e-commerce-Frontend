import { useEffect } from 'react'
import { API } from '../constants/API'
import apiRequest from '../utils/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import Product from '../pages/Product/Product'
import { setBalance, setEmail, setId, setLevel, setName, setProfileUrl, setSurname, setLoading } from '../store/userSlice'
import LoadingPage from '../components/LoadingPage/LoadingPage'
import Category from '../pages/Category/Category'
function App() {

  const dispatch = useDispatch()
  const user = useSelector(state =>state.user)

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

      {
        user.loading ?
          <div className='bg-red-200 h-screen w-screen flex justify-center items-center'>
            <LoadingPage />
          </div>
        :
        user.id ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="*" element={<Home />} />
          </Routes>
        :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      }
    </>
  )
}

export default App
