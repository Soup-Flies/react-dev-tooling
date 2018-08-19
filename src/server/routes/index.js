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
  console.log('req stuff', req.body);

  // const bot = new Bot(name, max);
  res.json('lolololol');
});

module.exports = router;
