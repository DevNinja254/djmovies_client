import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { useNavigate } from 'react-router-dom'
import Loader from '../ui/Loader'
import api, { config } from '../assets/js/api'
import { PacmanLoader } from 'react-spinners'

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
        setProgress(20)
        setRedirect(true)
        sessionStorage.setItem("toPlay", JSON.stringify(vida))
        navigate(`/watch/${vida.vidId}/`)
    }
  return (
    <MainLayout>
         {loading | redirect ? <Loader progres={progres}/> : null}
       
        {loading ? null : <>
            <h3 className=' text-lg font-bold titleH1 mt-12 pt-2 mx-3'>Guides.</h3>
            <div className='px-2'>
            <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
                <span>{datas.length} guide videos </span>
            </p>
        </div> 
        {/* videos */}
        {loading ? <div className='h-60 flex items-center justify-center'>
     
        <PacmanLoader
        color='white'
        loading= {loading}
        />
        </div> : <div className='grid grid-cols-3 gap-2 movieContainer mx-3'>
                {datas.map((data, index) => (
                    <div key={data.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} onClick={() => {
                      handleRedirect(data)
                    }}>
                        <figure>
                            <img src={require(data.image)} alt="" className='imgRecent hover:scale-105 transition-all duration-100 ease-linear' />
                        </figure>
                        <p className='capitalize text-sm text-gray-300 font-bold ' >{data.title}: <span className='textSm font-normal'>{data.season}</span></p>
                        <p className='textMidSm text-gray-400 capitalize font-serif' >{data.dj}</p>                    
                    </div>
                ))}
            </div>}
        </>}

    </MainLayout>
  )
}

export default Guide
