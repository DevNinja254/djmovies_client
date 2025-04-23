import React, {useState, useEffect} from 'react'
import Layout from '../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { createLoop } from '../assets/js/createloop'
import ClipLoader from "react-spinners/ClipLoader";
import api, { config } from '../assets/js/api'
import { BounceLoader } from 'react-spinners';
const Genre = () => {
    const {dj} = useParams()
    const [genre, setGenre] = useState('Action')
    const genres = ["Action", "horror", "Adventure", "comedy", "sci fi", "romance"]
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const [paidTitles, setPaidTitles] = useState([])
    const navigate = useNavigate() 
    const linkStyle = {
      display: 'inline-block',
      padding: '5px 10px',
      textDecoration: 'none',
      color: '#333', // Default text color
      backgroundColor: '#f0f0f0', // Default background color
      marginRight: '5px',
      fontSize: '14px',
      
    };
  
    const activeLinkStyle = {
      backgroundColor: 'orange',
      color: 'white',
    };
    const fetchData = async(dj, genre) => {
      setLoading(true)
      const response = await api.get(`/videoDetails/?type=dj_${dj}&ordering=-date_uploaded&page_size=1000&genre=${genre}`, config)
      const data = response.data.results
      setData(data)
      setLoading(false)
    }
    useEffect(() => {
      fetchData(dj,genre)
      const paid = localStorage.getItem("own")
      if (paid) {
        setPaidTitles(JSON.parse(paid))
      }
    }, [genre])
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
      <div style={{
            borderBottom: '1px solid orange',
            marginTop: '0.5rem',
            marginBottom: '0.5rem'
        }}>
          <div className="p-3 pb-0  neutral lg:w-5/6 lg:mx-auto " >
        {genres.map((item) => (
          <div key={item} style={item.toLowerCase() === genre.toLowerCase() ? {...linkStyle, ...activeLinkStyle} : linkStyle} className="inline-block rounded-sm overflow-hidden hover:cursor-pointer">
            <p className='capitalize' onClick={() => {
              setGenre(item)
            }} >{item}</p>
          </div>
        ))}
      </div>
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
    :   <div className="p-3  neutral lg:w-5/6 lg:mx-auto   border-b border-gray-500 border-opacity-15">
          { data.map((item) => (
            <div key={item.vidId} className="relative rounded-sm overflow-hidden" onClick={() => {
              handleRedirect(item)
             }}>
              <figure className='fig'>
                <img className='h-full w-full block object-cover' src={require(item.image)} alt="" />
              </figure>
              <p className='title z-30'>{item.title}</p>
            </div>
          ))}
        </div>}
        </section>
    </Layout>
  )
}

export default Genre
