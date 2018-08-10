const Bot = require('./Bot');

class Team {
  constructor(teamName) {
    this.name = teamName[0].toUpperCase() + teamName.slice(1).toLowerCase();
    this.stats = {
      max: 175,
      total: 0,
      memberTotals: []
    };
    this.roster = [];
  }

  buildTeam() {
    this.generateBots();
    this.determinePositions();
  }

  generateBots() {
    while (this.stats.memberTotals.length <= 15) {
      const { max, total, memberTotals } = this.stats;
      const statMax = max - total > 100 ? 100 : max - total;
      const newBot = new Bot(this.name, statMax);
      const botTotal = newBot.build();
      if (memberTotals.indexOf(botTotal) != -1) {
        newBot.regenerateStats(memberTotals);
        continue;
      }
      if (total + botTotal > max) memberTotals.splice(0, 1);
      this.stats.memberTotals = this.insertSorted(botTotal, memberTotals);
      this.roster.push(newBot);
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
    //insertion sort??
  }
}

const test = new Team('mutilators');
console.log(test.name);
console.log(test.generateBots()); /*?.*/
console.log(test.stats.memberTotals);
console.log(test.stats.total);
console.log(test.roster);

module.exports = Team;
