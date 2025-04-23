import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../ui/Header'
import Neutral from '../ui/Neutral'
import Footer from '../ui/Footer'
import { BounceLoader } from 'react-spinners';
import ClipLoader from "react-spinners/ClipLoader";
import api, { config } from '../assets/js/api'

const Search = () => {
  const [datas, setDatas] = useState([])
  const {searchTerm} = useParams()
  const [loading, setLoading] = useState(true)
  const [redirecting, setRedirecting] = useState(false)
    const [paidTitles, setPaidTitles] = useState([])
    const navigate = useNavigate()
  const fetchResult =async(search) => {
    setLoading(true)
    const response = await api.get(`/videoDetails/?type=&title=${search}&ordering=-date_uploaded&page_size=100`, config)
    const data = await response.data.results
    setDatas(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchResult(searchTerm)
    const paid = localStorage.getItem("own")
      if (paid) {
        setPaidTitles(JSON.parse(paid))
      }
  }, [searchTerm])
  const handleRedirect = async (vida) => {
    setRedirecting(true)
    // console.log(vida)
    api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, config)
    .then(res1 => {
      const data1 = res1.data.results
      localStorage.setItem("similar", JSON.stringify(data1))
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
    <div>
      <Header/>
      <main className='min-h-96'>
     


      {/* =========================== */}
      <div className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-10   items-center justify-center gap-1 bg-slate-900 ${redirecting ? 'flex' : 'hidden'}`}>
              <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
              <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
              <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
              <BounceLoader color="#36D7B7" loading={redirecting} size={20} />
              </div>
      <section className='min-h-60'>
         
      {loading ? <div className='h-40 grid place-content-center'>
      <ClipLoader
        color={"gray"}
        loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    : 
    <>
    <p className='textMidSm text-gray-500 text-center whitespace-nowrap overflow-hidden py-2 hyphen-separator'>
    <span>{datas.length} results found from your search <q className='px-2 '>{searchTerm}</q></span>
  </p>
         <div className="p-3  neutral lg:w-5/6 lg:mx-auto   border-b border-gray-500 border-opacity-15" >
    {datas.map((item) => (
            <div key={item.vidId} className="relative rounded-sm overflow-hidden" onClick={() => {
              handleRedirect(item)
             }}>
              <figure >
                <img className='h-full w-full block object-cover' src={require(item.image)} alt="" />
              </figure>
              <p className='title'>{item.title}</p>
            </div>
          ))}
        </div>
    </>}
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Search
