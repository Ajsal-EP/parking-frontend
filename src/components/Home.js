import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className='Home'>
            <p className='logo'>Park'It</p>
            <div className='head'>
                <h2 className='headline'>
                    Parking Made Easy
                </h2>
                <NavLink to="/parking"><button className='park'>Reserve</button> </NavLink>
            </div>
            
        </div>
    )
}

export default Home
