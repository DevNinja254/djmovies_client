import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { FaLocationDot as Location} from "react-icons/fa6";
import { FaClipboardList as List } from "react-icons/fa";
import { FaCartShopping as Cart } from "react-icons/fa6";
import { FaUserCircle as Profil} from "react-icons/fa";
import { RiLuggageDepositFill as DepositHist } from "react-icons/ri";
import { PiHandDepositFill as Deposit } from "react-icons/pi";
import { IoMdSettings as Settings } from "react-icons/io";
import Profile from '../components.jsx/account/Profile'
import AccountSetting from '../components.jsx/account/AccountSetting';
import DepositHistory from '../components.jsx/account/DepositHIstory';
import PurchaseHistory from '../components.jsx/account/PurchaseHistory';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from "../ui/Loader"
import api from '../assets/js/api';
import { MdAdminPanelSettings as Admin} from "react-icons/md"

const Account = () => {
    const [activeLink, setActiveLink] = useState("profile")
    const [depositHistory, setDepositHistory] = useState([])
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [progres, setProgress] = useState(5)
    const [update, setUpdate] = useState(false)
    const [admin, setAdmin] = useState(false)
    const  [token, setToken] = useState('')
    const [errorL, setErrorL] = useState(false)
    const [logginOut, setLoggingOut] = useState(false)
    const  [refresh_token, setRefresh_Token] = useState('')
    const navigate = useNavigate()
    const fetchUser = async(token) => {
        setLoading(true)
        const config = {
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        }
        try {
          const response = await api.get("/info", {
            ...config,
            onDownloadProgress: (progressEvent) => {
              const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setProgress(percentageCompleted)
              // console.log(percentageCompleted)
            }
          })
          const data = await response.data
          setAdmin(data.is_staff)
          setDepositHistory(data.deposit_history)
          setPurchaseHistory(data.purchase)
          setUserData(data)
          
          sessionStorage.setItem("deposit_history", JSON.stringify(data.deposit_history))
          sessionStorage.setItem("purchase", JSON.stringify(data.purchase))
          localStorage.setItem("myList", JSON.stringify(data.purchase))
          const ownTitles = []
          for (const tite of data.purchase) {
            ownTitles.push(tite.video_name)
          }
          localStorage.setItem("myListTitles", JSON.stringify(ownTitles))
          setLoading(false)
        } catch(e) {
          navigate("/account/authenticate")
        }finally {
          setLoading(false)
        }
      }
      useEffect(() => {
        setErrorL(false)
          const toke = localStorage.getItem("auth")
          const refresh = localStorage.getItem("auth_refresh")
          if (toke) {
            fetchUser(toke)
            setToken(toke)
            setRefresh_Token(refresh)
          } else {
            navigate("/account/authenticate")
          }
        }, [])
        const updateUserData = (value) => {
          setUserData(value)
        }
        const settUpdated = (value) => {
          setUpdate(value)
          setActiveLink('profile')
        }
        setTimeout(() => {
          setUpdate(false)
        }, 2000)
        const signout = async() => {
          setLoggingOut(true)
          try {
            const response = await api.post("/logout/", {"refresh_token" : refresh_token}, {
              headers: {
                "Authorization": `Bearer ${token}`
              },
              onDownloadProgress: (progressEvent) => {
                const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgress(percentageCompleted)
                // console.log(percentageCompleted)
              }              
            })
            const data = response.data
            console.log(data)
          } catch(error) {
            setErrorL(true)
            
          } finally {
            localStorage.removeItem("admin")
            localStorage.removeItem("authorized")
            localStorage.removeItem("similar")
            localStorage.removeItem("auth_refresh")
            localStorage.removeItem("auth")
            localStorage.removeItem("myList")
            localStorage.removeItem("myListTitles")
            localStorage.removeItem("user")
            localStorage.removeItem("pic_url")
            localStorage.removeItem("deposit_history")
            localStorage.removeItem("purchase")
            sessionStorage.removeItem("toPlay")
            navigate("/account/authenticate")
          }
          
        }
  return (
    <MainLayout >
       <div className='bg-slate-800 bg-opacity-20 pb-1  ' style={{
        minHeight: "93vh"
       }}>  {loading | logginOut ? <Loader progres={progres}/> : null}
       {update ? <p className='fixed top-1 right-1 bg-green-600 textMidSm text-white font-bold p-2 rounded-md z-10'>Account updated successful</p> : null}
            <div className='bgBlue py-10 sm:flex items-end justify-between sm:px-3 sm:py-12'>
                <div className='sm:grid gap-1'>
                    <div className=' gap-1 sm:block'>
                        {loading ? "__________" : <p className='text-center text-2xl font-bold text-white block'> {userData.username},</p>}
                        {loading ? "__________" : <p className='text-center text-2xl font-bold text-white '>{userData.email}</p>}
                    </div>
                    <div className='flex items-center justify-center textMidSm text-white text-opacity-50 font-bold'>
                        <Location/>
                        {loading ? "________, ________": <p><span>{userData.profile.city}</span> <span>
                            {userData.profile.country}
                          </span></p>}
                    </div>
                </div>
                <div className='flex item-center justify-center'>
                    <button className='bg-white textMidSm p-2 my-2 rounded-md text-gray-600 font-bold' onClick={signout}>Signout</button>
                </div>
            </div>
          <div className='lg:grid grid-cols-4'>
              {/* links */}
              <div className='m-3 hover:cursor-pointer bg-white p-4 rounded-md textMidSm'>
                {admin ? <NavLink to="http://localhost:8000/admin" className={` text-opacity-90 p-2 rounded-md flex items-center gap-2 ${activeLink == "admin" ? 'bgBlue text-white': null}`} target='_blank' onClick={() => {
                    setActiveLink("admin")
                }}>
                    <Admin className={`${activeLink != "admin" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "admin" ? 'textBlue' : null}`}>Admin</p>
                </NavLink> : null}
                <div className={` text-opacity-90 p-2 rounded-md flex items-center gap-2 ${activeLink == "profile" ? 'bgBlue text-white': null}`} onClick={() => {
                    setActiveLink("profile")
                }}>
                    <Profil className={`${activeLink != "profile" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "profile" ? 'textBlue' : null}`}>Profile</p>
                </div>

                {/* cart */}
                <NavLink to="/cart" className={`hover:cursor-pointer text-opacity-90 p-2 rounded-md flex items-center gap-2 ${activeLink == "cart" ? 'bgBlue text-white': null}`} onClick={() => {
                    setActiveLink("cart")
                }}>
                    <Cart className={`${activeLink != "cart" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "cart" ? 'textBlue' : null}`}>Cart</p>
                </NavLink>
                {/* your list */}
                <div className={` text-opacity-90 p-2 hover:cursor-pointer rounded-md flex items-center gap-2 ${activeLink == "list" ? 'bgBlue text-white': null}`} onClick={() => {
                    setActiveLink("list")
                }}>
                    <List className={`${activeLink != "list" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "list" ? 'textBlue' : null}`}>Your List</p>
                </div>
                {/* deposit history */}
                <div className={` text-opacity-90 p-2 hover:cursor-pointer rounded-md flex items-center gap-2 ${activeLink == "deposit_hist" ? 'bgBlue text-white': null}`} onClick={() => {
                    setActiveLink("deposit_hist")
                }}>
                    <DepositHist className={`${activeLink != "deposit_hist" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "deposit_hist" ? 'textBlue' : null}`}>Deposit History</p>
                </div>
                {/* account setting */}
                <div className={` text-opacity-90 p-2 hover:cursor-pointer rounded-md flex items-center gap-2 ${activeLink == "setting" ? 'bgBlue text-white': null}`} onClick={() => {
                    setActiveLink("setting")
                }}>
                    <Settings className={`${activeLink != "setting" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "setting" ? 'textBlue' : null}`}>Account Setting</p>
                </div>
                <NavLink to="/deposit" className={` text-opacity-90 p-2 rounded-md flex items-center gap-2 ${activeLink == "cart" ? 'bgBlue text-white': null}`} onClick={() => {
                    setActiveLink("cart")
                }}>
                    <Deposit className={`${activeLink != "cart" ? 'text-gray-400' : null}`}/>
                    <p className={`${activeLink != "cart" ? 'textBlue' : null}`}>Deposit</p>
                </NavLink>
            </div>
            {loading ? null : <div className='col-span-3'>
                {activeLink == "profile" ? <Profile userData={userData}/>: null}
                {activeLink == "setting" ? <AccountSetting userData={userData} updateUserData={updateUserData} settUpdated={settUpdated}/>: null}
                {activeLink == 'list' ? <PurchaseHistory purchaseHistory={purchaseHistory}/> : null}
                {activeLink == 'deposit_hist' ? <DepositHistory depositHistory={depositHistory}/> : null}
            </div>}
          </div>
       </div>
    </MainLayout>
  )
}

export default Account
