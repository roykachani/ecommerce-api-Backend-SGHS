const calculateTotal = (products) =>
	products
		.map((product) => product.price * product.quantity)
		.reduce((a, b) => a + b, 0);

module.exports = { calculateTotal };
