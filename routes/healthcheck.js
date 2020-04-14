const express = require('express');
const { check } = require('express-validator');

const healthCheckController = require('../controllers/healthcheck');

const router = express.Router();

router.get('/', healthCheckController.getHealthCheck);

module.exports = router;
