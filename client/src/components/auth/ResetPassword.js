import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { newPassword: '', confirmPassword: '' },
      resetStatus: null,
    };
  }

  handleResetPassword = async () => {
    try {
      const response = await axios.post(`/api/resetpassword?token=${this.props.match.params.token}`, this.state.formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        this.setState({ resetStatus: 'success' });
      } else {
        this.setState({ resetStatus: 'error' });
      }
    } catch (error) {
      console.error('An error occurred during password reset:', error);
      this.setState({ resetStatus: 'error' });
    }
  }

  handleNewPasswordChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, newPassword: e.target.value },
    });
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, confirmPassword: e.target.value },
    });
  }

  render() {
    return (
      <div>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={this.state.formData.newPassword}
          onChange={this.handleNewPasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={this.state.formData.confirmPassword}
          onChange={this.handleConfirmPasswordChange}
        />
        <button onClick={this.handleResetPassword}>Reset Password</button>

        {this.state.resetStatus === 'success' && (
          <p>Password reset successful. You can now log in with your new password.</p>
        )}
        {this.state.resetStatus === 'error' && (
          <p>Password reset failed. Please try again or contact support.</p>
        )}
      </div>
    );
  }
}

export default withRouter(ResetPassword);
