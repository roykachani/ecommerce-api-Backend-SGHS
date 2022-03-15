const Product = require('./../models/Product');
const { createProduct, updateFilesProduct } = require('../services/products');
const { destroyFiles } = require('../utils/fileHandler');

//get all products
const all = async (req, res) => {
	try {
		const data = await Product.find();
		if (!data) res.status(404).json({ status: 404, message: 'not found' });
		res.status(200).json({ status: 200, data });
	} catch (e) {
		console.error(e);
		res.status(500).json({ status: 500, message: 'internal server error' });
	}
};
// create Produt
const create = async (req, res) => {
	try {
		const newProduct = await createProduct(req.body, req.files);
		const product = new Product(newProduct);
		await product.save();

		res.status(201).json({ message: 'Producto creado' });
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.json({ status: 500, message: 'no se puede crear el producto' });
	}
};

//Update prod. by photo and not photo
//falta desarrollo ? chequear

const updateProduct = async (req, res) => {
	try {
		//console.log(req);
		const { id } = req.params;
		// if (!!req.files) {
		// console.log(req.body);
		const updates = await updateFilesProduct(req.body, req.files);
		const result = await Product.findByIdAndUpdate(id, updates);
		return res.send(result);
		// } else {
		// 	const updates = req.body;
		// 	const result = await Product.findByIdAndUpdate(id, updates);
		// 	return res.send(result);
		// }
		//console.log(req.body);
		//console.log(result);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
};

//delete photos only
const deletePhotosOfProduct = async (req, res) => {
	try {
		const publicId = req.body.urlId;
		//console.log(publicId);
		await destroyFiles(publicId);
		const destroyPhoto = await Product.updateOne(
			{
				photos: publicId,
			},
			{ $pull: { photos: { $in: publicId } } }
		);
		//console.log(destroyPhoto);
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
};

//delete product
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const destroyProduct = await Product.deleteOne({ _id: id });
		res.sendStatus(202);
	} catch (e) {
		console.log(e);
		res.sendStatus(404);
	}
};

//approve purchase
const approvePurchaseProducts = async (products) => {
	try {
		const checkProducts = products.map(({ id, price, quantity, sizes }) =>
			Product.findOne({
				_id: id,
				price: price,
				avaible_quantity: { $gte: quantity },
				'sizes.size': { $gte: sizes.stock },
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

//find Product by id
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

module.exports = {
	all,
	find,
	create,
	approvePurchaseProducts,
	updateProduct,
	deleteProduct,
	deletePhotosOfProduct,
};
