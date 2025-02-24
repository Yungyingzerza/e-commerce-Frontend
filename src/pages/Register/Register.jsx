import { Link } from "react-router-dom"
export default function Register() {
    return (
        <>
            <div className="flex flex-row w-screen h-screen">
                <div className="bg-[#FDF5F8] w-full md:w-1/2 h-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center relative bottom-10 gap-5 w-full">
                        <h1 className="inconsolata-700 text-5xl md:text-8xl text-[#685752]">Register</h1>


                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Name</span>
                            </div>
                            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Surname</span>
                            </div>
                            <input type="text" placeholder="Surname" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Email</span>
                            </div>
                            <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Password</span>
                            </div>
                            <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <label className="form-control w-full max-w-xs md:max-w-md">
                            <div className="label">
                                <span className="label-text text-[#685752] ubuntu-sans-mono-400 my-1">Confirm Password</span>
                            </div>
                            <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs md:max-w-md rounded-full bg-[#F2D8E2]" />
                        </label>

                        <Link to="/login" className="text-[#685752] ubuntu-sans-mono-400 md:w-md w-xs underline text-sm">Click here to login!</Link>


                        <button className="btn bg-[#F3D0D7] text-[#c790a6] w-full max-w-32 rounded-full inconsolata-700 text-lg">REGISTER</button>
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