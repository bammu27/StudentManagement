import React from 'react'
import Navbar from '../components/Home/Navbar'
import Feature from '../components/Home/Feature'
import Footer from '../components/Home/Footer'


const Home = () => {
  return (
    <>
    <div className='hero-section'>
      <Navbar/>
     
    </div>
    <div className='feature-section'>
      <Feature/>
    </div>
    <Footer/>
    
    </>
  )
}

export default Home