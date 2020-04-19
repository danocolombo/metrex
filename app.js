const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const userRoutes = require('./routes/user-routes');
const meetingsRoutes = require('./routes/meetings-routes');
const groupsRoutes = require('./routes/groups-routes');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const healthcheck = require('./routes/healthcheck');

const app = express();
app.use(helmet());
app.use(compression());

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
let port = process.env.PORT;
if (port == null || port == '') {
    port = 8000;
}
app.listen(port, console.log(`started on port ${port}`));
