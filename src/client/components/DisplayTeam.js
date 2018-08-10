import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DisplayTeam extends Component {
  render() {
    console.log('props', this.props);

    return <div className="display-team">DISPLAY</div>;
  }
}

DisplayTeam.propTypes = {
  team: PropTypes.object
};
