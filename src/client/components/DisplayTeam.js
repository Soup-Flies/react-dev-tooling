import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NoTeam = () => <div className="display-team">Please generate a team to see stats</div>;

export default class DisplayTeam extends Component {
  state = {
    team: {}
  };

  static getDerivedStateFromProps(nextProps) {
    return { team: nextProps.team };
  }

  renderBench = arr => {
    return arr.map(v => (
      <div className="player" key={v.name}>
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
      </div>
    ));
  };

  render() {
    const { team } = this.props;
    console.log(team);
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
            {this.renderBench(team.starters)}
          </div>
          <div className="subs">
            <h2 className="roster-title">Substitutions</h2>
            {this.renderBench(team.substitutes)}
          </div>
        </div>
      </div>
    );
  }
}

DisplayTeam.propTypes = {
  team: PropTypes.object
};
