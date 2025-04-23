import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import Slide from '../components.jsx/homepage/Slide'
import Recent from '../components.jsx/homepage/Recent'
import api, { config } from '../assets/js/api'
import Loader from '../ui/Loader'

const Homepage = () => {
  const [progres, setProgress] = useState(10)
  const [datas, setData] =  useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [myListTitles, setMyListTitles] = useState([])
  const [navigating, setNavigating] = useState(false)
  const fetchData = async() => {
    setError(false)
    try {
      const response = await api.get('/videoDetails/?page_size=20&ordering=-date_uploaded', {
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
  useEffect(() => {
    // if item in session take it else fetch
    const recent = sessionStorage.getItem('recent')
    if(recent) {
      setData(JSON.parse(recent))
      setIsLoading(false)
    } else {
      fetchData()
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
    <div className={`${navigating ? 'opacity-90': null}`}>
      <MainLayout> 
      {isLoading ? <div>
        <Loader progres={progres}/> 
      </div> : <>
        <Slide datas={datas.slice(0, 10)} myListTitles={myListTitles} settingNavigating={settingNavigating} />
        <Recent datas={datas.slice(10)} myListTitles={myListTitles} settingNavigating={settingNavigating}/>
      </>}
      </MainLayout>
    </div>
  )
}

export default Homepage
