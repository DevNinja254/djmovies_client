import React, { useEffect, useState } from 'react'
import Login from '../components.jsx/account/Login'
import Register from '../components.jsx/account/Register'
import { NavLink } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { BarLoader as Spinner } from 'react-spinners'
import Layout from '../layout/Layout'
import Form from '../layout/Form';
import MainLayout from '../layout/MainLayout';
import { SiGnuprivacyguard as Regist } from "react-icons/si";
import { IoLogInSharp as Signin } from "react-icons/io5";
import { MdOutlineLockReset as Reset } from "react-icons/md";
import ForgotPasswordForm from './ForgotpwdForm';
const Authetication = () => {
  const [link, setLink] = useState('login')
    const [login, setLogin] = useState(true)
    const [register, setRegister] = useState(false)
    const [account, setAccount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const settingLoading = (value) => {
      setIsLoading(value)
    }
    const settingRegister = (value, value1) => {
      setRegister(value)
      setLogin(value1)
    }
    useEffect(() => {
      window.scrollTo(0,0)
      document.title = "Authetication"
    }, [])
  return (
    <MainLayout>
        {/* <div className='' id='spinner' style={{
          "border": "0",
        }}>
          <Spinner
          color="rgba(0,0,0,0.3)"
          loading={isLoading}
          cssOverride={{
            "width": "100%",
            "backgroundColor": "white"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div> */}
          <div className='bg-slate-800 bg-opacity-20 p-3' style={{
        minHeight: "93vh"
       }}>
          {
          account ? <p className='text-center my-5 text-sm text-green-700 grid place-content-center'><span className='bg-red-400  w-fit p-3 px-4 bg-opacity-15 tracking-wider'>Account created successfull</span></p>: null
        }
            <div className='md:grid grid-cols-3 lg:w-11/12 lg:mx-auto xl:w-10/12 gap-3'>
              <div className='m-3 hover:cursor-pointer bg-white p-4 rounded-md textMidSm h-fit'>
                {/* login */}
                <div className={` text-opacity-90 p-2 rounded-md flex items-center gap-2 ${link == "login" ? 'bgBlue text-white': null}`} onClick={() => {
                      setLink('login')
                  }} >
                    <Signin className={`${link !== "login" ? 'text-gray-400' : null}`}/>
                    <p className={`${link !== "login" ? 'textBlue' : null}`}>login</p>
                </div>
                  {/* register */}
                  <div className={` text-opacity-90 p-2 rounded-md flex items-center gap-2 ${link == "register" ? 'bgBlue text-white': null}`} onClick={() => {
                      setLink('register')
                  }}>
                    <Regist className={`${link !== "register" ? 'text-gray-400' : null}`}/>
                    <p  className={`${link !== "register" ? 'textBlue' : null}`}>Register</p>
                  </div>
                  {/* forgot passoword */}
                  <div className={` text-opacity-90 p-2 rounded-md flex items-center gap-2 ${link == "reset" ? 'bgBlue text-white': null}`} onClick={() => {
                      setLink('reset')
                  }}>
                    <Reset className={`${link !== "reset" ? 'text-gray-400' : null}`}/>
                    <p  className={`${link !== "reset" ? 'textBlue' : null}`}>Forgot password</p>
                  </div>
              </div>
              <div className='col-span-2'>
                      {link == 'login' ? <Login settingLoading ={settingLoading} isLoading={isLoading}/> : null}
                      {link == 'register' ? <Register settingLoading ={settingLoading} isLoading={isLoading} settingRegister={settingRegister}/> :null}         
                      {link == 'reset' ? <ForgotPasswordForm/> : null}         
              </div>
            </div>
          </div>
        
    </MainLayout>
  )
}

export default Authetication
