import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/styles.css';

// Utilize the Link component for SPA routing that doesn't reload the entire page onClick
export default class Nav extends Component {
  render() {
    return (
      <div className="nav-bar bottom-shadow">
        <button type="none">
          <Link to="/">Roster Bots</Link>
        </button>
        <button className="right-nav" type="none">
          <Link to="/about">About</Link>
        </button>
      </div>
    );
  }
}
