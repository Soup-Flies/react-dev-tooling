const express = require('express');

const router = express.Router();
const Bot = require('../team-tools/Bot');
const Team = require('../team-tools/Team');

router.get('/generate/team/:name', (req, res) => {
  const team = new Team(req.params.name);
  team.buildTeam();

  res.json(team);
});

router.get('/generate/bot/:name/:max', (req, res) => {
  const { name, max } = req.params;
  const bot = new Bot(name, max);

  res.json(bot);
});

router.post('/update/bot', (req, res) => {
  const { team, bot } = req.body;
  console.log('what is team', team.stats.memberTotals);

  const updatedTeam = new Team(team.name);
  updatedTeam.constructFromRaw(team);
  updatedTeam.randomizeBot(parseInt(bot));
  console.log('what is updatedTeam', updatedTeam.stats.memberTotals);

  res.json(updatedTeam);
});

module.exports = router;
