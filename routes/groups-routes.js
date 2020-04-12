const express = require('express');
// const { check } = require('express-validator');

const groupsControllers = require('../controllers/groups-controllers');

const router = express.Router();
// router.get('/:cid', meetingControllers.getActiveMeetings);
// router.get('/past/:cid', meetingControllers.getPastMeetings);

router.get('/:mid', groupsControllers.getGroups);


module.exports = router;
