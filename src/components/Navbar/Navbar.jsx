import logo from '../../assets/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../../constants/API'
import { useCallback } from 'react'
import apiRequest from '../../utils/apiRequest'
import { Link, useNavigate } from 'react-router-dom'
import { setBalance, setEmail, setId, setLevel, setName, setProfileUrl, setSurname } from '../../store/userSlice'

export default function Navbar() {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    apiRequest(API.logout, {
      method: 'POST'
    })
    localStorage.removeItem('token')
    dispatch(setId(''))
    dispatch(setName(''))
    dispatch(setSurname(''))
    dispatch(setEmail(''))
    dispatch(setProfileUrl(''))
    dispatch(setBalance(''))
    dispatch(setLevel(''))

  }, [])

  return (
    <>
      <div className='flex flex-row sticky top-0 z-[99999]'>
        <div className='w-8 bg-white hidden md:block'>
          <img onClick={e => navigate('/')}  src={logo} alt='logo' className='w-16 h-16 rounded-full bg-white absolute cursor-pointer' />
        </div>
        <div className="navbar bg-[#F8E8EE] ">
          <div className="navbar-start md:ml-8">
            <div className='hidden lg:flex flex-row gap-10 items-center'>
              <a href="#" className="text-lg quicksand-500">Clothing</a>
              <a href="#" className="text-lg quicksand-500">Shoes</a>
              <a href="#" className="text-lg quicksand-500">Equipment</a>
            </div>
            <div className="dropdown lg:hidden block">
              <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul
                tabIndex="0"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a className="text-lg quicksand-500">Clothing</a></li>
                <li><a className="text-lg quicksand-500">Shoes</a></li>
                <li><a className="text-lg quicksand-500">Equipment</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <div className='flex-1 flex flex-row justify-center items-center'>
              <label className="input input-bordered flex items-center gap-2 bg-[#F8E8EE] rounded-4xl w-32 sm:w-72 lg:w-96 ">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="h-6 w-6 opacity-80"
                >
                  <circle cx={18.5} cy={18.5} r={18.5} fill="url(#pattern0_16_20)" />
                  <defs>
                    <pattern
                      id="pattern0_16_20"
                      patternContentUnits="objectBoundingBox"
                      width={1}
                      height={1}
                    >
                      <use xlinkHref="#image0_16_20" transform="scale(0.015625)" />
                    </pattern>
                    <image
                      id="image0_16_20"
                      width={64}
                      height={64}
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </label>
            </div>
          </div>
          <div className="navbar-end gap-2">
            {
              user.id ?
                <>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        viewBox="0 0 63 63"
                        className="h-8 w-8"
                      >
                        <path fill="url(#a)" d="M0 0h63v63H0z" />
                        <defs>
                          <pattern
                            id="a"
                            width={1}
                            height={1}
                            patternContentUnits="objectBoundingBox"
                          >
                            <use xlinkHref="#b" transform="scale(.02)" />
                          </pattern>
                          <image
                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAMgAAAAB1y6+rAAAEz0lEQVRoBe2ZW6hmYxjHBzNMwzgNcppd24xIaBJy6wKlpOaCuCYXEuZGUiTNuCblcCeHuaBESXJjzMioySEpiYwUGjOYwUQ5/X571v/r/Zb1nfZqfV/pe+q33+c9PYf3fde71t57xYq5zFdgvgJdrMBRDUab2hqGDWxy/tEDezvoSMApdS6pd+BytMnlOq/P+2e0q25HHNPCvMmcAQtwHPwBf8Okch4TzgR39bdJJ086PjtwFhPvhvfBwN0Jg5ffYSfYvxYMLFLqJ9J4D+yCw6AN+Qu0uQO2wOlQl8RRb5+ovoHRhyCOk0RZT9uPjLu3Zt1kDPAnqM+xbiJpVz8A98OxUC4E1XaymemufIKN04NVe/rS/iftb8AJ4C68CekrS4P+BbKzZZ/6O+ARbi1up6yG7bAHHoJLYA0oq+AK2AruRhnMbuoexTLR/dS3wZXgiiva3wQPwz4obXxGfR0sS8rzWOqjjJ3CgJcggZQJqLsYJ0Okbtu6u/gMxIblW1Aesfo8uvulHFDq/aOG13T4JJSBmMTjUNosdbr6xL4HoLRxWzXC23bY3GpYuyJX+krM7AAD8Tl4F9JnEOMG4g5mV79B96ofS3RwMeyFL+FCWK4sMvEj+ADOhwRvWR4Tqn1if8auR/cycDFclBsgkjGp95V2Pg1ZhQfRh07om91N5XnM5oj57CSelANX5fIqHid/XRnJsai6plq8jjcXVvGmM66RYpa+jBzsdl4Gw44B3Z2LMWRHvJojI3fE68+JJuD3T1YDdSbiSzfPiNd7L4FE07TSJvBzMTh3ftPY2OmyNGhfhvpX98E3RiXlwCPzfTFoYWnK7H4Y7AVgEupfQaS3uD0lPZS2fVLVnXhVof9nS6u+rotrKgf69yofSxx8F5iE7IFZJYDrpe+4/ZQ+p8ZzIyg5akdqDT8N2pdgJjrZD8RpSRbNUm4CYzCeX+EkGJkEY3ryHpoG5Ile63QVE/GY58Z6Dj2Jjh3JHZUBV+IwnAsTG2HOpKKP+LkVPbvh7zcXQdNzTXOzONjfE/aCibgifiZMU07D2beQU7G9jXM/m8tn5fqasaxcrbl1VbvPQnz77tg4qdUyOPWdhcHv0NcXBsuxRXMr1dNwDuS5cEe2VBZb+fNc+oxki3ehr4JWRpk/TNbSmZfy2+j6auUvBupH7GUMd/01fDY+NoNJRVoloxENPAW5QSxfhJWQZFEnkjIo7Sgeq2B9ubadO1DcgdcgR8zyFShXjOpYUiZh4ItwJyxA+jpJAvtLDtZQ+req3CaWH8MGUBLEkdron46/BQ6BC/MFTGqDKeOJK1bKaiqvQrkzP1C/thw0Qtem76nHoLRzkHrdH03dicfsUSiDcHf8Xd+/KtalvsqbGOBXbOY79wBcBzORm/Hqh1x51Hwbe1zqt5rJ+DxtAz83koTlbliEqe4G/pYkTi+l9iEYUBJS/xxuh1PBv6zfB/ugHONLz+PlcTXR+s7R1J00OfMFaaD+a6FcaYM22PItnX4f7KshkoVJfeplEjOQjfAC1I9Ogrf0u2krHA+Zizr9HdHpIElgiwzwyHi8ksSn6I+AX7WOy9hSp3n2UgaWaNwln491kP70WTa1lf1T1ZuCaWqrBzXOmPqceX2+AvMVmK/A/2QF/gWoUTYkOgrGXAAAAABJRU5ErkJggg=="
                            id="b"
                            preserveAspectRatio="none"
                          />
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <svg
                          viewBox="0 0 63 63"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="h-8 w-8"
                        >
                          <rect width={63} height={63} fill="url(#pattern0_16_15)" />
                          <defs>
                            <pattern
                              id="pattern0_16_15"
                              patternContentUnits="objectBoundingBox"
                              width={1}
                              height={1}
                            >
                              <use xlinkHref="#image0_16_15" transform="scale(0.015625)" />
                            </pattern>
                            <image
                              id="image0_16_15"
                              width={64}
                              height={64}
                              preserveAspectRatio="none"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                        <span className="badge badge-sm indicator-item">8</span>
                      </div>
                    </div>
                    <div
                      tabIndex={0}
                      className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                      <div className="card-body">
                        <span className="text-lg font-bold">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                          <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt={`${user.name} ${user.surname}`}
                          src={user.profile_url} />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      <li>
                        <Link to='/profile' className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                  </div>
                </>
                :
                <>

                  {user.loading ?
                    <>
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                    </>
                    :
                    <div className='hidden lg:flex flex-row gap-10 items-center'>
                      <Link to={`/login`} className="text-lg quicksand-500 ">Login</Link>
                      <Link to={`/register`} className="text-lg quicksand-500 ">Register</Link>
                    </div>
                  }
                </>
            }

          </div>
        </div>
      </div>
    </>
  )
}