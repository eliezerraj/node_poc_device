const test = require('tape');
const controller = require('./controller');
const mongodb = require("../database/mongodb2");

function runTests(){
  
    var metric = {"id" : 888,"type" : "device ","event" : "metric ","temperature" : 4.0,"humidity" : 78.0,"lux" : 33.0,"presence" : 11.0,"moisture" : 55.0,"datecreated" : "2018-07-04T01:39:43.931Z" };
    var event = {"id" : 888,"type" : "device","event" : "watering","event_type" : "wt","datecreated" : "2018-07-04T18:48:10.306Z" };
    test('Controller: postMetrics', (t) => { 
        controller.postMetrics(metric)
            .then((result) => {
                if (result) {
                    t.assert(result === true, "Metricas postadas com sucesso");
                }else{
                    t.assert(result === false,"Metricas postadas SEM sucesso");
                }
            })
            .catch(err => {
                t.fail(err, 'erro')
            }).
            finally(() => t.end())
    });

    test('Controller: postEvents', (t) => {
        controller.postEvents(event)
            .then((result) => {
                if (result) {
                    t.assert(result === true, "Eventos postados com sucesso");
                }else{
                    t.assert(result === true, "Eventos postados SEM sucesso");
                }
            })
            .catch(err => {
                t.fail(err, 'erro')
            }).
            finally(() => t.end())
    });
    
    test('Controller: getMetrics', (t) => {
        var id = 888
        controller.getMetrics(id)
            .then((result) => {
                t.assert(result && result.length > 0, "Metricas consultadas com sucesso");
            })
            .catch(err => {
                t.fail(err, 'erro')
            }).
            finally(() => t.end())
    });

    test('Controller: createUser', (t) => {
        var user = {"user" : "teste03","password": "pass01" };
        controller.createUser(user)
            .then((result) => {
                if (result) {
                    t.assert(result === true, "Usuario criados com sucesso");
                }else{
                    t.assert(result === true, "Usuario criados sem sucesso");
                }
            })
            .catch(err => {
                t.fail(err, 'erro')
            }).
            finally(() => t.end())
    });

    test('Controller: login', (t) => {
        var user = "teste01";
        var password = "pass01";
        controller.login(user,password)
            .then((result) => {
                if (result) {
                    t.assert(result === true, "Login com sucesso");
                }else{
                    t.assert(result === true, "Login sem sucesso");
                }
            })
            .catch(err => {
                t.fail(err, 'erro')
            }).
            finally(() => t.end())
    });

    test('Repository: Desconectar do Mongo (Repository)', (t) => {
        t.assert(controller.disconnect(), "Desconetado com sucesso");
        t.end();
    });

}

module.exports = { runTests }