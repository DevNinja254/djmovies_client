import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BounceLoader } from 'react-spinners';
import api, { config } from '../../assets/js/api';
import Loader from '../../ui/Loader';
const PurchaseHistory = () => {
   const [progres, setProgres] = useState(4)
    const [datas, setData] = useState([])
     const [redirecting, setRedirecting] = useState(false)
     const navigate = useNavigate()
     const [error, setError] = useState(false)
    useEffect(() => {
      const history = sessionStorage.getItem("purchase")
      if(history) {
        setData(JSON.parse(history))
      } 
    }, [])
    const handleRedirect = async (vida) => {
      setError(false)
      setRedirecting(true)
      // console.log(vida)
      try {
        api.get(`/videoDetails/${vida}`, {
                ...config,
                onDownloadProgress: (progressEvent) => {
                  const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  setProgres(percentageCompleted)
                }
              })
      .then(res1 => {
        const data1 = res1.data
        sessionStorage.setItem("toPlay", JSON.stringify(data1))
          navigate(`/watch/${data1.vidId}/`)  
      })
      } catch {
        setRedirecting(false)
        setError(true)
      }
    }
    return (
      <div className='text-white m-3 border-2 border-gray-300 border-opacity-20 rounded-md '>
        {error ? <p className='bg-red-500 text-white font-bold text-sm p-2 rounded-md fixed bottom-2 left-2'>Failed to fetch video, Try again!</p>: null}
        {redirecting ? <Loader progres={progres}/> : null}
          <h1 className='text-center py-2 font-mono bg-slate-800'>Purchase History</h1>
          {datas.map((data, index) => (
              index % 2 == 0 ? <div className='grid grid-cols-3 justify-between p-2 bg-slate-800 bg-opacity-80 text-sm font-mono' key={index}>
                <div className="text-sky-400 font-bold overflow-hidden hover:cursor-pointer hover:opacity-80" onClick={() => {
              handleRedirect(data.video_id)
             }}>{data.video_name}</div>
              <p>Ksh, {data.price}</p>
              <p>{data.purchase_time}.</p>
            </div> :
             <div className='grid grid-cols-3 justify-between p-2 bg-slate-800 text-sm font-mono ' key={index}>
                  <div className="text-sky-400 font-bold overflow-hidden hover:cursor-pointer hover:opacity-80" onClick={() => {
              handleRedirect(data.video_id)
             }}>{data.video_name}</div>
             <p>Ksh, {data.price}</p>
             <p>{data.purchase_time}</p>
           </div>
          ))}
        
       
      
      </div>
    )
}

export default PurchaseHistory
