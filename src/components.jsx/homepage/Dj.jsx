import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GrFormView as View } from "react-icons/gr";
import api, { config } from '../../assets/js/api';
import Loader from '../../ui/Loader';
import { MdOutlineNavigateNext as Next } from "react-icons/md";
const Dj = ({datas, myListTitles, settingNavigating}) => {
  const backendURL = 'https://admin.flixshow.xyz'; 
  const loadMoreRef = useRef(null)
    const [progres, setProgress] = useState(10)
    const [error, setError] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const navigate = useNavigate()
    const handleRedirect = async (vida) => {
        setProgress(10)
        setRedirecting(true)
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
          const vidaEdited = vida
          const videoURL = `${backendURL}${vida.video}`
          vidaEdited.image = `${backendURL}${vida.image}`
          vidaEdited.video = videoURL
          sessionStorage.setItem("toPlay", JSON.stringify(vidaEdited))
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
        {redirecting ? <Loader progres={progres}/> : null}
        {error ? <p className='fixed bottom-2 left-2 bg-red-600 text-white font-bold textMidSm p-2 rounded-sm'>Error! loading results.</p> : null}
        <div >
            {datas.map((data, index) => (
                <div key={data.id}>
                  <div className='flex items-center justify-between mt-5'>
                    <h1 className='titleH1 '>{data.dj_name}</h1>
                    <NavLink to={`/dj/${data.dj_name}`} className={`text-gray-500 text-lg font-bold flex items-center `} >More <Next size={20}/></NavLink>
                  </div>
                  <div className=''>
                      {data.video_details.map(dat => {
                        const fullURL = `${backendURL}${dat.image}`
                        return <div key={dat.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} className='hover:cursor-pointer flex items-center gap-3' onClick={() => {
                          handleRedirect(dat)
                        }}>
                          <figure>
                              <img src={require(fullURL)} alt="" className='imgDj  hover:scale-105 transition-all duration-100 ease-linear' />
                          </figure>
                          <div>
                            <p className='capitalize text-lg text-gray-100 mb-2 font-bold' >{dat.title}</p>
                           <div className='flex items-center gap-2 text-gray-500 capitalize'>
                              <p className='' >{dat.season}</p> 
                              <p>.</p> 
                              <p className='' >{dat.cartegory}</p>  
                              <p>.</p> 
                              <p className='' >{dat.genre}</p>  
                              <p>.</p> 
                              <p className='' >Ksh.{dat.price}</p>  
                           </div>
                          </div>
                        </div>
                        })}
                  </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Dj
