const MTRDB = require('../hgdb');

const getActiveMeetings = (req, res, next) => {
    //send back the meetings that are scheduled 
    //for today or in the future.
    //-------------------------------------------
    // const client = req.params.cid;
    const client = req.header('Meeter-Client');
    //require that client name is at least 10 chars. in future might want
    //to make sure it is prequalified with dcolombo_
    if (client.length < 11) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const hgdb = MTRDB.conn(client);
    let sql = "SELECT ID, MtgDate, MtgType, MtgTitle FROM meetings where DATE(MtgDate)>=CURDATE() ORDER BY MtgDate";
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        //console.log(results);
        // res.send('Meetings fetched');
        res.send(results);
    });
}
const getPastMeetings = (req, res, next) => {
    //send back the meetings that are scheduled 
    //prior today.
    //-------------------------------------------
    // const client = req.params.cid;
    const client = req.header('Meeter-Client');
    //require that client name is at least 10 chars. in future might want
    //to make sure it is prequalified with dcolombo_
    if (client.length < 11) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const hgdb = MTRDB.conn(client);
    let sql = "SELECT ID, MtgDate, MtgType, MtgTitle FROM meetings where DATE(MtgDate)<CURDATE() ORDER BY MtgDate DESC";
    let query = hgdb.query(sql, (err, results) =>{
        if(err) throw err;
        //console.log(results);
        res.send(results);
    });
}
exports.getActiveMeetings = getActiveMeetings;
exports.getPastMeetings = getPastMeetings;
