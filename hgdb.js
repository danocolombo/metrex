const mysql = require('mysql');
//const dotenv = require('dotenv');
// dotenv.config();
const hg = {
    d: '',
    h: process.env.MTR_H,
    u: process.env.MTR_U,
    p: process.env.MTR_P,
};
hg.d = process.eventNames.MTR_D;
exports.conn = (db) => {
    const dbconn = mysql.createConnection({
        host: hg.h,
        user: hg.u,
        password: hg.p,
        database: db,
    });
    return dbconn;
};
exports.setDB = (d) => {
    hg.h = d;
};
