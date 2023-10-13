import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      // Send a POST request to your Node.js API for user authentication
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User successfully logged in; you can redirect or set user session
      } else {
        // Handle authentication errors, such as displaying an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
