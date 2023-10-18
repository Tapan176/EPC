import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Logout extends Component {
  handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');

      if (response.status === 200) {
        this.props.history.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  render() {
    return (
      <div>
        <h2>Logout</h2>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(Logout);
