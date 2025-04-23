import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import api, { config } from '../assets/js/api'
import Loader from '../ui/Loader'

const Notifications = () => {
    const [progres, setProgress] = useState(4)
    const [error, setError] = useState(false)
    const [notification, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchItem = async() => {
        try {
            api.get("/notification", {
                ...config,
                onDownloadProgress: (progressEvent) => {
                  const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  setProgress(percentageCompleted)
                  // console.log(percentageCompleted)
                }
              })
              .then(res => {
                const data = res.data.results
                // console.log(data)
                setLoading(false)
                setNotifications(data)
              })
        } catch {
            setError(true)
        }
    }
    useEffect(() => {
        fetchItem()
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
   <MainLayout>
    {error ? <p className='fixed top-2 right-2 bg-red-600 text-white font-bold textMidSm p-2 rounded-sm'>Error! loading results.</p> : null}
    {loading ? <Loader progres={progres}/> : null}
    {loading ? null : <>
        <div className='px-2'>
       <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
        <span>{notification.length} notifications</span>
       </p>
    </div>
    <div className='p-3 grid gap-3 md:grid-cols-2 lg:w-10/12 lg:mx-auto'>
            {notification.map(notify => (
                <div key={notify.noty_id} className='shadow-sm shadow-gray-500 p-2'>
                    <p className='text-center text-sm py-2 textBlue font-bold'>{convertTimestampToDateTime(notify.date_notified)}</p>
                    <p className='textMidSm text-gray-700'>{notify.message}</p>
                </div>
            ))}
        </div>
    </>}
   </MainLayout>
  )
}

export default Notifications
