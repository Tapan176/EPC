import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate();

  const navigater = (path) => {
    navigate(path);
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const formData = {
      email: e.target[0].value,
    };
  
    try {
      const response = await fetch("http://localhost:5050/auth/forgot-password", {
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
        console.log(data.isEmailSent);

        if (data.isEmailSent) {
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
      <form onSubmit={handleForgotPassword}>
        <label>Email:</label>
        <input type='email'></input>
        <button type='submit'>Send Email</button>
        </form>
    </div>
  )
}
