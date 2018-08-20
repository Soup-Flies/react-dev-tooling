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

  build() {
    if (this.name === '') this.generateName();
    this.generateStats();
    return { botTotal: this.stats.total, name: this.name };
  }

  getRand(x, y = 0) {
    return Math.floor(Math.random() * x) + y;
  }

  generateStat() {
    const { total, max } = this.stats;
    const stat = this.getRand(max - total, 1);
    return stat;
  }

  generateStats() {
    const types = ['strength', 'speed', 'agility'];
    [0, 1, 2].forEach(() => {
      const rand = this.getRand(types.length);
      const type = types.splice(rand, 1);
      this.stats.value[type] = this.generateStat();
      this.stats.total = this.setTotal();
    });
  }

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

  setTotal() {
    const { value } = this.stats;
    return Object.keys(value).reduce((a, v) => a + value[v], 0);
  }

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
