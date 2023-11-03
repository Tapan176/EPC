import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
  const navigate = useNavigate();

  const navigater = (path) => {
    navigate(path);
  }

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const formData = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
      confirmPassword: e.target[4].value
    };
  
    try {
      const response = await fetch("http://localhost:5050/auth/signUp", {
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
        console.log(data.isSignUpSuccessfull);

        if (data.isSignUpSuccessfull) {
          navigater('/login');
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
      <form onSubmit={handleSignUp}>
        <label>First Name:</label>
        <input type='text'></input>
        <label>Last Name:</label>
        <input type='text'></input>
        <label>Email:</label>
        <input type='email'></input>
        <label>Password:</label>
        <input type='password'></input>
        <label>Confirm Password:</label>
        <input type='password'></input>
        <button type='submit'>Register</button>
        </form>
    </div>
  )
}
