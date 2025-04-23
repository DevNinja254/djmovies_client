import React from 'react'

const Loader = ({progres}) => {
  return (
    <span className='fixed h-1 bg-red-600 top-0 left-0 z-30 ' style={{
        width: `${progres}%`,
        transition: 'all 100ms ease-linear '
       }}>
       </span>
  )
}

export default Loader
