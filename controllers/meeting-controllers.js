const uuid = require('uuid/v4');
const MTRDB = require('../hgdb');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const getUser1 = (req, res, next) => {
    // MTRDB.setDB('dcolombo_meeter');
    const hgdb = MTRDB.conn('dcolombo_meeter');
    
    let sql = "Select * from users where user_id = 1";
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Meetings fetched');
    });
};

const getClient = (req, res, next) => {
    const client = req.params.id;
    const hgdb = MTRDB.conn(client);
    let sql = "Select * from users";
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Meetings fetched');
    });
}
const getActiveMeetings = (req, res, next) =>{
    const cid = req.params.mid;
  
  };


// exports.getMeetingById = getMeetingById;
// exports.createMeeting = createMeeting;
// exports.updateMeeting = updateMeeting;
// exports.deleteMeeting = deleteMeeting;
exports.getUser1 = getUser1;
exports.getActiveMeetings = getActiveMeetings;
exports.getClient = getClient;