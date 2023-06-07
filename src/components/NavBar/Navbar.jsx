import React from 'react'
import './navbar.scss'

function Navbar() {
  return (
    <div className='nav-wrapper'>
        <div className="logo">iNfluence</div>
        <div className="nav-items">
            <h3 className='items'>Home</h3>
            <h3 className='items'>About Us</h3>
            <h3 className='items'>Contact Us</h3>
        </div>
   
        <button className='btn-trial'>Free Trial</button>
    </div>
  )
}

export default Navbar