import { Link, useNavigate } from "react-router-dom"
import { useState, useCallback, useRef } from "react"
import apiRequest from "../../utils/apiRequest"
import { API } from "../../constants/API"
import LoadingPage from "../../components/LoadingPage/LoadingPage"
export default function Register() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const emailRef = useRef(null)

    const handleRegister = useCallback(async () => {

        if (password !== confirmPassword) {
            setError('Passwords do not match!')
            document.getElementById('register-modal').showModal()
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long!')
            document.getElementById('register-modal').showModal()
            return
        }

        if(!name){
            setError('Name cannot be empty!')
            document.getElementById('register-modal').showModal()
            return
        }

        if(!surname){
            setError('Surname cannot be empty!')
            document.getElementById('register-modal').showModal()
            return
        }

        if(!email){
            setError('Email cannot be empty!')
            document.getElementById('register-modal').showModal()
            return
        }

        setLoading(true)

        const response = await apiRequest(API.register, {
            method: 'POST',
            body: JSON.stringify({ name, surname, email, password, password_confirmation: confirmPassword })
        })

        setLoading(false)
        
        if (response && response.errors && response.errors.email[0] == "The email has already been taken.") {
            setError('The email has already been taken!')
            emailRef.current.focus()
            document.getElementById('register-modal').showModal()
            return
        }

        navigate('/login')

    }, [name, surname, email, password, confirmPassword])

    return (
        <>
            {loading && <LoadingPage />}
            <dialog id="register-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Error!</h3>
                    <p className="py-4">{error}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className="flex flex-row w-screen h-screen">
                <div className="bg-[#FDF5F8] w-full md:w-1/2 h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center relative bottom-10 gap-5 w-full">
                        <h1 className="inconsolata-700 text-5xl md:text-8xl text-[#685752]">Register</h1>


                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Name</span>
                            </div>
                            <input onChange={e => setName(e.currentTarget.value)} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Surname</span>
                            </div>
                            <input onChange={e => setSurname(e.currentTarget.value)} type="text" placeholder="Surname" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Email</span>
                            </div>
                            <input ref={emailRef} onChange={e => setEmail(e.currentTarget.value)} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Password</span>
                            </div>
                            <input onChange={e => setPassword(e.currentTarget.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Confirm Password</span>
                            </div>
                            <input onChange={e => setConfirmPassword(e.currentTarget.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <Link to="/login" className="text-[#685752] ubuntu-sans-mono-400 md:w-md w-xs underline text-sm">Click here to login!</Link>


                        <button onClick={handleRegister} className="btn bg-[#F3D0D7] text-[#c790a6] w-full max-w-32 rounded-full inconsolata-700 text-lg">REGISTER</button>
                    </div>
                </div>
                <div className="w-1/2 h-full relative md:block hidden">
                    <img src="/register.png" alt="login" className="object-cover w-full h-full absolute" />
                    <div className="absolute w-full h-full">
                        <svg
                            viewBox="0 0 350 160"
                            preserveAspectRatio="none"
                            className="w-full h-full transform rotate-180"
                        >
                            <path
                                d="M240.69,-32.05 C152.69,70.06 415.63,145.56 154.34,209.72 L500.00,150.00 L500.00,0.00 Z"
                                className="fill-current text-[#FDF5F8]"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}