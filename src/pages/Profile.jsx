import React, {useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Account from '../layout/Account'
import AccountDetails from '../components.jsx/account/AccountDetails'
import AccountEdit from '../components.jsx/account/AccountEdit'
import api from '../assets/js/api'
import { BounceLoader } from 'react-spinners';
import ClipLoader from "react-spinners/ClipLoader";
const Profile = () => {
  const navigate = useNavigate()
  const [updating, setUpdating] = useState(false)
  const [depositHistory, setDepositHistory] = useState([])
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  const setttingUpdating = (value) => {
   setUpdate(value)
}
  const fetchUser = async(token) => {
    setLoading(true)
    const config = {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    }
    try {
      const response = await api.get("/info", config)
      const data = await response.data
      setDepositHistory(data.deposit_history)
      setPurchaseHistory(data.purchase)
      setUserData(data)
      setLoading(false)
      sessionStorage.setItem("deposit_history", JSON.stringify(data.deposit_history))
      sessionStorage.setItem("purchase", JSON.stringify(data.purchase))
      localStorage.setItem("ownVideo", JSON.stringify(data.purchase))
      const ownTitles = []
      for (const tite of data.purchase) {
        ownTitles.push(tite.video_name)
      }
      localStorage.setItem("own", JSON.stringify(ownTitles))
      // console.log(data)
    } catch(e) {
      navigate("/account/authenticate")
    }finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("auth")
    if (token) {
      fetchUser(token)
    } else {
      navigate("/account/authenticate")
    }
  }, [update])
  return (
    <Account>
      {loading ? <div className='h-40 grid place-content-center'>
      <ClipLoader
        color={"gray"}
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    : 
      <div className='lg:w-5/6 mx-auto 2xl:w-1/2'>
        <div className='text-sky-600 flex flex-col items-center my-5 gap-2'>
          <figure>
              <img className='profilePic block border-2 border-gray-600 border-opacity-30' src={(userData.profile.profile_pic)} alt="" />
          </figure>
          <nav className=' flex gap-3 text-sm font-bold font-mono tracking-wide hover:cursor-pointer'>
              <NavLink to="/account/deposit">Deposit</NavLink>
              <p>|</p>
              <p onClick={() => {
                  update ? setUpdate(false):setUpdate(true)
              }} className='hover:cursor-pointer'>{update ? "Cancel...": "Update"}</p>
          </nav>
        </div>
        <div>
          {!update ? <AccountDetails userData={userData}/> : <AccountEdit  setttingUpdating={setttingUpdating} userData={userData}/>}
        </div>
      </div>}
    </Account>
  )
}

export default Profile
