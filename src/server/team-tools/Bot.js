class Bot {
  constructor(teamName, max, name = '') {
    this.teamName = teamName;
    this.name = name;
    this.stats = {
      total: 0,
      max: max,
      value: {}
    };
  }

  // Again a method to have the bot self generate, did not want this to happen on construct incase there was another use
  // for the Bot class to be instantiated
  build() {
    if (this.name === '') this.generateName();
    this.generateStats();
    return { botTotal: this.stats.total, name: this.name };
  }

  // Quick helper method to DRY up code
  getRand(x, y = 0) {
    return Math.floor(Math.random() * x) + y;
  }

  // Utilize the internal measure of max and total to act as inputs for Rand for a new stat
  generateStat() {
    const { total, max } = this.stats;
    const stat = this.getRand(max - total, 1);
    return stat;
  }

  // Utilize the types of stats to generate a stat for each in a manner that will not bias one being generated first
  // which would allow an individual stat to have more opportunity to always be higher than others
  generateStats() {
    const types = ['strength', 'speed', 'agility'];
    [0, 1, 2].forEach(() => {
      const rand = this.getRand(types.length);
      const type = types.splice(rand, 1);
      this.stats.value[type] = this.generateStat();
      this.stats.total = this.setTotal();
    });
  }

  // Take the teams current used stat values, and the points left in the team's reserve to regenerate stats for this bot,
  // mostly used incase of point conflict or a fresh generated bot going over the total, sometimes used to rebuild a bot from the client
  regenerateStats(teamStats, maxTotal) {
    this.max = maxTotal;
    let unusedStats = [];
    for (let i = 1; i < teamStats[0] && i < this.max; i++) {
      if (teamStats.indexOf(i) === -1) unusedStats.push(i);
    }
    const rand = this.getRand(unusedStats.length);
    const statTotal = unusedStats[rand];

    const n1 = this.getRand(statTotal + 1, 0);
    const n2 = this.getRand(statTotal - n1 + 1, 0);
    this.stats.value.strength = n1;
    this.stats.value.speed = n2;
    this.stats.value.agility = statTotal - n2 - n1;
    this.stats.total = this.setTotal();
    return statTotal;
  }

  // Keep internal note of used points so the bot does not go over team or player total
  setTotal() {
    const { value } = this.stats;
    return Object.keys(value).reduce((a, v) => a + value[v], 0);
  }

  // Utilize character codes to randomly generate alphanumeric sequences, anything between 64 and 91 is used for its characted code,
  // anything outside of that range returns a random value from 0-9
  generateName() {
    return [...Array(8)].reduce(a => {
      const rand = this.getRand(40, 58);
      const name = rand > 64 && rand < 91 ? a + String.fromCharCode(rand) : a + this.getRand(10);
      this.name = name;
      return name;
    }, '');
  }
}

module.exports = Bot;
