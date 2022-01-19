const { Schema, model } = require('mongoose');

const UserSchema = Schema(
	{
		email: {
			type: String,
			require: true,
			trim: true,
		},
		password: {
			type: String,
			require: true,
		},
		displayname: {
			type: String,
			require: true,
		},
		name: {
			type: String,
			require: true,
		},
		lastname: {
			type: String,
			require: true,
		},
		shippinAddress: {
			type: Array,
			default: [],
		},
		verificationCode: {
			type: String,
			require: true,
		},
		dateExpirationCode: {
			type: Date,
			require: true,
		},
		enable: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: 'user',
		},
	},
	{ timestamps: true } //crea un createAT y un updateAT automatico con date.now
);

module.exports = model('users', UserSchema);
