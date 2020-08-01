const test = require('tape');
const supertest = require('supertest');
const app = require('../server/server');
const server = require('../server/server');

function runTests(){
    
    var metric = {"id" : 777,
                "type" : "device ",
                "event" : "metric ",
                "temperature" : 4.0,
                "humidity" : 78.0,
                "lux" : 33.0,
                "presence" : 11.0,
                "moisture" : 55.0
                };
    var event = {
        "id" : 777,
        "type" : "device",
        "event" : "watering",
        "event_type" : "wt"
    };
    var id = 777;
    var user = {"user" : "teste99","password": "pass01" };
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsImlhdCI6MTU5NjIzMzQzNywiZXhwIjoxNTk2MjM2MDI5fQ.d6qZppLLQsPbLc-fh7eMo2-1p_uHJCgZnUj0Htopjrw";

    test('POST /metric', function (t) {
        supertest(app)
        .post('/metric')
        .set({ 'x-access-token': token, Accept: 'application/json' })
        .send(metric)
        .expect(201)
        .end((err, res) =>{
            console.log("-----> err : " , err);
            if(err){
                t.error(err, 'Erro na retorno da requisição');
            }else{
                t.assert(res.body, "Metricas consultadas com sucesso");
            }
            t.end();
        });
    });

    test('POST /event', function (t) {
        supertest(app)
        .post('/event')
        .set({ 'x-access-token': token, Accept: 'application/json' })
        .send(event)
        .expect(201)
        .end((err, res) =>{
            console.log("-----> err : " , err);
            if(err){
                t.error(err, 'Erro na retorno da requisição');
            }else{
                t.assert(res.body, "Metricas consultadas com sucesso");
            }
            t.end();
        });
      });
   
    test('GET /metrics', function (t) {
        supertest(app)
        .get('/metrics/'+id)
        .set({ 'x-access-token': token, Accept: 'application/json' })
        .expect(200)
        .end((err, res) =>{
            console.log("-----> err : " , err);
            if(err){
                t.error(err, 'Erro na retorno da requisição');
            }else{
                t.assert(res.body, "Metricas consultadas com sucesso");
            }
            t.end();
        });
    });

    test('POST /user', function (t) {
        supertest(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err, res) =>{
            console.log("-----> err : " , err);
            if(err){
                t.error(err, 'Erro na retorno da requisição');
            }else{
                t.assert(res.body, "Metricas consultadas com sucesso");
            }
            t.end();
        });
      });

      
    test('POST /user', function (t) {
        supertest(app)
        .post('/login')
        .send(user)
        .expect(200)
        .end((err, res) =>{
            console.log("-----> err : " , err);
            if(err){
                t.error(err, 'Erro na retorno da requisição');
            }else{
                t.assert(res.body, "Metricas consultadas com sucesso");
            }
            t.end();
        });
      });

      //app.server.end();
}
 
module.exports = { runTests }