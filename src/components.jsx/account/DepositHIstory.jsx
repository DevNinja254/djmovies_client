import React, { useEffect, useState } from 'react'
// import api, { config } from "../../js/api"
const DepositHistory = () => {
    const [datas, setData] = useState([])
    useEffect(() => {
     const history = sessionStorage.getItem("deposit_history")
     if(history) {
     
      setData(JSON.parse(history))
     }
    }, [])
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
        <h1 className='text-center py-2 font-mono bg-slate-800 '>Deposit History</h1>
        {datas.map((data, index) => (
            index % 2 == 0 ? <div className='grid grid-cols-2 justify-between p-2 bg-slate-800 bg-opacity-80 text-sm font-mono' key={index}>
            <p>Ksh, {data.amount}</p>
            <p>{convertTimestampToDateTime(data.time)}</p>
          </div> :
           <div key={index} className='grid grid-cols-2 justify-between p-2 bg-slate-800 text-sm font-mono'>
           <p>Ksh, {data.amount}</p>
           <p>{convertTimestampToDateTime(data.time)}</p>
         </div>
        ))}
      
     
    
    </div>
  )
}

export default DepositHistory
