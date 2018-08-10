class Bot {
  constructor(teamName, max) {
    this.teamName = teamName;
    this.position = 0;
    this.name = this.generateName();
    this.stats = {
      total: 0,
      max: max,
      value: {}
    };
  }

  setPosition(index) {
    this.position = index;
  }

  build() {
    this.generateName();
    this.generateStats();
    return this.stats.total;
  }

  getRand(x, y = 0) {
    return Math.floor(Math.random() * x) + y;
  }

  generateStat() {
    const { total, max: maxStats } = this.stats;
    const max = maxStats > 17 ? 17 : maxStats;
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

  regenerateStats(teamStats) {
    console.log(teamStats);
  }

  setTotal() {
    const { value } = this.stats;
    return Object.keys(value).reduce((a, v) => a + value[v], 0);
  }

  // setStatPosition(stat, position) {}

  generateName() {
    return [...Array(8)].reduce(a => {
      const rand = this.getRand(40, 58);
      return rand > 64 && rand < 91 ? a + String.fromCharCode(rand) : a + this.getRand(10);
    }, '');
  }
}

// const thing = new Bot('test', 100);
// console.log(thing.build());
// console.log(thing);

module.exports = Bot;
