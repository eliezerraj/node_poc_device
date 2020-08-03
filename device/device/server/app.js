'user strict'

const endpoint = require('../endpoint/endpoint');
const controller = require("../controller/controller");
const mqqt = require("../mqqt/subscriber");

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(morgan('tiny'));
app.set('port', parseInt(process.env.PORT));

endpoint(app ,controller);

module.exports = app