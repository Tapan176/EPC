import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { email: '', password: '' },
    };
  }

  handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5050/auth/login', this.state.formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        this.props.history.push('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  handleEmailChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, email: e.target.value },
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, password: e.target.value },
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={this.state.formData.email}
          onChange={this.handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.formData.password}
          onChange={this.handlePasswordChange}
        />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default withRouter(LoginForm);
