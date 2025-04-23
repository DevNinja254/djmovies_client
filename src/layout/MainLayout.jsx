import React, {useState} from 'react'
import Header from '../components.jsx/mainlayout/Header'
import SideBar from '../components.jsx/mainlayout/SideBar'
import { IoSearch as Search } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const MainLayout = ({children}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBar, setSearchBar] = useState(false)
  const [navBar, setNavBar] = useState(true)
  const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchBar(false)
        navigate(`/search/${searchTerm}`)

    }
    const setttingSearch = () => {
      searchBar ? setSearchBar(false) : setSearchBar(true)
    }
    const setttingnav = () => {
      navBar ? setNavBar(false) : setNavBar(true)
    }
  return (
    <div id="mainLayout">
     <Header setttingSearch={setttingSearch} setttingnav={setttingnav}/>
     <div className={`grid-cols-4 ${navBar ? 'grid' : "block"} lg:grid-cols-5 2xl:grid-cols-7`} style={{
        minHeight: "93vh"
     }}>
        <div className={`${navBar ? "block" : "hidden"}`}>
            <SideBar/>
        </div>
        <div className={`col-span-3 lg:col-span-4
           2xl:col-span-6 relative `}>
             {/* Search form */}
            <form onSubmit={handleSubmit} className={`absolute top-0 left-0 w-5/6  z-10 ${searchBar ? "flex" : 'hidden'} items-center border border-gray-600 m-2 border-opacity-45 rounded-md overflow-hidden bg-white`}>
                <input type="text" name='searchTerm' value={searchTerm} autoFocus required className='w-full block outline-none bg-transparent p-1 text-gray-600 text-sm' placeholder='Kimoda, demon hunter' onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} />
                <button onSubmit={handleSubmit} className='bg-gray-500 p-1 text-white'><Search size={20}/></button>
        </form>
            <div className='container' style={{
        maxHeight: "93vh",
        overflowY: "scroll",
        overflowX: "hidden"
     }}>
            {children}
            </div>
        </div>
     </div>
    </div>
  )
}

export default MainLayout
