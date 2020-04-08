const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();
router.get('/', userControllers.getUser1);
router.get('/allUsersByClient/:id', userControllers.allUsersByClient);
module.exports = router;
