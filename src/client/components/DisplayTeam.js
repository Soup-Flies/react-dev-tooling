import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NoTeam = () => <div className="display-team">Please generate a team to see stats</div>;

export default class DisplayTeam extends Component {
  state = {
    team: {},
    loading: false
  };

  static getDerivedStateFromProps(nextProps) {
    return { team: nextProps.team };
  }

  // Utilize function from props to update stats, keeping logic in the container
  randomizeBot = async e => {
    this.setState({ loading: true });
    await this.props.updateBot(e.target.name);
    this.setState({ loading: false });
  };

  // Take in an array of players to display it, with context of which team position so they can update stats
  renderBench = (arr, teamString) => {
    return arr.map((v, i) => (
      <div className="player" key={i}>
        <h3 className="attribute-title">Name</h3>
        <div className="attribute">{v.name}</div>
        <h3>Total Stats</h3>
        <div>{v.stats.total}</div>
        <div className="stats">
          <div className="stat-holder">
            <h3>Strength</h3>
            <div>{v.stats.value.strength}</div>
          </div>
          <div className="stat-holder">
            <h3>Speed</h3>
            <div>{v.stats.value.speed}</div>
          </div>
          <div className="stat-holder">
            <h3>Agility</h3>
            <div>{v.stats.value.agility}</div>
          </div>
        </div>
        <button
          name={v.stats.total}
          disabled={this.state.loading}
          onClick={this.randomizeBot}
          className="button re-roll"
        >
          Re-Roll Bot
        </button>
        <button
          name={v.stats.total}
          disabled={this.state.loading}
          onClick={e => this.props.updateStats(e, teamString, i)}
          className="button update-stats"
        >
          Randomize Stats
        </button>
      </div>
    ));
  };

  render() {
    const { team } = this.props;

    if (Object.keys(team).length === 0) return <NoTeam />;
    return (
      <div className="display-team">
        <div className="title">
          <h1 className="heading">The {team.name}</h1>
        </div>
        <div className="team-stats">
          <h3 className="roster-title">Overall Stats</h3>
          <p className="attribute">{team.stats.total}</p>
        </div>
        <div className="roster">
          <div className="starters">
            <h2 className="roster-title">Starting Line</h2>
            {this.renderBench(team.starters, 'starters')}
          </div>
          <div className="subs">
            <h2 className="roster-title">Substitutions</h2>
            {this.renderBench(team.substitutes, 'substitutes')}
          </div>
        </div>
      </div>
    );
  }
}

DisplayTeam.propTypes = {
  team: PropTypes.object,
  updateBot: PropTypes.func.isRequired,
  updateStats: PropTypes.func.isRequired
};
