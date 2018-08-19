import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';

export default class GenerateTeam extends Component {
  state = {
    teamName: '',
    error: false,
    loading: false
  };

  static getDerivedStateFromProps(nextProps) {
    return { loading: nextProps.loading };
  }

  onChange = e => {
    const { name, value } = e.target;
    if (value.length !== 0 && !/ /.test(value)) this.setState({ error: false });
    this.setState({
      [name]: value
    });
  };

  validateName = () => {
    const { teamName } = this.state;
    if (teamName.length === 0 || /[ \W]/.test(teamName)) return this.setState({ error: true });
    this.props.getTeam(teamName.trim());
    this.setState({ loading: true, submitted: teamName.trim() });
  };

  render() {
    const { error, loading, submitted, teamName } = this.state;
    const disabled = submitted === teamName;

    return (
      <div className="generate-team">
        <div className="title">
          <h2 className="heading">Generate Your Team</h2>
        </div>
        <input
          type="text"
          name="teamName"
          className={error ? 'team-input error' : 'team-input'}
          onChange={this.onChange}
          placeholder="Team Name"
        />
        {error && <ErrorDisplay input={this.state.teamName} />}
        {loading ? (
          <Loader />
        ) : (
          <button
            className={disabled ? 'button submit-team disabled' : 'button submit-team'}
            disabled={disabled}
            onClick={this.validateName}
          >
            SUBMIT
          </button>
        )}
      </div>
    );
  }
}

GenerateTeam.propTypes = {
  getTeam: PropTypes.func.isRequired
};
