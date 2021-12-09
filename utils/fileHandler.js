const fs = require('fs');
const uuid = require('node-uuid');
const allowImageExtension = ['jpeg', 'png'];

const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const saveFiles = async ({ path, size, mimetype }, allowImageExtension) => {
	try {
		const [type, extension] = mimetype.split('/');
		if (!allowImageExtension.includes(extension))
			throw new Error('Formato no permitido');
		if (size < 3000000) {
			/*3mb*/
			const uid = uuid();
			const fileName = `${uid}.${extension}`;
			const fileNameOut = `./images/${fileName}`;
			fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
			const result = await cloudinary.v2.uploader.upload(path);
			//console.log(result);

			fs.unlinkSync(path);
			fs.unlinkSync(fileNameOut);
			return fileName, result.secure_url;
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

//falta desarrollo
const destroyFiles = async (url) => {
	try {
		const array = url.split('/');
		const [publicId, extension] = array[7].split('.');
		//console.log(publicId);
		const result = await cloudinary.v2.uploader.destroy(publicId);
		console.log(result);
	} catch (e) {
		console.log(e);
		res.sendStatus(500).json({ message: 'ocurrió un error al borrar imagen' });
	}
};

const imgFiles = (file) => {
	return saveFiles(file, allowImageExtension);
};

module.exports = { imgFiles, destroyFiles };
