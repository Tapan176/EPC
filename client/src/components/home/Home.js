import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  }

  return (
    <div> 
      <button onClick={() => handleClick("/login")}> Login/Register </button>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}


