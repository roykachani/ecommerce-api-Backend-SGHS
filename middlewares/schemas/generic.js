const joi = require('@hapi/joi');

const schemas = { validateId: joi.number().required() };

module.exports = schemas;
