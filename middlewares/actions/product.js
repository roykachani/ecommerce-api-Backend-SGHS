const schemas = require('./../schemas/product');

validateCreate = (req, res, next) => {
  const { error, value } = schemas.create.validate(req.body); //valido lo que envia el cliente
  error ? res.status(422).json({ message: error.details[0].message }) : next();
};

module.exports = { validateCreate };
