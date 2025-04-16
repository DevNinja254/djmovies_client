import React, { useEffect, useState, useRef } from 'react'
import Header from '../ui/Header'
import Layout from '../layout/Layout'
import { createLoop } from '../assets/js/createloop'
import { HiOutlineTv as Show} from "react-icons/hi2";
import { TbMovie as Movie } from "react-icons/tb";
import api, {config} from '../assets/js/api';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import ClipLoader from "react-spinners/ClipLoader";
const Homepage = () => {
  const divRef = useRef(null)
  const [partialData, setPartialData] = useState([])
  const [remainingData, setRemainingData] = useState([])
  const [loader1, setLoader1]  = useState(true)
  const [loader5, setLoader5]  = useState(true) 
  const [redirecting, setRedirecting] = useState(false)
  const [paidTitles, setPaidTitles] = useState([])
  const navigate = useNavigate()
  const fetchMovies = async (dj, page) => {
   const response = await api.get(`/videoDetails/?page_size=${page}&type=${dj}&ordering=-date_uploaded`, config)
    const data = await response.data.results
    sessionStorage.setItem(`recent_${dj}`, JSON.stringify(data))
    if(dj == "dj_smith") {
      setLoader1(false)
      setPartialData(data)
    }

  }
  const fetcher = () => {
    fetchMovies("dj_smith", 10)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    /////////////////////////recent///////////////////////
    const partial = sessionStorage.getItem("recent_dj_smith")
    if (partial) {
      // console.log("found")
      setPartialData(JSON.parse(partial))
      setLoader1(false)
    } else {
      fetcher()
    }
    
    api.get(`/videoDetails/?page_size=100&type=dj_smith&ordering=-date_uploaded`, config)
    .then(res => {
      const data = res.data.results
      setRemainingData(data.slice(10))
      setLoader5(false)
    })
    /////////////////////////recent////////////////////////////
    const paid = localStorage.getItem("own")
    if (paid) {
      setPaidTitles(JSON.parse(paid))
    }
  }, [])
  if (divRef.current) {
    divRef.current.scrollIntoView() 
  }
  const handleRedirect = async (vida) => {
    setRedirecting(true)
    // console.log(vida)
    api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, config)
    .then(res1 => {
      const data1 = res1.data.results
      sessionStorage.setItem("similar", JSON.stringify(data1))
      sessionStorage.setItem("toPlay", JSON.stringify(vida))
      if (paidTitles) {
        if(paidTitles.includes(vida.title)){
          navigate(`/play/${vida.vidId}/`)
        } else {
          navigate(`/store/${vida.vidId}/`)
        }
      }else {
        navigate(`/store/${vida.vidId}/`)
      }
    })
  }
  return (
   <Layout>
    <div className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-10   items-center justify-center gap-1 bg-slate-900 ${redirecting ? 'flex' : 'hidden'}`}>
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        </div>
    <div className='md:grid md:grid-cols-3 lg:w-5/6 lg:mx-auto'>
    {loader1 ?  <div className='h-40 grid place-content-center'><ClipLoader
        color={"gray"}
        loading={loader1}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
          :<div className="col-span-2 md:border-2 md:m-3 md:border-gray-500 md:border-opacity-15 md:rounded-md md:py-3" ref={divRef}>
                 {partialData.map((item) => (
                   <div key={item.vidId} className=" recentColor text-sm flex grid-cols-6 justify-between items-center p-1 w-5/6 mx-auto border-b border-gray-500 border-opacity-15 gap-2 capitalize hover:cursor-pointer hover:bg-green-950 hover:bg-opacity-10" onClick={() => {
                    handleRedirect(item)
                   }}>
                    <div className='flex items-center gap-2'>
                    {item.cartegory.toLowerCase() == "movies" ? <Movie className='col-span-1 text-amber-800 font-bold' size={20}/> : <Show  size={20} className='text-sky-700 col-span-1'/>}
                    <p className='col-span-4 font-bold textMidSm'>{item.title}(<span className='font-normal'>{item.season}</span>)</p>
                    </div>
                       <p className='col-span-1 buttonBg text-white text-center rounded-sm text-sm p-1'>DJTV</p>
                     </div>
                 ))}
                 {loader5 ? <p>loading</p> : 
                  remainingData.map((item) => (
                    <div key={item.vidId} className=" recentColor text-sm flex grid-cols-6 justify-between items-center p-1 w-5/6 mx-auto border-b border-gray-500 border-opacity-15 gap-2 capitalize hover:cursor-pointer hover:bg-green-950 hover:bg-opacity-10" onClick={() => {
                      handleRedirect(item)
                     }}>
                     <div className='flex items-center gap-2'>
                     {item.cartegory.toLowerCase() == "movies" ? <Movie className='col-span-1 text-amber-800 font-bold' size={20}/> : <Show  size={20} className='text-sky-700 col-span-1'/>}
                     <p className='col-span-4 font-bold textMidSm'>{item.title}(<span className='font-normal'>{item.season}</span>)</p>
                     </div>
                        <p className='col-span-1 buttonBg text-white text-center rounded-sm text-sm p-1'>DJTV</p>
                      </div>
                ))}
               </div>}
            </div>
   </Layout>
  )
}

export default Homepage
