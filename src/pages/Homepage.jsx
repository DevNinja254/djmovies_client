import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import Slide from '../components.jsx/homepage/Slide'
import Recent from '../components.jsx/homepage/Recent'
import api, { config } from '../assets/js/api'
import Loader from '../ui/Loader'
import Trending from '../components.jsx/homepage/Trending'
import TvShows from '../components.jsx/homepage/TvShow'
import Movie from '../components.jsx/homepage/Movie'
import Anime from '../components.jsx/homepage/Anime'
import Dj from '../components.jsx/homepage/Dj'
import Footer from '../ui/Footer'
import Genre from '../components.jsx/homepage/Genre'
const Homepage = () => {
  const [progres, setProgress] = useState(10)
  const [progresDj, setProgressDj] = useState(10)
  const [progresMovie, setProgressMovie] = useState(10)
  const [progresAnime, setProgressAnime] = useState(10)
  const [progresSeries, setProgressSeries] = useState(10)
  const [progresGenre, setProgressGenre] = useState(10)
  const [progresPopular, setProgressPopular] = useState(10)
  const [progresSuggest, setProgressSuggest] = useState(10)
  const [datas, setData] = useState([])
  const [suggests, setSuggest] = useState([])
  const [djs, setDjs] = useState([])
  const [genres, setGenres] = useState([])
  const [anime, setAnime] = useState([])
  const [series, setSeries] = useState([])
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDj, setIsLoadingDj] = useState(true)
  const [isLoadingGenres, setIsLoadingGenres] = useState(true)
  const [isLoadingPopular, setIsLoadingPopular] = useState(true)
  const [isLoadingAnime, setIsLoadingAnime] = useState(true)
  const [isLoadingSeries, setIsLoadingSeries] = useState(true)
  const [isLoadingMovie, setIsLoadingMovie] = useState(true)
  const [isLoadingSuggest, setIsLoadingSuggest] = useState(true)
  const [popular, setPopular] = useState([])
  const [error, setError] = useState(false)
  const [myListTitles, setMyListTitles] = useState([])
  const [navigating, setNavigating] = useState(false)
  const fetchData = async () => {
    setError(false)
    try {
      const response = await api.get('/videoDetails/?page_size=10&ordering=-date_uploaded', {
        ...config,
        onDownloadProgress: (progressEvent) => {
          const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentageCompleted)
          // console.log(percentageCompleted)
        }
      })
      const data = await response.data.results
      setData(data)
      // console.log(data)
      sessionStorage.setItem("recent", JSON.stringify(data))
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }
  const fetchSuggest = async () => {
    setError(false)
    try {
      const response = await api.get('/videoDetails/?page_size=10&ordering=-date_uploaded&suggest=true', {
        ...config,
        onDownloadProgress: (progressEvent) => {
          const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentageCompleted)
          // console.log(percentageCompleted)
        }
      })
      const data = await response.data.results
      setSuggest(data)
      // console.log(data)
      sessionStorage.setItem("suggest", JSON.stringify(data))
    } catch {
      setError(true)
    } finally {
      setIsLoadingSuggest(false)
    }
  }
  const fetchDj = async() => {
  setError(false)
  try {
    const response = await api.get('/dj_Total', {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressDj(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    const data = await response.data.results
    setDjs(data)
    // console.log(data)
    sessionStorage.setItem("dj", JSON.stringify(data))
  } catch {
    setError(true)
  } finally {
    setIsLoadingDj(false)
  }
}
const fetchGenre = async() => {
  setError(false)
  try {
    const response = await api.get('/genre', {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressGenre(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    const data = await response.data.results
    setGenres(data)
    // console.log(data)
    sessionStorage.setItem("genres", JSON.stringify(data))
  } catch {
    setError(true)
  } finally {
    setIsLoadingGenres(false)
  }
}
const fetchPopular = async() => {
  setError(false)
  try {
    const response = await api.get('/videoDetails/?popular=true&page_size=10&ordering=-date_uploaded', {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressPopular(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    const data = await response.data.results
    setPopular(data)
    // console.log(data)
    sessionStorage.setItem("popular", JSON.stringify(data))
  } catch {
    setError(true)
  } finally {
    setIsLoadingPopular(false)
  }
}
const fetchAnime = async() => {
  setError(false)
  try {
    const response = await api.get('/videoDetails/?cartegory=anime&ordering=-date_uploaded&page_size=10', {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressAnime(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    const data = await response.data.results
    setAnime(data)
    // console.log(data)
    sessionStorage.setItem("anime", JSON.stringify(data))
  } catch {
    setError(true)
  } finally {
    setIsLoadingAnime(false)
  }
}
const fetchSeries = async() => {
  setError(false)
  try {
    const response = await api.get('/videoDetails/?cartegory=series&ordering=-date_uploaded&page_size=10', {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressSeries(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    const data = await response.data.results
    setSeries(data)
    // console.log(data)
    sessionStorage.setItem("series", JSON.stringify(data))
  } catch {
    setError(true)
  } finally {
    setIsLoadingSeries(false)
  }
}
const fetchMovie = async() => {
  setError(false)
  try {
    const response = await api.get('/videoDetails/?cartegory=movie&ordering=-date_uploaded&page_size=10', {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgressMovie(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    const data = await response.data.results
    setMovies(data)
    // console.log(data)
    sessionStorage.setItem("movies", JSON.stringify(data))
  } catch {
    setError(true)
  } finally {
    setIsLoadingMovie(false)
  }
}

useEffect(() => {
  // if item in session take it else fetch
  const recent = sessionStorage.getItem('recent')
  const dj = sessionStorage.getItem('dj')
  const gen = sessionStorage.getItem('genres')
  const pop = sessionStorage.getItem('popular')
  const anim = sessionStorage.getItem('anime')
  const movi = sessionStorage.getItem('movies')
  const serie = sessionStorage.getItem('series')
  const sugges = sessionStorage.getItem('suggest')
  if (sugges) {
    setSuggest(JSON.parse(sugges))
    setProgressSuggest(100)
    setIsLoadingSuggest(false)
  } else {
    fetchSuggest()
  }
  if (anim) {
    setAnime(JSON.parse(anim))
    setProgressAnime(100)
    setIsLoadingAnime(false)
  } else {
    fetchAnime()
  }
  if (movi) {
    setMovies(JSON.parse(movi))
    setProgressMovie(100)
    setIsLoadingMovie(false)
  } else {
    fetchMovie()
  }
  if (serie) {
    setSeries(JSON.parse(serie))
    setProgressSeries(100)
    setIsLoadingSeries(false)
  } else {
    fetchSeries()
  }
  if (recent) {
    setData(JSON.parse(recent))
    setProgress(100)
    setIsLoading(false)
  } else {
    fetchData()
  }
  if (dj) {
    setDjs(JSON.parse(dj))
    setProgressDj(100)
    setIsLoadingDj(false)
  } else {
    fetchDj()
  }
  if (gen) {
    setGenres(JSON.parse(gen))
    setProgressGenre(100)
    setIsLoadingGenres(false)
  } else {
    fetchGenre()
  }
  if (pop) {
    setPopular(JSON.parse(pop))
    setProgressPopular(100)
    setIsLoadingPopular(false)
  } else {
    fetchPopular()
  }
  
  // paid videos
  const mytitles = localStorage.getItem('myListTitles')
  if (mytitles) {
    setMyListTitles(JSON.parse(mytitles))
  }
}, [])
const settingNavigating = (value) => {
  setNavigating(value)
}
return (
  <div className={`${navigating ? 'opacity-90' : null}`}>
    <MainLayout>
      {isLoading && isLoadingAnime && isLoadingDj && isLoadingGenres && isLoadingMovie && isLoadingPopular && isLoadingSeries && isLoadingSuggest ? <div>
        <Loader progres={(progres + progresDj + progresGenre + progresPopular+ progresAnime + progresMovie + progresSeries + progresSuggest ) / 8} />
      </div> : <>
        <Slide datas={datas} myListTitles={myListTitles} settingNavigating={settingNavigating} />
        <Recent datas={suggests} myListTitles={myListTitles} settingNavigating={settingNavigating} />
        <Trending datas={popular} myListTitles={myListTitles} />
        <TvShows datas={series} myListTitles={myListTitles} />
        <Movie datas={movies} myListTitles={myListTitles} />
        <Anime datas={anime} myListTitles={myListTitles} />
        <Genre datas={genres} myListTitles={myListTitles}/>
        <Dj datas={djs} myListTitles={myListTitles} />
        <Footer/>
      </>}
    </MainLayout>
  </div>
)
}

export default Homepage
