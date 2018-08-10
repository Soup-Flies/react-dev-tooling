import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

export default class Nav extends Component {
  onClick = () => {
    this.props.history.push('/');
  };
  render() {
    console.log('nav.props', this.props);

    return (
      <div className="nav-bar bottom-shadow">
        <button type="none">
          <Link to="/">Roster Bots</Link>
        </button>
        <button type="none">
          <Link to="/about">About</Link>
        </button>
      </div>
    );
  }
}

Nav.propTypes = {
  history: PropTypes.object.isRequired
};
