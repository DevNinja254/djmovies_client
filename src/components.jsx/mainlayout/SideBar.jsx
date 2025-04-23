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
// import { SiFoursquarecityguide as Guide } from "react-icons/si";
const SideBar = () => {
  return (
    <div className='h-full bg-gray-800 side'>
      <div className='p-3 gap-1 grid'>
        <NavLink className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row " to='/'>
            <Movie size={13}/>
            <p className='font-bold'>Movies</p>
        </NavLink>
        <NavLink  className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row" to='/deejays'>
            <Dj size={13}/>
            <p className='font-bold'>DJ/s</p>
        </NavLink>
        <NavLink to='/genre'  className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row">
            <Category size={13}/>
            <p className='font-bold'>Genre</p>
        </NavLink>
        <NavLink to='/contact' className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row">
            <Contact size={13}/>
            <p className='font-bold'>Contact</p>
        </NavLink>
        <NavLink to='/about' className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row">
            <About size={13}/>
            <p className='font-bold'>About US</p>
        </NavLink>
      </div>
      <div className='p-3 grid gap-1 border-gray-500 border-t '>
        <h2 className='text-white text-opacity-60 textMidSm my-2 hover:text-white text-center font-bold'>Extra links</h2>
        <NavLink className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row " to='/cart'>
              <Cart size={13}/>
              <p className='font-bold'>Cart</p>
        </NavLink>
        <NavLink className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row " to='/account'>
              <Account size={13}/>
              <p className='font-bold'>Account</p>
        </NavLink>
        <NavLink className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row " to='/notifications'>
              <Notification size={13}/>
              <p className='font-bold'>Notification</p>
        </NavLink>
        <NavLink className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row " to='/guide'>
              <Guide size={13}/>
              <p className='font-bold'>Guide</p>
        </NavLink>
        <NavLink className="flex  flex-col items-center text-white text-opacity-60 textMidSm my-2 hover:text-white sm:gap-2 sm:flex-row " to='/deposit'>
              <PiHandDepositFill size={13}/>
              <p className='font-bold'>Deposit</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
