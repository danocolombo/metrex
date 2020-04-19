
const getHealthCheck = (req, res, next) => {
    //send back the generic
    
        res.send('Metrex: healthcheck');
}

exports.getHealthCheck = getHealthCheck;
