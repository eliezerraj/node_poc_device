'user strict'

const endpoint = require('../endpoint/endpoint');
const controller = require("../controller/controller");
const mqqt = require("../mqqt/subscriber");

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('../database/logger');

init();

function init() {
	healthStatus();
}

function healthStatus() {
	logger.info('Servidor esta no ar corretamente');
	  intervalTimer = setTimeout(() => {
		healthStatus();
	}, process.env.NOTIFY);
};

var server = {};

const app = express();	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('tiny'));
app.set('port', parseInt(process.env.PORT));
endpoint(app ,controller);

try{
	server = http.createServer(app);
	server.listen(parseInt(process.env.PORT), function () {
		logger.info(`Iniciando Device Micro Service na porta ${parseInt(process.env.PORT)}`);
	  }); 
} catch (error){
	logger.error(`Server : ${error}`);
	throw err;
}

function stop(){
	logger.info('Server desconectado');
	clearInterval(intervalTimer);
	controller.disconnect();
	mqqt.disconnect();
	server.close();
}

process.on('SIGINT', () => {
	logger.info('Desligando...');
	stop();
});

process.on('SIGTERM', () => {
	logger.info('Desligando...');
	stop();
});

module.exports = {stop ,app , server}