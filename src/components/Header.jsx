import React from 'react'
import Logo from '../components/assests/INFINITY-removebg-preview.png'
const Header = () => {
  return (
    <div className='header-container'>
        <div className="login-header">
        <img src={Logo} alt="logo" width="10%" />
        <h2>Online Stores</h2>

      </div>
      <div className="dropdown-container">
        <div className="container-dropdown">
            <a href="" className="dropdown-link">
                <span className="icon">
                <i className="fa-solid fa-gear"></i>
                </span>
                Settings
            </a>
            <a href="" className="dropdown-link">
                <span className="icon">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>
                Logout
            </a>
            <hr></hr>
            <div className="icon-logo">
                <a href="" className="icon-anchor">
                    <span className="logo-icon">
                    <i class="fa-brands fa-github"></i>
                    </span>
                </a>
                <a href="" className="icon-anchor">
                    <span className="logo-icon">
                    <i class="fa-brands fa-github"></i>
                    </span>
                </a>
                <a href="" className="icon-anchor">
                    <span className="logo-icon">
                    <i class="fa-brands fa-github"></i>
                    </span>
                </a>
                <a href="" className="icon-anchor">
                    <span className="logo-icon">
                    <i class="fa-brands fa-github"></i>
                    </span>
                </a>
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Header