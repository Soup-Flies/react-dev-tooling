const Bot = require('./Bot');

class Team {
  constructor(teamName) {
    this.name = teamName[0].toUpperCase() + teamName.slice(1).toLowerCase();
    this.stats = {
      max: 175,
      total: 0,
      memberTotals: [],
      memberNames: []
    };
    this.roster = new Map();
  }

  buildTeam() {
    this.generateBots();
    this.determinePositions();
  }

  generateBots() {
    while (this.stats.memberTotals.length < 15) {
      const { max, total, memberTotals, memberNames } = this.stats;
      const statMax = max - total > 100 ? 100 : max - total;
      const newBot = new Bot(this.name, statMax);
      let { botTotal, botName } = newBot.build();
      while (memberNames.indexOf(botName) != -1) botName = newBot.generateName();
      while (memberTotals.indexOf(botTotal) != -1) botTotal = newBot.regenerateStats(memberTotals, max);
      if (total + botTotal > max) {
        const [key] = memberTotals.splice(0, 1);
        this.roster.delete(key);
      }
      this.stats.memberTotals = this.insertSorted(botTotal, memberTotals);
      this.roster.set(botTotal, newBot);
      this.setTotal();
    }
  }

  insertSorted(item, array) {
    const arr = array.slice(0);
    arr.push(item);
    arr.sort((a, b) => b - a);
    return arr;
  }

  setTotal() {
    const { memberTotals } = this.stats;
    this.stats.total = memberTotals.reduce((a, v) => a + v, 0);
  }

  determinePositions() {
    const {
      stats: { memberTotals },
      roster
    } = this;
    const sortedTeam = memberTotals.map(v => roster.get(v));
    this.starters = sortedTeam.slice(0, 5);
    this.substitutes = sortedTeam.slice(5);
  }
}

module.exports = Team;
