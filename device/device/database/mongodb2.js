'user strict'

const mongodb = require('mongoose');
const logger = require('./logger');
var connect = false;

init();

async function init(){
    logger.info('Database Inicializado');

    if (connect) return;
    await mongodb.connect(process.env.MONGO_ENDPOINT, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        connect = true;
        logger.info('Conectado no Mongo com sucesso');
    })
    .catch((error) => {
        connect = false;
        logger.error('Erro na conexão com o Mongo');
    });
}

async function disconnect(){
    logger.info(`Database mongodb desconectado...`);
    await mongodb.disconnect();
    await mongodb.close();
};

process.on('exit', () => {
	logger.info('Desligando Database...');
	disconnect();
});

module.exports = mongodb;
