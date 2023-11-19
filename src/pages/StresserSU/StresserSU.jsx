import React from 'react'
import "./StresserSU.css";
import StresserSUHeader from './StresserSUHeader';
import StresserSUPanel from './StresserSUPanel';
import Navbar from '../../Navbar/Navbar';


function StresserSU() {
  return (
    <>
    <Navbar />
    <div className="body ">
        <div className="container box-c " style={{marginTop:90}}>
            <div className='content my-5'>
                <StresserSUHeader/>
                <StresserSUPanel />

            </div>
        </div>
    </div>
    </>
  )
}

export default StresserSU