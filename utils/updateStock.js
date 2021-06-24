const Product = require('../models/Product');

const updateStock = async (products) => {
	try {
		const newResulStock = products.map(({ id, quantity }) =>
			Product.findOneAndUpdate(
				{ _id: id },
				{
					$inc: { avaible_quantity: -quantity, sold: +quantity },
				}
			)
		);
		const updatedStock = await Promise.all(newResulStock);
		if (updatedStock.length) return true;

		throw new Error('Ocurrio un error al bajar stock');
	} catch (e) {
		console.error(e);
	}
};

module.exports = { updateStock };
