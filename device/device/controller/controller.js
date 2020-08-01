'user strict'

const repository = require('../repo/repository2');
const logger = require('../database/logger');

async function login(id , password){
  try {
    var result = await repository.login(id , password);
    return result;
  } catch (error) {
    logger.error('Controller login: ${error}');
    throw error;
  }
}

async function postMetrics(metric){
  try {
    if(metric.temperature > 70 || metric.temperature < -70){
      metric.temperature=-999
    }
    if(metric.humidity > 100 || metric.humidity < 0){
      metric.humidity = -999;
    }
    if(metric.lux > 100000 || metric.lux < 0){
      metric.humidity = -999;
    }
    var result = await repository.postMetrics(metric);
    return result;
  } catch (error) {
    logger.error('Controller postMetrics: ${error}');
    throw error;
  }
}

async function postEvents(event){
  try {
    var result = await repository.postEvents(event);
    return result;
  } catch (error) {
    logger.error(`Controller getMetrics:${error}`);
    throw error;
  }
}

async function getMetrics(id){
  try {
    var result = await repository.getMetrics(id);
    return result;
  } catch (error) {
    logger.error(`Controller getMetrics:${error}`);
    throw error;
  }
}

async function createUser(user){
  try {
    var result = await repository.createUser(user);
    return result;
  } catch (error) {
    logger.error(`Controller createUser:${error}`);
    throw error;
  }
}

function disconnect(){
  logger.info(`Controller desconectado...`);
  repository.disconnect();
  return true;
}

module.exports = { postMetrics, postEvents , getMetrics, login , createUser ,disconnect }