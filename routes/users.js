const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  res.send('respond with a single resource');
});

router.get('/.*fly$', (req, res, next) => {
  res.send('respond with a regular expresion');
});

module.exports = router;
