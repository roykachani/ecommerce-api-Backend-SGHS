const jwt = require('jsonwebtoken');
const fs = require('fs'); //file system
// const privateKey = fs.readFileSync('./keys/private.pem'); for production
const privateKey = process.env.PRIVATE_KEY;
// const publicKey = fs.readFileSync('./keys/public.pem'); for production
const publicKey = process.env.PUBLIC_KEY;
const singOptions = { expiresIn: '8h', algorithm: 'RS256' };

const createToken = (payload) => jwt.sign(payload, privateKey, singOptions);
const decodeToken = (token) => jwt.verify(token, publicKey);

module.exports = { createToken, decodeToken };
