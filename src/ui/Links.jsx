import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
const Links = ({dj = "smith"}) => {
    const linkRef = useRef(null)
    const linkStyle = {
        display: 'inline-block',
        padding: '5px 10px',
        textDecoration: 'none',
        color: '#333', // Default text color
        backgroundColor: '#f0f0f0', // Default background color
        marginRight: '5px',
        fontSize: '14px',
        
      };
    
      const activeLinkStyle = {
        backgroundColor: 'rgb(45, 106, 177)',
        color: 'white',
      };
      if(linkRef.current) {
        linkRef.current.scrollIntoView()
      }
      return (
        <div className='lg:w-5/6 lg:mx-auto' ref={linkRef}>
          <nav className='mt-4 border-b-4 border-gray-500 border-opacity-15 mx-2 pb-3 '>
          <NavLink
            to={dj == 'smith' ? "/" : `/dj/${dj}`}
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
          >
            Recent
          </NavLink>
          <NavLink
            to={`/popular/${dj}`}
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
          >
            Popular
          </NavLink>
          <NavLink
            to={`/genre/${dj}`}
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
          >
            Genre
          </NavLink>
          {/* <NavLink
            to="/year"
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
          >
            Year
          </NavLink>
          <NavLink
            to="/a-z"
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? activeLinkStyle : {}),
            })}
          >
            A-Z
          </NavLink> */}
        </nav>
        </div>
  )
}

export default Links
