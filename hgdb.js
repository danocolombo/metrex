const mysql = require('mysql');

// const hg = {
//     d: '',
//     h: '198.57.240.40',
//     u: 'dcolombo_metrex',
//     p: 'R0mans1212!'
// }
const hg = {
    d: '',
    h: process.env.mtr_h || '198.57.240.40',
    u: process.env.mtr_u || 'dcolombo_metrex',
    p: process.env.mtr_p || 'R0mans1212!',
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
