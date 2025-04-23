import React from 'react'

const Profile = ({userData}) => {
  function convertTimestampToDateTime(timestampString) {
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className='bg-white m-3 rounded-sm p-4'>
        <h3 className='text-lg my-2 text-slate-600 font-bold'>Profile</h3>
        <div className='md:grid md:grid-cols-2'>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p className=''>Username</p>
              <p className='textMidSm p-1 rounded-sm  border'>{userData.username}</p>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p>Email</p>
              <p className='textMidSm p-1 rounded-sm  border'>{userData.email}</p>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p>Phone number</p>
              <p className='textMidSm p-1 rounded-sm  border'>+254{userData.profile.phone_number}</p>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p>Account Balance</p>
              <p className='textMidSm p-1 rounded-sm  border'>Ksh. {userData.profile.account}</p>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p>Date_Joined</p>
              <p className='textMidSm p-1 rounded-sm  border'>{convertTimestampToDateTime(userData.date_joined)}</p>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p>country</p>
              <p className='textMidSm p-1 rounded-sm  border'>{userData.profile.country}</p>
            </div>
            <div className=' p-2 text-sm font-mono capitalize text-gray-600'>
              <p>city</p>
              <p className='textMidSm p-1 rounded-sm  border'>{userData.profile.city}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile
