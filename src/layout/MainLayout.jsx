import React, {useEffect, useRef, useState} from 'react'
import Header from '../components.jsx/mainlayout/Header'
import SideBar from '../components.jsx/mainlayout/SideBar'
import SideBar2 from '../components.jsx/mainlayout/SideBar2'
import { IoSearch as Search } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const MainLayout = ({children}) => {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(window.innerWidth)
  const sliderRef = useRef(null)
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBar, setSearchBar] = useState(false)
  const [changeBg, setChangeBg] = useState(false)
  const [navBar, setNavBar] = useState(false)
  const [navBar2, setNavBar2] = useState(true)
  const navigate = useNavigate() 
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchBar(false)
        navigate(`/search/${searchTerm}`)

    }
    const setttingSearch = () => {
      searchBar ? setSearchBar(false) : setSearchBar(true)
    }
    const setttingnav = (value) => {
      setNavBar(value) 
    }
    const setttingnav2 = (value) => {
      navBar2 ? setNavBar2(false):setNavBar2(true)
    }
    const handleScroll = () => {
      // setScrollY(window.scrollY);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        if (window.scrollY > rect.top) {
          setChangeBg(true)
        } else {
          setChangeBg(false)
        }
      }      
    };
    useEffect(() => {
      const path = window.location.pathname
      if(path == '/') {

        window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
      } else {
        setChangeBg(true)
      }
      
    }, [])
   const hideBar = (e) => {
     if(sliderRef.current && !sliderRef.current.contains(e.target)){
      setNavBar(false)
     }
    // console.log('clicked')
    
   }
  //  hide bar
  useEffect(() => {
    document.addEventListener("mousedown", hideBar)
    return () => {
      document.removeEventListener('mousedown', hideBar)
    }
  }, [])
  // width resize
  const handleResize = () => {
    setWidth(window.width)
    // if(window.innerWidth < 900) {
    //   setNavBar2(false)
    // } else {
    //   setNavBar2(true)
    // }
  }
  useEffect(() => {
    if(width < 900) {
      setNavBar2(false)
      setNavBar(false)
    } else {
      setNavBar2(true)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div id="mainLayout ">
     <Header  setttingnav={setttingnav} setttingnav2={setttingnav2} changeBg={changeBg}/>
     <div className={``}>
      {/* sliding bar */}
        <div className={`${navBar ? "fixed top-0 left-0 w-full z-20 h-full grid grid-cols-3 transition-all duration-100 ease-linear" : "hidden"}`}>
            <div className='col-span-2' ref={sliderRef}>
            <SideBar setttingnav={setttingnav}/>
            </div>
        </div>
        <div className='splitContainer'>
          <div className={` ${navBar2 ? 'block' : 'hidden'}`}>
              <SideBar2 />
            </div>
          <div className={`bgBlack w-full transition-all duration-150 ease ${navBar2 ? 'col-span-1 container' : 'col-span-2'}`} ref={containerRef}>
            {children}
          </div>
        </div>
     </div>
    </div>
  )
}

export default MainLayout
// style={{
//   maxHeight: "93vh",
//   overflowY: "scroll",
//   overflowX: "hidden"
// }}