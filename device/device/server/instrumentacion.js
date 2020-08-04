var register = require('prom-client').register;  
var counter = require('prom-client').Counter;  
//var Histogram = require('prom-client').Histogram;  
var summary = require('prom-client').Summary;  
var responseTime = require('response-time');  
const logger = require('../database/logger');

module.exports.numOfRequests = numOfRequests = new counter({  
    name: 'device_numero_requests',
    help: 'Number of requests made',
    labelNames: ['method']
});

module.exports.pathsTaken = pathsTaken = new counter({  
    name: 'device_path_chamados',
    help: 'Paths taken in the app',
    labelNames: ['path']
})

module.exports.responses = responses = new summary({  
    name: 'device_tempo_resposta',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status']
});

module.exports.startCollection = function () {  
    logger.info(`Iniciando a metricas do Prometheus`);
    require('prom-client').collectDefaultMetrics();
};

module.exports.requestCounters = function (req, res, next) {  
    if (req.path != '/metrics') {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
}

module.exports.responseCounters = responseTime(function (req, res, time) {  
    if(req.url != '/metrics') {
        responses.labels(req.method, req.url, res.statusCode).observe(time);
    }
})

module.exports.injectMetricsRoute = function (App) {  
    App.get('/metrics', (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(register.metrics());
    });
};