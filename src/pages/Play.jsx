import React, {useEffect, useRef, useState} from 'react'
import Header from '../ui/Header'
import { FaDownload as Download } from "react-icons/fa";
import { FaDisplay as Ply} from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import api, { config } from '../assets/js/api';
import { BounceLoader } from 'react-spinners';
const Play = () => {
    const {id} = useParams()
    const [redirecting, setRedirecting] = useState(false)
    const playRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [playData, setPlayData] = useState([])
    const [paidVideo, setPaidVideo] = useState([])
    const [error, setError] = useState(false)
    const [source, setSource] = useState("/src/assets/videos/arcane.mp4")
    const changeSource = (src) => {
        window.scrollTo(0, 0)
        setSource(src)
        
    }
    const getFilenameFromUrl = (url) => {
      const parts = url.split('/');
      return parts[parts.length - 1]; // Get the last part of the URL
  };
    const download = (src) => {
      const link = document.createElement('a');
      const secureSrc = src.startsWith("http:") ? src.replace("http:", "https:") : src; // Ensure HTTPS
  
      link.href = secureSrc;
      link.setAttribute("target", "_blank")
      link.setAttribute("download", getFilenameFromUrl(src)); // Use a helper function for filename
      console.log("mddu")
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    useEffect(() => {
      window.scrollTo(0,0)
        const toPlay =  sessionStorage.getItem("toPlay")
        const paidvid = localStorage.getItem("ownVideo")
        if (paidvid) {
            const paid = JSON.parse(paidvid)
            setPaidVideo(paid)
            // console.log(paid)
        }
        if (toPlay) {
            const play = JSON.parse(toPlay)
            setPlayData(play)
            setLoading(false)
            if (playRef.current) {
              playRef.current.src = require(play.video)
              playRef.current.play()
          }
        }
        
    }, [])
    const changeVideo = async(id) => {
      window.scrollTo({top:0, left:0, behavior:"smooth"})
      try {
        setRedirecting(true)
        const response = await api.get(`/videoDetails/${id}`, config)
        const data = await response.data
        setPlayData(data)
        sessionStorage.setItem("toPlay", JSON.stringify(data))
        if (playRef.current) {
          playRef.current.pause()
          playRef.current.src = require(data.video)
          playRef.current.play()
        }      
      } catch(error) {
        setError(true)
      }finally {
        setRedirecting(false)
      }
    }
  return (
    <div>
       {error ? <p className='bg-red-600 text-sm p-2 font-bold text-white fixed top-1 left-2 z-20 rounded-md'>Error fetching video, Try again!</p> : null}
       <div className={`fixed top-0 left-0 w-full h-full bg-opacity-80 z-10   items-center justify-center gap-1 bg-slate-900 ${redirecting ? 'flex' : 'hidden'}`}>
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
        </div>
        <Header/>
       <div className='md:grid md:grid-cols-3 md:m-3 gap-3 lg:w-5/6 lg:mx-auto xl:w-11/12'> 
        {loading ? <div className='flex justify-center items-center h-screen'></div> : <>
          <div className='col-span-2'>
            <video className='videoPlay' poster={require(playData.image)} controlsList='download' muted={true} ref={playRef} autoPlay={true} controls={true} loop={true} src={require(playData.video)}></video>
            <div>
                <p className='text-slate-900 font-bold text-lg capitalize font-mono border-b-2 mb-1'>{playData.title}</p>
                <div className='flex gap-2 textSm capitalize font-bold text-slate-500 pb-2 border-b-2'>
                  <p>{playData.genre}</p>
                  <p>|</p>
                  <p>{playData.cartegory}</p>
                  <p>|</p>
                  <p>{playData.type}</p>
                  <p>|</p>
                  <p>{playData.season}</p>
                  <p>|</p>
                  <p>Ksh.{playData.price}</p>
                </div>
                <p className='text-sm text-slate-700 font-serif tracking-wide my-2'>{playData.synopsis}</p>
            </div>
            <div>
                <h3 className='text-sm font-bold'>Resource:</h3>
                <div className='sm:w-5/6 mx-auto'>
                    <div className='grid grid-cols-4 gap-2 items-center p-1  mx-auto border-b-2 border-gray-500 border-opacity-15 my-2'>
                      <p className='text-sm recentColor font-bold capitalize col-span-2'>{playData.video.split("/")[5].split(".")[0]}</p>
                        <button href={playData.video} className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' onClick={() => {
                        download(playData.video)
                    }}>
                            <Download size={15} /> Download
                        </button>
                        <button className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' onClick={() => {
                        changeSource(playData.video)
                    }}>
                            <Ply size={13} /> Play
                        </button>
                    </div>  
                    {playData.additional_files.map((vida) => (
                       <div className='grid grid-cols-4 gap-2 items-center p-1  mx-auto border-b-2 border-gray-500 border-opacity-15 my-2'>
                       <p className='text-sm recentColor font-bold capitalize col-span-2'>{vida.files.split("/")[5].split(".")[0]}</p>
                         <button className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' onClick={() => {
                         download(vida.files)}}>
                             <Download size={15} /> Download
                         </button>
                         <button className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' onClick={() => {
                         changeSource(vida.files)
                     }}>
                             <Ply size={13} /> Play
                         </button>
                     </div>
                    ))} 
                               
                </div>
            </div>
        </div>
        <div>
            <p className='p-3 pb-1 text-lg font-bold'>Other Purchased Videos</p>
            <div className='grid grid-cols-3 gap-3 p-3 pt-0 bg-white sm:grid-cols-4 md:grid-cols-2 md:mx-2'>
              {paidVideo.map((item) => (
                <div key={item.video_id} className='flex flex-col shadow-sm shadow-gray-300 hover:shadow hover:shadow-sky-300' onClick={() => {
                  changeVideo(item.video_id)
                }}>
                  <figure className='figure relative rounded-sm overflow-hidden hover:scale-105 transition-all duration-300'>
                    <img src={require(item.image_url)} className='block w-full h-full object-cover' alt="" />
                    <figcaption className='absolute bottom-0 text-white font-bold p-1 bg-black w-full bg-opacity-30 textMidSm'>{item.video_name}</figcaption>
                  </figure>
                </div>
              ))}
              </div>
        </div>
        </>}
       </div>
    </div>
  )
}

export default Play
