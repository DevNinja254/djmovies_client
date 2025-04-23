import React, { useEffect, useState } from 'react'
import { IoSearch as Search } from "react-icons/io5";
import { IoIosNotifications as Notification } from "react-icons/io";
import { FiMenu as Menu } from "react-icons/fi";
import { MdAccountCircle as Account } from "react-icons/md";
import { MdOutlineMovieFilter as Label } from "react-icons/md"
import { FaFire as Fire} from "react-icons/fa";
import { GoDotFill as Dot } from "react-icons/go";
import { NavLink, useNavigate } from 'react-router-dom';
const Header = ({setttingSearch, setttingnav}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [username, setUsername] = useState('Anonymous')
    const [profilePic, setProfilePic] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const pic = localStorage.getItem('pic_url')
    useEffect(() => {
        
        const user = localStorage.getItem('user')
        const authorized = localStorage.getItem('authorized')
        if (user) {
            setUsername(JSON.parse(user))
        }
        if (authorized == 'true') {
            setAuthenticated(true)
        }
        if (pic) {
            setProfilePic(JSON.parse(pic))
        }
    }, [pic])
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${searchTerm}`)
    }
    const accountNav= () => {
        if(authenticated){
            navigate("account")
        }else {
            navigate('/account/authenticate')
        }
    }
  return (
    <header className='text-gray-300 text-opacity-70 font-bold grid grid-cols-4 items-center sticky top-0 z-10 py-4 lg:grid-cols-5 2xl:grid-cols-7'>
        <div className='grid place-content-center md:flex md:items-center md:justify-start gap-2 px-3'>
            <Label className='text-red-600 font-bold' size={25}/>
            <h1 className='hidden md:block text-white text-lg'>Dj.Movies</h1>
        </div> 
        <div className='col-span-3 lg:col-span-4 flex items-center  relative justify-between pr-4 2xl:col-span-6'>
            <Menu className='text-blue-500 md:hidden' size={20} onClick={setttingnav}/>
            <Search size={20} onClick={setttingSearch} className=' md:hidden'/>
              {/* Search form */}
            <form onSubmit={handleSubmit} className={` md:flex items-center  hidden   rounded-md overflow-hidden bg-white w-2/3 lg:w-1/2 2xl:w-1/3`}>
                <input type="text" name='searchTerm' value={searchTerm} autoFocus required className='w-full block outline-none bg-transparent p-2 text-gray-600 text-sm' placeholder='Kimoda, demon hunter' onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} />
                <button onSubmit={handleSubmit} className='bg-gray-500 p-2 text-white'><Search size={20}/></button>
            </form>
            <div className='flex items-center justify-between w-1/2 gap-2 md:w-fit lg:gap-3'>
            
                <NavLink to="/new" className='flex items-center ' >
                    <Fire size={17}/>
                    <p className='bg-red-600 textSm font-bold text-white rounded-sm'>NEW</p>
                </NavLink>
                <NavLink to="/notifications" className='relative '>
                    <Notification size={20}/>
                    <Dot className='inline-block absolute -top-1 right-0 text-red-600' size={10}/>
                </NavLink >
                <NavLink to='/account'className='flex items-center  textMidSm gap-1' onClick={accountNav} >
                {authenticated ?  <>
                    <p>{username.length <= 4 ? username.toLowerCase(): `${username.toLowerCase().slice(0,4)}...`}</p>
                 <img src={require(profilePic)} className='profileImg object-top' alt="" />
                </>: <>
                <p>Login</p>
                <Account size={20}/>
                </>}
                    
                </NavLink >
           
            </div>
        </div>
       
    </header>
  )
}

export default Header
