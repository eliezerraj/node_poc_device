const test = require('tape');
var mqtt = require('mqtt');

var settings = {
	keepalive: 30000,
	protocolId: 'MQIsdp',
    protocolVersion: 3,
	clientId: 'PUB_device',
	username:'device',
	password:'xpto'
}

function runTests(){
    var client  = mqtt.connect('mqtt://127.0.0.1',settings);

    test('Broker: metricas', (t) => {
        client.on('connect', function () {	

            console.log('Postando metricas');
            var msg = "{ \"id\" : 44, \"type\" : \"device\", \"event\" : \"metric\", \"temperature\" : 4.0, \"humidity\" : 78.0, \"lux\" : 33.0, \"presence\" : 11.0 }";
            t.assert( client.publish('device/postMetrics',msg) , "Mensagem enviada");

            console.log('Postando eventos');
            var msg2 = "{ \"id\" : 44, \"type\" : \"device\", \"event\" : \"event_3\", \"event_type\" : \"type_event_3\" }";
            t.assert( client.publish('device/postEvents',msg2) , "Mensagem enviada");

            client.end();
            t.end();
        });
    });
}
 
module.exports = { runTests }