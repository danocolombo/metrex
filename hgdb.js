const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const hg = {
    d: '',
    h: process.env.mtr_h,
    u: process.env.mtr_u,
    p: process.env.mtr_p,
};
hg.d = 'dcolombo_meeter';
const HGCONN = mysql.createConnection({
    host: hg.h,
    user: hg.u,
    password: hg.p,
    database: hg.d,
});
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

// module.exports = HGCONN;
// module.exports = setDB;
// module.exports = conn;
