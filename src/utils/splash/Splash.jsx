import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import SplashImage from '../../components/assests/splash.png'
const Splash = () => {
  return (
    
      <Box>
        <img src={SplashImage} alt="Splash Screen Image" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
  )
}

export default Splash