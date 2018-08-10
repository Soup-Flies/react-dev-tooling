const express = require('express');

const router = express.Router();
const Bot = require('../team-tools/Bot');
const Team = require('../team-tools/Team');

router.get('/generate/team', (req, res) => {
  // req.paramsstuff
  const team = new Team('Tigers');
  team.buildTeam();
  res.json(team);
});

router.get('/generate/bot', (req, res) => {
  const bot = new Bot('Tigers', 100);
  res.json(bot);
});

module.exports = router;
