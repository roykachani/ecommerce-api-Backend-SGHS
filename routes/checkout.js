const { Router } = require('express');
const router = Router();

const { checkoutmp, notifications } = require('./../controllers/checkoutmp');

router.post('/', checkoutmp);
router.post('/notifications', notifications);

module.exports = router;
