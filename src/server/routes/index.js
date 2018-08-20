const express = require('express');

const router = express.Router();
const Bot = require('../team-tools/Bot');
const Team = require('../team-tools/Team');

// Because I did not implement any database features, all of the logic and events are thrown from the routes

// Generate a new team with the user input name
router.get('/generate/team/:name', (req, res) => {
  const team = new Team(req.params.name);
  team.buildTeam();

  res.json(team);
});

// Generate a new random single bot with the name and max stats provided from front end
router.get('/generate/bot', (req, res) => {
  const { name, max } = req.body;
  const bot = new Bot(name, max);

  res.json(bot);
});

// Take a previously generated bot and team information to generate a new bot that fits the current team parameters
router.post('/update/bot', (req, res) => {
  const { team, bot } = req.body;

  const updatedTeam = new Team(team.name);
  updatedTeam.constructFromRaw(team);
  updatedTeam.randomizeBot(parseInt(bot));

  res.json(updatedTeam);
});

module.exports = router;
