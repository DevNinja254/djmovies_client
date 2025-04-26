import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GrFormView as View } from "react-icons/gr";
import api, { config } from '../../assets/js/api';
import Loader from '../../ui/Loader';
const Recent = ({datas, myListTitles, settingNavigating}) => {
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
      
  return (
    <div className='p-3 pt-0'>
           {/* loader */}
        {redirecting | isLoading ? <Loader progres={progres}/> : null}
        {error ? <p className='fixed bottom-2 left-2 bg-red-600 text-white font-bold textMidSm p-2 rounded-sm'>Error! loading results.</p> : null}
            <h1 className='titleH1'>Suggestions</h1>
            
        <div className='grid grid-cols-3 gap-2 movieContainer'>
            {datas.map((data, index) => (
                <div key={data.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} className='hover:cursor-pointer' onClick={() => {
                    handleRedirect(data)
                  }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent  hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-white font-bold  whitespace-nowrap overflow-hidden' >{data.title}: {data.season}</p>
                    <p className='textMidSm text-gray-200 capitalize font-serif' >{data.dj}</p>                    
                </div>
            ))}

        </div>
        <NavLink to="/suggestions" className={`m-3 bg-white text-white font-bold textMidSm block w-11/12 mx-auto p-2 rounded-sm bg-opacity-20 text-center transition-all duration-100 ease-linear`} >Watch more</NavLink>
    </div>
  )
}

export default Recent
