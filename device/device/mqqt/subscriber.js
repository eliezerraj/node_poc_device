'user strict'

const controller = require('../controller/controller');
const mqtt = require('mqtt');
const logger = require('../database/logger');

var settings = {
    keepalive: 30000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'SUBSCRIBER_device',
    username:process.env.DEVICE_USERNAME,
    password:process.env.DEVICE_PASSWORD
  }

const client  = mqtt.connect(process.env.BROKER_URL, settings);

init();

function init(){
    logger.info('MQQT Subscriber inicializado...');
}

client.on('connect', function () {
	client.subscribe('device/postMetrics');
	client.subscribe('device/postEvents');
});

client.on('message', function (topic, message) {
	//console.log('Topic:  %s | Received message: %s', topic, message)
	switch (topic) {
		case 'device/postMetrics':
			return postMetrics(message)
		case 'device/postEvents':
			return postEvents(message)
	}
});

async function postMetrics(message) {
    try {
        await controller.postMetrics(JSON.parse(message.toString()))
        .then(result => {
            logger.info(`Sucesso postMetrics: ${result}`);
        })
        .catch(error => {
            logger.error(`Erro postMetrics Subscriber: ${error.message}`);
        });
    } catch (error) {
        logger.error(`Erro postMetrics Subscriber: ${error.message}`);
    }
}

async function postEvents(message) {
    try {
        await controller.postEvents(JSON.parse(message.toString()))
        .then(result => {
            logger.info(`Sucesso postEvents : ${result}`);
        })
        .catch(error => {
            logger.error(`Erro postEvents Subscriber: ${error.message}`);
        });
    } catch (error) {
        logger.error(`Erro postEvents Subscriber: ${error.message}`);
    }
}

function disconnect(){
    logger.info(`Subscriber disconnected...`);
    client.end();
    return true;
}

module.exports = { disconnect }