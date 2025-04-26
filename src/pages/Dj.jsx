import React, {useEffect, useState} from 'react'
import MainLayout from '../layout/MainLayout'
import api, { config } from '../assets/js/api'
import Loader from '../ui/Loader'
import { useNavigate } from 'react-router-dom'
import { HashLoader, PacmanLoader } from 'react-spinners'
const Dj = () => {
  // const []
  const [dej, setDj] = useState('')
  const [genre, setGenre] = useState("")
  const [djs, setDjs] = useState([])
  const [genres, setGenres] = useState([])
  const [loader1, setLoader1] = useState(true)
  const [loader2, setLoader2] = useState(true)
  const [loader3, setLoader3] = useState(false)
  const [loader4, setLoader4] = useState(false)
  const [progressDj, setProgressDj] = useState(10)
  const [progressGenre, setProgressGenre] = useState(10)
  const [progressVideos, setProgressVideos] = useState(10)
  const [datas, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [myListTitles, setMyListTitles] = useState([])
  const navigate = useNavigate()
  const fetchGenre = async() => {
    const djResponse = await api.get("/dj", {
      ...config,
      onDownloadProgress: (progress) => {
        const percentageCompletedDj = Math.round((progress.loaded * 100) / progress.total)
        setProgressDj(percentageCompletedDj)
      }
    })
    const dataDj = await djResponse.data.results
    setDjs(dataDj)
    sessionStorage.setItem('dj', JSON.stringify(dataDj))
    setLoader1(false)
    if(dej == '') {
      setDj(dataDj[0])
    }
    // genre
    const genreResponse = await api.get("/genretotal", {
      ...config,
      onDownloadProgress: (progress) => {
        const percentageCompletedGenre = Math.round((progress.loaded * 100) / progress.total)
        setProgressGenre(percentageCompletedGenre)
      }
    })
    const dataGenre = await genreResponse.data.results
    setGenres(dataGenre)
    sessionStorage.setItem('genre', JSON.stringify(dataGenre))
    setLoader2(false)
    if(genre == '') {
      setGenre(dataGenre[0])
    }
    
  }
  const fetchVideos = async(dj, genre) => {
    setLoader3(true)
    const response = await api.get(`/videoDetails/?genre=${genre}&dj=${dj}&ordering=-date_uploaded`, {
      ...config,
      onDownloadProgress: (progress) => {
        const percentageCompletedGenre = Math.round((progress.loaded * 100) / progress.total)
        setProgressVideos(percentageCompletedGenre)
      }
    })
    const data = await response.data.results
    setData(data)
    // console.log(data)
    setLoader3(false)
  }
  useEffect(() => {
    // console.log(dej.dj_name, genre.title)
    if (loaded) {
      fetchVideos(dej.dj_name, genre.title)
    } else {
      const djData = sessionStorage.getItem('dj')
      const genreData = sessionStorage.getItem('genres')
      if (djData) {
        // console.log('local')
        setDjs(JSON.parse(djData))
        setDj(JSON.parse(djData)[0])
        setGenres(JSON.parse(genreData))
        setGenre(JSON.parse(genreData)[0])
        setLoader1(true)
        setLoader2(true)
      } else {
        console.log('local')
        fetchGenre()
      }
    }
    if(loader1 & loader2) {
      setLoaded(true)
      fetchVideos(dej.dj_name, genre.title)
    }
    const mytitles = localStorage.getItem('myListTitles')
    if (mytitles) {
      setMyListTitles(JSON.parse(mytitles))
    }
    
  }, [dej.dj_name, genre.title])

  const handleRedirect = async (vida) => {
    setProgressVideos(20)
    setLoader4(true)
    api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressVideos(percentageCompleted)
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
    <MainLayout>
      {/* loader */}
      {loader3 | loader4 ? <Loader progres={progressVideos}/> : null}
      {/* all dj */}
      <h1 className='titleH1 escapeSearch mx-3'>{loader3 ? `loading ...` : `${dej.dj_name} : ${genre.title}`}</h1>
      <div className='my-2 mx-3 pb-3 flex items-center gap-3 border-dotted border-b-2 border-gray-600 flex-wrap'>
        {djs.map((dj, index) => (
          <span key={index} className={` p-2 textMidSm capitalize  font-bold rounded-sm hover:cursor-pointer my-2 ${dej.dj_name == dj.dj_name ? "bg-orange-400 text-white" : "bg-gray-600 bg-opacity-15 text-gray-300"}`} onClick={() => {
            setDj(dj)
          }}>
            {dj.dj_name}
          </span>
        ))}
      </div>

      {/* genre */}
      <div className='my-2 px-3 flex items-center gap-3  flex-wrap'>
        {genres.map((gen, index) => (
          <span key={index} className={` p-2 textMidSm capitalize  font-bold rounded-sm hover:cursor-pointer my-2 ${gen.title == genre.title ? "titleBg text-white" : "bg-gray-600 bg-opacity-15 text-gray-300"}`} onClick={() => {
            setGenre(gen)
          }}>
            {gen.title}
          </span>
        ))}
      </div>
      <div className='px-2'>
       
        <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
    <span>{loader3 ? `loading ${dej.dj_name} : ${genre.title}...` : `${dej.dj_name} : ${genre.title}`} </span>
  </p>
      </div>
      {/* videos */}
      {loader3 ? <div className='h-60 flex items-center justify-center'>
     
     <PacmanLoader
     color='white'
     loading= {loader3}
     />
    </div> : <div className='grid grid-cols-3 gap-2 movieContainer mx-3'>
            {datas.map((data, index) => (
                <div key={data.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} onClick={() => {
                  handleRedirect(data)
                }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-gray-300 font-bold ' >{data.title}: <span className='textSm font-normal'>{data.season}</span></p>
                    <p className='textMidSm text-gray-400 capitalize font-serif' >{data.cartegory}</p>                    
                </div>
            ))}
        </div>}
    </MainLayout>
  )
}

export default Dj
