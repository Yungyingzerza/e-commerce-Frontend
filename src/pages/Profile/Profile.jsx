import Navbar from "../../components/Navbar/Navbar"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import apiRequest from "../../utils/apiRequest"
import { API } from "../../constants/API"
export default function Profile() {
    const user = useSelector(state => state.user)

    const [addresses, setAddresses] = useState([])
    const [loadingAdresses, setLoadingAddresses] = useState(true)

    useEffect(() => {
        if (user.id) {
            apiRequest(API.addresses)
                .then(response => {
                    if (response.length > 0) {
                        setAddresses(response)
                    }
                    setLoadingAddresses(false)
                })
        }
    }, [user])

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl mt-10 jeju-myeongjo">PROFILE</h1>
                {user.loading ?
                    <div className="flex flex-col justify-center items-center">
                        <div className="avatar mt-5">
                            <div className="w-48 rounded-full skeleton "></div>
                        </div>
                        <div className="flex flex-row gap-5 mt-2">
                            <div className="w-24 skeleton h-7"></div>
                            <div className="w-24 skeleton h-7"></div>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <div className="avatar mt-5">
                            <div className="w-48 rounded-full">
                                <img src={user.profile_url} />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 mt-2">
                            <h1 className="text-2xl ubuntu-sans-mono-400">{user.name}</h1>
                            <h1 className="text-2xl  ubuntu-sans-mono-400">{user.surname}</h1>
                        </div>
                    </div>
                }
                {
                    loadingAdresses ?
                        <div className="flex flex-col justify-center w-full p-10">
                            <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">Addresses</h1>
                            <div className="mt-3 flex flex-col bg-[#f8e7f0] w-full skeleton h-32"></div>
                            
                        </div>
                        :
                        <div className="flex flex-col justify-center w-full p-10">
                            <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">Addresses</h1>
                            <div className="mt-3 flex flex-col bg-[#f8e7f0] w-full h-auto p-3">
                                {addresses.map((address, index) => (
                                    <div key={index} className="flex flex-row gap-5 justify-center items-center ">
                                        <h1 className="text-xl flex-1 ubuntu-sans-mono-400">{address.address}</h1>
                                        <button className="text-xl ubuntu-sans-mono-400 btn btn-warning">Edit</button>
                                        <button className="text-xl ubuntu-sans-mono-400 btn btn-error">Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                }
            </div>
        </>
    )
}