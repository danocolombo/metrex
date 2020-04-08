const uuid = require('uuid/v4');
const mysql = require('mysql');
const hostgator = require('../db_connection');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const hg = {
    d: '',
    h: '198.57.240.40',
    u: 'dcolombo_metrex',
    p: 'R0mans1212!'
}

let DUMMY_MEETINGS = [
  {
    id: '1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

const getMeetingById = (req, res, next) => {
  const meetingID = req.params.mid; // { id: 'p1' }

  const meeting = DUMMY_MEETINGS.find(m => {
    return m.id === meetingID;
  });

  if (!meeting) {
    throw new HttpError('Could not find a meeting for the provided id.', 404);
  }

  res.json({ meeting }); // => { meeting } => { meeting: meeting }
};
const getUser1 = (req, res, next) => {
    console.log(hostgator.hg_host);
    // console.log(hostgator.hg_u);
    // console.log(hostgator.hg_p);
    hg.d = "dcolombo_meeter"
    db = mysql.createConnection({
        host     : hg.h,
        user     : hg.u,
        password : hg.p,
        database : hg.d
    });
    let sql = "Select * from users where user_id = 1";
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Meetings fetched');
    });
};

const createMeeting = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createdMeeting = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_MEETINGS.push(createdMeeting); //unshift(createdMeeting)

  res.status(201).json({ meeting: createdMeeting });
};

const updateMeeting = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description } = req.body;
  const meetingID = req.params.mid;

  const updatedMeeting = { ...DUMMY_MEETINGS.find(m => m.id === meetingID) };
  const meetingIndex = DUMMY_MEETINGS.findIndex(m => m.id === meetingID);
  updatedMeeting.title = title;
  updatedMeeting.description = description;

  DUMMY_MEETINGS[meetingIndex] = updatedMeeting;

  res.status(200).json({ meeting: updatedMeeting });
};

const deleteMeeting = (req, res, next) => {
  const meetingID = req.params.mid;
  if (!DUMMY_MEETINGS.find(m => m.id === meetingID)) {
    throw new HttpError('Could not find a meeting for that id.', 404);
  }
  DUMMY_MEETINGS = DUMMY_MEETINGS.filter(m => m.id !== meetingID);
  res.status(200).json({ message: 'Deleted meeting.' });
};

exports.getMeetingById = getMeetingById;
exports.createMeeting = createMeeting;
exports.updateMeeting = updateMeeting;
exports.deleteMeeting = deleteMeeting;
exports.getUser1 = getUser1;
