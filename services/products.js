const { imgFiles } = require('../utils/fileHandler');

const createProduct = async (body, files) => {
	const urlFiles = files.map((file) => imgFiles(file)).flat();
	const [resultFiles] = await Promise.all(urlFiles);
	if (resultFiles) {
		const newProduct = { ...body, photos: resultFiles };
		console.log(resultFiles);
		return newProduct;
	}
};

module.exports = { createProduct };
