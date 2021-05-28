const schemas = require('./../schemas/generic');

const validateId = (req, res, next) => {
  const { value } = schemas.validateId.validate(parseInt(req.params.id));
  isNaN(value) ? res.sendStatus(404) : next();
};

module.exports = { validateId };
