import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import api, { config } from '../../assets/js/api'
import Loader from '../../ui/Loader'

const Login = ({settingLoading, isLoading}) => {
    const [errors, setError] = useState([])
    const [logging, setLogging] = useState(false)
    const [progres, setProgress] = useState(10)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const handleSubmit= async (e) => {
        setProgress(5)
        setLogging(true)
        settingLoading(true)
        e.preventDefault();
        try {
            const res = await api.post("/login/", formData, {
                ...config,
                onDownloadProgress: (progressEvent) => {
                    const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percentageCompleted)
                    // console.log(percentageCompleted)
                  }
            })
            const data = await res.data
            // console.log(data)
            localStorage.setItem("admin", data.is_staff)
            localStorage.setItem("authorized", true)
            localStorage.setItem("auth_refresh", data.tokens.refresh)
            localStorage.setItem("auth", data.tokens.access)
            localStorage.setItem("myList", JSON.stringify(data.purchase))
            localStorage.setItem("user", JSON.stringify(data.username))
            localStorage.setItem("pic_url", JSON.stringify(`https://admin.flixshow.xyz${data.profile.profile_pic}`))
            const ownTitles = []
            for (const tite of data.purchase) {
                ownTitles.push(tite.video_name)
            }
            localStorage.setItem("myListTitles", JSON.stringify(ownTitles))
            settingLoading(false)
            setTimeout(()=> {
                navigate("/")
              }, 500)
            
        }catch(error) {
            settingLoading(false)
            setLogging(false)
        settingLoading(false)
            console.log(error)
            if(error.response.data) {
                console.log(error.response.data)
                for (const err in error.response.data) {
                    setError(error.response.data[err][0])
                }

            }
        }
    }  
    const handleChange = (e) => {
        setError("")
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
    })
    }
  return (
    <div className='bg-white m-3 rounded-sm p-4'>
        {logging ? <Loader progres={progres}/> : null}
        <h3 className='text-lg my-2 text-slate-600 font-bold'>Login</h3>
        <p className='textMidSm capitalize text-red-700 px-2 '>{errors}</p>
        <form onSubmit={handleSubmit} className='md:grid md:grid-cols-2'>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
                <label  className="block textMidSm text-gray-600 mt-2" htmlFor="email">Email</label>
                <input type="email" disabled={logging}  className='textMidSm p-1 rounded-sm  border block w-full outline-none bg-white text-gray-600' name='email' id='email' onChange={handleChange}/>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
                <label  className="block textMidSm text-gray-600 mt-2" htmlFor="password">Password</label>
                <input type="password"  className='textMidSm p-1 rounded-sm  border block w-full outline-none bg-white text-gray-600' disabled={logging} name='password' id='password' onChange={handleChange} />
            </div>
            
            <div className='col-span-2'>
                {/* <NavLink to="/account/password_reset" className='my-3 text-sm text-sky-500 font-bold hover:cursor-pointer '>Forgot your password?</NavLink> */}
                <div >
                <button disabled={logging} className={`bg-sky-700 block w-full p-2 rounded-sm text-white font-bold hover:opacity-85' type='submit ${isLoading ? "opacity-50": null}`}>{logging ? 'signing in...' : 'sign in'}</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login
