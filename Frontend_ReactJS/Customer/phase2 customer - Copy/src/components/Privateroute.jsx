import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { isLoggedIn } from './Auth/Index'

const Privateroute = () => {
    const navigate = useNavigate();
  return (
      
          
            isLoggedIn() ?  <Outlet></Outlet> : navigate('/login')
          
    
  )
}


export default Privateroute