const { array } = require('@hapi/joi');
const { Schema, model } = require('mongoose');

const ProdutSchema = Schema(
	{
		title: {
			type: String,
			require: true,
		},
		price: {
			type: Number,
			require: true,
		},
		condition: {
			type: String,
			default: 'new',
		},
		description: {
			type: String,
			require: true,
		},
		photos: {
			type: Array,
			default: [],
		},
		enable: {
			type: Boolean,
			default: true,
		},
		avaible_quantity: {
			type: Number,
			require: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true } //crea un createAT y un updateAT automatico con date.now
);

module.exports = model('products', ProdutSchema);
