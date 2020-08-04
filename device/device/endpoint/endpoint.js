'user strict'

const auth = require('../auth/auth');
const opossum = require('opossum');

const options = { usePrometheus: true,
  errorThesholdPercentage: 10,
  resetTimeout: 2000
};
/*
const Prometheus = require('prom-client')
const metricsInterval = Prometheus.collectDefaultMetrics()
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
});
const metricsTotal = new Prometheus.Counter({
  name: 'device_data_metric_total',
  help: 'Total de metricas postadas com sucesso',
  labelNames: ['device_post_metricas_sucesso']
});
const eventsTotal = new Prometheus.Counter({
  name: 'device_data_event_total',
  help: 'Total de eventos postadas com sucesso',
  labelNames: ['device_post_eventos_sucesso']
});*/


const Prometheus = require('../server/instrumentacion');

module.exports = (app, controller) => {
 
  const circuitLogin = new opossum(controller.login,options);

  app.use(Prometheus.requestCounters);  
  app.use(Prometheus.responseCounters);
  Prometheus.injectMetricsRoute(app);
  Prometheus.startCollection();  

  app.get('/', (req, res, next) => {
    res.status(200).send({success : true, message : "Micro Service DEVICE v 1.0"});
  });

  app.post('/login', async (req, res, next) => {
    await circuitLogin.fire(req.body.user, req.body.password).then(result => {
      console.log("CLOSED ", result);
      if (result){
        var token = auth.geraToken(req.body.user)
        .then(result => {
          res.status(200).send({auth : true, token: result});
        }).catch(error => {
          res.status(500).send({auth : false,  message: 'Erro interno na criação do token'});
        });
      }else{
        res.status(401).send({auth : false, message: 'usuario/senha não encontrados'});
      }
  }).catch(error => {
    console.log("OPEN");
    res.status(500).send({auth : false, message: 'serviço indisponivel'});
  });

  /*  await controller.login(req.body.user, req.body.password)
    .then(result => {
      console.log('/login' , result);
        if (result){
          var token = auth.geraToken(req.body.user)
          .then(result => {
            res.status(200).send({auth : true, token: result});
          }).catch(error => {
            res.status(500).send({auth : false,  message: 'Erro interno na criação do token'});
          });
        }else{
          res.status(401).send({auth : false, message: 'usuario/senha não encontrados'});
        }
    })
    .catch(error => {
      res.status(500).send({auth : false, message: error.message});
    });*/
  });

  app.post('/metric', auth.validaToken, async (req, res, next) => {
    await controller.postMetrics(req.body)
    .then(result => {

      //metricsTotal.inc({device_post_metricas_sucesso: result });
      
      res.status(201).send({success : result});
    })
    .catch(error => {
      res.status(500).send({success : false, message: error.message});
    });
  });

  app.post('/user', async (req, res, next) => {
    await controller.createUser(req.body)
    .then(result => {
        if (result){
          var token = auth.geraToken(req.body.user)
          .then(result => {
            res.status(201).send({success : true, token: result});
          }).catch(error => {
            res.status(500).send({success : false,  message: 'Erro interno na criação do token'});
          });
        }else{
          res.status(500).send({success : false, message: 'Usuário já cadastrado'});
        }
    })
    .catch(error => {
      res.status(500).send({success : false, message: error.message});
    });
  });

  app.post('/event', auth.validaToken, async (req, res, next) => {
    await controller.postEvents(req.body)
    .then(result => {

      //eventsTotal.inc({device_post_eventos_sucesso: result });

      res.status(201).send({success : result});
    })
    .catch(error => {
      res.status(500).send({success : false, message: error.message});
    });
  });

  app.get('/datametrics/:id', auth.validaToken ,async (req, res, next) => {
    await controller.getMetrics(req.params.id)
    .then(result => {
      res.status(200).send({data : result});
    })
    .catch(error => {
      res.status(500).send({success : false, message: error.message});
    });
  });

/*
 app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
 });

 app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch
  httpRequestDurationMicroseconds
      .labels(req.method, req.originalUrl ,res.statusCode)
      .observe(responseTimeInMs);
  next();
 });

 app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
 });
*/
}