const uuid = require('uuid/v4');
const MTRDB = require('../hgdb');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const getUser1 = (req, res, next) => {
    
    const hgdb = MTRDB.conn('dcolombo_meeter');
    
    let sql = "Select * from users where user_id = 1";
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('User fetched');
    });
};

const allUsersByClient = (req, res, next) => {
    const client = req.params.id;
    //require that client name is at least 10 chars. in future might want
    //to make sure it is prequalified with dcolombo_
    if (client.length < 11) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }


    const hgdb = MTRDB.conn(client);
    let sql = "Select * from users";
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Users fetched');
    });
}

exports.getUser1 = getUser1;
exports.allUsersByClient = allUsersByClient;