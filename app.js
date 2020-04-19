const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
// log file for morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a' });

const userRoutes = require('./routes/user-routes');
const meetingsRoutes = require('./routes/meetings-routes');
const groupsRoutes = require('./routes/groups-routes');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const healthcheck = require('./routes/healthcheck');

//for https
const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());

//===============================
// meetings
//===============================
app.use('/api/meetings', meetingsRoutes);
app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/user', userRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/healthcheck', healthcheck);

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
let port = process.env.MTR_PORT || 8000
// https.createServer({ key: privateKey, cert: certificate}, app).listen (port, console.log(`https started on port ${port}`));
app.listen(port, console.log(`http started on port ${port}`));