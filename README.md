# node_poc_device

<h1>Microserviço para registro de telemetria (IOT) </h1>

 <b>Indice </b>

1)Tecnologia
2)Esquematização
3)Instalação
4)Testes

 <b>1)Tecnologia </b>

	MongoDB para registro dos dados (métricas)
	Express como interface para receber os dados via requições HTTP
	Paho Mosca como interface(broker) para receber os dados via MQTT
	Prometheus Monitorar requisições HTTP/Express

 <b>2)Esquematização </b>

	A solução permite o envio dos dados de telemetria por até 2 interfaces HTTP, ou MQTT ou ambas.
	No serviço device há 2 interface expostas HTTP (endpoint.js) MQTT (subscriber.js)
	No caso do uso de MQQT é necessário subir o serviço broker (servidor mqtt) para a subscrição e publicação de mensagens.
	A autenticação é através de credenciais (user/password). A autenticação via HTTP retornará um token (jwt) que deverá ser utilizado nos post dos dados. 
	Quando o canal for MQQT, as credencias serão enviadas para broker que fará a autenticação e estabelecerá a conexão.

 <b>3) Instalação </b>

	3.1) Clonar o respositorio
	$ git clone git@github.com:eliezerraj/node_poc_device

	.2) Efetuar a configuração para cada serviço

	Device
	#.env
	MONGO_ENDPOINT=mongodb://device:device01@127.0.0.1:27017/device?authSource=device
	PORT=4000
	BROKER_URL=mqtt://127.0.0.1
	EXPIRES=2592000
	PORT_MQQT=1883
	DEVICE_USERNAME=device
	DEVICE_PASSWORD=xpto
	NOTIFY=30000

	Broker (setup)
	#.env
	PORT_MQQT=1883
	DEVICE_USERNAME=device
	DEVICE_PASSWORD=xpto
	NOTIFY=30000

	3.3) Subir os serviços

	device (microserviço) 
	npm start

	broker (Broker MQTT)
	npm start

 <b>4) Testes </b>
 
	Para componente há o seu respectivo arquivo de teste, esse arquivo tem a extensão .test

 <b>5) Monitoramento </b>

	Caso queira usar o monitaramento, deve-se incluir no promentheus um novo job (exemplo abaixo)

	- job_name: 'micro_node_device'
	scrape_interval: 10s
	static_configs:
		- targets: ['127.0.0.0:4000']
			labels:
			group: 'grp_evice_node_sofia'