import React from 'react'
import Header from '../ui/Header'
import Neutral from '../ui/Neutral'
import Links from '../ui/Links'
import Footer from '../ui/Footer'

const Layout = ({children, dj ="smith"}) => {
  return (
    <div>
      <Header dj={dj}/>
      <Neutral />
      <Links dj={dj}/>
      <div className='container'>
      {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
