const uid = require('node-uuid');
const moment = require('moment');

const { sendMail } = require('../services/mailing');

const User = require('../models/User');
const { hash, unhash } = require('./../utils/bcrypts');
const { createToken } = require('./../services/auth');
const { registerTemplate } = require('../utils/registerTemplate');

const auth = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne(
			{ email },
			{ password: 1, displayname: 1, role: 1 }
		);
		if (!user)
			return res
				.status(400)
				.json({ message: 'Usuario no registrado', status: 400 });
		//bcrypt
		const isPasswordValid = unhash(password, user.password);
		if (!isPasswordValid)
			return res
				.status(401)
				.json({ message: 'Usuario o password incorrecto', status: 401 });
		const JWTObject = {
			_id: user._id,
			email,
			role: user.role,
		};
		const JWT = createToken(JWTObject);
		const userData = { user: user.displayname, email, JWT };
		res.status(200).json({ message: `Bienvenid@ ${email}`, userData });
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const create = async (req, res) => {
	try {
		const { email, password, name, lastname } = req.body;
		let user = await User.findOne({ email });
		if (user)
			return res
				.status(400)
				.json({ message: 'email en uso, usuario ya registrado', status: 400 });

		//bcrypt
		user = new User(req.body);
		user.password = hash(password);
		const verificationCode = uid();
		user.verificationCode = verificationCode;
		user.dateExpirationCode = moment(new Date()).add(2, 'hours');
		await user.save();

		const send = await sendMail({
			to: email,
			subject: 'Registro. Activa tu cuenta!',
			html: registerTemplate({
				name,
				lastname,
				verificationCode,
			}),
		});
		res.status(201).json({ message: 'Gracias por registrarte' });
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
};

const updateStatus = async (req, res) => {
	try {
		const { verificationCode } = req.params;
		let { dateExpirationCode } = await User.findOne({ verificationCode });

		if (moment(dateExpirationCode).isBefore(new Date(), 'seconds'))
			return res.status(401).json({ message: 'Tu codigo ha expirado' });

		await User.findOneAndUpdate({ verificationCode }, { enable: true });
		res.status(200).json({ message: 'cuanta activada' });
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
};

module.exports = { create, auth, updateStatus };
