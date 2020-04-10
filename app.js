const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql');

//===========================
// mysql
//===========================
// const db = mysql.createConnection({
//   host     : '198.57.240.40',
//   port     : '3306',
//   user     : 'dcolombo_metrex',
//   password : 'R0mans1212!',
//   database : 'dcolombo_meeter'
// });
// const mtruat = mysql.createConnection({
//   host     : '198.57.240.40',
//   port     : '3306',
//   user     : 'dcolombo_metrex',
//   password : 'R0mans1212!',
//   database : 'dcolombo_mtruat'
// });
// const mtrccc = mysql.createConnection({
//   host     : '198.57.240.40',
//   port     : '3306',
//   user     : 'dcolombo_metrex',
//   password : 'R0mans1212!',
//   database : 'dcolombo_mtrccc'
// });
// const mtrcpv = mysql.createConnection({
//   host     : '198.57.240.40',
//   port     : '3306',
//   user     : 'dcolombo_metrex',
//   password : 'R0mans1212!',
//   database : 'dcolombo_mtrcpv'
// });
// const mtrwbc = mysql.createConnection({
//   host     : '198.57.240.40',
//   port     : '3306',
//   user     : 'dcolombo_metrex',
//   password : 'R0mans1212!',
//   database : 'dcolombo_mtrwbc'
// });

// db.connect((err) => {
//   if(err){
//     //console.log('we got an immedicate connection error');
//     throw err;
//   }
//   console.log('MYSQL (meeter) connected...');
// });
// db.end;
// mtruat.connect((err) => {
//   if(err){
//     //console.log('we got an immedicate connection error');
//     throw err;
//   }
//   console.log('MYSQL (mtruat) connected...');
// });
// mtruat.end;
// mtrccc.connect((err) => {
//   if(err){
//     //console.log('we got an immedicate connection error');
//     throw err;
//   }
//   console.log('MYSQL (mtrccc) connected...');
// });
// mtrccc.end;
// mtrcpv.connect((err) => {
//   if(err){
//     //console.log('we got an immedicate connection error');
//     throw err;
//   }
//   console.log('MYSQL (mtrcpv) connected...');
// });
// mtrcpv.end;
// mtrwbc.connect((err) => {
//   if(err){
//     //console.log('we got an immedicate connection error');
//     throw err;
//   }
//   console.log('MYSQL (mtrwbc) connected...');
// });
// mtrwbc.end;

const userRoutes = require('./routes/user-routes');
const meetingsRoutes = require('./routes/meetings-routes');
const groupsRoutes = require('./routes/groups-routes');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

//===============================
// meetings
//===============================
app.use('/api/meetings', meetingsRoutes);
app.use('/api/places', placesRoutes); // => /api/places...
//app.use('/api/users', usersRoutes);
app.use('/api/user', userRoutes);
app.use('/api/groups', groupsRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});
let port = process.env.PORT;
if (port == null || port == '') {
    port = 8000;
}
app.listen(port, console.log(`started on port ${port}`));
