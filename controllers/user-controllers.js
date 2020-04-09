const uuid = require('uuid/v4');
const MTRDB = require('../hgdb');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const login = (req, res, next) => {
    //authenticate with Meeter table
    const { login, password } = req.body;
    const hgdb = MTRDB.conn('dcolombo_meeter');

    let sql = `Select * from users where user_login = "${login}" AND user_password = "${password}"`;
    let query = hgdb.query(sql, (err, results) => {
        if (err) throw err;
        if (!results || Object.keys(results).length < 1) {
            res.status(404);
            res.send('Login failure, check credentials');
        }
        res.send(results);
    });
};
const getUser1 = (req, res, next) => {
    const hgdb = MTRDB.conn('dcolombo_meeter');

    let sql = 'Select * from users where user_id = 1';
    let query = hgdb.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('User fetched');
    });
};

const allUsersByClient = (req, res, next) => {
    const client = req.params.id;
    //require that client name is at least 10 chars. in future might want
    //to make sure it is prequalified with dcolombo_
    if (client.length < 11) {
        throw new HttpError(
            'Invalid inputs passed, please check your data.',
            422
        );
    }

    const hgdb = MTRDB.conn(client);
    let sql = 'Select * from users';
    let query = hgdb.query(sql, (err, results) => {
        if (err) throw err;
        //console.log(results);
        res.send(results);
    });
};

exports.getUser1 = getUser1;
exports.allUsersByClient = allUsersByClient;
exports.login = login;
