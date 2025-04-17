import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Popular from './pages/Popular'
import Genre from './pages/Genre'
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
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Deejay/>}/>
        <Route path='/dj/:dj' element={<Deejay/>}/>
        <Route path='/popular/:dj' element={<Popular/>}/>
        <Route path='/genre/:dj' element={<Genre/>}/>
        <Route path="/store/:id" element={<Store/>}/>
        <Route path="/play/:id" element={<Play/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/account/dashboard' element={<DashBoard/>}/>
        <Route path='/account/cart' element={<Cart/>}/>
        <Route path="/account/deposit" element={<Deposit/>}/>
        <Route path='/account/authenticate' element={<Authetication/>}/>
        <Route path='/account/password_reset' element={<ForgotpwdForm/>}/>
        <Route path='/account/password_reset/:slug' element={<Pwdrest/>}/>
        <Route path='/search/:searchTerm' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
