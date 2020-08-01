const jwt = require('jsonwebtoken');
const configAuth = require('../key/key.json');

async function geraToken(username){
	return jwt.sign({username}, configAuth.secret, { expiresIn: process.env.EXPIRESDIN } );
};

function validaToken(req, res, next){
	if (!req.headers['x-access-token']){
		res.status(403).send({auth : false, message: 'Token não informado'});
	}
	jwt.verify(req.headers['x-access-token'], configAuth.secret, function(err, decoded) {
		if (err)
			return res.status(401).send({ auth: false, message: 'Token expirado' });
		next();
	});
};

module.exports = { validaToken, geraToken };