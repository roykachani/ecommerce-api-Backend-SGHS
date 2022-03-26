const mercadopago = require('mercadopago');

mercadopago.configure({
	access_token: process.env.PROD_ACCES_TOKEN,
});

const checkoutmp = async (req, res) => {
	console.log(req.body, 'meli');

	const itemsArray = [];
	req.body.products.map((i) => {
		itemsArray.push({
			title: i.title,
			unit_price: i.price,
			quantity: i.quantity,
		});
	});
	console.log(itemsArray);
	let preference = {
		purpose: 'wallet_purchase',
		items: itemsArray,
		back_urls: {
			success: 'https://cvn-store.vercel.app',
			failure: 'https://cvn-store.vercel.app',
			pending: 'https://cvn-store.vercel.app',
		},
		auto_return: 'approved',
		installments: 6,
		binary_mode: true,
		statement_descriptor: 'CVN',
		shipments: {
			cost: 400,
			mode: 'not_specified',
		},
	};

	const response = await mercadopago.preferences.create(preference);
	console.log(response.body.init_point);
	res.header('Access-Control-Allow-Origin', 'https://cvn-store.vercel.app');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Max-Age', '3600');
	res.header('Access-Control-Allow-Credentials', true);
	const id = response.body.id;
	const initPoint = response.body.init_point;
	const urlSandbox = response.body.sandbox_init_point;
	// res.status(200).json({ initPoint, status: 200, urlSandbox, id });
	// res.writeHead(307, { Location: 'http://localhost:3000' }).end();
	res.status(307).redirect(initPoint);

	// mercadopago.preferences
	// 	.create(preference)
	// 	.then(function (response) {
	// 		// En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
	// 		res.status(308).redirect(response.body.init_point);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
};

const feedback = (req, res) => {
	console.log(req.query, 'query');
	res.status(200).json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id,
	});
};

module.exports = { checkoutmp, feedback };
