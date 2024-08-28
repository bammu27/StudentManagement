import React from 'react';

const Feature = () => {
  return (
    <div className='feature-section' >
      <h2 className='Ftitle'> Our School</h2>
      <div className='feature'>
        
          {/* Image can be added using CSS background or use an <img> tag here */}
          <div className='feature-image'>
            <img src='../../../public/learn.jpg' alt='Innovative Learning'  />
            </div>
          
        

        <div className='feature-content'>
          <h3 className='feature-title'>Innovative Learning Experience</h3>
          <div className='feature-text'>
            Our school offers a dynamic and interactive learning environment that encourages creativity and critical thinking. With state-of-the-art facilities and experienced faculty, we ensure that every student has the resources and support they need to excel.
          </div>
        </div>
      </div>
      
      <div className='feature'>
      <div className='feature-content'>
          <h3 className='feature-title'>A Focus on Holistic Development</h3>
          <div className='feature-text'>
            Beyond academics, we focus on the holistic development of our students by providing opportunities in sports, arts, and extracurricular activities. Our aim is to nurture well-rounded individuals who are ready to face the challenges of the future.
          </div>
        </div>
        <div className='feature-image'>
          <img src='../../../public/book.jpg' alt='Innovative Learning'  />
        </div>
      </div>
        
         
        
       

        
    </div>
  )
}

export default Feature