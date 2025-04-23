import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom'
import { BarLoader as Spinner } from 'react-spinners'
import api, { config } from "../assets/js/api"
const ForgotPasswordForm = () => {
const [erro, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [display, setDisplay] = useState(false)
  const [formData, setFormData] = useState({
        "email": "",
  }) 
  const handleSubmit= async (e) => {
    window.scrollTo(0,0)
    setDisplay(false)
    setError(false)
    setSubmitting(true)
    e.preventDefault();
    // console.log(formData)
    const data = {
      email: formData.email,
    }
    try {
      const res = await api.post('/password_reset/request/', data, config)
        // console.log(res.data)
          setSubmitting(false)
          setSubmitted(true)
    } catch(error) {
        setSubmitting(false)
        // console.log(error)
        setError(true)
    }
  }
  const handleChange = (e) => {
    setDisplay(false)
    setError(false)
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    window.scrollTo(0,0)
    document.title = "Password | reset"
  }, [])
  if (submitted) {
    // console.log("sumitted")
    setTimeout(() => {
      setSubmitted(false)
      setDisplay(true)
    }, 4000)
  }
  return (
    <div>
                
        {/* stk sent */}
        {submitted ? <p className='fixed top-1 right-1 z-20 bg-green-600 text-white p-2 text-sm rounded-md font-bold'>Password reset link sent.</p>:null}
        {/* error processing */}
        {erro ? <p className='fixed top-1 right-1 z-20 bg-red-600 text-white p-2 text-sm rounded-md font-bold'>Error! sending email. Try again.</p>:null}
        {display ? <p className='my-2 bg-red-700 bg-opacity-15 text-green-700 p-2 text-center text-sm font-bold rounded-md'>
            Check your email for Password reset link.
        </p>:null}
      <div className='bg-white m-3 rounded-sm p-4'>
        <h2 className='text-lg my-2 text-slate-600 font-bold'>Reset Forgot Password.</h2>
        
      <form onSubmit={handleSubmit}>
        <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
          <label  className="block text-sm my-2" htmlFor="email">Email</label>
          <input type="email"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='email' autoFocus  value={formData.email} required={true} onChange={handleChange}/>
        </div>
        <div>
            <button  className={` bg-sky-600  w-full p-2 rounded-sm text-white font-bold hover:opacity-85 block mt-2`} type='submit' disabled={submitting} onSubmit={handleSubmit}>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}


export default ForgotPasswordForm;