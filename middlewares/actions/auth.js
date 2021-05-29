const { decodeToken } = require('./../../services/auth');

//middleware para decodificar token que envio en cabeceras
const securedUser = (req, res, next) => {
	try {
		//headers
		const { authorization } = req.headers;
		const { _id, email } = decodeToken(authorization);
		req.id = _id;
		next();
	} catch (e) {
		console.error(e);
		res.status(401).json({ message: 'no autorizado' });
	}
};

const securedAdmin = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const { _id, role } = decodeToken(authorization);
		req.id = _id;
		req.role = role;
		next();
	} catch (e) {
		console.error(e);
		res.status(401).json({ message: 'no autorizado' });
	}
};

module.exports = { securedUser, securedAdmin };
