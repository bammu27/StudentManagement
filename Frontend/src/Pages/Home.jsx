import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Home/Navbar'
import Feature from '../components/Home/Feature'
import Footer from '../components/Home/Footer'
import  StudentSign from './StudentSign.jsx'



const Home = () => {

  const [SignUpForm , setSignUpForm] = useState(false);
  return (

    <>
    
     
            <div className='hero-section' >
                <div id={SignUpForm && 'blur-layer'}>

                {
                SignUpForm ? 
                <div>
                  <StudentSign  setSignUpForm={setSignUpForm}/>
                </div>
        
                : (
                  <Navbar  setSignUpForm={setSignUpForm}/>
                )
              }
              </div>
                </div>
                <div className='feature-section'>
                  <Feature/>
                </div>
                <Footer/>

            

        
     
    
    
    </>

    
  )
}

export default Home