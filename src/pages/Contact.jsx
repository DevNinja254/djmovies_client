import React, { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import { FaLocationDot as Location} from "react-icons/fa6";
import { IoCallOutline as Call} from "react-icons/io5";
import { MdOutlineMailOutline as Email } from "react-icons/md";
import api, { config } from '../assets/js/api';
import Loader from '../ui/Loader';
const Contact = () => {
    const [progres, setProgress] = useState(10)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const[submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState(false)
    const [email, setEmail] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: '',
        message: ""
    })
    const handleChange= (e) => {
        // console.log(e.target.name)
        setFormData(
            {
                ...formData,
                [e.target.name] : e.target.value,
            }
        )
    }
    const handleSubmit = async(e) => {
        setError(false)
        setSubmitting(true)
        e.preventDefault()
        if(formData.email.length < 3) {
            setEmail(true)
            setSubmitting(false)
        } else if(formData.message < 5){
            setMessage(true)
            setSubmitting(false)
        } else {
            try {
                api.post("/message/",formData, {
                    ...config,
                    onDownloadProgress: (progressEvent) => {
                      const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                      setProgress(percentageCompleted)
                      // console.log(percentageCompleted)
                    }
                  })
                  .then(res => {
                   setSubmitted(true)
                   setSubmitting(false)
                    
                  })
            }catch {
                setError(true)
            }
        }
    }
    useEffect(() => {
        // window.scrollTo({top:0, left:0, behavior:"instant"})
    })
    if(error | submitted) {
        setTimeout(() => {
            setError(false)
            setSubmitted(false)
        }, 6000)
    }
  return (
    <MainLayout>
        {submitting ? <Loader progres={progres}/> : null}
        {error ? <p className='fixed top-2 right-2 bg-red-600 text-white font-bold textMidSm p-2 rounded-sm'>Error! loading results.</p> : null}
       { submitted ? <p className='fixed top-2 right-2 bg-green-600 text-white font-bold textMidSm p-2 rounded-sm z-20'>message sent successful</p> : null}
        <div className='bg-white bg-opacity-15'>
            <div className='text-center my-3 pt-6 sm:w-5/6 mx-auto'>
                <h1 className='text-4xl   capitalize my-4 text-white '>Get in touch</h1>
                <p className='text-gray-200 opacity-90   text-center text-sm'>Lights, camera, connection! Reach out with your questions, feedback, or casting calls. We're all ears behind the scenes. </p>
            </div>
            <div className='mx-4 bg-gray-100 lg:bg-opacity-10 grid place-content-center p-3 rounded-md textBlue gap-7 my-5 lg:flex lg:items-center lg:justify-evenly lg:my-10 sm:w-5/6 sm:mx-auto'>
                <div className='py-4 m-2 lg:bg-gray-100 bg-opacity-70 lg:p-10 rounded-md '>
                    <div className='grid place-content-center w-full font-bold '><Location size={34}/></div>
                    <p className='mt-5 text-center text-sm capitalize  text-gray-900 font-bold mb-2'>djmovies.com</p>
                    <p className='text-sm text-center text-gray-700'>Movies online, anytime. Your next favorite film is just a click away.</p>
                </div>
                <div className='py-4 mt-3 lg:bg-gray-100 bg-opacity-70 lg:p-10 rounded-md'>
                    <div className='grid place-content-center w-full font-bold '><Call size={34}/></div>
                    <p className='mt-5 text-center text-sm capitalize  text-gray-900 font-bold mb-2'>+2547 1393 4480</p>
                    <p className='text-sm text-center text-gray-700'>Stream, discover, and immerse yourself in the world of cinema.</p>
                </div>
                <div className='py-4 mt-3 lg:bg-gray-100 bg-opacity-70 lg:p-10 rounded-md'>
                    <div className='grid place-content-center w-full font-bold '><Email size={34}/></div>
                    <p className='mt-5 text-center text-sm capitalize  text-gray-900 font-bold mb-2'>info@example.com</p>
                    <p className='text-sm text-center text-gray-700'>Join the movie conversation! Discover, discuss, and connect with a community of film lovers.</p>
                </div>
            </div>
            <div className='lg:w-4/5 2xl:p-10 lg:m-auto lg:bg-gray-50 lg:bg-opacity-15 lg:p-7 lg:mb-3 rounded-md sm:w-5/6 sm:mx-auto'>
                <div className='m-4 my-10 text-center borderGrayB pb-10 lg:my-16'>
                    <p className='text-4xl capitalize mb-2 text-white'>Send us</p>
                    <p className='text-sm  md:text-md text-gray-200'>Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.</p>
                </div>
                <form  className='mx-4 my-5 pt-3 text-gray-100' onSubmit={handleSubmit}>
                    <div className='lg:grid grid-cols-2 gap-4 '>
                        <div>
                            <label className="block text-sm py-2" htmlFor="Name">Name</label>
                            <input className='block bg-gray-500 w-full py-2 rounded-md bg-opacity-10 outline-none text-gray-300 px-2' type="text" name='name' value={formData.name} onChange={handleChange} disabled={submitting}/>
                            </div>
                        <div>
                            <label className="block text-sm py-2" htmlFor="email">Email <span className='text-red-500'>*</span></label>
                            {email ? <span className='text-red-500 textMidSm'>Email required!</span> : null}
                            <input className='block bg-gray-500 w-full py-2 rounded-md bg-opacity-10 outline-none text-gray-300 px-2' type="email" required name="email" value={formData.email} onChange={handleChange} disabled={submitting}/>
                        </div>
                    </div>
                    <label className="block text-sm py-2" htmlFor="number">Phone Number</label>
                    <input className='block bg-gray-500 w-full py-2 rounded-md bg-opacity-10 outline-none text-gray-300 px-2' type="number" required name="phone_number" value={formData.phone_number} onChange={handleChange} disabled={submitting}/>
                    <label className="block text-sm py-2" htmlFor="message">Your Message <span className='text-red-500'>*</span></label>
                    {message ? <span className='text-red-500 textMidSm'>Message required!</span> : null}
                    <textarea name="message" required id="messade" rows={5} className='block bg-gray-500 w-full py-2 rounded-md bg-opacity-10 outline-none text-gray-300 px-2' value={formData.message} onChange={handleChange} disabled={submitting}></textarea>
                    <button className={`mt-2 bgBlue smMidText text-white font-bold p-3 rounded-md hover:opacity-90 textMidSm ${submitting ? "opacity-80" : "opacity-100"}`} disabled={submitting} onClick={handleSubmit}>{submitting ? "Sending message..." : "Send Message"}</button>
                </form>
            </div>
        </div>
    </MainLayout>
  )
}

export default Contact
