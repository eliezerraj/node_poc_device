const test = require('tape');
const mongodb = require('./mongodb2');
 
function runTests(){
    
    test('Database: MongoDB Conectar', (t) => {
        t.assert(mongodb, "Conectado com sucesso");
        t.end();
    });
 
    test('Database: MongoDB Desconectar', (t) => {
        t.assert(mongodb.disconnect(), "Desconetado com sucesso");
        t.end();
    });
}
 
module.exports = { runTests }