import React, {useState, useEffect, useRef} from 'react'
import api, {config} from '../assets/js/api'
import { useNavigate } from 'react-router-dom'
import { redirect } from '../assets/js/redirect'
import { BounceLoader } from 'react-spinners';
import ClipLoader from "react-spinners/ClipLoader";
const Neutral = () => {
  const imageRefs = useRef([]);
  const [hidden, setHiden] = useState(true)
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [redirecting, setRedirecting] = useState(false)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [paidVideo, setPaidVideo] = useState([])
  const navigate = useNavigate()
  const fetchItem = async() => {
   try {
    const res = await api.get('/videoDetails/?page=1&page_size=7&ordering=-date_uploaded', config)
    const data = await res.data
    setItems(data.results)
    sessionStorage.setItem("neutral", JSON.stringify(data.results))
   } catch(error) {
    console.error(error)
   } finally {
    setLoading(false)
   }
  }
  useEffect(() => {
    const neutral = sessionStorage.getItem("neutral")
    const paid = localStorage.getItem("own")
    
    if (neutral) {
      setItems(JSON.parse(neutral))
      setLoading(false)
      // console.log("fetceher")
    } else {
      fetchItem()
      // console.log("fetcher2")
    }
    if (paid) {
      setPaidVideo(JSON.parse(paid))
    }
  }, [])
  const handleRedirect = async (vida) => {
    setRedirecting(true)
    // console.log(vida)
    api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, config)
    .then(res1 => {
      const data1 = res1.data.results
      sessionStorage.setItem("similar", JSON.stringify(data1))
      sessionStorage.setItem("toPlay", JSON.stringify(vida))
      if (paidVideo) {
        if(paidVideo.includes(vida.title)){
          navigate(`/play/${vida.vidId}/`)
        } else {
          navigate(`/store/${vida.vidId}/`)
        }
      }else {
        navigate(`/store/${vida.vidId}/`)
      }

    })
  }
  useEffect(() => {
    if (imageRefs.current.length === items.length && items.length > 0) {
      const allLoaded = imageRefs.current.every(
        (imgRef) => imgRef && imgRef.complete
      );
      if (allLoaded) {
        setAllImagesLoaded(true);
        // console.log('All images loaded (using refs)!');
        // Perform your action here
        setHiden(false)
      }
    }
  }, [items, imageRefs]);
  return (
   <div className='bodyBg1'>
    <div className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-10   items-center justify-center gap-1 bg-slate-900 ${redirecting ? 'flex' : 'hidden'}`}>
    <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
    <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
    <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
    <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
    </div>
     {loading ? <div className='h-40 grid place-content-center'>
      <ClipLoader
        color={"gray"}
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>:<div className="p-3  neutral lg:w-5/6 lg:mx-auto   border-b border-gray-500 border-opacity-15">
      {items.map((item,index) => (
        <div key={item.vidId} onClick={() => {
          handleRedirect(item)
        }} className="relative rounded-sm overflow-hidden">
          <figure >
            <img ref={(el) => (imageRefs.current[index] = el)} className='h-full w-full block object-cover' src={require(item.image)} alt="" />
          </figure>
          <p className={`title`} >{item.title}</p>
        </div>
      ))}
    </div>}
   </div>
  )
}

export default Neutral
