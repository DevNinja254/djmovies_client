
import React, {useState} from 'react'
import api, { config } from '../../assets/js/api'
import { GrView as View } from "react-icons/gr";
import { BiHide as Hide} from "react-icons/bi";
import Loader from '../../ui/Loader';
const Register = () => {
    const [errors, setError] = useState([])
    const [logging, setLogging] = useState(false)
    const [progres, setProgress] = useState(10)

    const [pwdMatch, setPwdMatch] = useState()
    const [created, setCreated] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [formData, setFormData] = useState({
        "username": "",
        "email":"",
        "password1":"",
    }) 
    const handleSubmit= async(e) => {
        window.scrollTo(0,0)
        setLogging(true)
        e.preventDefault();
        const resData = {
           "username": formData.username,
            "email": formData.email,
            "password1": formData.password1,
            "password2": formData.password1,
        }
        try {
            const res = await api.post("/register/", resData, {
                            ...config,
                            onDownloadProgress: (progressEvent) => {
                                const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                setProgress(percentageCompleted)
                                // console.log(percentageCompleted)
                              }
                        })
            const data = await res.data
            // console.log(res.data)
            setLogging(false)
            setCreated(true)
            
            console.log("registered")
        } catch(error) {
            console.log(error)
            setLogging(false)
            if(error.response.data) {
                console.log(error.response.data)
                for (const err in error.response.data) {
                    setError(errors => [...errors, error.response.data[err][0]])
                }

            }
        }
        
    }
    const handleChange = (e) => {
        setError([])
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
    })
    }
    const settingShow = () => {
        // console.log(showPwd)
        setShowPwd(!showPwd)
    }
  return (
    <div className='bg-white m-3 rounded-sm p-4 relative'>
        {created ? <p className='bg-green-600 text-white font-bold textMidSm p-2 absolute top-0 left-0 rounded-sm'>Account created sucessfull.</p> : null}
        {logging ? <Loader progres={progres}/> : null}
        <h3 className='text-lg my-2 text-slate-600 font-bold'>Create Account.</h3>
        <div className='textMidSm text-red-700 capitalize my-2'>{errors.map((erro, index) => (
            <p>{erro}</p>
        ))}</div>
        <form onSubmit={handleSubmit} className='md:grid md:grid-cols-2'>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
                <label className="block textMidSm text-gray-600 mt-2" htmlFor="username">Username</label>
                <input type="text"  className='textMidSm p-1 rounded-sm  border block w-full outline-none bg-white text-gray-600' disabled={logging} name='username'  value={formData.username} required={true} onChange={handleChange}/>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
                <label className="block textMidSm text-gray-600 mt-2" htmlFor="email">Email</label>
                <input type="email" disabled={logging} className='textMidSm p-1 rounded-sm  border block w-full outline-none bg-white text-gray-600' name='email' required={true} value={formData.email} onChange={handleChange}/>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
                <label className="block textMidSm text-gray-600 mt-2" htmlFor="password">Password</label>
                <div className='bg-white w-full py-2 px-1 pr-2 rounded-sm  text-gray-600 flex justify-between items-center gap-3 border'>
                    <input type={`${showPwd ? "text": "password"}`} disabled={logging}  className='textMidSm p-1 rounded-sm   block w-full outline-none bg-white text-gray-600' name='password1' required={true}  value={formData.password1} onChange={handleChange} />
                    <div onClick={settingShow}>
                    {showPwd ? <View   size={20}/> : <Hide size={20} />}
                    </div>
                
                </div>
                <p className='opacity-70 text-sm py-2 '>Password must be at least 8 characters</p>
            </div>
           
            {/* <label  className="block text-sm my-2" htmlFor="confirmpwd">Confirm Password</label>
            <input  type="password"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" disabled={isLoading} name='password2' required={true}  value={formData.password2} onChange={handleChange}/>
            {
              change ? pwdMatch ? <p className='text-green-600 text-sm font-bold'>Password Match</p> : <p className='text-red-600 smMidText font-bold text-sm '>Password don't match.</p> : null
            } */}
            <p className='my-3 text-sm fontNewTimes tracking-wider text-gray-800 col-span-2'>Your personal data will be used to support your experience throughout this website, to manage access to your account and for other purposes described in our privacy policy.</p>
            <div className='col-span-2'>
                <button  className={`${logging ? "opacity-65": "opacity-100"} bg-sky-600 block w-full p-2 rounded-sm text-white font-bold hover:opacity-85`} type='submit' disabled={logging}>{logging ? "creating account..." : "Create"}</button>
            </div>
        </form>
     </div>
  )
}

export default Register
