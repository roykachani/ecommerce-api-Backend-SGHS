const { Schema, model } = require('mongoose');

const PurchaseSchema = Schema(
	{
		products: {
			type: Array,
			require: true,
		},
		total: {
			type: Number,
			require: true,
		},

		enable: {
			type: Boolean,
			require: true,
		},
		users: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			require: true,
		},
		status: {
			type: String,
			default: 'UNREALIZED',
			require: true,
		},
		idOperation: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true } //crea un createAT y un updateAT automatico con date.now
);

module.exports = model('purchase', PurchaseSchema);
