const express = require('express');

const router = express.Router();

router.get('/generateBot', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = router;
