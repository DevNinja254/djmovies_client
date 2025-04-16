import React, { useEffect, useState } from 'react'
import Account from '../layout/Account'
import { useNavigate } from 'react-router-dom'
import api, { config } from '../assets/js/api'
const Cart = () => {
    const carr = [1,1,1,1]
    const [total, setTotal] = useState(0)
    const [authenticated, setAuthenticated] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    const [userData, setUserData] = useState()
     // console.log(cart)
     const getTotal = (objs) => {
        let ttl = 0
        for (const totl of objs) {
            ttl += totl.price
        }
        setTotal(ttl)
       }
    // cart items
    const settingCart = () => {
        const carty = localStorage.getItem("cart")
        if (carty) {
            setCart(JSON.parse(carty)) 
            getTotal(JSON.parse(carty))          
        }
   }
   const remove = (title) => {
        if(true) {
            const datz = cart.filter(obj => obj.video_name !== title)
            localStorage.setItem("cart", JSON.stringify(datz))
            // console.log(datz)
            settingCart()
            
        }
    }
    const purchase = () => {
        if (authenticated) {
            if (window.confirm(`Purchase ${cart.length} movies at cost of Ksh ${total}. Your account balance is Ksh.${userData.profile.account}`)) {
                // console.log(userData.profile)
                if (userData.profile.account >= total) {
                    
                    api.patch(`/profile/${userData.profile.buyerid}/`, {account: userData.profile.account - total}, config)
                    .then(res => {
                        // console.log(res.data)
                        for (const carty of cart) {
                            //////increase purchase times/////////////
                            try {
                                api.patch(`/videoDetails/${carty.video_id}/`, {purchase_times: (carty.purchase_times + 1)}, config)
                                .then(res => {
                                  // console.log(res.data)
                                })
                              } catch(error) {
                                console.log(error)
                              }
                            //////////purchase time//////
                            // -------purchase record----------
                            api.post("/purchased/", {
                                video_id: carty.video_id,
                                video_name: carty.video_name,
                                image_url: carty.image_url,
                                price: carty.price,
                                username: userData.username
                            }, config)
                            .then(res => {
                                // console.log(res.data)
                                const data = res.data
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
                                localStorage.setItem("own", JSON.stringify([...paid, carty.video_name]))
                                }else {
                                localStorage.setItem("own", JSON.stringify([carty.video_name]))
                                }
                                // remove(res.data.video_name)
                            })
                            // -------purchase record----------
                        }
                        localStorage.removeItem("cart")
                    })
                    navigate("/profile")
                } else {
                    navigate("/account/deposit/")
                }
            }
        } else {
           navigate("/account/authenticate/")
        }
    }   
    const authenticating = async(token) => {
        const config = {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }
        try {
        const response = await api.get("/info/", config)
        const dataProfile = await response.data
            setUserData(dataProfile)
            setAuthenticated(true)
        //    console.log(res.data)
        } catch(error) {
            setAuthenticated(true)
            console.log(error)
        }
    }
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "Your Cart"
        settingCart()
        const token = localStorage.getItem("auth")
        if(token) {
            authenticating(token)
        }
    }, [])
   
       
  return (
    <Account>
      <main className='cart text-white'>
        <h2 className=' text-center py-3 font-bold font-mono'>Your Cart ({cart.length} items)</h2>
        <div className='p-3 lg:w-10/12 m-auto'>
            <div className='sm:grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4'>
                {cart.map((cat, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 bg-slate-600 p-3 rounded-md bg-opacity-30 my-3'>
                    <figure>
                        <img src={require(cat.image_url)} className='img rounded-md block' alt="" />
                    </figure>
                    <div className='text-sm font-mono capitalize  text-amber-900'>
                        <p className=''>{cat.video_name}</p>
                        <p>{cat.season}</p>
                        <p>{(cat.type).split("_").join(" ")}</p>
                        <p>Ksh.{cat.price}</p>
                        <span className='bg-red-700 text-white p-1 mt-2 block text-center rounded-md text-sm font-bold hover:cursor-pointer hover:opacity-80' onClick={() => {
                            remove(cat.video_name)
                        }}>Remove</span>
                    </div>
                </div>
                ))}                
            </div>
            <div className='bg-slate-800 bg-opacity rounded-md p-3'>
                    <span className='flex gap-3 text-sm font-mono tracking-wide'>
                        <p>Estimated Total: </p>
                        <p>Ksh.{total}</p>
                    </span>
                    <button className='bg-green-700 my-2 p-2 rounded-md text-sm font-bold hover:opacity-80' onClick={purchase}>Purchase</button>
                </div>
        </div>
        
      </main>
    </Account>
  )
}

export default Cart
