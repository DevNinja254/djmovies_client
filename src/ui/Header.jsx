import React, { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { RiSearchLine as Search } from "react-icons/ri";
import { MdAccountCircle as Account } from "react-icons/md"
import api from '../assets/js/api';
const Header = ({dj}) => {
    const [search, setSearch] = React.useState('');
    const navigate = useNavigate()
    const handleSumit = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`)
    }
    const activeLinkStyle = {
      borderBottom:'3px solid rgb(45, 106, 177)',
    }
    const auth = () => {
      const authorized = localStorage.getItem("authorized")
      if (authorized == "true"){
        navigate("/profile")
      } else {
        navigate("/account/authenticate")
      }
    }
  return (
    <header className='sticky top-0 z-10'>
      <div className='titleBg px-3 py-2 flex items-center justify-between gap-5'>
        <p className="text-2xl text-center text-gray-200 font-bold whitespace-nowrap">Dj Movies</p>
        <form onSubmit={handleSumit} className='flex w-full items-center gap-2 bg-gray-200 px-2 py-1 rounded-md bg-opacity-20 text-gray-300'>
           <input type="text" className='bg-transparent outline-none placeholder-slate-200 w-full' placeholder='Search'  value={search} onChange={(e) => {
            setSearch(e.target.value)
           }} /> 
           <button onClick={handleSumit}><Search size={23}/></button>
        </form>
        <div>
        <div to="/profile" onClick={auth}><Account className='text-gray-200 hover:cursor-pointer' size={24}/></div>
        </div>
      </div>
      <nav className='flex items-center justify-start text-sm font-bold  navColor border-b-2  mainNav gap-1 '>
        <NavLink to="/" style={({isActive}) => (isActive | dj == "smith" ? activeLinkStyle : {})} className="inline-block py-3 px-1" >DJ SMITH</NavLink>
        <NavLink to="/dj/afro" style={({isActive}) => (isActive | dj == "afro" ? activeLinkStyle : {})} className="inline-block py-3 px-1">DJ AFRO</NavLink>
        <NavLink to="/dj/sky" style={({isActive}) => (isActive | dj == "sky" ? activeLinkStyle : {})} className="inline-block py-3 px-1">DJ SKY</NavLink>
        <NavLink to="/dj/dhaveman" style={({isActive}) => (isActive | dj == "dhaveman" ? activeLinkStyle : {})} className="inline-block py-3 px-1">DJ DHAVEMAN</NavLink>
      </nav>
    </header>
  )
}

export default Header
