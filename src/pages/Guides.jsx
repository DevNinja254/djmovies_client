import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { useNavigate } from 'react-router-dom'
import Loader from '../ui/Loader'
import api, { config } from '../assets/js/api'

const Guide = () => {
    const [datas, setData] = useState([])
    const [error, setError] = useState(false)
    const [progres, setProgress] = useState(10)
    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate()
    const fetchData = async() => {
        setError(false)
        setProgress(10)
        setLoading(true)
        try {
          const response = await api.get(`/videoDetails/?page_size=20&ordering=-date_uploaded&cartegory=guide`, {
                    ...config,
                    onDownloadProgress: (progressEvent) => {
                      const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                      setProgress(percentageCompleted)
                      // console.log(percentageCompleted)
                    }
                  })
          const data = await response.data.results
          setData(data)
          setLoading(false)
          // console.log(data)
        } catch {
          setError(true)
        }
      }
    
   useEffect(() => {
    fetchData()
   }, []) 
   const handleRedirect = async (vida) => {
        setProgress(4)
        setRedirect(true)
        sessionStorage.setItem("toPlay", JSON.stringify(vida))
        navigate(`/watch/${vida.vidId}/`)
    }
  return (
    <MainLayout>
         {loading | redirect ? <Loader progres={progres}/> : null}
       
        {loading ? null : <>
            <h3 className='m-3 text-lg font-bold text-gray-600'>How to access  various services.</h3>
            <div className='px-2'>
            <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
                <span>{datas.length} guide videos </span>
            </p>
        </div> 
        {/* videos */}
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 px-2 md:w-11/12 md:mx-auto'>
            {datas.map((data, index) => (
                <div key={index} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} onClick={() => {
                handleRedirect(data)
                }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-gray-700 font-bold ' >{data.title}: <span className='textSm font-normal'>{data.season}</span></p>
                    <p className='textMidSm text-gray-600 capitalize font-serif' >{data.dj}</p>                    
                </div>
            ))}
            </div>
        </>}

    </MainLayout>
  )
}

export default Guide
