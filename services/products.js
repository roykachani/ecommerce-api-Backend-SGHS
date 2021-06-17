const { imgFiles } = require('../utils/fileHandler');

const createProduct = (body, files) => {
	const urlFiles = files.map((file) => imgFiles(file));
	const newProduct = { ...body, photos: urlFiles };
	return newProduct;
};

module.exports = { createProduct };
