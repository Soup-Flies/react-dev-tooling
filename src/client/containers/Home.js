import React, { Component } from 'react';
import axios from 'axios';
import GenerateTeam from '../components/GenerateTeam';
import DisplayTeam from '../components/DisplayTeam';

export default class Home extends Component {
  state = {
    team: {},
    loading: false
  };

  // Query the server for a new randomly generated team, check for any server errors, then set state to contain the new team and loading to be false
  getTeam = async name => {
    this.setState({ loading: true });
    const response = await axios.get(`/api/generate/team/${name}`).then(data => data);
    if (response.status !== 200) throw new Error('We had an error with the reponse: ', response.status);

    this.setState({
      team: {
        ...response.data,
        roster: new Map(response.data.roster)
      },
      loading: false
    });
  };

  // Send the team and pre-existing bot to the server for a newly generate bot that fits the team parameters
  updateBot = async bot => {
    const { team } = this.state;
    const response = await axios({
      method: 'POST',
      url: `/api/update/bot`,
      data: { team, bot }
    });
    if (response.status !== 200) throw new Error('We had an error with the reponse: ', response.status);

    this.setState({
      team: {
        ...response.data,
        roster: new Map(response.data.roster)
      }
    });
  };

  getRand(x, y = 0) {
    return Math.floor(Math.random() * (x + 1)) + y;
  }

  // Randomize a bot's stats on the client and update state in-case the team was to be saved and used
  updateStats = (e, teamString, index) => {
    const botStats = e.target.name;
    const { roster, [teamString]: teamLine } = this.state.team;

    const bot = roster.get(parseInt(botStats));
    const statTotal = bot.stats.total;
    const n1 = this.getRand(statTotal, 0);
    const n2 = this.getRand(statTotal - n1, 0);

    bot.stats.value.strength = n1;
    bot.stats.value.speed = n2;
    bot.stats.value.agility = statTotal - n2 - n1;
    roster.set(bot.stats.total, bot);
    teamLine.splice(index, 1, bot);

    this.setState({
      team: {
        ...this.state.team,
        roster,
        [teamString]: teamLine
      }
    });
  };

  render() {
    return (
      <div className="main">
        <GenerateTeam getTeam={this.getTeam} loading={this.state.loading} />
        <DisplayTeam team={this.state.team} updateBot={this.updateBot} updateStats={this.updateStats} />
      </div>
    );
  }
}
