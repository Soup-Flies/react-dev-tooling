const Bot = require('./Bot');

// To me classes made sense for this because if this was to be built out as a full team manager
// then instancing for different teams would be easy, with pre-attached methods
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

  // I felt that a direct method for generating a team was nice incase you wanted an instance that has a different use case
  buildTeam() {
    this.generateBots();
    this.determinePositions();
  }

  // Rather than updating the constructor to expect a previously generated team, having a team built by a method made sense to me
  constructFromRaw({ stats, roster, starters, substitutes }) {
    this.stats = stats;
    this.roster = new Map(roster);
    this.starters = starters;
    this.substitutes = substitutes;
  }

  // Take a pre-existing bot and regenerate it's stats based off of unused stat values
  randomizeBot(bot) {
    const rosterBot = this.roster.get(bot);
    this.roster.delete(bot);
    this.stats.memberTotals.splice(this.stats.memberTotals.indexOf(bot), 1);
    this.setTotal();
    this.generateBots(rosterBot.name);
    this.determinePositions();
  }

  // Generate an entire team of bots making usre there are no dublicate names or stat totals
  generateBots(previousName = '') {
    while (this.stats.memberTotals.length < 15) {
      const { max, total, memberTotals, memberNames } = this.stats;
      const statMax = max - total > 100 ? 100 : max - total;
      const newBot = new Bot(this.name, statMax, previousName);

      let { botTotal, botName } = newBot.build();

      while (memberNames.indexOf(botName) != -1) botName = newBot.generateName();
      while (memberTotals.indexOf(botTotal) != -1 || botTotal < 0) botTotal = newBot.regenerateStats(memberTotals, max);
      if (total + botTotal > max) {
        const [key] = memberTotals.splice(0, 1);
        this.roster.delete(key);
      }
      this.stats.memberNames = [...memberNames, botName];
      this.stats.memberTotals = this.insertSorted(botTotal, memberTotals);
      this.roster.set(botTotal, newBot);
      this.setTotal();
    }
  }

  // As the team is built this method is called to keep them sorted as they are generated, this means that if a different sort was to be
  // used in the future it would be easy to convert previous instances of the sort to new methods
  insertSorted(item, array) {
    const arr = array.slice(0);
    arr.push(item);
    arr.sort((a, b) => b - a);
    return arr;
  }

  // Keep the total team stats up to date so that each generated bot has an awareness of the stat points in reserve for their own maximum
  setTotal() {
    const { memberTotals } = this.stats;
    this.stats.total = memberTotals.reduce((a, v) => a + v, 0);
  }

  // Utilize the fact that bots are already sorted on generation to determine their positions on the team by stat total
  determinePositions() {
    const {
      stats: { memberTotals },
      roster
    } = this;
    const sortedTeam = memberTotals.map(v => roster.get(v));
    this.starters = sortedTeam.slice(0, 10);
    this.substitutes = sortedTeam.slice(10);
  }
}

module.exports = Team;
