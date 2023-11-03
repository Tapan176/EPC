import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const navigate = useNavigate();

  const navigater = (path) => {
    navigate(path);
  }

  const handleResetPassword = async (e) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token= queryParameters.get('token');
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(e);
    const formData = {
      newPassword: e.target[0].value,
      confirmPassword: e.target[1].value,
    };
  
    try {
      const response = await fetch(`http://localhost:5050/auth/reset-password?token=${token}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // If the response status is in the 200-299 range (successful), you can handle it here
        const data = await response.json(); // Parse the JSON response
        console.log(data.ispasswordReseted);

        if (data.ispasswordReseted) {
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
      <form onSubmit={handleResetPassword}>
        <label>Password:</label>
        <input type='password'></input>
        <label>Confirm Password:</label>
        <input type='password'></input>
        <button type='submit'>Reset Password</button>
        </form>
    </div>
  )
}
