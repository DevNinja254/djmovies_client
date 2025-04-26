import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import api, { config } from '../assets/js/api'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../ui/Loader'
import { HashLoader, PacmanLoader } from 'react-spinners'

const Genre = () => {
    const [genre, setGenre] = useState("")
    const {gen} = useParams()
    const [genresTitle, setGenresTitles] = useState([])
    const [videos, setVideos] = useState([])
    const [progres, setProgress] = useState(10)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const [loadingExtra, setLoadingExtra] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [myListTitles, setMyListTitles] = useState([])
    const navigate = useNavigate()
      useEffect(() => {
        // console.log(gen)
        setLoading(true)
        if (loaded) {
          fetchMovie(genre)
        } else {
          const algenre = sessionStorage.getItem('genres')
          if (algenre) {
            const datas = JSON.parse(algenre)
            if(gen) {
              setGenre(gen)
            }else {
              setGenre(datas[0].title)
            }
            fetchMovie(datas[0].title)
            let title = []
            for (const dat of datas) {
              title.push(dat.title)
            }
            setGenresTitles(title)
            setLoaded(true)
            setProgress(100)
            setTimeout(() => {
              setLoading(false)
            }, 1000)
            
          } else {
            fetchgenre()
          }          
        }
        
      }, [genre])
      const fetchgenre = async() => {
        setLoading(true)
        api.get("/genreTotal", {
          ...config,
          onDownloadProgress: (progress) => {
            const percentageCompletedGenre = Math.round((progress.loaded * 100) / progress.total)
            setProgress(percentageCompletedGenre)
          }
        })
        .then(response => {
          const data = response.data.results
          if(gen) {
            setGenre(gen)
            fetchMovie(gen)
          }else {
            setGenre(data[0].title)
            fetchMovie(data[0].title)
          }
          let title = []
          for (const dat of data) {
            title.push(dat.title)
          }
          sessionStorage.setItem('genre', JSON.stringify(data))
          setLoading(false)
          setLoaded(true)
          setGenresTitles(title)
        })
        
      }
      const fetchMovie = async(gen) => {
        setLoading(true)
        // console.log(genre, 'searching')
        const response = await api.get(`/videoDetails/?genre=${gen}&ordering=-date_uploaded&page_size=1000`, {
          ...config,
          onDownloadProgress: (progress) => {
            const percentageCompletedGenre = Math.round((progress.loaded * 100) / progress.total)
            setProgress(percentageCompletedGenre)
          }
        })
        const data = await response.data.results
        setVideos(data)
        setLoading(false)
      }
     useEffect(() => {
      const mytitles = localStorage.getItem('myListTitles')
      if (mytitles) {
        setMyListTitles(JSON.parse(mytitles))
      }
    
     }, [])
     const handleRedirect = async (vida) => {
      setProgress(20)
      setLoading2(true)
      api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, {
        ...config,
        onDownloadProgress: (progressEvent) => {
          const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentageCompleted)
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
      {loading | loading2 ? <Loader progres={progres}/> : null}
      <h1 className='titleH1 escapeSearch mx-3'>{loading ? `loading${genre}...` : `${genre}`}</h1>
         <div className='my-2 px-3 pb-3 flex items-center gap-3  flex-wrap'>
        {genresTitle.map((gen, index) => (
          <span key={index} className={` p-2 textMidSm capitalize  font-bold rounded-sm hover:cursor-pointer my-2 ${gen == genre ? "titleBg text-white" : "bg-gray-600 bg-opacity-15 text-gray-300"}`} onClick={() => {
            setGenre(gen)
          }}>
            {gen}
          </span>
        ))}
      </div>
      <div className='px-2'>
       
        <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
         <span>{loading ? `loading ${genre} movies and series...`: `${videos.length} ${genre} movies and series`}</span>
        </p>
      </div>
      {loading ? <div className='h-60 flex items-center justify-center'>
     
     <PacmanLoader
     color='white'
     loading= {loading}
     />
    </div> : <div className='grid grid-cols-3 gap-2 movieContainer mx-3'>
            {videos.map((data, index) => (
                <div key={data.vidId} style={{ lineHeight: '0.5rem', marginBottom: "0.5rem" }} onClick={() => {
                  handleRedirect(data)
                }}>
                    <figure>
                        <img src={require(data.image)} alt="" className='imgRecent hover:scale-105 transition-all duration-100 ease-linear' />
                    </figure>
                    <p className='capitalize text-sm text-gray-300 font-bold ' >{data.title}: <span className='textSm font-normal'>{data.season}</span></p>
                    <p className='textMidSm text-gray-400 capitalize font-serif' >{data.dj}</p>                    
                </div>
            ))}
        </div>}
    </MainLayout>
  )
}

export default Genre
