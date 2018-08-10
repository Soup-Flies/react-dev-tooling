import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NoTeam = () => <div className="display-team">Please generate a team to see stats</div>;

export default class DisplayTeam extends Component {
  render() {
    console.log('props', this.props);
    const { team } = this.props;

    if (Object.keys(team).length === 0) return <NoTeam />;
    return <div className="display-team" />;
  }
}

DisplayTeam.propTypes = {
  team: PropTypes.object
};
