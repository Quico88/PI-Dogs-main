const { Router } = require('express');

const dogsRoute = require('./dogs');
const temperamentRoute = require('./temperaments');

const router = Router();

router.use('/dogs',dogsRoute);
router.use('/temperaments',temperamentRoute);

module.exports = router;
