import React from 'react'
import { MdOutlineMovieFilter as Label } from "react-icons/md"
import { MdOutlineLocalMovies as Movie } from "react-icons/md";
import { TbCategoryPlus as Category } from "react-icons/tb";
import { TbBrandDjango as Dj } from "react-icons/tb";
import { TbArrowGuideFilled as Guide } from "react-icons/tb";
import { MdConnectWithoutContact as Contact } from "react-icons/md";
import { FcAbout as About} from "react-icons/fc";
import { NavLink } from 'react-router-dom';
import { FaShoppingCart as Cart } from "react-icons/fa";
import { MdAccountCircle as Account } from "react-icons/md";
import { IoIosNotifications as Notification} from "react-icons/io";
import { PiHandDepositFill } from 'react-icons/pi';
import { MdOutlineLiveTv as Tv} from "react-icons/md";
import { MdAnimation as Anime} from "react-icons/md";
import { MdHomeFilled as Home} from "react-icons/md";
// import { SiFoursquarecityguide as Guide } from "react-icons/si";
const SideBar2 = () => {
  return (
    <div className={`h-full bgSlide slide  w-full col-span-2 sidebar2`}>
      <div className='p-1 px-3 '>
      <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 hover:text-white px-3 py-2"   to='/'>
            <Home size={20}/>
            <p className='font-bold'>Home</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/store/series'>
            <Tv size={20}/>
            <p className='font-bold'>TV show</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/store/movie'>
            <Movie size={20}/>
            <p className='font-bold'>Movie</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/store/anime'>
            <Anime size={20}/>
            <p className='font-bold'>Animation</p>
        </NavLink>
        <NavLink  className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/deejays'>
            <Dj size={20}/>
            <p className='font-bold'>DJ/s</p>
        </NavLink>
        <NavLink   to='/genre'  className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white">
            <Category size={20}/>
            <p className='font-bold'>Genre</p>
        </NavLink>
        <NavLink   to='/contact' className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white">
            <Contact size={20}/>
            <p className='font-bold'>Contact</p>
        </NavLink>
        <NavLink   to='/about' className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white">
            <About size={20}/>
            <p className='font-bold'>About US</p>
        </NavLink>
      </div>
      <div className='p-4 grid gap-1 border-gray-500 border-t '>
        <h2 className='text-white text-opacity-60 textMidSm px-3 py-2 hover:text-white text-center font-bold'>Extra links</h2>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/cart'>
              <Cart size={20}/>
              <p className='font-bold'>Cart</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/account'>
              <Account size={20}/>
              <p className='font-bold'>Account</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/notifications'>
              <Notification size={20}/>
              <p className='font-bold'>Notification</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/guide'>
              <Guide size={20}/>
              <p className='font-bold'>Guide</p>
        </NavLink>
        <NavLink className="flex items-center text-white text-opacity-90 text-md gap-2 px-3 py-2 hover:text-white"   to='/deposit'>
              <PiHandDepositFill size={20}/>
              <p className='font-bold'>Deposit</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar2
