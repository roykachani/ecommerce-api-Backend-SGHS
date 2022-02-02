const { Schema, model } = require('mongoose');

const SizeSchema = Schema({
	_id: { require: false },
	xxs: { type: Number },
	xs: { type: Number },
	s: { type: Number },
	m: { type: Number },
	l: { type: Number },
	xl: { type: Number },
	xxl: { type: Number },
	xxxl: { type: Number },
	34: { type: Number },
	36: { type: Number },
	38: { type: Number },
	40: { type: Number },
	42: { type: Number },
	44: { type: Number },
	46: { type: Number },
	48: { type: Number },
	50: { type: Number },
	52: { type: Number },
	54: { type: Number },
	56: { type: Number },
	58: { type: Number },
	60: { type: Number },
	62: { type: Number },
	64: { type: Number },
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
