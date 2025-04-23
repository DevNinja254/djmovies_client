import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import { TypeAnimation } from 'react-type-animation'
import { useNavigate } from 'react-router-dom'
import { BarLoader as Spinner } from 'react-spinners'
import Form from '../layout/Form'
import Footer from '../ui/Footer'
import api, { config } from '../assets/js/api'
import MainLayout from '../layout/MainLayout'
import Loader from '../ui/Loader'

const Deposit = () => {
  const [progres, setProgress] = useState(10)
  const [submitting, setSubmitting] = useState(false)
  const [proid, setProid] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [erro, setError] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const [authenticated, setAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
        "amount": 1,
        "phone_number":"",
  }) 
  const handleSubmit= async (e) => {
    setError(false)
    setProgress(10)
    window.scrollTo(0,0)
    setSubmitting(true)
    e.preventDefault();
    // console.log(formData)
    const data = {
      phone_number: formData.phone_number,
      amount: formData.amount,
      username: userData.profile.buyerid
    }
    try {
      console.log("deposited")
      const res = await api.post('/deposit/', data, {
        ...config,
        onDownloadProgress: (progressEvent) => {
          const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentageCompleted)
          // console.log(percentageCompleted)
        }
      })
      // console.log(res.data)
      if(res.data.success) {
          
          setSubmitted(true)
          setTimeout(()=> {
            setSubmitting(false)
          }, 1000)
      }else {
          setSubmitting(false)
          setError(true)
          // console.log("process failed")
      }
    } catch(error) {
        setSubmitting(false)
        setError(true)
        // console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }
  const fetchUserData = async(token) => {
    const configer = {
      headers : {
          "Authorization" : `Bearer ${token}`
      }
      }
      try {
      api.get("/info/", configer)
      .then(res => {
          const dataProfile = res.data
          setUserData(dataProfile)
          
      })} catch(error) {
        navigate("/account/authenticate")
          console.log(error)
      }
  }
  useEffect(() => {
    const token = localStorage.getItem("auth")
    const authorized = localStorage.getItem("authorized")
      if (authorized == "true"){
        if(token) {
          fetchUserData(token)
        } else {
          navigate("/account/authenticate")
        }
    }else {
      navigate("/account/authenticate")
    }       
}, [])
  if (submitted) {
    // console.log("sumitted")
    setTimeout(() => { 
      setSubmitted(false)
    }, 7000)
  }
  return (
    <MainLayout>
      {submitting ? <Loader progres={progres}/> : null}
        {/* stk sent */}
        {submitted ? <p className='fixed top-1 right-1 z-20 bg-green-600 text-white p-2 text-sm rounded-md font-bold'>Enter your Mpesa pin to complete transaction.</p>:null}
        {/* error processing */}
        {erro ? <p className='fixed top-1 right-1 z-20 bg-red-600 text-white p-2 text-sm rounded-md font-bold'>Error! processing transaction. Try again.</p>:null}
      <main className={`m-6 py-2 autheticate ${submitting ? "opacity-50" : "opacity-100"}`}>
        <h2 className='text-lg my-2 text-slate-600 font-bold'>Mpesa Payment</h2>
        <div>
            <p className='border-b-2 border-b-gray-600 border-opacity-15 text-sm textBlue font-bold'>Instructions</p>
            <div className="block textMidSm text-gray-600 mt-2">
                <TypeAnimation
                style={{ whiteSpace: 'pre-line', height: 'fit-content', display: 'block' }} 
                    sequence={[
                        `- On the amount section, Enter amount in number you want to deposit. e.g 200.\n- Enter your safaricom phone number which you want to deposit from.\n- Check again to verify data entered is correct.\n- Click on deposit.\n- On your phone where the line of number you entered is active, mpesa prompt will appear asking for your mpesa pin.\n- Enter your pin to complete transaction.\n- Once done, check on your account profile, or deposit history to confirm you transaction was sucessful.\n`,
                        500,
                    ]}
                    html={true}
                    wrapper='p'
                    className="block textMidSm text-gray-600 mt-2"
                    speed={200}
                />
              </div> 
        </div>
      <form onSubmit={handleSubmit}>
            <label  className="block textMidSm text-gray-600 mt-2" htmlFor="amount">Amount</label>
            <input type="number"   className='textMidSm p-1 rounded-sm  border block w-full outline-none bg-white text-gray-600' name='amount'  value={formData.amount} required={true} onChange={handleChange}/>
            <label  className="block textMidSm text-gray-600 mt-2" htmlFor="number">Phone Number</label>
            <input type="number"   className='textMidSm p-1 rounded-sm  border block w-full outline-none bg-white text-gray-600' name='phone_number' required={true} value={formData.phone_number} onChange={handleChange}/>
            <div>
            <button  className={` bgBlue  w-full p-2 rounded-sm text-white font-bold hover:opacity-85 block mt-2`} type='submit' disabled={submitting} onSubmit={handleSubmit}>{submitting ? 'Sending stk...' : "Deposit"}</button>
            </div>
        </form>
      </main>
    </MainLayout>
  )
}

export default Deposit
