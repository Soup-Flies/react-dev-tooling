import React, { Component } from 'react';
import axios from 'axios';
import GenerateTeam from '../components/GenerateTeam';
import DisplayTeam from '../components/DisplayTeam';

export default class Home extends Component {
  state = {
    team: {},
    loading: false
  };

  getTeam = async name => {
    this.setState({ loading: true });
    const response = await axios.get(`/api/generate/team/${name}`).then(data => data);
    if (response.status !== 200) throw new Error('We had an error with the reponse: ', response.status);
    console.log('Our team is: ', response.data);

    this.setState({
      team: response.data,
      loading: false
    });
  };

  updateBot = async bot => {
    const { team } = this.state;
    const response = await axios({
      method: 'POST',
      url: `/api/update/bot`,
      data: { team, bot }
    });
    if (response.status !== 200) throw new Error('We had an error with the reponse: ', response.status);
    console.log('what is our new bot/', response);
  };

  render() {
    return (
      <div className="main">
        <GenerateTeam getTeam={this.getTeam} loading={this.state.loading} />
        <DisplayTeam team={this.state.team} updateBot={this.updateBot} />
      </div>
    );
  }
}
