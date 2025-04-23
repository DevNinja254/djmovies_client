import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layout/MainLayout'
import { FaDownload as Download } from "react-icons/fa";
import { FaDisplay as Ply} from "react-icons/fa6";
import Loader from "../ui/Loader"
import api, { config } from '../assets/js/api';
const Watch = () => {
    const [redirecting, setRedirecting] = useState(false)
    const playRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [changing, setChanging] = useState(false)
    const [playData, setPlayData] = useState([])
    const [paidVideo, setPaidVideo] = useState([])
    const [progres, setProgres] = useState(10)
    const [error, setError] = useState(false)
    const [source, setSource] = useState("")
    const changeVideo = async(id) => {
        setError(false)
        setProgres(10)
        setChanging(true)
        window.scrollTo({top:0, left:0, behavior:"smooth"})
        try {
          setRedirecting(true)
          const response = await api.get(`/videoDetails/${id}`, {
                  ...config,
                  onDownloadProgress: (progressEvent) => {
                    const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgres(percentageCompleted)
                  }
                })
          const data = await response.data
          setPlayData(data)
          sessionStorage.setItem("toPlay", JSON.stringify(data))
          if (playRef.current) {
            playRef.current.pause()
            playRef.current.src = require(data.video)
            playRef.current.play()
            setSource(data.video)
            setChanging(false)
          }      
        } catch(error) {
          setError(true)
        }finally {
          setRedirecting(false)
        }
      }
      const download = (src) => {
        // const link = document.createElement('a');
        // const secureSrc = src.startsWith("http:") ? src.replace("http:", "https:") : src; // Ensure HTTPS
    
        // link.href = secureSrc;
        // link.setAttribute("target", "_blank")
        // link.setAttribute("download", getFilenameFromUrl(src)); // Use a helper function for filename
        // console.log("mddu")
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      }
      const changeSource = (src) => {
        window.scrollTo(0, 0)
        if (playRef.current) {
            playRef.current.src = src
            playRef.current.play()
        }
        // console.log(src)
        setSource(src)
        
    }
    useEffect(() => {
          window.scrollTo(0,0)
            const toPlay =  sessionStorage.getItem("toPlay")
            const paidvid = localStorage.getItem("myList")
            if (paidvid) {
                const paid = JSON.parse(paidvid)
                setPaidVideo(paid)
                // console.log(paid)
            }
            if (toPlay) {
                const play = JSON.parse(toPlay)
                setPlayData(play)
                setSource(play.video)
                setLoading(false)
                if (playRef.current) {
                  playRef.current.src = play.video
                  playRef.current.play()
              }
            }
            
        }, [])
  return (
    <MainLayout>
        <div className='lg:grid lg:grid-cols-3 lg:m-3 gap-3 lg:w-5/6 lg:mx-auto xl:w-11/12'>
        {error ? <p className='fixed top-2 right-2 bg-red-600 text-white font-bold textMidSm p-2 rounded-md z-20'>Error! changing video, Try again.</p> : null}
        {loading | changing ? <Loader progres={progres}/> : null}
           {loading ? null : <>
            <div className='col-span-2'>
                <video className='videoPlay text-white textMidSm' poster={require(playData.image)} controlsList='download' muted={false} ref={playRef} autoPlay={true} controls={true} loop={true} src={require(playData.video)}></video>
                <div>
                    <p className='text-slate-900 font-bold text-lg capitalize font-mono border-b-2 mb-1'>{playData.title}</p>
                    <div className='flex gap-2 textSm capitalize font-bold text-slate-500 pb-2 border-b-2'>
                        <p>{playData.genre}</p>
                        <p>|</p>
                        <p>{playData.cartegory}</p>
                        <p>|</p>
                        <p>{playData.dj}</p>
                        <p>|</p>
                        <p>{playData.season}</p>
                        <p>|</p>
                        <p>Ksh.{playData.price}</p>
                    </div>
                    <p className='text-sm text-slate-700 font-serif tracking-wide my-2'>{playData.synopsis}.</p>
                </div>
                  <div>
                    <h3 className='text-sm font-bold'>Resource:</h3>
                    <div className='sm:w-5/6 mx-auto'>
                        <div className='grid grid-cols-4 gap-2 items-center p-1  mx-auto border-b-2 border-gray-500 border-opacity-15 my-2'>
                            <p className='text-sm recentColor font-bold capitalize col-span-2'>{playData.video.split("/")[5].split(".")[0]}</p>
                            <a href={playData.video} download={playData.video.split("/")[5].split(".")[0]} target="_blank" className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' >
                                <Download size={15} /> Download
                            </a>
                            <button className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' onClick={() => {
                            changeSource(playData.video)
                        }}>
                                <Ply size={13} /> {source == playData.video ? "playing" : "Play"}
                            </button>
                        </div>  
                        {playData.additional_files.map((vida) => (
                            <div className='grid grid-cols-4 gap-2 items-center p-1  mx-auto border-b-2 border-gray-500 border-opacity-15 my-2' key={vida}>
                            <p className='text-sm recentColor font-bold capitalize col-span-2'>{vida.file.split("/")[5].split(".")[0]}</p>
                                <a href={vida.file} className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' download={vida.file.split("/")[5]}>
                                    <Download size={15} /> Download
                                </a>
                                <button className='textSm font-bold flex gap-1 items-center bg-slate-900 text-white rounded-lg p-1 hover:bg-slate-800 w-fit' onClick={() => {
                                changeSource(vida.file)
                            }}>
                                    <Ply size={13} /> {source == vida.file ? "playing" : "Play"}
                                </button>
                            </div>
                        ))} 
                                    
                    </div>
                </div>
            </div>
            <div>
                <p className='p-3 pb-1 text-lg font-bold'>Other Purchased Videos</p>
                <div className='grid grid-cols-3 gap-3 p-3 pt-0 bg-white lg:grid-cols-2 '>
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
    </MainLayout>
  )
}

export default Watch
