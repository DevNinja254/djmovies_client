import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Navlink = () => {
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()
  const logout = () =>  {
    localStorage.removeItem("authorized")
    localStorage.removeItem("auth_refresh")
    localStorage.removeItem("admin")
    localStorage.removeItem("auth")
    localStorage.removeItem("own")
    localStorage.removeItem("ownVideo")
    localStorage.removeItem("paid")
    localStorage.removeItem("paidVideo")
    sessionStorage.removeItem("deposit_history")
    sessionStorage.removeItem("purchase")
    navigate("/account/authenticate")
  }
  useEffect(() => {
    const admn = localStorage.getItem("admin")
    if(admn == "true") {
      setAdmin(true)
    }
  }, [])
  return (
    <div className='flex justify-between items-center p-2 titleBg border-b-2 border-gray-500 border-opacity-15 text-sm text-slate-200 font-bold capitalize'>
        <NavLink to="/" className='text-lg'>View Site</NavLink>
        <nav>
        <ul className='flex gap-3'>
            <li>
            <NavLink to="/profile" className={({isActive}) => isActive ? "text-sky-300 font-bold" : "hover:text-sky-200 text-slate-200 "}>Profile</NavLink>
            </li>
            {admin ?  <li>
            <NavLink target='_blank' to="https://admin.flixshow.xyz/api/v1/admin" className={({isActive}) => isActive ? "text-sky-300 font-bold" : "hover:text-sky-200 text-slate-200 "}>admin</NavLink>
            </li> : null}
            <li>
            <NavLink to="/account/dashboard" className={({isActive}) => isActive ? "text-sky-300 font-bold" : "text-slate-200 hover:text-sky-200"}>DashBoard</NavLink>
            </li>
            <li>
            <NavLink to="/account/cart" className={({isActive}) => isActive ? "text-sky-300 font-bold" : "text-slate-200 hover:text-sky-200"}>Cart</NavLink>
            </li>
            <span  className='hover:cursor-pointer hover:text-sky-200' onClick={logout}>Logout</span>
        </ul>
        
        </nav>
    </div>
  )
}

export default Navlink
