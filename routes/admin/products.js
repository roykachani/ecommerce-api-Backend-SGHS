const { Router } = require('express');
const router = Router();
const multer = require('multer');
const config = { dest: './temp' };
const upload = multer(config);

const {
	create,
	updateProduct,
	deletePhotosOfProduct,
	deleteProduct,
} = require('./../../controllers/products');
const { validateId } = require('../../middlewares/actions/generic');
const { validateCreate } = require('../../middlewares/actions/product');

router.post(
	'/createNewProduct',
	upload.array('photos'),
	validateCreate,
	create
);
router.patch(
	'/updateProduct/:id',
	upload.array('photos'),
	validateId,
	updateProduct
); //falata desarrollar.
router.patch('/deletePhoto', deletePhotosOfProduct);
router.delete('/deleteProduct/:id', validateId, deleteProduct);

module.exports = router;
