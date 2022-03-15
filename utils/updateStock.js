const Product = require('../models/Product');

const updateStock = async (products) => {
	try {
		const newResulStock = products.map(({ id, quantity, sizes }) =>
			Product.findOneAndUpdate(
				{ _id: id, 'sizes.size': sizes.size },
				{
					$inc: {
						avaible_quantity: -quantity,
						sold: +quantity,
						'sizes.$.stock': -sizes.stock,
					},
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
