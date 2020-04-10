const MTRDB = require('../hgdb');
const HttpError = require('../models/http-error');

const getGroups = (req, res, next) => {
    //send back the groups that are associated 
    //with the meeting id provided
    //-------------------------------------------
    const meeting = req.params.mid;
    const client = req.header('Meeter-Client');
   
    //require that client name is at least 10 chars. in future might want
    //to make sure it is prequalified with dcolombo_
    if (!meeting || client.length < 11) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const hgdb = MTRDB.conn(client);
    let sql = `SELECT * FROM groups where MtgID = "${meeting}" ORDER BY Title`;
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        res.send(results);
    });
}

exports.getGroups = getGroups;
