import './Landing.css';
import hopdoddyPic from './hopdoddy.jpg';

import React from 'react'

function Landing() {
  return (
    <div id='landing'>
      <img src={hopdoddyPic} id='location-img' alt="Hopdoddy Location" />
      <div className='flex-container'>
        <button>432</button>
        <button>2132</button>
        <button>233</button>
      </div>
    </div>
  )
}

export default Landing