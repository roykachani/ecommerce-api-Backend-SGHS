const Product = require('../models/Product');

const updateStock = async (products) => {
	try {
		let keyCompoused;
		let sizeValue;
		const sizePath = await products.map(({ sizes }) => {
			let [size] = Object.keys(sizes);
			[sizeValue] = Object.values(sizes);
			keyCompoused = `sizes.$[].${size}`;
		});
		console.log(typeof keyCompoused, typeof sizeValue);
		const newResulStock = products.map(({ id, quantity }) =>
			Product.findOneAndUpdate(
				{ _id: id },
				{
					$inc: {
						avaible_quantity: -quantity,
						sold: +quantity,
						[keyCompoused]: -sizeValue,
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
