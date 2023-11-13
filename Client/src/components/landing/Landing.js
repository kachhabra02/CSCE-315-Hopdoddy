import { Box } from '@mui/material';
import './Landing.css';
import hopdoddyPic from './hopdoddy.jpg';

import React from 'react'

function Landing() {
  return (
    <Box id='landing' sx={{bgcolor: 'background.default' }}>
      <img src={hopdoddyPic} id='location-img' alt="Hopdoddy Location" />
      <div id='landing-info'>
        <div id='weather'>
          This div will contain weather info
        </div>
        <div id='location'>
          This div will contain address info
        </div>
        <div id='order-now'>
          <button>Order Now</button>
        </div>
      </div>
    </Box>
  )
}

export default Landing