import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {

  // const handleSubmit =(e)=>{
  //   e.preventDefault();
  //   console.log(e.target[0].value);
  //   console.log(e.target[1].value);
  // }

  const navigate = useNavigate();

  const navigater = (path) => {
    navigate(path);
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value
    };
  
    try {
      const response = await fetch("http://localhost:5050/auth/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        // If the response status is in the 200-299 range (successful), you can handle it here
        const data = await response.json(); // Parse the JSON response
        console.log(data.isLoginSuccessfull);

        if (data.isLoginSuccessfull) {
          navigater('/dashboard');
        }
      } else {
        // Handle error cases here
        console.error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type='email'></input>
        <label>Password:</label>
        <input type='password'></input>
        <a href='/forgot-password'>Forgot Password</a>
        <button type='submit'>Login</button>
        <label>New Here? </label>
        <a href='/sign-up'>Register</a>
        </form>
    </div>
  )
}
