import React from 'react'
import hero_image from '../Assets/hero_image.png'
import hand_image from '../Assets/hand_icon.png'
import './Hero.css'
const Hero = () => {
  return (
    <div className='hero'>
    <div className='hero-left'>
        <h3>Discover Your Style</h3>
        <div className='hand_icons'>
            <h1 style={{marginLeft:'-20px'}}>New</h1>
            <img src={hand_image} alt="Hand Icon" />
                         
        </div>
        <div className='collection'> <h1> <span style={{fontWeight:'bolder'}}> Collections</span> <br /> for EveryOne</h1></div>
       
        <div className='hero-buttons'>  
         <button>Shop Now</button>
        </div>
      
        </div>
        <div className='hero-right'>
        <img src={hero_image} alt="Hero Image" />
    

        </div>
    </div>
  )
}

export default Hero
