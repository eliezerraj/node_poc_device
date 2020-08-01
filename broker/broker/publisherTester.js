var mqtt = require('mqtt');

var settings = {
	keepalive: 30000,
	protocolId: 'MQIsdp',
    protocolVersion: 3,
	clientId: 'PUB_device',
	username:'device',
	password:'xpto'
}

var client  = mqtt.connect('mqtt://127.0.0.1',settings);
  
var a = 0;
client.on('connect', function () {	
		setInterval(function() {
			var msg = "{ \"id\" : 44, \"type\" : \"device\", \"event\" : \"metric\", \"temperature\" : 4.0, \"humidity\" : 78.0, \"lux\" : 33.0, \"presence\" : 11.0 }";
			client.publish('device/postMetrics',msg);
			console.log('Message Sent....' , msg);
		}, 5000);
});

client.on('connect', function () {	
	setInterval(function() {

		var msg2 = "{ \"id\" : 44, \"type\" : \"device\", \"event\" : \"event_3\", \"event_type\" : \"type_event_3\" }";
		client.publish('device/postEvents',msg2);

		console.log('Message Sent....' , msg2);
	}, 5000);
});

