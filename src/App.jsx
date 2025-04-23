import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Popular from './pages/Popular'
import Genre from './pages/Genre'
import GenreCopy from './pages/GenreCopy'
import Deejay from './pages/Deejays'
import Store from './pages/Store'
import Play from './pages/Play'
import Profile from './pages/Profile'
import DashBoard from './pages/DashBoard'
import Cart from './pages/Cart'
import Deposit from './pages/Deposit'
import Authetication from './pages/Authetication'
import ForgotpwdForm from './pages/ForgotpwdForm'
import Pwdrest from './pages/Pwdrest'
import Search from './pages/Search'
import Dj from './pages/Dj'
import New from './pages/New'
import Mp4 from './pages/Mp4'
import Watch from './pages/Watch'
import Account from './pages/Account'
import Contact from './pages/Contact'
import About from './pages/About'
import Notifications from './pages/Notifications'
import Guide from './pages/Guides'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/dj/:dj' element={<Deejay/>}/>
        <Route path='/popular/:dj' element={<Popular/>}/>
        <Route path='/genre/:dj' element={<GenreCopy/>}/>
        <Route path="/store/:id" element={<Store/>}/>
        <Route path="/play/:id" element={<Play/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/deposit" element={<Deposit/>}/>
        <Route path='/account/authenticate' element={<Authetication/>}/>
        <Route path='/account/password_reset/:slug' element={<Pwdrest/>}/>
        <Route path='/search/:searchTerm' element={<Search/>}/>
        {/* ------------------------------------------------------ */}
        <Route path='/genre' element={<Genre/>}/>
        <Route path="/deejays" element={<Dj/>} />
        <Route path="/new" element={<New/>} />
        <Route path="/video/:id" element={<Mp4/>}/>
        <Route path="/watch/:id" element={<Watch/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/about" element={<About/>} />
        <Route path='/notifications' element={<Notifications/>} />
        <Route path='/guide' element={<Guide/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
