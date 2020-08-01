'user strict'

const auth = require('../auth/auth');

module.exports = (app, controller) => {
 
  app.get('/', (req, res, next) => {
    res.status(200).send({success : true, message : "Micro Service DEVICE v 1.0"});
  });

  app.post('/login', async (req, res, next) => {
    await controller.login(req.body.user, req.body.password)
    .then(result => {
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
    });
  });

  app.post('/metric', auth.validaToken, async (req, res, next) => {
    await controller.postMetrics(req.body)
    .then(result => {
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
      res.status(201).send({success : result});
    })
    .catch(error => {
      res.status(500).send({success : false, message: error.message});
    });
  });

  app.get('/metrics/:id', auth.validaToken ,async (req, res, next) => {
    await controller.getMetrics(req.params.id)
    .then(result => {
      res.status(200).send({data : result});
    })
    .catch(error => {
      res.status(500).send({success : false, message: error.message});
    });
  });

}