const { imgFiles, destroyFiles } = require('../utils/fileHandler');

const createProduct = async (body, files) => {
	const urlFiles = files.map((file) => imgFiles(file)).flat();
	const resultFiles = await Promise.all(urlFiles);
	if (resultFiles) {
		const newProduct = { ...body, photos: resultFiles };
		//console.log(resultFiles);
		return newProduct;
	}
};

//falta desarrollo - borrar los que no van y actualizar
const updateFilesProduct = async (body, files) => {
	//const oldFiles = product.photos;
	//console.log(oldFiles);
	//const deleteFiles = oldFiles.map((url) => destroyFiles(url));
	const urlFiles = files.map((file) => imgFiles(file)).flat();
	const resultFiles = await Promise.all(urlFiles);
	if (resultFiles) {
		const updtProduct = { ...body, photos: resultFiles };
		//console.log(resultFiles);
		return updtProduct;
	}
};

module.exports = { createProduct, updateFilesProduct };
