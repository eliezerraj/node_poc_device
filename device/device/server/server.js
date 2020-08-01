'user strict'

const http = require('http');
const logger = require('../database/logger');
const app = require('./app');

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

try{
    const server = http.createServer(app);
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