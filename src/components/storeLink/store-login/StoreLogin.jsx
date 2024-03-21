import { Button } from '@mui/material'
import React from 'react'
import {  googleLoginForstore } from '../../login/Auth'
import './StoreLogin.css'
import Logo from '../../assests/background-image.png'
import GoogleButton from 'react-google-button'
const StoreLogin = () => {
  const google = async () =>{
    googleLoginForstore()
  }
  return (
    <div className="container-image bg-image">
        <div className='grid-container'>
                <div className="grid-text">
                  <div>
                  <h1 className='h1ag'><span>Online</span> Stores</h1>
                    <h5 className='h5ag'>Powered By Soumyadip Das</h5>
                  </div>
                   
                    <GoogleButton className="google-button" onClick={google} />
                   
                </div>
                <div className="grid-image">
                    <img src={Logo} alt="" />
                </div>
            </div>
    </div>
  )
}

export default StoreLogin