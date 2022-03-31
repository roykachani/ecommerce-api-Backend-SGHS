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
			success: 'https://cvn-store.vercel.app/success',
			failure: 'https://cvn-store.vercel.app/failure',
			pending: 'https://cvn-store.vercel.app/pending',
		},
		auto_return: 'approved',
		installments: 6,
		binary_mode: true,
		statement_descriptor: 'CVN',
		shipments: {
			cost: 400,
			mode: 'not_specified',
		},
		notification_url:
			'https://sgh-commerce.herokuapp.com/api/checkout/notifications',
	};

	const response = await mercadopago.preferences.create(preference);
	console.log('response body preferense MP');
	console.log(response.body);
	console.log(response.body.init_point);
	// res.header('Access-Control-Allow-Origin', 'https://cvn-store.vercel.app');
	// res.header('Access-Control-Allow-Methods', '*');
	// res.header('Access-Control-Allow-Headers', 'Content-Type');
	// res.header('Access-Control-Max-Age', '3600');
	// res.header('Access-Control-Allow-Credentials', true);
	const id = response.body.id;
	const initPoint = response.body.init_point;
	// const urlSandbox = response.body.sandbox_init_point;
	res.status(200).json({ initPoint, status: 200, id });
	// res.writeHead(307, { Location: 'http://localhost:3000' }).end();
	// res.status(201).redirect(initPoint);

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

const notifications = (req, res) => {
	console.log('response QUERY NOTIFICATIONS MP');

	console.log(req.query);
	console.log('response BODY NOTIFICATIONS MP');
	console.log(req.body, 'body');
	res.status(200).end();
};

module.exports = { checkoutmp, notifications };
