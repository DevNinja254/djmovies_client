import React, { useEffect, useState } from 'react'
import { BiMovie } from 'react-icons/bi'
import { GrFormPrevious as Previous } from "react-icons/gr";
import { MdNavigateNext as Next } from "react-icons/md";
import api, {config} from '../../assets/js/api'
import { GoDotFill as Dot} from "react-icons/go";
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { FaPlay as Play } from "react-icons/fa";
const Slide = ({datas, myListTitles, settingNavigating}) => {
    const [progres, setProgress] = useState(10)
    const [redirecting, setRedirecting] = useState(false)
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState(
       { width: window.innerWidth,
        height: window.innerHeight}
    )
    const [slid, setSlid] = useState(0)
    const [percentageSlide, setPercentageSlide] = useState(100)
   const next = () => {
    if( windowSize.width < 1024 ) {
        // console.log(slid)
        setSlid(slid => slid < datas.length - 1  ? (slid + 1): 0)
    } else {
      setSlid(slid => slid < (datas.length - 2)  ? (slid + 1): 0)
    }
   }
   const previous = () => {
    // console.log(windowSize.width)
    if( windowSize.width < 1024 ) {
      // console.log(slid)
      setSlid(slid => slid == 0  ? (datas.length -1): slid - 1)
  } else {
    setSlid(slid => slid < (datas.length - 2)  ? (slid + 1): 0)
  }
 }
 
   useEffect(() => {
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
   }, [])
  //  console.log(datas)
  useEffect(() => {
    const nexty = setInterval(next,5000)
    return () =>  {clearInterval(nexty)}
  }, [])
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

  return (
    <div className='sm:overflow-hidden relative slider opacity-100'> 
    {/* loader */}
    {redirecting ? <Loader progres={progres}/> : null}
      <div className={`flex flex-nowrap transition-all duration-500 ease-linear`} style={{
        transform: `translateX(-${(slid * percentageSlide) }%)`
      }}>
        {datas.map((movie, index) => (
            <figure key={movie.vidId} className='slideFig overflow-hidden relative hover:cursor-pointer hover:scale-105' onClick={() => {
              handleRedirect(movie)
            }}>
                <img src={require(movie.image)} alt="" className='inline-block w-full h-full' />
                <div className='capitalize bgBlackFade bg-opacity-40 text-gray-100 textMidSm font-bold absolute top-0 left-0 w-full h-full flex items-end p-4 '>
                  <div className='flex items-center justify-between w-full'>
                    <div>
                      <p className='text-xl mb-1 text-gray-300'>{movie.title}</p>
                      <p className='text-xl mb-3 text-gray-300'>{movie.dj}</p>
                       
                        
                    </div>
                    <button className='bgButton flex items-center pt-2 rounded-md gap-3 px-3 text-lg'>
                          <Play/>
                          <p>Play</p>
                    </button>
                  </div>
                  
                </div>
            </figure>
        ))}
         
      </div>
      {/* <div className='absolute w-full h-full top-0 left-0 items-center hidden justify-between  sm:flex'>
        <Previous className='border border-gray-700 rounded-full bg-white text-lg hover:cursor-pointer' size={20} onClick={previous}/>
        <Next className='border border-gray-700 rounded-full bg-white text-lg hover:cursor-pointer' size={20} onClick={next}/>
      </div> */}
      <div className='flex absolute bottom-0 '>
                          {datas.map((_, index) => (
                            <span key={index} className={`inline-block text-gray-600 transition-all duration-500 ease-linear ${slid == index ? "text-white ": null}`}><Dot size={15}/></span>
                          ))}
                        </div>
    </div>
  )
}

export default Slide
