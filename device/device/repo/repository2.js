'user strict'

const mongodb = require("../database/mongodb2");
const Metric = require('../model/metric');
const Event = require('../model/event');
const User = require('../model/user');
const logger = require('../database/logger');

async function postMetrics(metric){
   try{
        var _metric = new Metric();
        _metric.id = metric.id;
        _metric.type = metric.type;
        _metric.event = metric.event;
        _metric.temperature = metric.temperature;
        _metric.humidity = metric.humidity;
        _metric.presence = metric.presence;
        
        await _metric.save();
        return true;
    } catch (error){
        logger.error(`Repo postMetrics: ${error}`);
        throw error;
    }
}

async function postEvents(event){
    try{
         var _event = new Event();
         _event.id = event.id;
         _event.type = event.type;
         _event.event = event.event_type;
         _event.event_type = event.event_type;
         await _event.save();
         return true;
     } catch (error){
        logger.error(`Repo postEvents: ${error}`);
        throw error;
     }
}

async function login(id , password){
    try{
        const user = await User.findOne({ "user" : id });
        if (!user)
            return false;   
        isOK = await user.validatePassword(password);
        if (isOK){
            return false;     
        } 
        return true;
    } catch (error){
        logger.error(`Repo login: ${error}`);
        throw error;
    }
}

async function getMetrics(id){
    try{
         var result = await Metric.find({ "id" : id }, 
         ).sort([['dateCreated', -1]]).limit(10);
         return result;
     } catch (error){
        logger.error(`Repo login: ${error}`);
        throw error;
     }
}

async function createUser(user){
    try{
        const userValid = await User.findOne({ "user" : user.user });
        if (userValid)
            return false;
         var _user = new User();
         _user.user = user.user;
         _user.password = user.password;
         await _user.save();
         return true;
     } catch (error){
        logger.error(`Repo login: ${error}`);
        throw error;
     }
}

async function disconnect(){
    logger.info(`Repository desconectado...`);
    await mongodb.disconnect();
    return true;
}

module.exports = { postMetrics, postEvents , getMetrics, login , createUser ,disconnect }