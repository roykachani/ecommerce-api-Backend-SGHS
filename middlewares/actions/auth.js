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
		res.status(401).json({ message: 'no autorizado', status: 401 });
	}
};

const securedAdmin = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const { _id, role } = decodeToken(authorization);
		if (!role == 'admin') throw new Error('No tenes acceso a esta ruta');
		req.id = _id;
		req.role = role;
		next();
	} catch (e) {
		console.error(e);
		res.status(401).json({ message: 'no autorizado', status: 401 });
	}
};

module.exports = { securedUser, securedAdmin };
