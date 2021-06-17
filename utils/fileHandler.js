const fs = require('fs');
const uuid = require('node-uuid');
const allowImageExtension = ['jpeg', 'png'];

const saveFiles = ({ path, size, mimetype }, allowImageExtension) => {
	try {
		const [type, extension] = mimetype.split('/');
		if (!allowImageExtension.includes(extension))
			throw new Error('Formato no permitido');
		if (size < 1000000) {
			const uid = uuid();
			const fileName = `${uid}.${extension}`;
			const fileNameOut = `./images/${fileName}`;

			fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
			fs.unlinkSync(path);
			return fileName;
		}
		throw new Error('superaste el limite peso maximo de archivo');
	} catch (e) {
		fs.unlinkSync(path);
		console.log(e);
		res
			.sendStatus(500)
			.json({ message: 'ocurrió un error al cargar de imagen' });
	}
};

const imgFiles = (file) => {
	return saveFiles(file, allowImageExtension);
};

module.exports = { imgFiles };
