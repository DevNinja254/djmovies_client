import React from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'

const Form = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default Form
