const { Router } = require('express');
const router = Router();
const multer = require('multer');
const config = { dest: './temp' };
const upload = multer(config);

const { create, updateProduct } = require('./../../controllers/products');
const { validateId } = require('../../middlewares/actions/generic');
//const { validateCreate } = require('./../../middlewares/actions/product');

router.post('/', upload.array('photos'), create);
router.patch('/updateProduct/:id', validateId, updateProduct); //falata desarrollar.

module.exports = router;
