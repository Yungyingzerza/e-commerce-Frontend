import { Link, useNavigate } from "react-router-dom"
import apiRequest from "../../utils/apiRequest"
import { useState, useCallback } from "react"
import { API } from "../../constants/API"
import { setBalance, setEmail, setId, setLevel, setName, setProfileUrl, setSurname } from '../../store/userSlice'
import { useDispatch } from "react-redux"
import LoadingPage from "../../components/LoadingPage/LoadingPage"
export default function Login() {

    const [email, setEmailInput] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = useCallback(async () => {
        try {
            setLoading(true)

            const response = await apiRequest(API.login, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            })

            if(response && response.token){
                localStorage.setItem('token', response.token)

                apiRequest(API.user)
                    .then(res => {

                        dispatch(setName(res.name))
                        dispatch(setSurname(res.surname))
                        dispatch(setEmail(res.email))
                        dispatch(setProfileUrl(res.profile_url))
                        dispatch(setBalance(res.balance))
                        dispatch(setLevel(res.level))
                        dispatch(setEmail(res.email))
                        dispatch(setId(res.id))

                        navigate('/')

                    })
                    .catch(error => {
                        console.error('User fetch failed', error)
                    })

            }

            setLoading(false)

        } catch (error) {
            console.error('Login failed')
            setLoading(false)
        }
    }, [email, password])

    

    return (
        <>
           {loading && <LoadingPage />}
            <div className="flex flex-row w-screen h-screen">
                <div className="w-1/2 h-full relative md:block hidden">
                    <img src="/login.png" alt="login" className="object-cover w-full h-full absolute" />
                    <div className="absolute w-full h-full">
                        <svg
                            viewBox="0 0 350 160"
                            preserveAspectRatio="none"
                            className="w-full h-full "
                        >
                            <path
                                d="M240.69,-32.05 C152.69,70.06 415.63,145.56 154.34,209.72 L500.00,150.00 L500.00,0.00 Z"
                                className="fill-current text-[#c790a6]"
                            />
                        </svg>
                    </div>
                </div>
                <div className="bg-[#c790a6] w-full md:w-1/2 h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center relative md:right-1/5 bottom-10 gap-5 w-full">
                        <h1 className="inconsolata-700 text-5xl md:text-8xl text-white">Login</h1>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-white ubuntu-sans-mono-400 my-1">Email</span>
                            </div>
                            <input onChange={e => setEmailInput(e.currentTarget.value)} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-white ubuntu-sans-mono-400 my-1">Password</span>
                            </div>
                            <input onChange={e => setPassword(e.currentTarget.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full" />
                        </label>

                        <Link to="/register" className="text-white ubuntu-sans-mono-400 md:w-md w-xs underline text-sm">Click here to register!</Link>

                        <button onClick={handleLogin} className="btn bg-[#F3D0D7] text-[#c790a6] w-full max-w-32 rounded-full inconsolata-700 text-lg">LOGIN</button>
                    </div>


                </div>
            </div>
        </>
    )
}