const Purchase = require('../models/Purchase');
const User = require('../models/User');
const { sendMail } = require('./mailing');
const { approvePurchaseProducts } = require('../controllers/products');
const { updateStock } = require('../utils/updateStock');
const { createTickets } = require('../utils/pdfGenerator');
const { purchasesTemplate } = require('../utils/purchasesTemplate');
const { calculateTotal } = require('./../utils/calculateTotal');
const uuid = require('node-uuid');

const newPurchase = async (req) => {
	const session = await User.startSession();

	try {
		const id = req.id;
		const { email, name, lastname } = await User.findById(id);
		const idOperation = uuid();
		const { products } = req.body;
		session.startTransaction();
		const purchase = new Purchase(products);
		purchase.users = id;
		purchase.idOperation = idOperation;
		purchase.products = products;
		const validPurchase = await approvePurchaseProducts(products);
		if (!validPurchase) return 'INVALID_PURCHASE';
		await updateStock(products);
		const total = calculateTotal(products);
		purchase.total = total;
		await purchase.save();
		await session.commitTransaction();
		await sendMail({
			to: email,
			subject: 'Felicidades! Compra realizada con éxito!',
			html: purchasesTemplate({
				name,
				lastname,
				idOperation,
				products,
				total,
			}),
		});
		createTickets(idOperation, total, products);
		session.endSession();
		return 'PURCHASE_OK';
	} catch (e) {
		await session.abortTransaction();
		session.endSession();
		return 'PRBLEMS_WITH_PROCCESSING_PURCHASE';
	}
};

module.exports = { newPurchase };
