'user strict'

const logger = require('./logger');
const mosca = require('mosca');

const settings = { 
  port: parseInt(process.env.PORT_MQQT) 
}

var brokerMQTT = {};

init();

function init() {
  try {
    brokerMQTT = new mosca.Server(settings);
  } catch (error) {
    logger.error(`Erro na configuracao do servidor ${error}`);
    throw error;
  }
  healthStatus();
}

function healthStatus() {
  logger.info('Broker MQTT esta no ar corretamente');
    intervalTimer = setTimeout(() => {
      healthStatus();
  }, process.env.NOTIFY);
};

function setup() {
  brokerMQTT.authenticate = authenticate;
}

brokerMQTT.on('ready', setup);

brokerMQTT.on('clientConnected', function(client) {
    logger.info(`Cliente conectado: ${client.id}`);
});

brokerMQTT.on('published', function(packet, client) {
  logger.info(`Messagem recebida: ${packet.payload}`);
});

const authenticate = async function (client, username, password,callbc) {
  logger.info(`Autenticacao : ${client.id} .. ${username} .. ${password} `);
  const authorized = (username === process.env.DEVICE_USERNAME && password.toString() === process.env.DEVICE_PASSWORD);

  if(authorized){  
    logger.info(`Client: ${client.id} autenticado com sucesso`);
    callbc(null,true);
  }else{
    logger.info(`Client: ${client.id} NÂO ESTA AUTORIZADO`);
    callbc(null,false);
  }
};

function stop(){
  logger.info('Broker desconectado');
  clearInterval(intervalTimer);
  brokerMQTT.close();
	process.exit(0);
}

process.on('SIGINT', () => {
	logger.info('Desligando...');
	stop();
});

process.on('SIGTERM', () => {
	logger.info('Desligando...');
	stop();
});

module.exports = brokerMQTT 