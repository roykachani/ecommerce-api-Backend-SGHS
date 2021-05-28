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
    let user = await User.findOne({ email }, { password: 1 });
    if (!user)
      return res.status(400).json({ message: 'Usuario no registrado' });
    //bcrypt
    const isPasswordValid = unhash(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Usuario o password incorrecto' });
    const JWTObject = {
      _id: user._id,
      email,
      role: user.role,
    };
    const JWT = createToken(JWTObject);
    res.json({ message: 'Bienvenid@', JWT });
  } catch (e) {
    console.error(e);
    res.sendStatus(401);
  }
};

const create = async (req, res) => {
  try {
    const { email, password, name, lastname } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'el mail esta en uso' });

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
    res.sendStatus(201);
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
    res.json({ message: 'cuanta activada' });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = { create, auth, updateStatus };
