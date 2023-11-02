import React from 'react'
import LoginForm from '../auth/LoginForm'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate();


  const handleClick = (path) => {

    navigate(path);

  }

  return (
    <div onClick={()=>handleClick("/login")}> Login</div>
  )
}


