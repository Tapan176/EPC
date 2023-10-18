import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { withRouter } from 'react-router-dom';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState(null);

  const handleForgotPassword = async () => {
    try {
      // Make a POST request to the forgot password endpoint with the user's email
      const response = await axios.post('/api/forgotpassword', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Password reset request successful
        setResetStatus('success');
      } else {
        // Password reset request failed
        setResetStatus('error');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred during password reset request:', error);
      setResetStatus('error');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Reset Password</button>

      {resetStatus === 'success' && <p>Password reset request sent successfully. Check your email for further instructions.</p>}
      {resetStatus === 'error' && <p>Password reset request failed. Please try again or contact support.</p>}
    </div>
  );
}

export default withRouter(ForgotPassword);
