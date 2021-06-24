const Product = require('./../models/Product');
const { createProduct } = require('../services/products');

const all = async (req, res) => {
	try {
		const data = await Product.find();
		res.json(data);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
};

const create = async (req, res) => {
	try {
		const newProduct = await createProduct(req.body, req.files);
		const product = new Product(newProduct);
		await product.save();

		res.status(201).json({ message: 'Producto creado' });
	} catch (e) {
		console.log(e);
		res.sendStatus(500).json({ message: 'no se puede crear el producto' });
	}
};

const updateProduct = async (req, res) => {};

const approvePurchaseProducts = async (products) => {
	try {
		const checkProducts = products.map((product) =>
			Product.findOne({
				_id: product.id,
				price: product.price,
				avaible_quantity: { $gte: product.quantity },
				enable: true,
			})
		);

		const approvePurchaseResult = await Promise.all(checkProducts);
		if (
			approvePurchaseResult.length === products.length &&
			!approvePurchaseResult.includes(null)
		)
			return true;

		//return false;*/
		throw new Error('los datos de productos no son validos');
	} catch (e) {
		console.error(e);
	}
};

const find = async (req, res) => {
	try {
		const { id } = req.params;
		//console.log(id);
		const data = await Product.findById(id);
		res.json(data);
	} catch (e) {
		res.sendStatus(500);
	}
};
module.exports = { all, find, create, approvePurchaseProducts, updateProduct };
