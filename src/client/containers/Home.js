import React, { Component } from 'react';
import fetch from 'node-fetch';
import GenerateTeam from '../components/GenerateTeam';
import DisplayTeam from '../components/DisplayTeam';

export default class Home extends Component {
  state = {
    team: {}
  };

  getTeam = async () => {
    const team = await fetch('/api/generate/team/Kittens')
      .then(res => res.json())
      .then(data => data);
    console.log('Our team is: ', team);

    this.setState({
      team
    });
  };

  render() {
    return (
      <div className="main">
        <GenerateTeam getTeam={this.getTeam} />
        <DisplayTeam team={this.state.team} />
      </div>
    );
  }
}
