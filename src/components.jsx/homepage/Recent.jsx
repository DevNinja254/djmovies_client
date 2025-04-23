import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GrFormView as View } from "react-icons/gr";
import api, { config } from '../../assets/js/api';
import Loader from '../../ui/Loader';
const Recent = ({datas, myListTitles, settingNavigating}) => {
  const loadMoreRef = useRef(null)
    const [progres, setProgress] = useState(10)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataMore, setDataMore]= useState([])
    const [redirecting, setRedirecting] = useState(false)
    const [loadedMore, setLoadedMore] = useState(false)
    const navigate = useNavigate()
    const handleRedirect = async (vida) => {
        setProgress(2)
        setRedirecting(true)
        settingNavigating(true)
        // console.log(vida)
        api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, {
          ...config,
          onDownloadProgress: (progressEvent) => {
            const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentageCompleted)
            // console.log(percentageCompleted)
          }
        })
        .then(res1 => {
          const data1 = res1.data.results
          localStorage.setItem("similar", JSON.stringify(data1))
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
      const loadMore = async() => {
        setError(false)
        setIsLoading(true)
        setProgress(4)
        try {
          const response = await api.get('/videoDetails/?page_size=2000&ordering=-date_uploaded', {
                    ...config,
                    onDownloadProgress: (progressEvent) => {
                      const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                      setProgress(percentageCompleted)
                      // console.log(percentageCompleted)
                    }
                  })
          const data = await response.data.results
          setDataMore(data.slice(10))
          setIsLoading(false)
          setLoadedMore(true)
          // console.log(data)
        } catch {
          setError(true)
          setIsLoading(false)
        } 
      }
      const navigator = () => {
        if (loadMoreRef.current){
          loadMoreRef.current.scrollIntoView()
        }
      }
  return (
    <div className='px-3'>
           {/* loader */}
        {redirecting | isLoading ? <Loader progres={progres}/> : null}
        {error ? <p className='fixed bottom-2 left-2 bg-red-600 text-white font-bold textMidSm p-2 rounded-sm'>Error! loading results.</p> : null}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold  text-gray-600'>Movies</h1>
            <div  className='flex items-center  textMidSm text-blue-600 hover:cursor-pointer' onClick={navigator}>
            <p>view all</p>
            <View size={17}/>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
            {datas.map((data, index) => (
                <div key={data.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} className='hover:cursor-pointer' onClick={() => {
                    handleRedirect(data)
                  }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent  hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-gray-700 font-bold ' >{data.title}: {data.season}</p>
                    <p className='textMidSm text-gray-600 capitalize font-serif' >{data.dj}</p>                    
                </div>
            ))}
            {loadedMore ? dataMore.map((data, index) => (
                <div key={data.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} className='hover:cursor-pointer' onClick={() => {
                    handleRedirect(data)
                  }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent  hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-gray-700 font-bold ' >{data.title}: {data.season}</p>
                    <p className='textMidSm text-gray-600 capitalize font-serif' >{data.dj}</p>                    
                </div>
            )) : null}
        </div>
        <button className={`m-3 bg-gray-500 text-white font-bold textMidSm block w-10/12 mx-auto p-2 rounded-sm ${isLoading ? "opacity-80" : "opacity-100"} ${loadedMore ? "hidden" : "block"} transition-all duration-100 ease-linear`} ref={loadMoreRef} onClick={loadMore} disabled={isLoading}>{isLoading ? 'Loading...' : "load more results"}</button>
    </div>
  )
}

export default Recent
