import React, { useEffect, useState } from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import api, { config } from '../assets/js/api'
import { useNavigate } from 'react-router-dom'
const Store = () => {
  const [cart, setCart] = React.useState([])
  const [movie, setMovie] = React.useState()
  const [cartExist, setCartExist] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [similar, setSimilar] = React.useState([])
  const [error, setError] = React.useState(false)
  const [buying, setBuying] = React.useState(false)
  const [userData, setUserData] = useState({})
  const [authenticated, setAuthenticated] = useState(false)
  const[failedPurchased, setFailedPurchased] = useState(false)
  const [isPurchasing, setPurchasing] = useState(false)
  const navigate = useNavigate()
//  //////////////////buiny////////////////
const handleBuy = async() => {
  setBuying(true)
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
          api.patch(`/profile/${userData.profile.buyerid}/`, {account: (userData.profile.account - (movie.price))}, config)
          .then(res => {
            try {
              api.patch(`/videoDetails/${movie.vidId}/`, {purchase_times: (movie.purchase_times + 1)}, config)
              .then(res => {
                // console.log(res.data)
              })
            } catch(error) {
              console.log(error)
            }
            try {
              api.post("/purchased/", data, config)
              .then(response => 
              {
                const data1 = response.data
                // console.log(data1)
                const paidvid = localStorage.getItem("ownVideo")
                const paday = localStorage.getItem("own")
                if (paidvid) {
                  const paid = JSON.parse(paidvid)
                  localStorage.setItem("ownVideo", JSON.stringify([...paid, data]))
                } else {
                  localStorage.setItem("ownVideo", JSON.stringify([data]))
                }
                if (paday) {
                  const paid = JSON.parse(paday)
                  localStorage.setItem("own", JSON.stringify([...paid, movie.title]))
                }else {
                  localStorage.setItem("own", JSON.stringify([movie.title]))
                }
                
                navigate(`/play/${movie.vidId}`)
              })
              
            }catch (error){
          console.log(error)
          setError(true)
        } finally {
          setBuying(false)
          setTimeout(() => {
            setError(false)
          }, 3000);
        }
          })
        }catch(error) {
          setFailedPurchased(true)
        }
      }else {
        navigate("/account/deposit")
      }
    }
  } else {
    navigate("/account/authenticate")
  }
}
////////buying///////////////////
  const handleCart = () => {
    localStorage.setItem("cart", JSON.stringify([...cart, {
    video_id: movie.vidId, 
    video_name: movie.title,
    image_url: movie.image,
    price: movie.price,
    purchase_times: movie.purchase_times,
    season: movie.season,
    type: movie.type
  }]))
    setCartExist(true)
    setCart([...cart, movie.title])
    navigate("/account/cart")
  }
  useEffect(() => {
    window.scrollTo(0,0)
    const carty = localStorage.getItem("cart")
    const video = sessionStorage.getItem("toPlay")
    const sim = sessionStorage.getItem("similar")
    if (video) {
      setMovie(JSON.parse(video))
      setSimilar(JSON.parse(sim))
      setLoading(false)
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
  }
  , [])
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

  return (
    <div className='bg-slate-800 bg-opacity-20 min-h-screen'>
     {error ? <p className='bg-red-600 text-sm p-2 font-bold text-white fixed top-1 left-2 z-20 rounded-md'>Error Purchasing video, Try again!</p> : null}
      <Header/>
     {loading ? <div className='flex justify-center items-center h-screen'></div> : <>
      <div className='p-3'>
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
            <p>{movie.genre}</p>   
            <span>/</span>
            <p>{movie.type}</p>   
            <span>/</span>
            <p>Ksh.{movie.price}</p>        
          </div>
          <p className='text-sm text-slate-700 font-serif tracking-wide'>{movie.synopsis}</p>
         {cartExist ? <button disabled={true} className='bg-slate-500 text-white rounded-lg p-2 text-sm font-bold m-2'>Movie in cart</button> : <div className='p-2 pb-4 flex gap-3 items-center '>
            <button disabled={buying} className={`bg-slate-900 text-white rounded-lg p-2 text-sm font-bold ${buying ? "opacity-80" : "opacity-100"}`} onClick={handleBuy}>{buying ? "Buying..." : "Buy"}</button>
            <button className='bg-slate-900 text-white rounded-lg p-2 text-sm font-bold'  onClick={handleCart}>Add to cart</button>
          </div>}
      </div>
      <div className='bg-white xl:w-1/2'>
        < h2 className='p-2 font-bold border-b-2 border-gray-500 border-opacity-20'>Similar to {movie.title}</h2>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 p-3 bg-white xl:grid-cols-1'>
          {similar.map((item) => (
            <div key={item.vidId} className='flex flex-col shadow-sm shadow-gray-300'>
              <figure className='figure relative'>
                <img src={require(item.image)} className='block w-full h-full object-cover' alt="" />
                <figcaption className='absolute bottom-0 text-white font-bold p-1 bg-black w-full bg-opacity-30'>{item.title}</figcaption>
              </figure>
              <p className='textSm text-gray-600 tracking-wide'>{item.synopsis.length < 100 ? item.synopsis:item.synopsis.substring(0, 100) + "[...]"}.</p>
            </div>
          ))}
        </div>
      </div>
     </div>
     </>}
     <Footer/>
    </div>
  )
}

export default Store
