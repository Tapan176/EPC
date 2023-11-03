import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  }

  const handleChat = (path) => {
    window.open(path);
  }

  return (
    <div>
      <button onClick={() => handleChat("http://localhost:3001")}> Chat </button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => handleClick("/logout")}> LogOut </button>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}
