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
	sizes: joi.object().keys({
		xxs: joi.number().positive(),
		xs: joi.number().positive(),
		s: joi.number().positive(),
		l: joi.number().positive(),
		xl: joi.number().positive(),
		xxl: joi.number().positive(),
		xxxl: joi.number().positive(),
		34: joi.number().positive(),
		36: joi.number().positive(),
		38: joi.number().positive(),
		40: joi.number().positive(),
		42: joi.number().positive(),
		44: joi.number().positive(),
		46: joi.number().positive(),
		48: joi.number().positive(),
	}),
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
