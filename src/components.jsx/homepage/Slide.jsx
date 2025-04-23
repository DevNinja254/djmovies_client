import React, { useEffect, useState } from 'react'
import { BiMovie } from 'react-icons/bi'
import { GrFormPrevious as Previous } from "react-icons/gr";
import { MdNavigateNext as Next } from "react-icons/md";
import api, {config} from '../../assets/js/api'
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
const Slide = ({datas, myListTitles, settingNavigating}) => {
    const [progres, setProgress] = useState(2)
    const [redirecting, setRedirecting] = useState(false)
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState(
       { width: window.innerWidth,
        height: window.innerHeight}
    )
    const [slid, setSlid] = useState(0)
    const [percentageSlide, setPercentageSlide] = useState(50)
   const next = () => {
    // console.log(windowSize.width)
    if (windowSize.width >= 640 & windowSize.width < 1024) {
        setSlid(slid => slid < datas.length /4 ? slid + 1: 0)
    } else if( windowSize.width < 640 ) {
        // console.log(slid)
        setSlid(slid => slid < (datas.length + 2 )  ? (slid + 1): 0)
    } else {
      setSlid(slid => slid < (datas.length - 2)  ? (slid + 1): 0)
    }
   }
   const previous = () => {
    // console.log(windowSize.width)
    if (windowSize.width >= 640 & windowSize.width < 1024) {
        setSlid(slid => slid == 0 ? datas.length / 5 : slid-1)
    } else {
        setSlid(slid => slid == 0 ? datas.length : slid-1)
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
      <div className={`flex gap-4 py-4 flex-nowrap transition-all duration-1000 ease-linear`} style={{
        transform: `translateX(-${(slid * percentageSlide) }%)`
      }}>
        {datas.map((movie, index) => (
            <figure key={movie.vidId} className='slideFig rounded-md overflow-hidden relative hover:cursor-pointer hover:scale-105' onClick={() => {
              handleRedirect(movie)
            }}>
                <img src={require(movie.image)} alt="" className='inline-block w-full h-full' />
                <p className='capitalize bg-black bg-opacity-40 text-gray-100 text-center textMidSm font-bold absolute bottom-0 w-full   '>{movie.title}</p>
            </figure>
        ))}
      </div>
      {/* <div className='absolute w-full h-full top-0 left-0 items-center hidden justify-between  sm:flex'>
        <Previous className='border border-gray-700 rounded-full bg-white text-lg hover:cursor-pointer' size={20} onClick={previous}/>
        <Next className='border border-gray-700 rounded-full bg-white text-lg hover:cursor-pointer' size={20} onClick={next}/>
      </div> */}
    </div>
  )
}

export default Slide
