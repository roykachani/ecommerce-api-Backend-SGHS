//usando libreia de validacion @hapi/joi| express-validator| yup hay que crear el schema de validacion

const joi = require('@hapi/joi');

const createProduct = joi.object().keys({
	title: joi
		.string()
		.required()
		.messages({ 'any.required': 'el titulo es requerido' }),
	price: joi.number().precision(2).positive().required().messages({
		'any.required': 'el precio es requerido',
	}),
	condition: joi
		.string()
		.required()
		.messages({ 'any.required': 'condicion es requerida' }),
	category: joi
		.string()
		.valid('accesorios', 'camisas', 'pantalones', 'remeras', 'sacos')
		.required(),
	avaible_quantity: joi.number().positive().required(),
	SKU: joi.number().positive().required(),
	sizes: joi.array(),
	description: joi
		.string()
		.min(5)
		.max(120)
		.required()
		.messages({ 'any.required': 'La descripcion es requerida' }),
});

const schemas = {
	create: createProduct,
};

module.exports = schemas;
