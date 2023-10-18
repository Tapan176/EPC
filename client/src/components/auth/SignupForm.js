import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { name: '', email: '', password: '' },
    };
  }

  handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', this.state.formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        this.props.history.push('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  handleNameChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, name: e.target.value },
    });
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
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={this.state.formData.name}
          onChange={this.handleNameChange}
        />
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
        <button onClick={this.handleSignup}>Sign Up</button>
      </div>
    );
  }
}

export default withRouter(SignupForm);
