import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isThisSecond } from 'date-fns';

export default class GenerateTeam extends Component {
  state = {
    teamName: '',
    error: false
  };

  onChange = e => {
    const { name, value } = e.target;
    if (value.length != 0 && !/ /.test(value)) this.setState({ error: false });
    this.setState({
      [name]: value
    });
  };

  validate = () => {
    const { teamName } = this.state;
    if (teamName.length === 0 || / /.test(teamName)) return this.setState({ error: true });
    this.props.getTeam(teamName.trim());
  };

  render() {
    const { error } = this.state;
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
        {error && <p className="error-message">no spaces for team name please</p>}
        <button className="submit-team" onClick={this.validate}>
          SUBMIT
        </button>
      </div>
    );
  }
}

GenerateTeam.propTypes = {
  getTeam: PropTypes.func.isRequired
};
