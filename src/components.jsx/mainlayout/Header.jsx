import React, { useEffect, useState } from 'react'
import { IoSearch as Search } from "react-icons/io5";
import { IoIosNotifications as Notification } from "react-icons/io";
import { FiMenu as Menu } from "react-icons/fi";
import { MdAccountCircle as Account } from "react-icons/md";
import { MdOutlineMovieFilter as Label } from "react-icons/md"
import { FaFire as Fire} from "react-icons/fa";
import { GoDotFill as Dot } from "react-icons/go";
import { NavLink, useNavigate } from 'react-router-dom';
const Header = ({changeBg, setttingnav, setttingnav2}) => {
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
    <header className='text-gray-300 text-opacity-70 font-bold  sticky top-0 z-10 py-2 bgBlack '>
        <div className='bgBlack text-gray-200 p-4 pb-2 flex items-center justify-between headNew splitContainer '>
            <div className='flex items-center gap-2'>
                <Menu className='block trigger1' size={25} onClick={() => {
                    setttingnav(true)
                }}/>
                <div className='flex items-center'>
                <Menu className='hidden trigger2' size={30} onClick={setttingnav2}/>
                <div className='flex items-center gap-1'>
                    <Label className='text-red-600 font-bold' size={30}/>
                    <h1 className='block  text-3xl'>Dj.Movies</h1>
                </div>
                    
                </div>
            </div>
            {/* form 900px */}
            <div className='flex
             items-center justify-between '>
                <form onSubmit={handleSubmit} className={`hidden items-center w-3/4 rounded-md overflow-hidden bgForm bg-opacity-70 backdrop-blur-sm mx-2 border opacity-50 form900`}>
                <button onSubmit={handleSubmit} className=' p-2 text-gray-300 font-bold '><Search size={25}/></button>
                    <input type="text" name='searchTerm' value={searchTerm} autoFocus required className='w-full block outline-none bg-transparent p-2 text-gray-300 text-sm' placeholder='Kimoda, demon hunter' onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }} />
                    
                </form>      
                <NavLink to='/account'className='flex  items-center  textMidSm gap-1' onClick={accountNav} >
                    {authenticated ?  <>
                        <p className='text-gray-200'>{username.length <= 4 ? username.toLowerCase(): `${username.toLowerCase().slice(0,4)}...`}</p>
                    <img src={require(profilePic)} className='profileImg object-top' alt="" />
                    </>: <>
                    <p className='text-gray-300'>Login</p>
                    <Account className='text-gray-300' size={25}/>
                    </>}
                </NavLink >
            </div>
        </div> 
      
       <div className={`p-1 transition-all duration-150 ease-linear absolute -bottom-11/12  h-fit left-0 w-full searchSmall ${changeBg ? "bgBlack" : null}`}>
            
            <form onSubmit={handleSubmit} className={`flex items-center  rounded-md overflow-hidden bgForm bg-opacity-90 backdrop-blur-sm mx-2 border`}>
            <button onSubmit={handleSubmit} className=' p-2 text-gray-300 font-bold'><Search size={30}/></button>
                <input type="text" name='searchTerm' value={searchTerm} required className='w-full block outline-none bg-transparent p-2 text-gray-300 text-sm' placeholder='Kimoda, demon hunter' onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} />
                
            </form>       
        </div>
    </header>
  )
}

export default Header
