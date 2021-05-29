const { Router } = require('express');
const router = Router();

const { create } = require('./../../controllers/products');
const { validateCreate } = require('./../../middlewares/actions/product');

router.post('/', validateCreate, create);

module.exports = router;
