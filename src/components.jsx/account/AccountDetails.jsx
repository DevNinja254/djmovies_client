import React, {useState, useEffect} from 'react'

const AccountDetails = ({userData}) => {
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
    <div className='text-white m-3 border-2 border-gray-300 border-opacity-20 rounded-md '>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 text-sm font-mono capitalize'>
        <p>Username</p>
        <p>{userData.username}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-800 bg-opacity-80 text-sm font-mono capitalize'>
        <p>Email</p>
        <p>{userData.email}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2   text-sm font-mono bg-slate-800'>
        <p>Phone number</p>
        <p>+254{userData.profile.phone_number}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-800 bg-opacity-80 text-sm font-mono capitalize'>
        <p>Account Balance</p>
        <p>Ksh. {userData.profile.account}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800  text-sm font-mono capitalize'>
        <p>Date_Joined</p>
        <p>{convertTimestampToDateTime(userData.date_joined)}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-800 bg-opacity-80 text-sm font-mono capitalize'>
        <p>country</p>
        <p>{userData.profile.country}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-800  text-sm font-mono capitalize'>
        <p>city</p>
        <p>{userData.profile.city}</p>
      </div>
    </div>
  )
}

export default AccountDetails
