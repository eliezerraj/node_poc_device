const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

function runTests(){

    var metric = {"id" : 999,"type" : "device ","event" : "metric ","temperature" : 4.0,"humidity" : 78.0,"lux" : 33.0,"presence" : 11.0,"moisture" : 55.0,"datecreated" : "2018-07-04T01:39:43.931Z" };
    var event = {"id" : 999,"type" : "device","event" : "watering","event_type" : "wt","datecreated" : "2018-07-04T18:48:10.306Z" };
    var id = 999;
    var user = {"user" : "teste97","password": "pass01" };
    var tokenLogin = {};

        test('POST /user', function (t) {
            supertest(app)
            .post('/user')
            .send(user)
            .expect(201)
            .end((error, res) =>{
                console.log("-----> error : " , error);
                t.error(error, 'Sem erros')
                t.assert(res.body, "Teste com sucesso")
                t.end();
            });
        });

    test('POST /login', function (t) {
        supertest(app)
        .post('/login')
        .send(user)
        .expect(200)
        .end((error, res) =>{
                t.error(error, 'Sem erros');
                t.assert(res.body, "Teste com sucesso");
                tokenLogin = res.body.token;
                t.end();
        });
    });
    

        test('POST /metric', function (t) {
            supertest(app)
            .post('/metric')
            .set({ 'x-access-token': tokenLogin, Accept: 'application/json' })
            .send(metric)
            .expect(201)
            .end((error, res) =>{
                t.error(error, 'Sem erros')
                t.assert(res.body, "Teste com sucesso")
                t.end();
            });
        });

        test('POST /event', function (t) {
            supertest(app)
            .post('/event')
            .set({ 'x-access-token': tokenLogin, Accept: 'application/json' })
            .send(event)
            .expect(201)
            .end((error, res) =>{
                t.error(error, 'Sem erros')
                t.assert(res.body, "Teste com sucesso")
                t.end();
            });
        });

        test('GET /metrics', function (t) {
            supertest(app)
            .get('/metrics/'+id)
            .set({ 'x-access-token': tokenLogin, Accept: 'application/json' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, res) =>{
                t.error(error, 'Sem erros')
                t.assert(res.body, "Teste com sucesso")
                t.end();
            });
        });

}
 
module.exports = { runTests }