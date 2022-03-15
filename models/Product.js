const { Schema, model } = require('mongoose');

const SizeSchema = Schema({
	_id: { require: false },
	size: {
		type: String,
		require: true,
	},
	stock: {
		type: Number,
		default: 0,
	},
});

const ProdutSchema = Schema(
	{
		title: {
			type: String,
			require: true,
		},
		SKU: {
			type: Number,
		},
		price: {
			type: Number,
			require: true,
		},
		condition: {
			type: String,
			default: 'new',
		},
		category: {
			type: String,
			enum: ['accesorios', 'camisas', 'pantalones', 'remeras', 'sacos'],
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
		sizes: {
			type: [SizeSchema],
			default: undefined,
		},
		sold: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true } //crea un createAT y un updateAT automatico con date.now
);

module.exports = model('products', ProdutSchema);
