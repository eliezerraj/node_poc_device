var register = require('prom-client').register;  
var counter = require('prom-client').Counter;   
var summary = require('prom-client').Summary;  
var responseTime = require('response-time');  
const logger = require('../database/logger');

module.exports.totalRequest = numOfRequests = new counter({  
    name: 'device_numero_requests',
    help: 'Quantidade de requests',
    labelNames: ['method']
});

module.exports.pathsChamados = pathsTaken = new counter({  
    name: 'device_path_chamados',
    help: 'Path chamados do app',
    labelNames: ['path']
})

module.exports.metricsTotal = new counter({
    name: 'device_total_metricas_com_sucesso',
    help: 'Total de metricas postadas com sucesso',
    labelNames: ['device_post_metricas_sucesso']
  });

module.exports.eventsTotal = new counter({
    name: 'device_total_eventos_com_sucesso',
    help: 'Total de eventos postadas com sucesso',
    labelNames: ['device_post_eventos_sucesso']
  });

module.exports.tempoResposta = responses = new summary({  
    name: 'device_tempo_resposta',
    help: 'Tempo de resposta (millis)',
    labelNames: ['method', 'path', 'status']
});

module.exports.initColeta = function () {  
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