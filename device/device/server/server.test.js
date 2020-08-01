const test = require('tape');
const server = require('./server');
 
function runTests(){

    test('Server: Iniciar', (t) => {
        t.assert(server, "Iniciado com sucesso");
        t.end();
    });
    
    test('Server: Parar', (t) => {
        t.assert(server.stop()===undefined, "Parado com sucesso");
        t.end();
    });
}
 
module.exports = { runTests }