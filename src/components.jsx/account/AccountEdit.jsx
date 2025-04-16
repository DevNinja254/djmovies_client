import React, { useState } from 'react'
import api, {config} from "../../assets/js/api"
const AccountEdit = ({setttingUpdating, userData}) => {
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmmiting] = useState(false)
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
         const res1 = await api.patch(`/members/${userData.id}/`, {
          email: formData.email,
          username: formData.username,
        }, config)
        const data1 = res1.data
        // console.log(data1)
        // profile
        const res2 = await api.patch(`/profile/${userData.profile.buyerid}/`, formDat, config)
        const data2 = res2.data
        setttingUpdating(false)
       } catch(error) {
        setError(Object.values(error.response.data))
        setSubmmiting(false)
       }
 
    }
  return (
    <form className={`text-white m-3 border-2 border-gray-500 border-opacity-20 rounded-md ${submitting ? "opacity-70" : "opacity-100"}`} onSubmit={handleSubmit}>
      <div className='text-red-500 text-sm capitalize px-2 font-bold'>
        {error.map((err, index) => (
          <p key={index}>{err}</p>
        ))}
      </div>
      {userData.username.length > 2 ? null : <div className={`grid grid-cols-2 justify-between p-2 bg-slate-800 text-sm font-mono`}>
        <p>Username</p>
        <input type='text' name='username' value={formData.username} autoFocus className='outline-none bg-transparent' onChange={handleChange}/>
      </div>}
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 bg-opacity-80 text-sm font-mono'>
        <p>Email</p>
        <input type='email' disabled={submitting} name='email' value={formData.email} className='outline-none bg-transparent' onChange={handleChange}/>
      
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 text-sm font-mono'>
        <p>Phone number</p>
        <input type='number' disabled={submitting} name='phone_number' value={formData.phone_number} className='outline-none bg-transparent' onChange={handleChange}/>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 bg-opacity-80 text-sm font-mono'>
        <p>country</p>
        <input type='text' disabled={submitting} name='country' value={formData.country} className='outline-none bg-transparent' onChange={handleChange}/>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 text-sm font-mono'>
        <p>city</p>
        <input type='text' disabled={submitting} name='city' value={formData.city} className='outline-none bg-transparent' onChange={handleChange}/>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 bg-opacity-80 text-sm font-mono'>
        <p>Profile Image</p>
        <input type='file' disabled={submitting} name='profile_image' value={formData.profile_pic} className='outline-none bg-transparent' onChange={handleImageChange}/>
        {imageFile && (
          <div className='flex gap-2'>
            <img src={URL.createObjectURL(imageFile)} alt='preview' className='w-10 h-10 rounded-full'/>
            <p>{imageFile.name}</p>
          </div>
        )}
      </div>
      <button className='bg-slate-600 text-white m-3 text-sm p-2 rounded-md' disabled={submitting} onClick={handleSubmit}>{submitting ? "Submitting..." : "Submit"}</button>
    </form>
  )
}

export default AccountEdit
