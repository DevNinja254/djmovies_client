import React, { useState } from 'react'
import api, {config} from "../../assets/js/api"
import Loader from '../../ui/Loader';

const AccountSetting = ({userData, updateUserData, settUpdated}) => {
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmmiting] = useState(false)
    const [progresMember, setProgressMember] = useState(10)
    const [progresProfile, setProgressProfile] = useState(10)
    const [error, setError] = useState([])
    const handleImageChange = (e) => {
      setImageFile(e.target.files[0]);
    };
    const [formData, setFormData] = useState({
        "username": userData.username,
        "email":userData.email,
        "phone_number": userData.profile.phone_number,
        country:  userData.profile.country,
        city:  userData.profile.city,
        profile_pic: "",
    })
    const handleChange = (e) => {
        setError([])
        setFormData({
            ...formData,
            [e.target.name] :e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        setProgressProfile(5)
        setProgressMember
        e.preventDefault()
        setSubmmiting(true)
        const formDat = new FormData()
        formDat.append("phone_number", formData.phone_number)
        formDat.append("username", formData.username)
        formDat.append("country", formData.country)
        formDat.append("city", formData.city)
        if (imageFile) {
          // console.log("update")
          formDat.append("profile_pic", imageFile)
        }
       try {
         // console.log(formData)
         
        // console.log(data1)

        // profile
        api.patch(`/profile/${userData.profile.buyerid}/`, formDat, {
          ...config,
          onDownloadProgress: (progressEvent) => {
            const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgressProfile(percentageCompleted)
            // console.log(percentageCompleted)
          }
        })
        .then(response => {
          api.patch(`/members/${userData.id}/`, {
            email: formData.email,
            username: formData.username,
          }, {
            ...config,
            onDownloadProgress: (progressEvent) => {
              const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setProgressMember(percentageCompleted)
              // console.log(percentageCompleted)
              
            }
          })
         .then(res => {
          const data1 =  res.data
          localStorage.setItem("user", JSON.stringify(data1.username))
          localStorage.setItem("pic_url", JSON.stringify(data1.profile.profile_pic))
          updateUserData(data1)
          settUpdated(true)
          setSubmmiting(false)
         })
        })
        
       } catch(error) {
        setError(Object.values(error.response.data))
        setSubmmiting(false)
       }
 
    }
  return (
    <div className='bg-white m-3 rounded-sm p-4'>
      {submitting ? <Loader progres={(progresMember + progresProfile) / 2}/> : null}
      <h3 className='text-lg my-2 text-slate-600 font-bold'>AccountSetting</h3>
      <div className='text-red-500 text-sm capitalize px-2 font-bold'>
        {error.map((err, index) => (
          <p key={index}>{err}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='md:grid md:grid-cols-2'>
      {userData.username.length > 2 ? null :<div className=' p-2 text-sm font-mono capitalize text-gray-600'>
        <p>Username</p>
        <input type='text' name='username' value={formData.username}  className='textMidSm p-1 rounded-sm  border block w-full outline-none' onChange={handleChange}/>
      </div>}
      <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
        <p>Email</p>
        <input type='email' autoFocus disabled={submitting} name='email' value={formData.email} className='textMidSm p-1 rounded-sm  border block w-full outline-none' onChange={handleChange}/>
      
      </div>
      <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
        <p>Phone number</p>
        <input type='number' disabled={submitting} name='phone_number' value={formData.phone_number} className='textMidSm p-1 rounded-sm  border block w-full outline-none' onChange={handleChange}/>
      </div>
      <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
        <p>country</p>
        <input type='text' disabled={submitting} name='country' value={formData.country} className='textMidSm p-1 rounded-sm  border block w-full outline-none' onChange={handleChange}/>
      </div>
      <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
        <p>city</p>
        <input type='text' disabled={submitting} name='city' value={formData.city} className='textMidSm p-1 rounded-sm  border block w-full outline-none' onChange={handleChange}/>
      </div>
      <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
        <p>Profile Image</p>
        <input type='file' disabled={submitting} name='profile_image' value={formData.profile_pic} className='textMidSm p-1 rounded-sm  border block w-full outline-none' onChange={handleImageChange}/>
        {imageFile && (
          <div className='flex gap-2'>
            <img src={URL.createObjectURL(imageFile)} alt='preview' className='w-10 h-10 rounded-full'/>
            <p>{imageFile.name}</p>
          </div>
        )}
      </div>
      <button className='bg-slate-600 text-white m-3 text-sm p-2 rounded-md' disabled={submitting} onClick={handleSubmit}>{submitting ? "Submitting..." : "Submit"}</button>
    </form>
    </div>
  )
}

export default AccountSetting
