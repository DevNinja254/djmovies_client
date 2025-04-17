import React, { useEffect, useRef, useState } from 'react'
import Layout from '../layout/Layout'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { createLoop } from '../assets/js/createloop'
import { HiOutlineTv as Show} from "react-icons/hi2";
import { TbMovie as Movie } from "react-icons/tb";
import api, { config } from '../assets/js/api'
import ClipLoader from "react-spinners/ClipLoader";
import { BounceLoader } from 'react-spinners';
const Dj_Afro = () => {
  const divRef = useRef(null)
  const {dj} = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [paidTitles, setPaidTitles] = useState([])
  const navigate = useNavigate()
  // window.scrollTo(0, 0)
  const fetchMovies = async (dj) => {
    const response = await api.get(`/videoDetails/?page_size=1000&type=dj_${dj}&ordering=-date_uploaded`, config)
     const data = await response.data.results
    //  sessionStorage.setItem(`recent_${dj}`, JSON.stringify(data))
    setData(data)
    setLoading(false)
   }
  //  if(divRef.current) {
  //   divRef.current.scrollIntoView()
  //  }
  useEffect(() => {
    if (dj) {
      fetchMovies(dj)
    } else {
      fetchMovies("smith")
    }
    
    //////////////////paidtitles/////////
    const paid = localStorage.getItem("own")
    if (paid) {
      setPaidTitles(JSON.parse(paid))
    }
    ///////////paid titles
  }
  , [dj])
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
    <Layout dj={dj}>
      <div className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-10   items-center justify-center gap-1 bg-slate-900 ${redirecting ? 'flex' : 'hidden'}`}>
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        </div>
        <div className='md:grid md:grid-cols-3 lg:w-5/6 lg:mx-auto'>
          {loading ?  <div className='h-40 grid place-content-center'><ClipLoader
        color={"gray"}
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
          :<div className="col-span-2 md:border-2 md:m-3 md:border-gray-500 md:border-opacity-15 md:rounded-md md:py-3" ref={divRef}>
             {data.map((item) => (
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

export default Dj_Afro
