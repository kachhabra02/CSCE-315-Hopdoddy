import './Landing.css';
import hopdoddyPic from './hopdoddy.jpg';

import React from 'react'

function Landing() {
  return (
    <div id='landing'>
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
    </div>
  )
}

export default Landing