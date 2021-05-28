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

module.exports = { securedUser };
