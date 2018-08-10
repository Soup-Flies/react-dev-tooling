const express = require('express');

const router = express.Router();
const Bot = require('../team-tools/Bot');
const Team = require('../team-tools/Team');

router.get('/generate/team', (req, res) => {
  // res.send({ team });
});

router.get('/generate/bot', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = router;
