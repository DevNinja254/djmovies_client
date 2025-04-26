import React, {useState, useEffect, useRef} from 'react'
import MainLayout from '../layout/MainLayout'
import Loader from '../ui/Loader'
import { useNavigate } from 'react-router-dom'
import api, { config } from '../assets/js/api'
const Mp4 = () => {
    const [cart, setCart] = React.useState([])
    const [movie, setMovie] = React.useState()
    const [cartExist, setCartExist] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [similar, setSimilar] = React.useState([])
    const [error, setError] = React.useState(false)
    const [buying, setBuying] = React.useState(false)
    const [userData, setUserData] = useState({})
    const [authenticated, setAuthenticated] = useState(false)
    const [progress, setProgress] = useState(10)
    const [progressProfile, setProgressProfile] = useState(10)
    const [progressPurchase, setProgressPurchase] = useState(10)
    const [progressVideo, setProgressVideo] = useState(10)
    const [myListTitles, setMyListTitles] = useState([])
    const vidRef = useRef(null)
    const navigate = useNavigate()
    const handleBuy = async() => {
        setBuying(true)
        // console.log(authenticated)
        if(authenticated) {
            if (window.confirm(`Purchase ${movie.title} at Ksh. ${movie.price}. Your account balance is Ksh.${userData.profile.account}`)){
            if(userData.profile.account >= movie.price){
                const data = {
                video_id: movie.vidId,
                video_name: movie.title,
                image_url: movie.image,
                price: movie.price,
                username: userData.username,
                }
                try{
                api.patch(`/profile/${userData.profile.buyerid}/`, {account: (userData.profile.account - (movie.price))}, {
                  ...config,
                  onDownloadProgress: (progressEvent) => {
                    const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgressProfile(percentageCompleted)
                    
                }})
                .then(res => {
                    try {
                    api.patch(`/videoDetails/${movie.vidId}/`, {purchase_times: (movie.purchase_times + 1)}, {
                      ...config,
                      onDownloadProgress: (progressEvent) => {
                        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        setProgressVideo(percentageCompleted)
                        
                    }})
                    .then(res => {
                        // console.log(res.data)
                    })
                    } catch(error) {
                    // console.log(error)
                    }
                    try {
                    api.post("/purchased/", data, {
                      ...config,
                      onDownloadProgress: (progressEvent) => {
                        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        setProgressPurchase(percentageCompleted)
                        
                    }})
                    .then(response => 
                    {
                        const data1 = response.data
                        // console.log(data1)
                        const paidvid = localStorage.getItem("myList")
                        const paday = localStorage.getItem("myListTitles")
                        if (paidvid) {
                        const paid = JSON.parse(paidvid)
                        localStorage.setItem("myList", JSON.stringify([...paid, data]))
                        } else {
                        localStorage.setItem("myList", JSON.stringify([data]))
                        }
                        if (paday) {
                        const paid = JSON.parse(paday)
                        localStorage.setItem("myListTitles", JSON.stringify([...paid, movie.title]))
                        }else {
                        localStorage.setItem("myListTitles", JSON.stringify([movie.title]))
                        }
                        
                        navigate(`/watch/${movie.vidId}`)
                    })
                    
                    }catch (error){
                console.log(error)
                setError(true)
                setBuying(false)
                } finally {
                
                setTimeout(() => {
                    setError(false)
                }, 3000);
                }
                })
                }catch(error) {
                setFailedPurchased(true)
                }
            }else {
                navigate("/deposit")
            }
            } else {
              setBuying(false)
            }
        } else {
            navigate("/account/authenticate")
        }
    }
    const handleCart = async() => {
        localStorage.setItem("cart", JSON.stringify([...cart, {
            video_id: movie.vidId, 
            video_name: movie.title,
            image_url: movie.image,
            price: movie.price,
            purchase_times: movie.purchase_times,
            season: movie.season,
            dj: movie.dj
          }]))
            setCartExist(true)
            setCart([...cart, movie.title])
            navigate("/cart")
    }
    useEffect(() => {
        window.scrollTo(0,0)
        const carty = localStorage.getItem("cart")
        const video = sessionStorage.getItem("toPlay")
        const sim = sessionStorage.getItem("similar")
        if (video) {
          setMovie(JSON.parse(video))
          setSimilar(JSON.parse(sim))
          setProgress(100)
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        } 
        if (carty) {
          setCart(JSON.parse(carty))
          for (const cartItem of JSON.parse(carty)) {
            if (cartItem.video_name === JSON.parse(video).title) {
              setCartExist(true)
              break
            }
          }
        }
        const mytitles = localStorage.getItem('myListTitles')
        if (mytitles) {
        setMyListTitles(JSON.parse(mytitles))
        }
      }, []) 
      const fetchUserData = async(token) => {
        const configer = {
          headers : {
              "Authorization" : `Bearer ${token}`
          }
          }
          try {
          api.get("/info/", configer)
          .then(res => {
              const dataProfile = res.data
                // console.log(dataProfile)
              setUserData(dataProfile)
              setAuthenticated(true)
          })} catch(error) {
              setAuthenticated(false)
              console.log(error)
          }
      }
      useEffect(() => {
          const token = localStorage.getItem("auth")
          const authorized = localStorage.getItem("authorized")
            if (authorized == "true"){
              if(token) {
                fetchUserData(token)
              } else {
                setAuthenticated(true)
              }
          }else {
            setAuthenticated(false)
          }
      }, [])
      const handleRedirect = async (vida) => {
        if(vidRef.current) {
            vidRef.current.scrollIntoView({behaviour: 'smooth'}) 
        }
        setProgress(10)
        // setLoading(true)
        // console.log(vida)
        api.get(`/videoDetails/?genre=${vida.genre}&page_size=6&ordering=-date_uploaded`, {
          ...config,
          onDownloadProgress: (progressEvent) => {
            const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentageCompleted)
            // console.log(percentageCompleted)
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
                setMovie(vida)
                setSimilar(data1)
                    for (const cartItem of cart) {
                      if (cartItem.video_name === vida.title) {
                        setCartExist(true)
                        break
                      } else {
                        setCartExist(false)
                      }
                    }
            }
          }else {
            navigate(`/video/${vida.vidId}/`)
          }
    
        })
      }
      
  return (
   <MainLayout>
    <div className='bg-slate-800 bg-opacity-20 pt-10'>
      {buying ? <div>
        <Loader progres={(progressProfile + progressPurchase + progressVideo) / 3}/>
      </div> : null}
        {loading   ? <>
          <Loader progres={progress} />
        </>
         : <>
            <div className='p-3' ref={vidRef}>
            <p className='text-orange-600 font-bold text-xl capitalize font-mono'>{movie.title}</p>
            <p className='text-sky-800 font-bold text-lg capitalize'>Ksh.{movie.price}</p>
        </div>
        <div className='p-3 md:w-5/6 lg:grid lg:grid-cols-2 mx-auto gap-4'>
            <div className='bg-white mb-3 h-fit'>
                <figure className='store'>
                    <img src={require(movie.image)} className='block w-full h-full img1 object-cover' alt="" />
                </figure>
                <div className='flex gap-1 recentColor text-sm capitalize font-bold font-serif tracking-wide'>
                    <h1>{movie.title}</h1>
                    <span>/</span>
                    <p>{movie.season}</p> 
                    <span>/</span>
                    <p>{movie.cartegory}</p>   
                    <span>/</span>
                    <p>{movie.dj}</p>   
                    <span>/</span>
                    <p>Ksh.{movie.price}</p>        
                </div>
                <p className='text-sm text-slate-700 font-serif tracking-wide'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti et nesciunt rem, sunt sit facilis? Sunt optio quos quo accusamus?</p>
                {cartExist ? <button disabled={true} className='bg-slate-500 text-white rounded-lg p-2 text-sm font-bold m-2'>Movie in cart</button> : <div className='p-2 pb-4 flex gap-3 items-center '>
                    <button disabled={buying} className={`bg-slate-900 text-white rounded-lg p-2 text-sm font-bold ${buying ? "opacity-80" : "opacity-100"}`} onClick={handleBuy}>{buying ? "Buying..." : "Buy"}</button>
                    <button className='bg-slate-900 text-white rounded-lg p-2 text-sm font-bold'  onClick={handleCart}>Add to cart</button>
                </div>}
            </div>
            {/* similar */}
            <div className='bg-white xl:w-2/3'>
                < h2 className='p-2 font-bold border-b-2 border-gray-500 border-opacity-20'>Similar to {movie.title}</h2>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 p-3 bg-white xl:grid-cols-2'>
                    {similar.map((item) => (
                        <div key={item.vidId} className='flex flex-col shadow-sm shadow-gray-300' onClick={() => {
                            handleRedirect(item)
                          }}>
                        <figure className='figure relative'>
                            <img src={require(item.image)} className='block w-full h-full object-cover similarImg' alt="" />
                            <figcaption className='absolute bottom-0 text-white font-bold p-1 bg-black w-full bg-opacity-30'>{item.title}</figcaption>
                        </figure>
                        <p className='textSm text-gray-600 tracking-wide'>{item.synopsis.length < 100 ? item.synopsis:item.synopsis.substring(0, 100) + "[...]"}.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>}
    </div>
   </MainLayout>
  )
}

export default Mp4
