import React from 'react'
import axios from 'axios';

export default function LoginForm() {


  // const handleSubmit =(e)=>{
  //   e.preventDefault();
  //   console.log(e.target[0].value);
  //   console.log(e.target[1].value);


  // }

  const handleLogin = async (e) => {
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value
    };
   
    fetch("http://localhost:5050/auth/login",
    {
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
      
    },
    method:"POST",
    body: JSON.stringify(formData)
  }
    )


  };


  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type='email'></input>
        <label>Password:</label>
        <input type='password'></input>
        <button type='submit'>submit</button>
        </form>
    </div>
  )
}
