const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
// coneccion a db
const { dbConnection } = require('./database/config');
dbConnection();

const app = express();

//definicion de rutas
const products = require('./routes/products');
const auth = require('./routes/auth');
const purchase = require('./routes/purchase');
const contact = require('./routes/contact');
const checkoutmp = require('./routes/checkout');
//definicion admin rutas
const adminProducts = require('./routes/admin/products');

//middlewares
const { securedUser, securedAdmin } = require('./middlewares/actions/auth');

const whiteList = [
	'https://www.mercadopago.com.ar',
	'https://cvn-store.vercel.app',
];

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: whiteList,
		methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	})
);

//use de routes
app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/api/purchase', securedUser, purchase);
app.use('/contact', contact);
app.use('/api/checkout', checkoutmp);
console.log('first');

//use admin route
app.use('/api/admin/products', securedAdmin, adminProducts);

console.log('server ok');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	//next(createError(404));
	res.sendStatus(404);
});

// error handler
app.use(function (err, req, res, next) {
	console.error(err); //queda acentado en el server mediante el logg
	res.sendStatus(500);
});

module.exports = app;
