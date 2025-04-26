import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../ui/Loader'
import api, { config } from '../assets/js/api'
import { HashLoader, BarLoader as Spinner } from 'react-spinners'
import ClipLoader from "react-spinners/ClipLoader";
const Suggestion = () => {
    const [datas, setData] = useState([])
    const [error, setError] = useState(false)
    const [progres, setProgress] = useState(10)
    const [myListTitles, setMyListTitles] = useState([])
    const [loading, setLoading] = useState(true)
    const [loader2, setLoader2] = useState(false)
    const navigate = useNavigate()
    const fetchData = async() => {
      setError(false)
      setProgress(10)
      setLoading(true)
      try {
        const response = await api.get(`/videoDetails/?page_size=300&ordering=-date_uploaded&suggest=true`, {
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
      } catch {
        setError(true)
      }
    }
      const handleRedirect = async (vida) => {
        setProgress(20)
        setLoader2(true)
        api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, {
          ...config,
          onDownloadProgress: (progressEvent) => {
            const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentageCompleted)
          }
        })
        .then(res1 => {
          const data1 = res1.data.results
          sessionStorage.setItem("similar", JSON.stringify(data1))
          sessionStorage.setItem("toPlay", JSON.stringify(vida))
          if (myListTitles) {
            if(myListTitles.includes(vida.title)){
              navigate(`/watch/${vida.vidId}/`)
            } else {
              navigate(`/video/${vida.vidId}/`)
            }
          }else {
            navigate(`/video/${vida.vidId}/`)
          }
    
        })
      }
   useEffect(() => {
    fetchData()
    const mytitles = localStorage.getItem('myListTitles')
        if (mytitles) {
          setMyListTitles(JSON.parse(mytitles))
        }
   }, []) 
  return (
    <MainLayout>
        {loading | loader2 ? <Loader progres={progres}/> : null}
        <h1 className='titleH1 escapeSearch capitalize mx-3'>{loading ? 'Loading...' : "Suggestions"}</h1>
         <div className='px-2'>
       <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
        <span>{loading ? `loading suggested movies...`:`${datas.length} suggested videos`} </span>
       </p>
     </div>
        {/* videos */}
     {datas.length == 0 && !loading ? <div>
      <p className='text-white p-3 text-center titleH1 md:'> Currently no suggested movie.</p>
     </div> : null }
     {loading ?  <div className='h-60 flex items-center justify-center'>
     
      <HashLoader
      color='white'
      loading= {loading}
      />
     </div> : <div className='grid grid-cols-3 gap-3 movieContainer mx-6'>
            {datas.map((data, index) => (
                <div key={index} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} onClick={() => {
                  handleRedirect(data)
                }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-gray-200 font-bold ' >{data.title}: <span className='textSm font-normal'>{data.season}</span></p>
                    <p className='textMidSm text-gray-200 capitalize font-serif' >{data.dj}</p>                    
                </div>
            ))}
        </div>}

    </MainLayout>
  )
}

export default Suggestion
