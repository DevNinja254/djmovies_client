import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import { TypeAnimation } from 'react-type-animation'
import { useNavigate } from 'react-router-dom'
import { BarLoader as Spinner } from 'react-spinners'
import Form from '../layout/Form'
import Footer from '../ui/Footer'
import api, { config } from '../assets/js/api'

const Deposit = () => {
  const [username, setUsername] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [proid, setProid] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [erro, setError] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const [authenticated, setAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
        "amount": 0,
        "phone_number":"",
  }) 
  const handleSubmit= async (e) => {
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
      const res = await api.post('/deposit/', data, config)
      console.log(res.data)
      if(res.data.success) {
          setSubmitting(false)
          setSubmitted(true)
          // setTimeout(()=> {
          //   navigate("/profile")
          // }, 1000)
      }else {
          setSubmitting(false)
          console.log("process failed")
      }
    } catch(error) {
        // setSubmitting(false)
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
    <Form>
      <Spinner
          color="rgba(0,0,0,0.3)"
          loading={submitting}
          cssOverride={{
            "width": "100%",
            "backgroundColor": "white"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* stk sent */}
        {submitted ? <p className='fixed top-1 right-1 z-20 bg-green-600 text-white p-2 text-sm rounded-md font-bold'>Enter your Mpesa pin to complete transaction.</p>:null}
        {/* error processing */}
        {erro ? <p className='fixed top-1 right-1 z-20 bg-red-600 text-white p-2 text-sm rounded-md font-bold'>Error! processing transaction. Try again.</p>:null}
      <main className={`m-6 py-2 autheticate ${submitting ? "opacity-50" : "opacity-100"}`}>
        <h2 className='text-center'>Mpesa Payment</h2>
        <div>
            <p className='border-b-2 border-b-gray-600 border-opacity-15'>Instructions</p>
            <div className=''>
                <TypeAnimation
                style={{ whiteSpace: 'pre-line', height: 'fit-content', display: 'block' }} 
                    sequence={[
                        `- On the amount section, Enter amount in number you want to deposit. e.g 200.\n- Enter your safaricom phone number which you want to deposit from.\n- Check again to verify data entered is correct.\n- Click on deposit.\n- On your phone where the line of number you entered is active, mpesa prompt will appear asking for your mpesa pin.\n- Enter your pin to complete transaction.\n- Once done, check on your account profile, or deposit history to confirm you transaction was sucessful.\n`,
                        500,
                    ]}
                    html={true}
                    wrapper='p'
                    className='my-3 text-sm fontNewTimes tracking-wide text-gray-800'
                    speed={200}
                />
              </div> 
        </div>
      <form onSubmit={handleSubmit}>
            <label  className="block text-sm my-2" htmlFor="amount">Amount</label>
            <input type="number"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='amount'  value={formData.amount} required={true} onChange={handleChange}/>
            <label  className="block text-sm my-2" htmlFor="number">Phone Number</label>
            <input type="number"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='phone_number' required={true} value={formData.phone_number} onChange={handleChange}/>
            <div>
            <button  className={` bg-sky-600  w-full p-2 rounded-sm text-white font-bold hover:opacity-85 block mt-2`} type='submit' disabled={submitting} onSubmit={handleSubmit}>Deposit</button>
            </div>
        </form>
      </main>
    </Form>
  )
}

export default Deposit
