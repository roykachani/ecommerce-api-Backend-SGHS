const { Router } = require('express');
const router = Router();
const multer = require('multer');
const config = { dest: './temp' };
const upload = multer(config);

const { create } = require('./../../controllers/products');
//const { validateCreate } = require('./../../middlewares/actions/product');

router.post('/', upload.array('photos'), create);

module.exports = router;
